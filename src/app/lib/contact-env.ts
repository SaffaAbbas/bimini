function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getContactEmailConfig() {
  return {
    resendApiKey: requireEnv("RESEND_API_KEY"),
    inboxEmail: requireEnv("CONTACT_INBOX_EMAIL"),
    fromEmail: requireEnv("RESEND_FROM_EMAIL"),
  };
}
