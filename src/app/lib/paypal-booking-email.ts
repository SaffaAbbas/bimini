import type { ResolvedPayPalBooking } from "./paypal-booking";
import type { PayPalCaptureResult } from "./paypal-server";
import { formatMoneyUsd } from "./tour-checkout-utils";

export function buildPayPalBookingEmailHtml(
  booking: ResolvedPayPalBooking,
  capture: PayPalCaptureResult,
): string {
  const lines = [
    ["Tour", booking.tourTitle],
    ["Date", booking.date],
    ["Start time", booking.timeLabel],
    ["Guests (total)", String(booking.guests)],
    ["Adults", String(booking.adults)],
    ["Children", String(booking.children)],
    ["Infants", String(booking.infants)],
    ["Subtotal", formatMoneyUsd(booking.subtotalUsd)],
    booking.coupon ? ["Coupon", booking.coupon] : null,
    booking.discountUsd > 0 ? ["Discount", `−${formatMoneyUsd(booking.discountUsd)}`] : null,
    ["Total paid", formatMoneyUsd(booking.totalUsd)],
    ["PayPal order", capture.orderId],
    capture.captureId ? ["Capture ID", capture.captureId] : null,
    capture.payerEmail ? ["Payer email", capture.payerEmail] : null,
    capture.payerName ? ["Payer name", capture.payerName] : null,
  ].filter(Boolean) as [string, string][];

  const rows = lines
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;font-weight:600;color:#334155;vertical-align:top">${k}</td><td style="padding:6px 0;color:#0f172a">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;color:#0f172a">
<h1 style="font-size:20px">PayPal tour payment received</h1>
<p>A customer completed PayPal checkout on the website.</p>
<table>${rows}</table>
<p style="margin-top:16px;font-size:13px;color:#64748b">Confirm availability and send tour confirmation as usual.</p>
</body></html>`;
}

export function buildPayPalBookingEmailText(
  booking: ResolvedPayPalBooking,
  capture: PayPalCaptureResult,
): string {
  return [
    "PayPal tour payment received",
    "",
    `Tour: ${booking.tourTitle}`,
    `Date: ${booking.date}`,
    `Start time: ${booking.timeLabel}`,
    `Guests: ${booking.guests} (adults ${booking.adults}, children ${booking.children}, infants ${booking.infants})`,
    `Subtotal: ${formatMoneyUsd(booking.subtotalUsd)}`,
    booking.coupon ? `Coupon: ${booking.coupon}` : "",
    booking.discountUsd > 0 ? `Discount: −${formatMoneyUsd(booking.discountUsd)}` : "",
    `Total paid: ${formatMoneyUsd(booking.totalUsd)}`,
    `PayPal order: ${capture.orderId}`,
    capture.captureId ? `Capture ID: ${capture.captureId}` : "",
    capture.payerEmail ? `Payer email: ${capture.payerEmail}` : "",
    capture.payerName ? `Payer name: ${capture.payerName}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
