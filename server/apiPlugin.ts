import type { Plugin } from "vite";
import { askGrok, parseChatBody, readJsonBody } from "./grokChat.ts";
import { handleContactInquiry, parseContactBody } from "./contactMail.ts";

function sendJson(
  res: import("http").ServerResponse,
  status: number,
  payload: unknown,
) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

export function apiPlugin(): Plugin {
  return {
    name: "zmk-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || "";

        if (!url.startsWith("/api/chat") && !url.startsWith("/api/contact")) {
          next();
          return;
        }

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== "POST") {
          sendJson(res, 405, { error: "Method not allowed" });
          return;
        }

        try {
          const body = await readJsonBody(req);

          if (url.startsWith("/api/chat")) {
            const messages = parseChatBody(body);
            if (!messages) {
              sendJson(res, 400, { error: "Invalid chat payload." });
              return;
            }

            const result = await askGrok(messages);
            if (!result.ok) {
              sendJson(res, result.status, { error: result.error });
              return;
            }

            sendJson(res, 200, { reply: result.reply });
            return;
          }

          const payload = parseContactBody(body);
          if (!payload) {
            sendJson(res, 400, { error: "Please fill name, email, and message." });
            return;
          }

          const result = await handleContactInquiry(payload);
          if (!result.ok) {
            sendJson(res, result.status, { error: result.error });
            return;
          }

          sendJson(res, 200, { ok: true });
        } catch {
          sendJson(res, 500, { error: "Unexpected API server error." });
        }
      });
    },
  };
}
