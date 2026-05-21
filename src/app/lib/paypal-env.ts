export type PayPalMode = "sandbox" | "live";

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getPayPalMode(): PayPalMode {
  const raw = (process.env.PAYPAL_MODE ?? "sandbox").trim().toLowerCase();
  return raw === "live" ? "live" : "sandbox";
}

export function getPayPalApiBase(): string {
  return getPayPalMode() === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

/** Server credentials — never expose secret to the client. */
export function getPayPalServerConfig() {
  return {
    clientId: requireEnv("PAYPAL_CLIENT_ID"),
    clientSecret: requireEnv("PAYPAL_CLIENT_SECRET"),
    apiBase: getPayPalApiBase(),
    mode: getPayPalMode(),
  };
}

/** Public client id for PayPal JS SDK (same value as PAYPAL_CLIENT_ID). */
export function getPayPalClientIdPublic(): string | null {
  const id =
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?.trim() ||
    process.env.PAYPAL_CLIENT_ID?.trim();
  return id || null;
}

export function isPayPalConfigured(): boolean {
  return Boolean(
    process.env.PAYPAL_CLIENT_ID?.trim() &&
      process.env.PAYPAL_CLIENT_SECRET?.trim(),
  );
}
