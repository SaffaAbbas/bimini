import { parsePayPalBookingBody, resolvePayPalBooking } from "../../../lib/paypal-booking";
import { isPayPalConfigured } from "../../../lib/paypal-env";
import { createPayPalOrder } from "../../../lib/paypal-server";

export async function POST(request: Request) {
  if (!isPayPalConfigured()) {
    return Response.json(
      { error: "PayPal is not configured on the server." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = parsePayPalBookingBody(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  const resolved = resolvePayPalBooking(parsed.data);
  if (!resolved.ok) {
    return Response.json({ error: resolved.error }, { status: 400 });
  }

  try {
    const orderId = await createPayPalOrder(resolved.booking);
    return Response.json({
      orderId,
      totalUsd: resolved.booking.totalUsd,
      tourTitle: resolved.booking.tourTitle,
    });
  } catch {
    return Response.json(
      { error: "Could not start PayPal checkout. Please try again." },
      { status: 502 },
    );
  }
}
