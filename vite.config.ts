import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { grokChatPlugin } from "./server/chatPlugin.ts";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env.GROQ_API_KEY = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
  process.env.GROQ_MODEL =
    env.GROQ_MODEL || process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  return {
    plugins: [react(), grokChatPlugin()],
  };
});
