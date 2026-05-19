"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { btnPrimary } from "./button-styles";
import { BookingInquiryNotice } from "./BookingInquiryNotice";
import { PhoneCountryInput } from "./PhoneCountryInput";
import { isPhoneValid } from "../data/phone-countries";
import { fadeUp, tapScale } from "../lib/motion";
import { TOUR_TIME_LABELS } from "../lib/tour-checkout-utils";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  package: string;
  date: string;
  guests: string;
  message: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  package: "",
  date: "",
  guests: "2",
  message: "",
};

function isEmailValid(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function mergePreferredTime(message: string, timeParam: string | null): string {
  if (!timeParam) return message;
  const label = TOUR_TIME_LABELS[timeParam] ?? timeParam;
  const line = `Preferred tour time: ${label}`;
  const stripped = message
    .split("\n")
    .filter((l) => !l.trim().startsWith("Preferred tour time:"))
    .join("\n")
    .trim();
  return stripped ? `${stripped}\n\n${line}` : line;
}

function mergePrefixedLine(
  message: string,
  linePrefix: string,
  fullLine: string | null,
): string {
  if (!fullLine) return message;
  const stripped = message
    .split("\n")
    .filter((l) => !l.trim().startsWith(linePrefix))
    .join("\n")
    .trim();
  return stripped ? `${stripped}\n\n${fullLine}` : fullLine;
}

export function ContactForm({
  packageOptions,
}: {
  packageOptions: { value: string; label: string }[];
}) {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(initialState);
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    fullName: false,
    email: false,
    phone: false,
    package: false,
    date: false,
    guests: false,
    message: false,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const pkg = searchParams.get("package");
    const date = searchParams.get("date");
    const guests = searchParams.get("guests");
    const time = searchParams.get("time");
    const estimateTotal = searchParams.get("estimateTotal");
    const pay = searchParams.get("pay");

    setForm((p) => {
      const next = { ...p };

      if (pkg && packageOptions.some((o) => o.value === pkg)) {
        next.package = pkg;
      }
      if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
        next.date = date;
      }
      if (guests && /^\d+$/.test(guests)) {
        const n = Number(guests);
        if (n >= 1 && n <= 50) next.guests = String(n);
      }
      let msg = p.message;
      if (time) {
        msg = mergePreferredTime(msg, time);
      }
      if (estimateTotal && /^[\d.]+$/.test(estimateTotal)) {
        msg = mergePrefixedLine(
          msg,
          "Estimated cart total",
          `Estimated cart total (before VAT): $${estimateTotal}`,
        );
      }
      if (pay === "paypal") {
        msg = mergePrefixedLine(
          msg,
          "Preferred payment:",
          "Preferred payment: PayPal",
        );
      }
      next.message = msg;

      return next;
    });
  }, [searchParams, packageOptions]);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) e.fullName = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!isEmailValid(form.email)) e.email = "Enter a valid email.";
    if (!form.phone.trim()) e.phone = "Phone is required.";
    else if (!isPhoneValid(form.phone)) {
      e.phone = "Enter a valid phone number with country code.";
    }
    if (!form.package.trim()) e.package = "Select a package.";
    if (!form.date.trim()) e.date = "Select a date.";
    if (!form.guests.trim()) e.guests = "Guests is required.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0;

  const packageFromUrl = searchParams.get("package");
  const selectedPackageLabel = packageOptions.find(
    (o) => o.value === form.package,
  )?.label;

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setStatus("idle");
    setSubmitError(null);
    setForm((p) => ({ ...p, [key]: value }));
  }

  function onBlur<K extends keyof FormState>(key: K) {
    setTouched((p) => ({ ...p, [key]: true }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      package: true,
      date: true,
      guests: true,
      message: true,
    });
    if (!canSubmit || status === "sending") return;

    const packageLabel =
      packageOptions.find((o) => o.value === form.package)?.label ??
      form.package;

    setStatus("sending");
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          packageLabel,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setSubmitError(
          data.error ?? "Something went wrong. Please try again or call us.",
        );
        return;
      }

      setStatus("success");
      setForm(initialState);
      setTouched({
        fullName: false,
        email: false,
        phone: false,
        package: false,
        date: false,
        guests: false,
        message: false,
      });
    } catch {
      setStatus("error");
      setSubmitError(
        "Network error. Check your connection or call us directly.",
      );
    }
  }

  const fieldBase =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-shadow duration-200 hover:border-slate-300 hover:shadow-sm focus:border-[color:var(--brand-primary)] focus:ring-2 focus:ring-[color:var(--brand-primary)]/20";

  const labelBase = "text-xs font-extrabold tracking-widest text-slate-700";
  const errorText = "mt-1 text-xs font-semibold text-red-600";

  return (
    <form onSubmit={submit} className="min-w-0 space-y-5">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 shadow-sm"
          >
            <p className="text-sm font-extrabold">Message sent!</p>
            <p className="mt-1 text-sm text-emerald-800/90">
              We’ll get back to you shortly. If it’s urgent, call us directly.
            </p>
          </motion.div>
        ) : null}
        {status === "error" && submitError ? (
          <motion.div
            key="error"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-900 shadow-sm"
          >
            <p className="text-sm font-extrabold">Could not send message</p>
            <p className="mt-1 text-sm text-red-800/90">{submitError}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <BookingInquiryNotice className="mb-1" />

      {form.package && packageFromUrl && selectedPackageLabel ? (
        <p
          className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-950"
          role="status"
        >
          You&apos;re inquiring about:{" "}
          <span className="font-extrabold">{selectedPackageLabel}</span>
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2">
        <div>
          <p className={labelBase}>NAME</p>
          <input
            value={form.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            onBlur={() => onBlur("fullName")}
            placeholder="Full name"
            className={fieldBase}
            autoComplete="name"
          />
          {touched.fullName && errors.fullName ? (
            <p className={errorText}>{errors.fullName}</p>
          ) : null}
        </div>

        <div>
          <p className={labelBase}>EMAIL</p>
          <input
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            onBlur={() => onBlur("email")}
            placeholder="Email address"
            className={fieldBase}
            autoComplete="email"
            inputMode="email"
          />
          {touched.email && errors.email ? (
            <p className={errorText}>{errors.email}</p>
          ) : null}
        </div>

        <div className="min-[480px]:col-span-2">
          <p className={labelBase}>PHONE</p>
          <PhoneCountryInput
            value={form.phone}
            onChange={(v) => onChange("phone", v)}
            onBlur={() => onBlur("phone")}
            fieldClassName={fieldBase}
            error={touched.phone ? errors.phone : undefined}
          />
        </div>

        <div>
          <p className={labelBase}>PACKAGE</p>
          <select
            value={form.package}
            onChange={(e) => onChange("package", e.target.value)}
            onBlur={() => onBlur("package")}
            className={fieldBase}
          >
            <option value="">Select a package</option>
            {packageOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {touched.package && errors.package ? (
            <p className={errorText}>{errors.package}</p>
          ) : null}
        </div>

        <div>
          <p className={labelBase}>PREFERRED DATE</p>
          <input
            type="date"
            value={form.date}
            onChange={(e) => onChange("date", e.target.value)}
            onBlur={() => onBlur("date")}
            className={fieldBase}
          />
          {touched.date && errors.date ? (
            <p className={errorText}>{errors.date}</p>
          ) : null}
        </div>

        <div>
          <p className={labelBase}>GUESTS</p>
          <input
            type="number"
            min={1}
            max={50}
            value={form.guests}
            onChange={(e) => onChange("guests", e.target.value)}
            onBlur={() => onBlur("guests")}
            className={fieldBase}
            inputMode="numeric"
          />
          {touched.guests && errors.guests ? (
            <p className={errorText}>{errors.guests}</p>
          ) : null}
        </div>
      </div>

      <div>
        <p className={labelBase}>MESSAGE</p>
        <textarea
          value={form.message}
          onChange={(e) => onChange("message", e.target.value)}
          onBlur={() => onBlur("message")}
          placeholder="Tell us what you want to do in Bimini…"
          className={`${fieldBase} min-h-[120px] resize-y`}
        />
        {touched.message && errors.message ? (
          <p className={errorText}>{errors.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <p className="text-xs font-semibold leading-relaxed text-slate-600">
          By submitting, you agree we may contact you about your booking.
        </p>
        <motion.button
          type="submit"
          disabled={!canSubmit || status === "sending"}
          whileHover={canSubmit && status !== "sending" ? { y: -2 } : undefined}
          whileTap={canSubmit && status !== "sending" ? tapScale : undefined}
          className={`${btnPrimary} w-full shrink-0 transition-all duration-200 enabled:hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto`}
        >
          {status === "sending" ? "Sending…" : "Send Message"}
        </motion.button>
      </div>
    </form>
  );
}
