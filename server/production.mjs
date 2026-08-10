import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const port = Number(process.env.PORT || 4173);

const SYSTEM_PROMPT = `You are the live chat assistant for ZMK Hosiery, a socks manufacturer and exporter in Faisalabad, Pakistan.

Rules:
- Only discuss socks manufacturing, private label, sampling, lead times, export/local supply, and how to contact ZMK sales.
- Be concise, professional, and helpful.
- Do not invent certifications, prices, or MOQs. If asked for exact pricing or MOQ, say the sales team will confirm after reviewing the brief.
- Encourage users to use the quote form or WhatsApp for formal inquiries.
- Product range: casual, sports, diabetic, kids, formal, and custom/private-label socks.
- Contact: zmkhosiery5030@gmail.com, WhatsApp +92 323 6605030 or +92 300 8072074, Faisalabad Pakistan.
- If the user writes in Urdu, reply in Urdu. Otherwise reply in English.`;

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return null;
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return null;
  }
}

async function handleChat(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    sendJson(res, 503, { error: "GROQ_API_KEY is not configured on the server." });
    return;
  }

  const body = await readJson(req);
  const messages = Array.isArray(body?.messages)
    ? body.messages
        .filter(
          (message) =>
            (message?.role === "user" || message?.role === "assistant") &&
            typeof message?.content === "string" &&
            message.content.trim(),
        )
        .slice(-12)
    : [];

  if (!messages.length) {
    sendJson(res, 400, { error: "Invalid chat payload." });
    return;
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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
  });

  const data = await response.json();
  if (!response.ok) {
    sendJson(res, response.status, {
      error: data?.error?.message || "Chat API request failed.",
    });
    return;
  }

  const reply = data?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    sendJson(res, 502, { error: "Chat API returned an empty response." });
    return;
  }

  sendJson(res, 200, { reply });
}

function contentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
  if (filePath.endsWith(".pdf")) return "application/pdf";
  if (filePath.endsWith(".xml")) return "application/xml";
  if (filePath.endsWith(".txt")) return "text/plain; charset=utf-8";
  return "application/octet-stream";
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);

    if (url.pathname === "/api/chat") {
      await handleChat(req, res);
      return;
    }

    let filePath = path.join(distDir, decodeURIComponent(url.pathname));
    if (url.pathname === "/" || !path.extname(filePath)) {
      filePath = path.join(distDir, "index.html");
    }

    if (!existsSync(filePath)) {
      filePath = path.join(distDir, "index.html");
    }

    res.writeHead(200, { "Content-Type": contentType(filePath) });
    createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Server error");
  }
}).listen(port, () => {
  console.log(`ZMK Hosiery running at http://localhost:${port}`);
});
