/** Coupon codes — must match checkout UI and server validation. */
export const PAYPAL_COUPON_CODES: Record<string, number> = {
  BIMINI10: 0.1,
  BIMINI: 0.05,
};

export function couponDiscountRate(code: string | undefined): number {
  if (!code) return 0;
  const key = code.trim().toUpperCase();
  return PAYPAL_COUPON_CODES[key] ?? 0;
}
