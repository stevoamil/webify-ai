import { fromAddress, getResend, newsletterAudienceId } from "@/lib/resend";
import type { Lead } from "@/lib/types";

/** Fire-and-forget: never throws, just logs. Email is a nice-to-have, not a blocker. */
async function safeSend(label: string, send: () => Promise<unknown>) {
  try {
    await send();
  } catch (err) {
    console.error(`Resend: failed to send ${label}`, err);
  }
}

export function notifyNewLead(lead: Lead, notifyEmail: string) {
  const resend = getResend();
  if (!resend || !notifyEmail) return;

  return safeSend("lead notification", () =>
    resend.emails.send({
      from: fromAddress(),
      to: notifyEmail,
      subject: `New lead: ${lead.business || lead.name}`,
      html: `
        <h2>New project inquiry</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Business:</strong> ${lead.business}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone || "—"}</p>
        <p><strong>What they need:</strong> ${lead.need || "—"}</p>
        <p><strong>Budget:</strong> ${lead.budget || "—"}</p>
        <p><strong>What their business does:</strong> ${lead.business_desc || "—"}</p>
        <p><strong>Additional requirements:</strong> ${lead.requirements || "—"}</p>
      `,
    }),
  );
}

export function autoReplyToLead(lead: Lead) {
  const resend = getResend();
  if (!resend) return;

  return safeSend("lead auto-reply", () =>
    resend.emails.send({
      from: fromAddress(),
      to: lead.email,
      subject: "We got your brief — Webify.ai",
      html: `
        <p>Hi ${lead.name || "there"},</p>
        <p>Thanks for reaching out to Webify.ai — we've received your project brief and will reply within one business day with a plan tailored to your project.</p>
        <p>— The Webify.ai team</p>
      `,
    }),
  );
}

export function syncNewsletterContact(email: string) {
  const resend = getResend();
  const audienceId = newsletterAudienceId();
  if (!resend || !audienceId) return;

  return safeSend("newsletter contact sync", () =>
    resend.contacts.create({ audienceId, email, unsubscribed: false }),
  );
}

export async function sendNewsletterBroadcast(subject: string, html: string) {
  const resend = getResend();
  const audienceId = newsletterAudienceId();
  if (!resend) throw new Error("Resend is not configured (missing RESEND_API_KEY).");
  if (!audienceId) throw new Error("Newsletter audience is not configured (missing RESEND_AUDIENCE_ID).");

  const created = await resend.broadcasts.create({
    audienceId,
    from: fromAddress(),
    subject,
    html,
  });
  if (created.error || !created.data) {
    throw new Error(created.error?.message ?? "Failed to create broadcast.");
  }
  const sent = await resend.broadcasts.send(created.data.id);
  if (sent.error) throw new Error(sent.error.message);
  return created.data.id;
}
