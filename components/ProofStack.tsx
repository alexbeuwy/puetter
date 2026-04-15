"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import FadeIn from "./FadeIn";

const KPIS = [
  { number: "7+ Jahre", label: "Ausschließlich auf Empfehlung" },
  { number: "300k+", label: "Als Einzelperson, Studentenwohnung" },
  { number: "0", label: "Cold Outreach. Nie gebraucht." },
  { number: "2017", label: "Gegründet. Noch immer dabei." },
];

const TESTIMONIALS = [
  {
    quote:
      "Ich hatte das Gefühl, dass wir zum ersten Mal wirklich wussten, für wen wir da sind. Drei Wochen später hatte ich mehr Anfragen als im Quartal davor.",
    name: "Marlene Kopp",
    role: "Gründerin, Studio Niederrhein",
    city: "Düsseldorf",
  },
  {
    quote:
      "Kein Pitch, kein Druck. Ich hab gemerkt: Der versteht mein Business besser als ich selbst. Nach zwei Monaten war das Akquise-Thema vom Tisch.",
    name: "Tobias Reiner",
    role: "Gründer, Reiner & Co.",
    city: "München",
  },
  {
    quote:
      "Wir hatten vorher keine Richtung. Nur viel Arbeit. Heute kommen die richtigen Kunden von selbst — weil sie vorher schon verstanden haben, was wir tun.",
    name: "Johanna Albers",
    role: "Geschäftsführerin, Albers Ventures",
    city: "Hamburg",
  },
];

export default function ProofStack() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="referenzen"
      className="relative py-40 md:py-48 px-6 md:px-10 overflow-hidden"
      style={{ background: "var(--wood)", color: "var(--white)" }}
    >
      {/* Soft glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(196,168,130,0.18) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-start-2 md:col-span-8">
            <FadeIn>
              <span
                className="eyebrow"
                style={{ background: "rgba(245,237,216,0.08)", color: "var(--rope)" }}
              >
                Zahlen, keine Versprechen
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2
                className="h2 font-serif max-w-[20ch]"
                style={{ color: "var(--white)" }}
              >
                Was herauskommt,
                <br />
                <span className="font-serif-italic" style={{ color: "var(--cream)" }}>
                  wenn das System steht.
                </span>
              </h2>
            </FadeIn>
          </div>
        </div>

        {/* KPIs — asymmetric split, not a clean 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-14 gap-x-8 mb-28 md:mb-40">
          {KPIS.map((k, i) => {
            const spans = [
              "md:col-start-2 md:col-span-5",
              "md:col-start-8 md:col-span-4",
              "md:col-start-3 md:col-span-4",
              "md:col-start-8 md:col-span-4",
            ];
            return (
              <motion.div
                key={k.label}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={spans[i]}
              >
                <div
                  className="border-t pb-2 pt-6"
                  style={{ borderColor: "rgba(196,168,130,0.3)" }}
                >
                  <div
                    className="font-serif-italic leading-none"
                    style={{
                      fontSize: "clamp(56px, 7vw, 88px)",
                      color: "var(--cream)",
                    }}
                  >
                    {k.number}
                  </div>
                  <div
                    className="mt-3 text-sm"
                    style={{ color: "var(--rope)" }}
                  >
                    {k.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonial slider */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-start-2 md:col-span-10 relative min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="var(--rope)"
                  strokeWidth="1.5"
                  className="mb-4"
                >
                  <path d="M10 22 C6 22 4 19 4 15 C4 10 8 6 14 6" />
                  <path d="M24 22 C20 22 18 19 18 15 C18 10 22 6 28 6" />
                </svg>
                <p
                  className="font-serif-italic max-w-[40ch]"
                  style={{
                    fontSize: "clamp(22px, 2.4vw, 30px)",
                    lineHeight: 1.35,
                    color: "var(--cream)",
                  }}
                >
                  "{TESTIMONIALS[idx].quote}"
                </p>
                <div
                  className="mt-8 flex items-center gap-3 text-sm"
                  style={{ color: "var(--rope)" }}
                >
                  <span style={{ color: "var(--cream)" }}>
                    {TESTIMONIALS[idx].name}
                  </span>
                  <span
                    className="w-6 h-[1px]"
                    style={{ background: "var(--rope)" }}
                  />
                  <span>
                    {TESTIMONIALS[idx].role} · {TESTIMONIALS[idx].city}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex gap-3 mt-10">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className="h-[2px] rounded-full transition-all"
                  style={{
                    width: i === idx ? 40 : 16,
                    background: i === idx ? "var(--cream)" : "rgba(196,168,130,0.4)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
