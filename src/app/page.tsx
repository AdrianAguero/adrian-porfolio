"use client";

import React from "react";
import Image from "next/image";
import VisitCounter from "@/components/VisitCounter";
import Chatbot from "@/components/Chatbot";
import { profile, experience, certifications, stack } from "@/lib/portfolioData";

const W = { maxWidth: 1180, margin: "0 auto", width: "100%" };

/* ─── helpers ─────────────────────────────────────────────────── */
function Eyebrow({ children, color = "#5B6472" }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color }}>
      {children}
    </span>
  );
}

/* ─── StackPill ───────────────────────────────────────────────── */
function StackPill({ label, accent = false }: { label: string; accent?: boolean }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-mono)", fontSize: 12.5,
        color: hovered ? "#3FD79A" : (accent ? "#C9D1D9" : "#E7EAEF"),
        background: hovered ? "rgba(63,215,154,.08)" : "#161A21",
        border: `1px solid ${hovered ? "rgba(63,215,154,.5)" : (accent ? "rgba(63,215,154,.25)" : "#262C37")}`,
        borderRadius: 6, padding: "7px 12px",
        transition: "all .15s", cursor: "default",
        boxShadow: hovered ? "0 0 10px rgba(63,215,154,.12)" : "none",
      }}
    >
      {label}
    </span>
  );
}

