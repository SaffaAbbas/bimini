type BookingInquiryNoticeProps = {
  variant?: "default" | "compact";
  className?: string;
};

/** Clarifies that booking is a request confirmed by the team—not instant online payment. */
export function BookingInquiryNotice({
  variant = "default",
  className = "",
}: BookingInquiryNoticeProps) {
  if (variant === "compact") {
    return (
      <p
        className={`text-xs leading-relaxed text-slate-600 ${className}`}
        role="note"
      >
        <span className="font-extrabold text-slate-800">Tour date confirmation.</span>{" "}
        PayPal payment completes online; we still confirm your date by email or phone before the trip.
      </p>
    );
  }

  return (
    <div
      className={`rounded-xl border border-amber-200/90 bg-amber-50 px-4 py-3 text-sm text-amber-950 ${className}`}
      role="note"
    >
      <p className="font-extrabold">How booking works</p>
      <p className="mt-1 leading-relaxed text-amber-900/90">
        Choose your tour and preferred date, then send a request. Our team confirms
        availability and sends payment details—you are not charged automatically at
        checkout.
      </p>
    </div>
  );
}
