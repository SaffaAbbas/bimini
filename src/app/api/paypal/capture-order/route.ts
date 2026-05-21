import { Resend } from "resend";
import { parsePayPalBookingBody, resolvePayPalBooking } from "../../../lib/paypal-booking";
import {
  buildPayPalBookingEmailHtml,
  buildPayPalBookingEmailText,
} from "../../../lib/paypal-booking-email";
import { getContactEmailConfig } from "../../../lib/contact-env";
import { isPayPalConfigured } from "../../../lib/paypal-env";
import { capturePayPalOrder } from "../../../lib/paypal-server";

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

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const orderId = String(raw.orderId ?? "").trim();
  if (!orderId) {
    return Response.json({ error: "PayPal order ID is required." }, { status: 400 });
  }

  const bookingParsed = parsePayPalBookingBody(body);
  if (!bookingParsed.ok) {
    return Response.json({ error: bookingParsed.error }, { status: 400 });
  }

  const resolved = resolvePayPalBooking(bookingParsed.data);
  if (!resolved.ok) {
    return Response.json({ error: resolved.error }, { status: 400 });
  }

  try {
    const capture = await capturePayPalOrder(orderId);

    if (capture.status !== "COMPLETED") {
      return Response.json(
        { error: "Payment was not completed. Please contact us if you were charged." },
        { status: 402 },
      );
    }

    try {
      const config = getContactEmailConfig();
      const resend = new Resend(config.resendApiKey);
      await resend.emails.send({
        from: config.fromEmail,
        to: [config.inboxEmail],
        replyTo: capture.payerEmail ?? undefined,
        subject: `PayPal payment — ${resolved.booking.tourTitle} (${resolved.booking.date})`,
        html: buildPayPalBookingEmailHtml(resolved.booking, capture),
        text: buildPayPalBookingEmailText(resolved.booking, capture),
      });
    } catch (emailErr) {
      console.error("PayPal booking email failed (payment still captured):", emailErr);
    }

    return Response.json({
      ok: true,
      orderId: capture.orderId,
      captureId: capture.captureId,
      payerEmail: capture.payerEmail,
      totalUsd: resolved.booking.totalUsd,
      tourTitle: resolved.booking.tourTitle,
    });
  } catch {
    return Response.json(
      { error: "Could not complete PayPal payment. Please try again or contact us." },
      { status: 502 },
    );
  }
}
