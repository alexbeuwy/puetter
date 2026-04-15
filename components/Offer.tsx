"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import TiltCard from "./TiltCard";

const FEATURES = [
  {
    title: "Positionierungs-Analyse",
    desc: "Wer du wirklich bist, für wen du wirklich arbeitest.",
  },
  {
    title: "Personal Brand Strategie",
    desc: "Sichtbarkeit, die ohne Performance-Druck funktioniert.",
  },
  {
    title: "Akquise-System",
    desc: "Anfragen, die vorbereitet ankommen. Keine Kaltstarts.",
  },
  {
    title: "AI-Integration",
    desc: "Prozesse und Hebel, die dir Zeit zurückgeben.",
  },
  {
    title: "Direkt-Feedback",
    desc: "Kein Kurs. Kein Forum. Direkte Antworten, wenn du sie brauchst.",
  },
];

function RaftIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M3 15 L21 15" />
      <path d="M3 18 L21 18" />
      <path d="M6 15 L6 4 M12 15 L12 2 M18 15 L18 4" />
      <path d="M12 2 L18 6" />
    </svg>
  );
}

export default function Offer() {
  return (
    <section
      id="kontakt"
      className="relative py-40 md:py-48 px-6 md:px-10 overflow-hidden"
      style={{ background: "var(--sand)" }}
    >
      <div className="relative mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Header */}
        <div className="md:col-span-12 mb-12 md:mb-20">
          <FadeIn>
            <span
              className="eyebrow"
              style={{ background: "var(--cream)", color: "var(--wood)" }}
            >
              Was wir zusammen bauen
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="h2 font-serif max-w-[22ch]">
              Kein Kurs. Kein Template-Paket.
              <br />
              <span className="font-serif-italic">
                Ein System, das zu dir passt.
              </span>
            </h2>
          </FadeIn>
        </div>

        {/* Left: features */}
        <div className="md:col-span-7 md:pr-10">
          <FadeIn delay={0.15}>
            <p
              className="max-w-[52ch] mb-12"
              style={{ color: "var(--wood)", lineHeight: 1.7 }}
            >
              Wir arbeiten direkt zusammen. Keine Templates, kein Copy-Paste.
              Was du bekommst, ist auf dich, deine Kunden und dein Tempo
              zugeschnitten.
            </p>
          </FadeIn>

          <ul className="space-y-2">
            {FEATURES.map((f, i) => (
              <motion.li
                key={f.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex items-start gap-5 py-5 border-b"
                style={{ borderColor: "rgba(92,61,46,0.18)" }}
              >
                <span
                  className="flex-shrink-0 mt-1"
                  style={{ color: "var(--wood)" }}
                >
                  <RaftIcon />
                </span>
                <div className="flex-1">
                  <div
                    className="font-serif-italic text-2xl"
                    style={{ color: "var(--text)" }}
                  >
                    {f.title}
                  </div>
                  <div
                    className="text-sm mt-1"
                    style={{ color: "var(--wood)", opacity: 0.75 }}
                  >
                    {f.desc}
                  </div>
                </div>
                <span
                  className="font-mono text-xs mt-2"
                  style={{ color: "var(--wood)", opacity: 0.5 }}
                >
                  0{i + 1}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right: CTA card */}
        <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
          <TiltCard className="relative" max={5} scale={1.008}>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-10 md:p-12"
              style={{
                background: "var(--white)",
                borderRadius: 32,
                border: "1px solid rgba(92,61,46,0.12)",
                boxShadow: "0 40px 80px -30px rgba(92,61,46,0.2)",
              }}
            >
            {/* Small animated dot */}
            <div className="flex items-center gap-2 mb-6">
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--water)" }}
              />
              <span
                className="text-[11px] tracking-widest uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                Freie Plätze Q2
              </span>
            </div>

            <h3 className="font-serif text-4xl md:text-5xl leading-[1.05] mb-5">
              Starte mit einem
              <br />
              <span className="font-serif-italic">Gespräch.</span>
            </h3>

            <p
              className="mb-8"
              style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
            >
              Kein Pitch. Kein Druck. Wenn's passt, reden wir weiter. Wenn
              nicht, weißt du trotzdem mehr als vorher.
            </p>

            <a
              href="mailto:hallo@puetter.de?subject=Gespr%C3%A4chsanfrage"
              className="btn-primary w-full justify-center"
            >
              Gespräch anfragen →
            </a>

            <div className="mt-6 flex items-center justify-between text-xs">
              {["Kostenlos", "Unverbindlich", "Max. 30 Min"].map((label) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="var(--water)"
                    strokeWidth="2"
                  >
                    <path d="M2 6 L5 9 L10 3" />
                  </svg>
                  {label}
                </span>
              ))}
            </div>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
