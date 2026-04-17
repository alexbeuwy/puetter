"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "./FadeIn";
import LiquidGradient from "./LiquidGradient";

const ICON = "https://beuwy.com/wp-content/uploads/2025/11/Audit-Lupe-uai-258x258.webp";

type Pillar = {
  num: string;
  title: string;
  subtitle: string;
  body: string;
  badge: string;
  featured?: boolean;
};

const PILLARS: Pillar[] = [
  {
    num: "01",
    title: "Das Ruder",
    subtitle: "Positionierung & Klarheit",
    body: "Wer du bist, für wen, und warum ausgerechnet du. Solange das nicht sitzt, verpufft alles andere. Jedes Tool, jedes Posting, jeder Pitch — ohne Richtung nur Lärm.",
    badge: "Du erklärst in 30 Sek. was du tust",
    featured: true,
  },
  {
    num: "02",
    title: "Das Fundament",
    subtitle: "Brand & Content-System",
    body: "Sichtbarkeit läuft im Hintergrund. Content, der nach dir klingt — nicht nach einem Prompt. Arbeitet, wenn du schläfst.",
    badge: "Kunden kommen vorbereitet",
  },
  {
    num: "03",
    title: "Der Motor",
    subtitle: "Planbare Akquise",
    body: "Wenn Ruder und Fundament stehen, macht Tempo Sinn. Lead-Qualifizierung, Sequenzen, Pipeline — systematisch.",
    badge: "Planbare Anfragen. Kein Zufall.",
  },
];

/**
 * Framer /design-style layout:
 *   Left column  — ONE big headline + support text (sticky on desktop)
 *   Right column — stacked cards (3), featured first card oversized
 * Consistent rhythm, consulting-clean.
 */
export default function Mechanism() {
  return (
    <section
      id="system"
      className="relative py-28 md:py-40 px-6 md:px-10"
      style={{ background: "var(--white)" }}
    >
      <div className="relative mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        {/* LEFT: one headline, sticky */}
        <div className="md:col-start-2 md:col-span-5 md:sticky md:top-28 md:self-start md:pt-8">
          <FadeIn>
            <span className="eyebrow">Das System</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              className="h2 mt-4"
              style={{
                color: "var(--text)",
                letterSpacing: "-0.035em",
                fontWeight: 600,
                lineHeight: 1.02,
              }}
            >
              Drei Hebel.
              <br />
              In einer festen
              <br />
              <span
                className="font-serif"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                }}
              >
                Reihenfolge.
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.18}>
            <p
              className="mt-8 max-w-[46ch]"
              style={{
                color: "var(--text-muted)",
                lineHeight: 1.55,
                fontSize: 17,
              }}
            >
              Kein Baukasten. Kein Funnel-Template. Drei aufeinander
              aufbauende Schritte, die jeder seriöse Operator kennt — aber
              die meisten in falscher Reihenfolge angehen.
            </p>
          </FadeIn>

          <FadeIn delay={0.26}>
            <div
              className="mt-10 flex items-center gap-3 pt-6"
              style={{ borderTop: "1px solid rgba(10,12,20,0.08)" }}
            >
              <span
                className="font-mono text-[11px] tracking-[0.22em] uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                01 · 02 · 03
              </span>
              <span
                className="font-mono text-[11px] tracking-[0.22em] uppercase ml-auto"
                style={{ color: "var(--text-muted)" }}
              >
                in dieser Reihenfolge
              </span>
            </div>
          </FadeIn>
        </div>

        {/* RIGHT: stacked cards */}
        <div className="md:col-span-5 flex flex-col gap-4">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.num} pillar={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const isFeatured = pillar.featured;

  return (
    <motion.article
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -3 }}
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: isFeatured ? "#0a0c14" : "var(--white)",
        border: isFeatured
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(10,12,20,0.08)",
        boxShadow: isFeatured
          ? "0 30px 60px -20px rgba(10,12,20,0.25)"
          : "0 4px 12px -4px rgba(10,12,20,0.06)",
        color: isFeatured ? "var(--cream)" : "var(--text)",
      }}
    >
      {isFeatured && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: 0.9 }}
          >
            <LiquidGradient
              speed={0.21}
              scale={0.15}
              softness={0.51}
              intensity={0.6}
              noise={0.05}
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(160deg, rgba(10,12,20,0.88) 0%, rgba(10,12,20,0.55) 45%, rgba(10,12,20,0.15) 100%)",
            }}
          />
        </>
      )}

      <div className="relative z-10 p-7 md:p-9">
        {/* Top row: icon + number */}
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center"
            style={{
              background: isFeatured ? "rgba(255,255,255,0.08)" : "var(--sand)",
              border: isFeatured
                ? "1px solid rgba(255,255,255,0.15)"
                : "none",
            }}
          >
            <Image
              src={ICON}
              alt=""
              width={48}
              height={48}
              className="w-8 h-8 object-contain"
              unoptimized
            />
          </div>
          <span
            className="font-mono text-[11px] tracking-[0.22em]"
            style={{
              color: isFeatured
                ? "rgba(244,245,248,0.5)"
                : "var(--text-muted)",
            }}
          >
            {pillar.num}
          </span>
        </div>

        {/* Title */}
        <h3
          className="mb-1"
          style={{
            fontSize: isFeatured
              ? "clamp(26px, 2.6vw, 36px)"
              : "clamp(22px, 2vw, 28px)",
            letterSpacing: "-0.03em",
            fontWeight: 600,
            color: isFeatured ? "var(--cream)" : "var(--text)",
            lineHeight: 1.05,
          }}
        >
          {pillar.title}
        </h3>

        {/* Subtitle */}
        <p
          className="font-mono text-[11px] uppercase tracking-[0.22em] mb-4"
          style={{
            color: isFeatured ? "var(--voltage)" : "var(--text-muted)",
          }}
        >
          {pillar.subtitle}
        </p>

        {/* Body */}
        <p
          className="mb-6 max-w-[52ch]"
          style={{
            color: isFeatured
              ? "rgba(244,245,248,0.75)"
              : "var(--text-muted)",
            lineHeight: 1.6,
            fontSize: 15,
          }}
        >
          {pillar.body}
        </p>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full"
          style={{
            background: isFeatured
              ? "rgba(255,255,255,0.08)"
              : "rgba(10,12,20,0.05)",
            border: isFeatured
              ? "1px solid rgba(255,255,255,0.15)"
              : "1px solid rgba(10,12,20,0.08)",
            color: isFeatured ? "var(--cream)" : "var(--text)",
            backdropFilter: isFeatured ? "blur(10px)" : "none",
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: isFeatured ? "var(--voltage)" : "var(--text)",
            }}
          />
          <span className="text-[11px] font-medium tracking-tight">
            {pillar.badge}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
