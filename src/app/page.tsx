"use client";

import React from "react";
import Image from "next/image";
import VisitCounter from "@/components/VisitCounter";
import Chatbot from "@/components/Chatbot";
import { profile, experience, certifications, certs, stack } from "@/lib/portfolioData";

/* ─── helpers ─────────────────────────────────────────────────── */
function Eyebrow({ children, color = "#5B6472" }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color }}>
      {children}
    </span>
  );
}

/* ─── ExpCard ─────────────────────────────────────────────────── */
function ExpCard({ job }: { job: typeof experience[0] }) {
  const multi = job.roles.length > 1;
  return (
    <div style={{ background: "#161A21", border: "1px solid #262C37", borderRadius: 14, padding: "26px 28px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, paddingBottom: 18, borderBottom: "1px solid #262C37" }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 25, fontWeight: 600, color: "#E7EAEF", margin: "0 0 5px", letterSpacing: "-0.01em" }}>{job.company}</h3>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#6FB6DE" }}>{job.sector} · {job.tenure}</div>
        </div>
        {job.badge && (
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em", color: "#3FD79A", background: "rgba(63,215,154,.10)", border: "1px solid rgba(63,215,154,.25)", borderRadius: 5, padding: "4px 9px", flexShrink: 0 }}>
            {job.badge}
          </div>
        )}
      </div>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.65, color: "#8C95A3", margin: "16px 0 22px", maxWidth: 780 }}>{job.summary}</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {job.roles.map((r, ri) => (
          <div key={ri} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
              <span style={{ width: 11, height: 11, borderRadius: 11, flexShrink: 0, background: r.current ? "#3FD79A" : "transparent", border: `2px solid ${r.current ? "#3FD79A" : "#5B6472"}`, boxShadow: r.current ? "0 0 8px #3FD79A" : "none" }} />
              {multi && ri < job.roles.length - 1 && <span style={{ flex: 1, width: 2, background: "#262C37", marginTop: 4 }} />}
            </div>
            <div style={{ paddingBottom: ri < job.roles.length - 1 ? 24 : 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 600, color: "#E7EAEF" }}>{r.role}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#5B6472" }}>{r.period} · {r.length}</span>
              </div>
              <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                {r.highlights.map((h, i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: 9, fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.55, color: "#E7EAEF" }}>
                    <span style={{ color: "#3FD79A" }}>·</span><span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 22, paddingTop: 18, borderTop: "1px solid #262C37" }}>
        {job.tech.map((t) => (
          <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "#8C95A3", background: "#1B2029", border: "1px solid #262C37", borderRadius: 5, padding: "5px 10px" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div style={{ width: "100%", background: "#0E1116", color: "#E7EAEF", fontFamily: "var(--font-sans)" }}>
      <VisitCounter />

      {/* ── HEADER ── */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 56px", borderBottom: "1px solid #262C37" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 19, fontWeight: 600, color: "#E7EAEF" }}>Adrián Agüero</span>
          <Eyebrow>Data Engineer</Eyebrow>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, color: "#3FD79A", display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 7, height: 7, borderRadius: 7, background: "#3FD79A", display: "inline-block" }} />
            Disponible
          </span>
          <a
            href={profile.links.cv}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 600, color: "#0E1116", background: "#3FD79A", borderRadius: 8, padding: "10px 18px", textDecoration: "none", cursor: "pointer" }}
          >
            Descargar CV
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ display: "grid", gridTemplateColumns: "0.82fr 1.5fr", gap: 44, padding: "56px 56px 48px", alignItems: "center" }}>
        {/* Left: identity */}
        <div>
          <Image
            src="/adrian.jpg"
            alt="Adrián Agüero"
            width={132}
            height={132}
            style={{ borderRadius: 12, border: "1px solid #262C37", marginBottom: 24, objectFit: "cover" }}
          />
          <Eyebrow color="#3FD79A">Banca · Buenos Aires</Eyebrow>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 46, lineHeight: 1.08, fontWeight: 600, color: "#E7EAEF", letterSpacing: "-0.02em", margin: "16px 0 20px" }}>
            Pipelines de datos <span style={{ fontStyle: "italic", color: "#3FD79A" }}>confiables</span>.
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16.5, lineHeight: 1.65, color: "#8C95A3", margin: "0 0 26px" }}>
            +2 años manteniendo pipelines ETL end-to-end sobre Hadoop/Cloudera para 4 bancos del Grupo Petersen. Foco en calidad, trazabilidad e incidencias críticas.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid #262C37", paddingTop: 22 }}>
            <a href={`mailto:${profile.email}`} style={{ fontFamily: "var(--font-mono)", fontSize: 13.5, color: "#E7EAEF", textDecoration: "none" }}>{profile.email}</a>
            <div style={{ display: "flex", gap: 18 }}>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, color: "#6FB6DE", textDecoration: "none" }}>GitHub ↗</a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, color: "#6FB6DE", textDecoration: "none" }}>LinkedIn ↗</a>
            </div>
          </div>
        </div>

        {/* Right: chat */}
        <div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 600, color: "#E7EAEF", margin: "0 0 14px", letterSpacing: "-0.01em" }}>
            ¿Apurado? Preguntale a mi IA.
          </h2>
          <Chatbot startBoot={true} />
        </div>
      </section>

      {/* ── EXPERIENCIA ── */}
      <section style={{ padding: "32px 56px 16px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "1px solid #262C37", paddingBottom: 16, marginBottom: 24 }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 600, color: "#E7EAEF", margin: 0, letterSpacing: "-0.01em" }}>Experiencia</h2>
          <Eyebrow>2023 — 2026</Eyebrow>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {experience.map((job) => <ExpCard key={job.id} job={job} />)}
        </div>
      </section>

      {/* ── CERTIFICACIONES ── */}
      <section style={{ padding: "44px 56px 16px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "1px solid #262C37", paddingBottom: 16, marginBottom: 24 }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 600, color: "#E7EAEF", margin: 0, letterSpacing: "-0.01em" }}>Certificaciones</h2>
          <Eyebrow>{certifications.length} obtenidas · {certs.length} en curso</Eyebrow>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {certifications.map((c, i) => (
            <div key={i} style={{ background: "#161A21", border: "1px solid #262C37", borderRadius: 11, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
              <Eyebrow color="#6FB6DE">{c.area}</Eyebrow>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600, color: "#E7EAEF", lineHeight: 1.35 }}>{c.name}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "#5B6472", marginTop: "auto" }}>{c.issuer} · {c.year}</div>
            </div>
          ))}
        </div>
        {certs.length > 0 && (
          <div style={{ marginTop: 28 }}>
            <Eyebrow color="#3FD79A">En curso · objetivo 2026</Eyebrow>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}>
              {certs.map((c, i) => (
                <div key={i} style={{ background: "transparent", border: "1px dashed #262C37", borderRadius: 11, padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600, color: "#E7EAEF", lineHeight: 1.35 }}>{c.name}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "#5B6472", marginTop: 7 }}>{c.issuer}</div>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em", color: "#6FB6DE", border: "1px solid #262C37", borderRadius: 20, padding: "5px 11px", whiteSpace: "nowrap" }}>EN CURSO</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── STACK ── */}
      <section style={{ padding: "44px 56px 16px" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 600, color: "#E7EAEF", margin: "0 0 24px", letterSpacing: "-0.01em", borderBottom: "1px solid #262C37", paddingBottom: 16 }}>Stack</h2>
        {([["Lo que uso a diario", [...stack.core, ...stack.platform]], ["En formación", stack.learning]] as [string, string[]][]).map(([title, items]) => (
          <div key={title} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 24, padding: "16px 0", borderBottom: "1px solid #262C37" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600, color: "#8C95A3" }}>{title}</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {items.map((t) => (
                <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "#E7EAEF", background: "#161A21", border: "1px solid #262C37", borderRadius: 6, padding: "7px 12px" }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ marginTop: 44, borderTop: "1px solid #262C37", padding: "48px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#161A21" }}>
        <div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 600, color: "#E7EAEF" }}>Hablemos.</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#8C95A3", marginTop: 8 }}>{profile.email}</div>
        </div>
        <div style={{ display: "flex", gap: 22 }}>
          {[["GitHub", profile.links.github], ["LinkedIn", profile.links.linkedin], ["CV", profile.links.cv]].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#3FD79A", textDecoration: "none" }}>{label} ↗</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
