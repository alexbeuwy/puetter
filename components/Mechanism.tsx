"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

type Pillar = {
  num: string;
  title: string;
  subtitle: string;
  body: string;
  badge: string;
  icon: React.ReactNode;
};

const PILLARS: Pillar[] = [
  {
    num: "01",
    title: "Das Ruder",
    subtitle: "Positionierung & Klarheit",
    body: "Wer bist du, für wen, und warum ausgerechnet du? Solange das nicht sitzt, verpufft alles andere.",
    badge: "Du erklärst in 30 Sek. was du tust",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 32 L32 4" />
        <circle cx="8" cy="28" r="4" />
        <path d="M24 4 L32 4 L32 12" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Das Fundament",
    subtitle: "Personal Brand & System",
    body: "Deine Sichtbarkeit, deine Referenzen, dein Prozess. Läuft im Hintergrund. Arbeitet wenn du schläfst.",
    badge: "Kunden kommen vorbereitet",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 4 L18 22" />
        <path d="M10 22 Q18 32 26 22" />
        <path d="M14 12 L22 12" />
        <circle cx="18" cy="28" r="2" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Der Motor",
    subtitle: "Planbare Akquise",
    body: "Wenn Ruder und Fundament stehen, macht Geschwindigkeit Sinn. Vorher ist es nur schneller verloren.",
    badge: "Planbare Anfragen. Kein Zufall.",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 4 L8 22 L16 22 L14 32 L27 12 L19 12 Z" />
      </svg>
    ),
  },
];

export default function Mechanism() {
  return (
    <section
      className="relative py-40 md:py-48 px-6 md:px-10 overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      <div className="relative mx-auto max-w-[1400px]">
        {/* Header — asymmetric, left-aligned */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 md:mb-28">
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
          <div className="md:col-span-3 md:flex md:items-end">
            <FadeIn delay={0.2}>
              <p
                className="text-sm max-w-[30ch]"
                style={{ color: "var(--text-muted)" }}
              >
                Keine Abkürzung. Kein Hack. Die Reihenfolge entscheidet, ob das
                Ganze trägt oder auseinanderfällt.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Zig-zag asymmetric layout instead of 3 equal cards */}
        <div className="space-y-8 md:space-y-6">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.num} pillar={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  // Asymmetric stacking — each card is offset horizontally
  const offsets = ["md:ml-0 md:mr-[20%]", "md:ml-[15%] md:mr-[5%]", "md:ml-[30%] md:mr-0"];

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      className={`group relative ${offsets[index]}`}
    >
      <div
        className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 p-8 md:p-12"
        style={{
          background: "var(--white)",
          borderRadius: 24,
          border: "1px solid rgba(196, 168, 130, 0.35)",
          transition: "border-color 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Number — huge, serif italic */}
        <div className="md:col-span-3 flex md:flex-col md:justify-between gap-6">
          <span
            className="font-serif-italic leading-none"
            style={{
              fontSize: "clamp(64px, 8vw, 112px)",
              color: "var(--rope)",
            }}
          >
            {pillar.num}
          </span>
          <div style={{ color: "var(--wood)" }} className="md:mt-auto">
            {pillar.icon}
          </div>
        </div>

        <div className="md:col-span-6">
          <h3 className="font-serif text-3xl md:text-4xl mb-2">
            {pillar.title}
          </h3>
          <p
            className="text-sm mb-5 tracking-wide uppercase"
            style={{ color: "var(--rope)", letterSpacing: "0.05em" }}
          >
            {pillar.subtitle}
          </p>
          <p style={{ color: "var(--text)", lineHeight: 1.7 }}>{pillar.body}</p>
        </div>

        <div className="md:col-span-3 flex md:items-end md:justify-end">
          <div
            className="inline-flex items-center gap-2 px-4 py-3 rounded-full max-w-full"
            style={{
              background: "var(--sand)",
              color: "var(--wood)",
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
              style={{ background: "var(--wood)" }}
            />
            <span className="text-xs font-medium">{pillar.badge}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
