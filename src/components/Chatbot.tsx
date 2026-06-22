"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { SUGGESTED } from "@/lib/portfolioData";

const CHAT_KEY = "chat_messages_v2";

interface Msg { id: string; role: "user" | "assistant"; content: string; }

export default function Chatbot({ startBoot: _ = false }: { startBoot?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<HTMLSpanElement>(null);
  const accumulated = useRef("");

  const [messages, setMessages] = useState<Msg[]>(() => {
    try {
      const s = typeof window !== "undefined" ? localStorage.getItem(CHAT_KEY) : null;
      return s ? JSON.parse(s) : [];
    } catch { return []; }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (messages.length > 0) localStorage.setItem(CHAT_KEY, JSON.stringify(messages.slice(-50)));
  }, [messages]);

  const scrollBottom = useCallback(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  useEffect(scrollBottom, [messages, streaming, scrollBottom]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading || streaming) return;
    setInput("");
    setError(null);
    const userMsg: Msg = { id: Date.now() + "-u", role: "user", content: q };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(m => ({ role: m.role, content: m.content })) }),
      });
      if (!res.ok) throw new Error(res.status === 429 ? "Demasiadas solicitudes, esperá un momento." : "Error del servidor");
      if (!res.body) throw new Error("Sin respuesta");

      accumulated.current = "";
      setStreaming(true);
      setLoading(false);
      await new Promise(r => requestAnimationFrame(r));

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated.current += dec.decode(value, { stream: true });
        if (streamRef.current) streamRef.current.textContent = accumulated.current;
        scrollBottom();
      }
      const final = accumulated.current + dec.decode();
      setStreaming(false);
      setMessages(p => [...p, { id: Date.now() + "-a", role: "assistant", content: final }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
      setStreaming(false);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); send(input); };

  const C = {
    panel: "#161A21", panel2: "#1B2029", line: "#262C37",
    text: "#E7EAEF", sub: "#8C95A3", faint: "#5B6472",
    mint: "#3FD79A", mintSoft: "rgba(63,215,154,.10)", cyan: "#6FB6DE",
  };

  const showWelcome = messages.length === 0 && !streaming;

  return (
    <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", height: 498, boxShadow: "0 24px 64px rgba(0,0,0,.4)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "16px 22px", borderBottom: `1px solid ${C.line}` }}>
        <span style={{ width: 9, height: 9, borderRadius: 9, background: C.mint, boxShadow: `0 0 8px ${C.mint}`, flexShrink: 0 }} />
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600, color: C.text }}>Asistente IA</span>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: C.faint }}>· responde al instante</span>
        {messages.length > 0 && (
          <button
            onClick={() => { setMessages([]); localStorage.removeItem(CHAT_KEY); }}
            style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: C.faint, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            limpiar
          </button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
        {showWelcome && (
          <div style={{ alignSelf: "flex-start", maxWidth: "84%" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, padding: "12px 17px", borderRadius: 14, borderBottomLeftRadius: 5, background: C.panel2, color: C.text, border: `1px solid ${C.line}` }}>
              Hola, soy la IA de Adrián. Conozco su experiencia en banca, su stack y sus proyectos. Preguntame lo que necesites.
            </div>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "84%" }}>
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, padding: "12px 17px", borderRadius: 14,
              background: m.role === "user" ? C.mintSoft : C.panel2,
              color: m.role === "user" ? C.mint : C.text,
              border: `1px solid ${m.role === "user" ? "rgba(63,215,154,.25)" : C.line}`,
              borderBottomRightRadius: m.role === "user" ? 5 : 14,
              borderBottomLeftRadius: m.role === "user" ? 14 : 5,
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {streaming && (
          <div style={{ alignSelf: "flex-start", maxWidth: "84%" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, padding: "12px 17px", borderRadius: 14, borderBottomLeftRadius: 5, background: C.panel2, color: C.text, border: `1px solid ${C.line}` }}>
              <span ref={streamRef} />
            </div>
          </div>
        )}
        {loading && (
          <div style={{ alignSelf: "flex-start" }}>
            <div style={{ display: "flex", gap: 5, padding: "13px 17px", background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 14 }}>
              {[0, 1, 2].map((d) => (
                <span key={d} style={{ width: 6, height: 6, borderRadius: 6, background: C.mint, display: "inline-block", animation: `dotPulse 1s ${d * 0.15}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        {error && (
          <div style={{ padding: "12px 17px", borderRadius: 11, background: "rgba(239,68,68,.1)", color: "#f87171", border: "1px solid rgba(239,68,68,.3)", fontFamily: "var(--font-sans)", fontSize: 14 }}>
            {error}
          </div>
        )}
      </div>

      {/* Suggested questions */}
      {showWelcome && (
        <div style={{ padding: "0 22px 16px", display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SUGGESTED.map((s) => (
            <SuggestedChip key={s.q} label={s.q} onClick={() => send(s.q)} />
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={onSubmit} style={{ display: "flex", gap: 10, padding: "16px 22px", borderTop: `1px solid ${C.line}`, background: C.panel2 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Preguntá sobre mi experiencia o stack…"
          disabled={loading || streaming}
          style={{ flex: 1, fontFamily: "var(--font-sans)", fontSize: 14.5, color: C.text, background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: "12px 16px", outline: "none" }}
        />
        <button
          type="submit"
          disabled={loading || streaming || !input.trim()}
          style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "#0E1116", background: "#3FD79A", border: "none", borderRadius: 10, padding: "0 22px", cursor: "pointer", opacity: (loading || streaming || !input.trim()) ? 0.5 : 1 }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

function SuggestedChip({ label, onClick }: { label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-sans)", fontSize: 13,
        color: hovered ? "#3FD79A" : "#8C95A3",
        background: "#1B2029",
        border: `1px solid ${hovered ? "#3FD79A" : "#262C37"}`,
        borderRadius: 20, padding: "7px 14px", cursor: "pointer",
        transition: "all .15s",
      }}
    >
      {label}
    </button>
  );
}
