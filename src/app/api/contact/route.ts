import { Resend } from "resend";
import { getContactEmailConfig } from "../../lib/contact-env";
import {
  buildContactEmailHtml,
  buildContactEmailText,
  parseContactPayload,
} from "../../lib/contact-validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = parseContactPayload(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  const { data } = parsed;

  let config;
  try {
    config = getContactEmailConfig();
  } catch {
    console.error("Contact email env vars are not configured.");
    return Response.json(
      { error: "Email is not configured. Please try again later." },
      { status: 503 },
    );
  }

  const resend = new Resend(config.resendApiKey);
  const subject = `New booking inquiry — ${data.fullName} (${data.packageLabel})`;

  const { error } = await resend.emails.send({
    from: config.fromEmail,
    to: [config.inboxEmail],
    replyTo: data.email,
    subject,
    html: buildContactEmailHtml(data),
    text: buildContactEmailText(data),
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json(
      { error: "Could not send your message. Please call or email us directly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
