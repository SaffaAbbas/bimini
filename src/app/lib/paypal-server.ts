import { getPayPalApiBase, getPayPalServerConfig } from "./paypal-env";
import { formatUsdForPayPal, type ResolvedPayPalBooking } from "./paypal-booking";

type OAuthCache = { token: string; expiresAtMs: number };

let oauthCache: OAuthCache | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (oauthCache && now < oauthCache.expiresAtMs - 60_000) {
    return oauthCache.token;
  }

  const { clientId, clientSecret, apiBase } = getPayPalServerConfig();
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${apiBase}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("PayPal OAuth failed:", res.status, err);
    throw new Error("PayPal authentication failed.");
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  oauthCache = {
    token: data.access_token,
    expiresAtMs: now + data.expires_in * 1000,
  };
  return data.access_token;
}

async function paypalFetch(path: string, init?: RequestInit) {
  const token = await getAccessToken();
  const apiBase = getPayPalApiBase();
  const res = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  return res;
}

export async function createPayPalOrder(booking: ResolvedPayPalBooking): Promise<string> {
  const res = await paypalFetch("/v2/checkout/orders", {
    method: "POST",
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: booking.slug,
          description: booking.description,
          custom_id: booking.customId,
          amount: {
            currency_code: "USD",
            value: formatUsdForPayPal(booking.totalUsd),
            breakdown: booking.discountUsd > 0
              ? {
                  item_total: {
                    currency_code: "USD",
                    value: formatUsdForPayPal(booking.subtotalUsd),
                  },
                  discount: {
                    currency_code: "USD",
                    value: formatUsdForPayPal(booking.discountUsd),
                  },
                }
              : undefined,
          },
        },
      ],
      application_context: {
        brand_name: "Tours Bimini",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("PayPal create order failed:", res.status, err);
    throw new Error("Could not create PayPal order.");
  }

  const data = (await res.json()) as { id: string };
  return data.id;
}

export type PayPalCaptureResult = {
  orderId: string;
  status: string;
  payerEmail: string | null;
  payerName: string | null;
  captureId: string | null;
  amountUsd: string | null;
  customId: string | null;
};

export async function capturePayPalOrder(orderId: string): Promise<PayPalCaptureResult> {
  const res = await paypalFetch(`/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("PayPal capture failed:", res.status, err);
    throw new Error("Could not capture PayPal payment.");
  }

  const data = (await res.json()) as {
    id: string;
    status: string;
    payer?: { email_address?: string; name?: { given_name?: string; surname?: string } };
    purchase_units?: Array<{
      custom_id?: string;
      payments?: {
        captures?: Array<{
          id: string;
          status: string;
          amount?: { value: string; currency_code: string };
        }>;
      };
    }>;
  };

  const unit = data.purchase_units?.[0];
  const capture = unit?.payments?.captures?.[0];
  const payerName = data.payer?.name
    ? [data.payer.name.given_name, data.payer.name.surname].filter(Boolean).join(" ")
    : null;

  return {
    orderId: data.id,
    status: data.status,
    payerEmail: data.payer?.email_address ?? null,
    payerName: payerName || null,
    captureId: capture?.id ?? null,
    amountUsd: capture?.amount?.value ?? null,
    customId: unit?.custom_id ?? null,
  };
}

export async function getPayPalOrder(orderId: string) {
  const res = await paypalFetch(`/v2/checkout/orders/${orderId}`, { method: "GET" });
  if (!res.ok) return null;
  return res.json();
}
