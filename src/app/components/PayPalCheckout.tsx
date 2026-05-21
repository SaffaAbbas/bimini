"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type BookingPayload = {
  slug: string;
  date: string;
  guests: number;
  adults: number;
  children: number;
  infants: number;
  time: string;
  coupon: string | null;
};

type Props = {
  clientId: string;
  booking: BookingPayload;
  successPath: string;
  disabled?: boolean;
};

export function PayPalCheckout({ clientId, booking, successPath, disabled }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const payload = {
    slug: booking.slug,
    date: booking.date,
    guests: booking.guests,
    adults: booking.adults,
    children: booking.children,
    infants: booking.infants,
    time: booking.time,
    ...(booking.coupon ? { coupon: booking.coupon } : {}),
  };

  const createOrder = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as { orderId?: string; error?: string };
    if (!res.ok || !data.orderId) {
      throw new Error(data.error ?? "Could not start PayPal checkout.");
    }
    return data.orderId;
  }, [
    booking.adults,
    booking.children,
    booking.coupon,
    booking.date,
    booking.guests,
    booking.infants,
    booking.slug,
    booking.time,
  ]);

  const onApprove = useCallback(
    async (data: { orderID: string }) => {
      setBusy(true);
      setError(null);
      try {
        const res = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: data.orderID, ...payload }),
        });
        const result = (await res.json()) as { ok?: boolean; error?: string; orderId?: string };
        if (!res.ok || !result.ok) {
          throw new Error(result.error ?? "Payment could not be completed.");
        }
        const q = new URLSearchParams({ orderId: result.orderId ?? data.orderID });
        router.push(`${successPath}?${q.toString()}`);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Payment failed.");
        setBusy(false);
      }
    },
    [payload, router, successPath],
  );

  return (
    <div className={disabled || busy ? "pointer-events-none opacity-60" : ""}>
      <PayPalScriptProvider
        options={{
          clientId,
          currency: "USD",
          intent: "capture",
          components: "buttons",
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical", color: "gold", shape: "pill", label: "paypal" }}
          disabled={disabled || busy}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={() => {
            setError("PayPal encountered an error. Please try again or use the booking request form.");
            setBusy(false);
          }}
          onCancel={() => {
            setBusy(false);
          }}
        />
      </PayPalScriptProvider>
      {error ? (
        <p className="mt-2 text-xs font-semibold text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      {busy ? (
        <p className="mt-2 text-xs font-semibold text-slate-600" role="status">
          Completing your payment…
        </p>
      ) : null}
    </div>
  );
}
