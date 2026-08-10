import type { VercelRequest, VercelResponse } from "@vercel/node";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

const SYSTEM_PROMPT = `You are the live chat assistant for ZMK Hosiery, a socks manufacturer and exporter in Faisalabad, Pakistan.

Rules:
- Only discuss socks manufacturing, private label, sampling, lead times, export/local supply, and how to contact ZMK sales.
- Be concise, professional, and helpful.
- Do not invent certifications, prices, or MOQs. If asked for exact pricing or MOQ, say the sales team will confirm after reviewing the brief.
- Encourage users to use the quote form or WhatsApp for formal inquiries.
- Product range: casual, sports, diabetic, kids, formal, and custom/private-label socks.
- Contact: zmkhosiery5030@gmail.com, WhatsApp +92 323 6605030 or +92 300 8072074, Faisalabad Pakistan.
- If the user writes in Urdu, reply in Urdu. Otherwise reply in English.`;

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as { role?: unknown; content?: unknown };
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0
  );
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;
  const cleaned = messages.filter(isChatMessage).slice(-12);
  return cleaned.length > 0 ? cleaned : null;
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

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "GROQ_API_KEY is not configured on Vercel. Add it in Project Settings → Environment Variables.",
    });
  }

  const messages = parseMessages(req.body);
  if (!messages) {
    return res.status(400).json({ error: "Invalid chat payload." });
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
          temperature: 0.4,
          max_tokens: 500,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        }),
      },
    );

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
      error?: { message?: string };
    };

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Chat API request failed.",
      });
    }

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(502).json({ error: "Chat API returned an empty response." });
    }

    return res.status(200).json({ reply });
  } catch {
    return res.status(500).json({ error: "Unexpected chat server error." });
  }
}
