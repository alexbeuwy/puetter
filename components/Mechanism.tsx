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
};

const PILLARS: Pillar[] = [
  {
    num: "01",
    title: "Das Ruder",
    subtitle: "Positionierung & Klarheit",
    body: "Wer du bist, für wen, und warum ausgerechnet du? Solange das nicht sitzt, verpufft alles andere. Jedes Tool, jedes Posting, jeder Pitch — ohne Richtung nur Lärm.",
    badge: "Du erklärst in 30 Sek. was du tust",
  },
  {
    num: "02",
    title: "Das Fundament",
    subtitle: "Brand & Content-System",
    body: "Deine Sichtbarkeit läuft im Hintergrund. Content, der nach dir klingt — nicht nach einem Prompt. Arbeitet, wenn du schläfst.",
    badge: "Kunden kommen vorbereitet",
  },
  {
    num: "03",
    title: "Der Motor",
    subtitle: "Planbare Akquise",
    body: "Wenn Ruder und Fundament stehen, macht Geschwindigkeit Sinn. Lead-Qualifizierung, Sequenzen, Pipeline — systematisch.",
    badge: "Planbare Anfragen. Kein Zufall.",
  },
];

export default function Mechanism() {
  return (
    <section
      className="relative py-28 md:py-40 px-6 md:px-10 overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      <div className="relative mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="md:col-start-2 md:col-span-7">
            <FadeIn>
              <span className="eyebrow">Wie es funktioniert</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="h2 font-serif leading-[1.05] max-w-[20ch]">
                Drei Dinge.
                <br />
                In dieser Reihenfolge.
                <br />
                <span className="font-serif-italic" style={{ color: "var(--wood)" }}>
                  Immer.
                </span>
              </h2>
            </FadeIn>
          </div>
        </div>

        {/* Bento grid: first card large (2/3), second + third stacked (1/3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* Card 1 — large, spans 2 cols */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="relative md:col-span-2 md:row-span-2 p-8 md:p-12 rounded-3xl flex flex-col justify-between overflow-hidden"
            style={{
              background: "var(--wood)",
              border: "1px solid rgba(255,255,255,0.06)",
              minHeight: "420px",
              color: "var(--cream)",
            }}
          >
            {/* Hologram shader bleed in the top-right corner */}
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-[420px] h-[420px] pointer-events-none"
              style={{
                opacity: 0.7,
                maskImage:
                  "radial-gradient(circle at center, rgba(0,0,0,1) 0%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, rgba(0,0,0,1) 0%, transparent 70%)",
              }}
            >
              <LiquidGradient speed={0.18} scale={0.25} amplitude={0.5} />
            </div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div
                  className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{ background: "var(--sand)" }}
                >
                  <Image
                    src={ICON}
                    alt=""
                    width={64}
                    height={64}
                    className="w-10 h-10 object-contain"
                    unoptimized
                  />
                </div>
                <span
                  className="font-serif-italic leading-none"
                  style={{ fontSize: 72, color: "var(--rope)", opacity: 0.3 }}
                >
                  {PILLARS[0].num}
                </span>
              </div>
              <h3
                className="mb-2"
                style={{
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  color: "var(--cream)",
                  letterSpacing: "-0.03em",
                  fontWeight: 500,
                }}
              >
                {PILLARS[0].title}
              </h3>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.22em] mb-5"
                style={{ color: "var(--voltage)" }}
              >
                {PILLARS[0].subtitle}
              </p>
              <p
                className="max-w-[50ch] leading-relaxed"
                style={{ color: "rgba(244,245,248,0.7)" }}
              >
                {PILLARS[0].body}
              </p>
            </div>
            <div
              className="relative z-10 mt-8 inline-flex items-center gap-2 self-start px-4 py-2.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "var(--cream)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--wood)" }}
              />
              <span className="text-xs font-medium">{PILLARS[0].badge}</span>
            </div>
          </motion.div>

          {/* Cards 2 + 3 — stacked right, each 1 col */}
          {PILLARS.slice(1).map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: 0.1 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="p-6 md:p-8 rounded-3xl flex flex-col justify-between"
              style={{
                background: "var(--white)",
                border: "1px solid rgba(196,168,130,0.3)",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center"
                    style={{ background: "var(--sand)" }}
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
                    className="font-serif-italic text-4xl leading-none"
                    style={{ color: "var(--rope)", opacity: 0.3 }}
                  >
                    {p.num}
                  </span>
                </div>
                <h3
                  className="font-serif text-2xl md:text-3xl mb-1"
                  style={{ color: "var(--text)" }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{ color: "var(--rope)" }}
                >
                  {p.subtitle}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {p.body}
                </p>
              </div>
              <div
                className="mt-5 inline-flex items-center gap-2 self-start px-3 py-2 rounded-full"
                style={{ background: "var(--sand)", color: "var(--text)" }}
              >
                <span className="text-[11px] font-medium">{p.badge}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
