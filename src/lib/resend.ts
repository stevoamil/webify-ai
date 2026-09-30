import { Resend } from "resend";

let client: Resend | null = null;

export function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

/**
 * Defaults to Resend's shared sandbox sender, which only delivers to the
 * Resend account's own verified email. Set RESEND_FROM_EMAIL once a real
 * domain is added and verified in Resend (e.g. "Webify.ai <hello@webify.ai>").
 */
export function fromAddress(): string {
  return process.env.RESEND_FROM_EMAIL ?? "Webify.ai <onboarding@resend.dev>";
}

export function newsletterAudienceId(): string | undefined {
  return process.env.RESEND_AUDIENCE_ID;
}
