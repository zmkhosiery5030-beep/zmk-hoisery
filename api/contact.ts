import type { VercelRequest, VercelResponse } from "@vercel/node";

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  market: string;
  sockType: string;
  quantity: string;
  destination: string;
  message: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseContactBody(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;

  if (
    !isNonEmptyString(data.name) ||
    !isNonEmptyString(data.email) ||
    !isNonEmptyString(data.message)
  ) {
    return null;
  }

  const email = data.email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

  return {
    name: data.name.trim().slice(0, 120),
    company: isNonEmptyString(data.company) ? data.company.trim().slice(0, 160) : "",
    email,
    phone: isNonEmptyString(data.phone) ? data.phone.trim().slice(0, 60) : "",
    market: isNonEmptyString(data.market) ? data.market.trim().slice(0, 40) : "",
    sockType: isNonEmptyString(data.sockType) ? data.sockType.trim().slice(0, 60) : "",
    quantity: isNonEmptyString(data.quantity) ? data.quantity.trim().slice(0, 80) : "",
    destination: isNonEmptyString(data.destination)
      ? data.destination.trim().slice(0, 80)
      : "",
    message: data.message.trim().slice(0, 4000),
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildInquiryHtml(payload: ContactPayload) {
  const rows = [
    ["Name", payload.name],
    ["Company", payload.company || "-"],
    ["Email", payload.email],
    ["Phone / WhatsApp", payload.phone || "-"],
    ["Market", payload.market || "-"],
    ["Sock type", payload.sockType || "-"],
    ["Quantity", payload.quantity || "-"],
    ["Destination", payload.destination || "-"],
    ["Message", payload.message],
  ];

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px">New sock inquiry from ZMK website</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:700;width:160px">${escapeHtml(label)}</td>
            <td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>
  `;
}

function buildAutoReplyHtml(payload: ContactPayload) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
      <p>Dear ${escapeHtml(payload.name)},</p>
      <p>Thank you for contacting <strong>ZMK Hosiery</strong>. We have received your inquiry and our sales team will respond shortly.</p>
      <p>For urgent requests, WhatsApp us at <a href="https://wa.me/923236605030">+92 323 6605030</a> or <a href="https://wa.me/923008072074">+92 300 8072074</a>.</p>
      <p style="margin-top:24px">Regards,<br/>ZMK Hosiery<br/>Faisalabad, Pakistan</p>
    </div>
  `;
}

async function sendResendEmail(input: {
  from: string;
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      ok: false as const,
      status: 503,
      error:
        "RESEND_API_KEY is not configured. Add it in Vercel Environment Variables.",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: input.from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      reply_to: input.replyTo,
    }),
  });

  let data: { id?: string; message?: string } = {};
  try {
    data = (await response.json()) as { id?: string; message?: string };
  } catch {
    data = {};
  }

  if (!response.ok) {
    return {
      ok: false as const,
      status: response.status,
      error: data.message || "Failed to send email.",
    };
  }

  return { ok: true as const, id: data.id || "" };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = parseContactBody(req.body);
  if (!payload) {
    return res.status(400).json({ error: "Please fill name, email, and message." });
  }

  try {
    const toEmail =
      process.env.CONTACT_TO_EMAIL ||
      process.env.VITE_CONTACT_EMAIL ||
      "zmkhosiery5030@gmail.com";
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "ZMK Hosiery <onboarding@resend.dev>";

    const salesResult = await sendResendEmail({
      from: fromEmail,
      to: [toEmail],
      subject: `New sock inquiry from ${payload.name}`,
      html: buildInquiryHtml(payload),
      replyTo: payload.email,
    });

    if (!salesResult.ok) {
      return res.status(salesResult.status).json({ error: salesResult.error });
    }

    // Auto-reply is best-effort. Resend's onboarding sender can only mail the
    // account owner until a domain is verified — don't fail the inquiry for that.
    await sendResendEmail({
      from: fromEmail,
      to: [payload.email],
      subject: "We received your inquiry | ZMK Hosiery",
      html: buildAutoReplyHtml(payload),
      replyTo: toEmail,
    });

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Unexpected contact server error." });
  }
}
