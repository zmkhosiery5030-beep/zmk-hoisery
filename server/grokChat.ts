export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

type ChatChoice = {
  message?: {
    content?: string | null;
  };
};

type ChatApiResponse = {
  choices?: ChatChoice[];
  error?: {
    message?: string;
  };
};

const SYSTEM_PROMPT = `You are the live chat assistant for ZMK Hosiery, a socks manufacturer and exporter in Faisalabad, Pakistan.

Rules:
- Only discuss socks manufacturing, private label, sampling, lead times, export/local supply, and how to contact ZMK sales.
- Be concise, professional, and helpful.
- Do not invent certifications, prices, or MOQs. If asked for exact pricing or MOQ, say the sales team will confirm after reviewing the brief.
- Encourage users to use the quote form or WhatsApp for formal inquiries.
- Product range: casual, sports, diabetic, kids, formal, and custom/private-label socks.
- Contact: sales@zmkhosiery.com, WhatsApp +92 323 6605030, Faisalabad Pakistan.
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

export function parseChatBody(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;

  const cleaned = messages.filter(isChatMessage).slice(-12);
  return cleaned.length > 0 ? cleaned : null;
}

export async function askGrok(messages: ChatMessage[]) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      ok: false as const,
      status: 503,
      error: "GROQ_API_KEY is not configured on the server.",
    };
  }

  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        max_tokens: 500,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    },
  );

  const data = (await response.json()) as ChatApiResponse;

  if (!response.ok) {
    return {
      ok: false as const,
      status: response.status,
      error: data.error?.message || "Chat API request failed.",
    };
  }

  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) {
    return {
      ok: false as const,
      status: 502,
      error: "Chat API returned an empty response.",
    };
  }

  return {
    ok: true as const,
    reply: content,
  };
}

export async function readJsonBody(
  req: import("http").IncomingMessage,
): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) return null;

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  } catch {
    return null;
  }
}
