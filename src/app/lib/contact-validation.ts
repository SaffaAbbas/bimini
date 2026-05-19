import { formatPhoneDisplay, isPhoneValid } from "../data/phone-countries";

export type ContactFormPayload = {
  fullName: string;
  email: string;
  phone: string;
  package: string;
  packageLabel: string;
  date: string;
  guests: string;
  message: string;
};

function isEmailValid(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export function parseContactPayload(
  body: unknown,
): { ok: true; data: ContactFormPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;
  const fullName = String(raw.fullName ?? "").trim();
  const email = String(raw.email ?? "").trim();
  const phone = String(raw.phone ?? "").trim();
  const pkg = String(raw.package ?? "").trim();
  const packageLabel = String(raw.packageLabel ?? pkg).trim();
  const date = String(raw.date ?? "").trim();
  const guests = String(raw.guests ?? "").trim();
  const message = String(raw.message ?? "").trim();

  if (!fullName) return { ok: false, error: "Name is required." };
  if (!email) return { ok: false, error: "Email is required." };
  if (!isEmailValid(email)) return { ok: false, error: "Enter a valid email." };
  if (!phone) return { ok: false, error: "Phone is required." };
  if (!isPhoneValid(phone)) {
    return { ok: false, error: "Enter a valid phone number with country code." };
  }
  if (!pkg) return { ok: false, error: "Select a package." };
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { ok: false, error: "Select a valid date." };
  }
  const guestNum = Number(guests);
  if (!guests || !Number.isInteger(guestNum) || guestNum < 1 || guestNum > 50) {
    return { ok: false, error: "Guests must be between 1 and 50." };
  }
  if (!message) return { ok: false, error: "Message is required." };

  return {
    ok: true,
    data: {
      fullName,
      email,
      phone,
      package: pkg,
      packageLabel,
      date,
      guests,
      message,
    },
  };
}

export function buildContactEmailHtml(data: ContactFormPayload) {
  const rows = [
    ["Name", data.fullName],
    ["Email", data.email],
    ["Phone", formatPhoneDisplay(data.phone) || data.phone],
    ["Package", data.packageLabel],
    ["Preferred date", data.date],
    ["Guests", data.guests],
    ["Message", data.message],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#334155;vertical-align:top;width:140px">${label}</td><td style="padding:8px 12px;color:#0f172a">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#f8fafc;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:24px;border:1px solid #e2e8f0">
    <h1 style="margin:0 0 8px;font-size:20px;color:#0f172a">New contact form submission</h1>
    <p style="margin:0 0 20px;font-size:14px;color:#64748b">Tours Bimini website — reply directly to the guest.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">${tableRows}</table>
  </div>
</body>
</html>`;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildContactEmailText(data: ContactFormPayload) {
  return [
    "New contact form submission — Tours Bimini",
    "",
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${formatPhoneDisplay(data.phone) || data.phone}`,
    `Package: ${data.packageLabel}`,
    `Preferred date: ${data.date}`,
    `Guests: ${data.guests}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}
