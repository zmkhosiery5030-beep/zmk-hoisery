import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { apiPlugin } from "./server/apiPlugin.ts";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env.GROQ_API_KEY = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
  process.env.GROQ_MODEL =
    env.GROQ_MODEL || process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
  process.env.RESEND_API_KEY = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  process.env.CONTACT_TO_EMAIL =
    env.CONTACT_TO_EMAIL || env.VITE_CONTACT_EMAIL || process.env.CONTACT_TO_EMAIL;
  process.env.CONTACT_FROM_EMAIL =
    env.CONTACT_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL;

  return {
    plugins: [react(), apiPlugin()],
  };
});