/* ─── ExpCard ─────────────────────────────────────────────────── */
function ExpCard({ job }: { job: typeof experience[0] }) {
  const multi = job.roles.length > 1;
  const isActual = job.badge === "Actual";
  return (
    <div style={{
      background: "#161A21",
      border: `1px solid ${isActual ? "rgba(63,215,154,.25)" : "#262C37"}`,
      borderRadius: 14, padding: "26px 28px",
      boxShadow: isActual ? "0 0 32px rgba(63,215,154,.05)" : "none",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, paddingBottom: 18, borderBottom: "1px solid #262C37" }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 25, fontWeight: 600, color: "#E7EAEF", margin: "0 0 5px", letterSpacing: "-0.01em" }}>{job.company}</h3>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#6FB6DE" }}>
            Sector Bancario · {job.tenure}
          </div>
        </div>
        {job.badge && (
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em",
            color: "#3FD79A", background: "rgba(63,215,154,.10)",
            border: "1px solid rgba(63,215,154,.35)", borderRadius: 5, padding: "5px 10px", flexShrink: 0,
          }}>
            {isActual && (
              <span style={{ width: 6, height: 6, borderRadius: 6, background: "#3FD79A", display: "inline-block", animation: "dotPulse 1.4s ease-in-out infinite" }} />
            )}
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
      {/* Tech tags con borde verde */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 22, paddingTop: 18, borderTop: "1px solid #262C37" }}>
        {job.tech.map((t) => (
          <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "#3FD79A", background: "rgba(63,215,154,.06)", border: "1px solid rgba(63,215,154,.25)", borderRadius: 5, padding: "5px 10px" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── CertificationsSection ───────────────────────────────────── */
function AccordionGroup({
  label, count, accentColor = "#6FB6DE", isInProgress = false,
  items,
}: {
  label: string; count: number; accentColor?: string; isInProgress?: boolean;
  items: typeof certifications;
}) {
  const [open, setOpen] = React.useState(false);
  const [headerHovered, setHeaderHovered] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (contentRef.current) setHeight(contentRef.current.scrollHeight);
  }, [items]);

  return (
    <div style={{ borderBottom: "1px solid #262C37" }}>
      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => setHeaderHovered(false)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 4px", background: "none", border: "none", cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.10em",
          textTransform: "uppercase", color: headerHovered ? accentColor : "#8C95A3",
          transition: "color .12s",
        }}>
          {label}
          <span style={{ color: accentColor, marginLeft: 10 }}>· {count}</span>
        </span>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 11, color: accentColor,
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform .2s", display: "inline-block",
        }}>▼</span>
      </button>

      <div style={{ overflow: "hidden", maxHeight: open ? height + 16 : 0, transition: "max-height .25s ease" }}>
        <div ref={contentRef} style={{ paddingBottom: 8 }}>
          {items.map((c, i) => (
            isInProgress ? <InProgressRow key={i} c={c} /> : <CertRow key={i} c={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CertRow({ c }: { c: typeof certifications[0] }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href={c.pdfUrl} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      title="Ver certificado PDF"
      style={{
        display: "flex", alignItems: "center", gap: 8, padding: "9px 12px",
        borderRadius: 6, borderLeft: `2px solid ${hovered ? "#3FD79A" : "rgba(63,215,154,.15)"}`,
        background: hovered ? "rgba(63,215,154,.06)" : "transparent",
        textDecoration: "none", transition: "all .12s",
      }}
    >
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: hovered ? "#E7EAEF" : "#C9D1D9", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
        {c.name}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#5B6472", whiteSpace: "nowrap", flexShrink: 0 }}>
        {c.issuer} · {c.date}
      </span>
      {/* PDF badge visible siempre, resaltado en hover */}
      <span style={{
        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em",
        color: hovered ? "#3FD79A" : "#5B6472",
        border: `1px solid ${hovered ? "rgba(63,215,154,.4)" : "#262C37"}`,
        borderRadius: 4, padding: "2px 6px", flexShrink: 0,
        transition: "all .12s",
      }}>
        PDF ↗
      </span>
    </a>
  );
}

function InProgressRow({ c }: { c: typeof certifications[0] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderLeft: "2px solid rgba(111,182,222,.15)", opacity: 0.65 }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "#C9D1D9", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
        {c.name}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#5B6472", whiteSpace: "nowrap", flexShrink: 0 }}>
        {c.issuer}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", color: "#6FB6DE", border: "1px solid #262C37", borderRadius: 20, padding: "2px 8px", whiteSpace: "nowrap", flexShrink: 0 }}>
        EN CURSO
      </span>
    </div>
  );
}

function CertificationsSection() {
  const obtained = certifications.filter(c => c.status === "obtenida");
  const inProgress = certifications.filter(c => c.status === "en_curso");

  const groups: Record<string, typeof certifications> = {};
  obtained.forEach(c => {
    if (!groups[c.category]) groups[c.category] = [];
    groups[c.category].push(c);
  });

  return (
    <section>
      <div style={{ ...W, padding: "44px 56px 32px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "1px solid #262C37", paddingBottom: 16, marginBottom: 8 }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 600, color: "#E7EAEF", margin: 0, letterSpacing: "-0.01em" }}>Certificaciones</h2>
          <Eyebrow>{obtained.length} obtenidas · {inProgress.length} en curso</Eyebrow>
        </div>

        {Object.entries(groups).map(([category, items]) => (
          <AccordionGroup key={category} label={category} count={items.length} items={items} />
        ))}

        {inProgress.length > 0 && (
          <AccordionGroup
            label="En curso · Objetivo 2026"
            count={inProgress.length}
            accentColor="#3FD79A"
            isInProgress
            items={inProgress}
          />
        )}
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div style={{ width: "100%", background: "#0E1116", color: "#E7EAEF", fontFamily: "var(--font-sans)" }}>
      <VisitCounter />

      {/* ── HEADER ── */}
      <header style={{ borderBottom: "1px solid #262C37" }}>
        <div style={{ ...W, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 56px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: 19, fontWeight: 600, color: "#E7EAEF" }}>Adrián Agüero</span>
            {/* A3: más visible, color intermedio */}
            <Eyebrow color="#8C95A3">Data Engineer</Eyebrow>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, color: "#3FD79A", display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 7, height: 7, borderRadius: 7, background: "#3FD79A", display: "inline-block", animation: "dotPulse 1.4s ease-in-out infinite" }} />
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
        </div>
      </header>

      {/* ── HERO ── */}
      <section>
        <div style={{ ...W, display: "grid", gridTemplateColumns: "0.82fr 1.5fr", gap: 44, padding: "56px 56px 48px", alignItems: "center" }}>
          {/* Left: identity */}
          <div>
            {/* A1: foto más grande */}
            <Image
              src="/adrian.png"
              alt="Adrián Agüero"
              width={172}
              height={172}
              style={{ borderRadius: 14, border: "1px solid rgba(63,215,154,.2)", marginBottom: 24, objectFit: "cover" }}
            />
            {/* A2: texto más descriptivo */}
            <Eyebrow color="#3FD79A">Buenos Aires · Data Engineer</Eyebrow>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 46, lineHeight: 1.08, fontWeight: 600, color: "#E7EAEF", letterSpacing: "-0.02em", margin: "16px 0 20px" }}>
              Pipelines de datos <span style={{ fontStyle: "italic", color: "#3FD79A" }}>confiables</span>.
            </h1>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 16.5, lineHeight: 1.65, color: "#8C95A3", margin: "0 0 26px" }}>
              +2 años manteniendo pipelines ETL end-to-end sobre Hadoop/Cloudera para 4 bancos del Grupo Petersen. Foco en calidad, trazabilidad e incidencias críticas.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid #262C37", paddingTop: 22 }}>
              {/* E: email como botón destacado */}
              <a
                href={`mailto:${profile.email}`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontFamily: "var(--font-mono)", fontSize: 13, color: "#3FD79A",
                  background: "rgba(63,215,154,.08)", border: "1px solid rgba(63,215,154,.25)",
                  borderRadius: 8, padding: "10px 14px", textDecoration: "none",
                  transition: "background .15s, border-color .15s",
                  width: "fit-content",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(63,215,154,.15)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(63,215,154,.5)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(63,215,154,.08)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(63,215,154,.25)"; }}
              >
                ✉ {profile.email}
              </a>
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
        </div>
      </section>

      {/* ── EXPERIENCIA ── */}
      <section>
        <div style={{ ...W, padding: "32px 56px 16px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "1px solid #262C37", paddingBottom: 16, marginBottom: 24 }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 600, color: "#E7EAEF", margin: 0, letterSpacing: "-0.01em" }}>Experiencia</h2>
            <Eyebrow>2023 — 2026</Eyebrow>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {experience.map((job) => <ExpCard key={job.id} job={job} />)}
          </div>
        </div>
      </section>

      {/* ── CERTIFICACIONES ── */}
      <CertificationsSection />

      {/* ── STACK ── D: interactividad con StackPill */}
      <section>
        <div style={{ ...W, padding: "44px 56px 16px" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 600, color: "#E7EAEF", margin: "0 0 24px", letterSpacing: "-0.01em", borderBottom: "1px solid #262C37", paddingBottom: 16 }}>Stack</h2>
          {([
            ["Lo que uso a diario", stack.core, true],
            ["Plataforma", stack.platform, false],
            ["En formación", stack.learning, false],
          ] as [string, string[], boolean][]).map(([title, items, accent]) => (
            <div key={title} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 24, padding: "16px 0", borderBottom: "1px solid #262C37" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600, color: accent ? "#C9D1D9" : "#8C95A3" }}>{title}</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {items.map((t) => <StackPill key={t} label={t} accent={accent} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── E: email como botón */}
      <footer style={{ marginTop: 44, borderTop: "1px solid #262C37", background: "#161A21" }}>
        <div style={{ ...W, padding: "48px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 600, color: "#E7EAEF", marginBottom: 14 }}>Hablemos.</div>
            <a
              href={`mailto:${profile.email}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "var(--font-mono)", fontSize: 13, color: "#3FD79A",
                background: "rgba(63,215,154,.08)", border: "1px solid rgba(63,215,154,.3)",
                borderRadius: 8, padding: "10px 16px", textDecoration: "none",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(63,215,154,.15)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(63,215,154,.08)"; }}
            >
              ✉ {profile.email}
            </a>
          </div>
          <div style={{ display: "flex", gap: 22 }}>
            {[["GitHub", profile.links.github], ["LinkedIn", profile.links.linkedin], ["CV", profile.links.cv]].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "#3FD79A", textDecoration: "none" }}>{label} ↗</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
