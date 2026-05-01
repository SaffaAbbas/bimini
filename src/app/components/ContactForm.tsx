"use client";

import { useMemo, useState } from "react";

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

export function ContactForm({
  packageOptions,
}: {
  packageOptions: { value: string; label: string }[];
}) {
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
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) e.fullName = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!isEmailValid(form.email)) e.email = "Enter a valid email.";
    if (!form.phone.trim()) e.phone = "Phone is required.";
    if (!form.package.trim()) e.package = "Select a package.";
    if (!form.date.trim()) e.date = "Select a date.";
    if (!form.guests.trim()) e.guests = "Guests is required.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0;

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setStatus("idle");
    setForm((p) => ({ ...p, [key]: value }));
  }

  function onBlur<K extends keyof FormState>(key: K) {
    setTouched((p) => ({ ...p, [key]: true }));
  }

  function submit(e: React.FormEvent) {
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
    if (!canSubmit) return;

    // No backend yet — we just show a success state.
    // Later you can connect this to a route handler / email provider.
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
  }

  const fieldBase =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[color:var(--brand-primary)] focus:ring-2 focus:ring-[color:var(--brand-primary)]/20";

  const labelBase = "text-xs font-extrabold tracking-widest text-slate-700";
  const errorText = "mt-1 text-xs font-semibold text-red-600";

  return (
    <form onSubmit={submit} className="space-y-5">
      {status === "success" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
          <p className="text-sm font-extrabold">Message sent!</p>
          <p className="mt-1 text-sm text-emerald-800/90">
            We’ll get back to you shortly. If it’s urgent, call us directly.
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
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

        <div>
          <p className={labelBase}>PHONE</p>
          <input
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            onBlur={() => onBlur("phone")}
            placeholder="Phone number"
            className={fieldBase}
            autoComplete="tel"
            inputMode="tel"
          />
          {touched.phone && errors.phone ? (
            <p className={errorText}>{errors.phone}</p>
          ) : null}
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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold text-slate-600">
          By submitting, you agree we may contact you about your booking.
        </p>
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center justify-center rounded-xl bg-[color:var(--brand-primary)] px-6 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-50 hover:brightness-95"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}

