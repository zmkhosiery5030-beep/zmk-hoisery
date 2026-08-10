import type { Plugin } from "vite";
import { askGrok, parseChatBody, readJsonBody } from "./grokChat.ts";

function sendJson(
  res: import("http").ServerResponse,
  status: number,
  payload: unknown,
) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

export function grokChatPlugin(): Plugin {
  return {
    name: "grok-chat-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/chat")) {
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
        } catch {
          sendJson(res, 500, { error: "Unexpected chat server error." });
        }
      });
    },
  };
}
