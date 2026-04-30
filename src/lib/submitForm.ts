// Webhook form submission helper.
//
// Architecture: forms POST directly to Zapier Catch Hook URLs configured
// via Vite env vars (VITE_WEBHOOK_*). Each Zap appends a row to a Google
// Sheet (and optionally fans out to Slack/email/Drive for CV uploads).
//
// Spam protection: every form has a honeypot field (`website`) — bots fill
// it, real users don't. Handlers check it before calling these helpers.

export class WebhookConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WebhookConfigError";
  }
}

/**
 * POST a JSON payload to a Zapier webhook.
 *
 * @param webhookUrl  The webhook URL (typically from import.meta.env.VITE_WEBHOOK_*)
 * @param payload     Plain-object payload that gets serialized to JSON
 */
export async function submitForm(
  webhookUrl: string | undefined,
  payload: Record<string, unknown>,
): Promise<void> {
  if (!webhookUrl) {
    throw new WebhookConfigError(
      "Webhook URL nie je nakonfigurovaná. Nastavte VITE_WEBHOOK_* v .env / Vercel env.",
    );
  }
  // Auto-detect locale from URL path for lead attribution
  const locale = typeof window !== "undefined"
    ? (window.location.pathname.startsWith("/en") ? "en" : window.location.pathname.startsWith("/cs") ? "cs" : "sk")
    : "sk";

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, locale, landing_url: typeof window !== "undefined" ? window.location.href : "" }),
  });
  if (!res.ok) {
    throw new Error(`Webhook submission failed (HTTP ${res.status}).`);
  }
}

/**
 * POST a multipart form (with a file) to a Zapier webhook.
 * Used for CV uploads — Zap then takes the file and uploads to Google Drive.
 */
export async function submitFormWithFile(
  webhookUrl: string | undefined,
  payload: Record<string, string | number | boolean | null | undefined>,
  file: File,
  fileFieldName = "cv",
): Promise<void> {
  if (!webhookUrl) {
    throw new WebhookConfigError(
      "Webhook URL nie je nakonfigurovaná. Nastavte VITE_WEBHOOK_* v .env / Vercel env.",
    );
  }
  const locale = typeof window !== "undefined"
    ? (window.location.pathname.startsWith("/en") ? "en" : window.location.pathname.startsWith("/cs") ? "cs" : "sk")
    : "sk";

  const fd = new FormData();
  fd.append("locale", locale);
  fd.append("landing_url", typeof window !== "undefined" ? window.location.href : "");
  for (const [key, value] of Object.entries(payload)) {
    if (value !== null && value !== undefined) {
      fd.append(key, String(value));
    }
  }
  fd.append(fileFieldName, file, file.name);
  const res = await fetch(webhookUrl, { method: "POST", body: fd });
  if (!res.ok) {
    throw new Error(`Webhook submission failed (HTTP ${res.status}).`);
  }
}
