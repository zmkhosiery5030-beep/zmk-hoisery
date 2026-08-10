import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import "./LiveChat.css";

type ChatRole = "user" | "assistant";

type UiMessage = {
  role: ChatRole;
  content: string;
};

export function LiveChat() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>([
    { role: "assistant", content: t.chat.welcome },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: "assistant", content: t.chat.welcome }]);
  }, [t.chat.welcome]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, busy]);

  async function sendMessage(event: FormEvent) {
    event.preventDefault();
    const content = input.trim();
    if (!content || busy) return;

    const nextMessages: UiMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setBusy(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const raw = await response.text();
      let data: { reply?: string; error?: string } = {};
      try {
        data = JSON.parse(raw) as { reply?: string; error?: string };
      } catch {
        setMessages((current) => [
          ...current,
          { role: "assistant", content: t.chat.offline },
        ]);
        return;
      }

      if (!response.ok || !data.reply) {
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content:
              response.status === 503
                ? t.chat.offline
                : data.error || t.chat.error,
          },
        ]);
        return;
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply || t.chat.error },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: t.chat.error },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="live-chat">
      {open && (
        <section className="live-chat-panel" aria-label={t.chat.title}>
          <header>
            <div>
              <strong>{t.chat.title}</strong>
              <span>{t.chat.subtitle}</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label={t.chat.close}>
              ×
            </button>
          </header>

          <div className="live-chat-messages">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`live-chat-bubble ${message.role}`}
              >
                {message.content}
              </div>
            ))}
            {busy && <div className="live-chat-bubble assistant">{t.chat.thinking}</div>}
            <div ref={endRef} />
          </div>

          <form onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t.chat.placeholder}
              aria-label={t.chat.placeholder}
            />
            <button type="submit" disabled={busy || !input.trim()}>
              {t.chat.send}
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="live-chat-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? t.chat.close : t.chat.open}
      >
        {open ? "×" : "Chat"}
      </button>
    </div>
  );
}
