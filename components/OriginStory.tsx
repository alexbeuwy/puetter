"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "./FadeIn";
import LogoMark from "./LogoMark";

const ICON = "https://beuwy.com/wp-content/uploads/2025/11/Audit-Lupe-uai-258x258.webp";

const MILESTONES = [
  {
    year: "2017",
    title: "50 Euro für eine Website.",
    body: "Studentenwohnung in Bochum. Kein Startkapital, kein Netzwerk, kein Plan B.",
  },
  {
    year: "650 €",
    title: "Empfehlung für Empfehlung.",
    body: "Zweiter Kunde per Mundpropaganda. Dritter auch. Preis stieg. Ohne Cold Call.",
  },
  {
    year: "300k",
    title: "Als Einzelperson.",
    body: "Aus derselben Wohnung heraus. Ohne Agentur, ohne Sales-Team, ohne Funnels.",
  },
  {
    year: "15",
    title: "Mitarbeiter. Und zurück.",
    body: "Agentur gegründet, skaliert — und gemerkt: Wachstum um jeden Preis ist nicht der Weg.",
  },
  {
    year: "Jetzt",
    title: "System statt Agentur.",
    body: "Alles was ich dir zeige, ist das was funktioniert hat. Nicht die Theorie. Das System.",
  },
];

export default function OriginStory() {
  return (
    <section
      id="ueber-mich"
      className="relative py-28 md:py-40 px-6 md:px-10 overflow-hidden"
      style={{ background: "var(--white)" }}
    >
      <div className="relative mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="md:col-start-2 md:col-span-8">
            <FadeIn>
              <span className="eyebrow">Warum ich das überhaupt weiß</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="h2 font-serif-italic max-w-[24ch]">
                Ich hab mal mit zitternden Händen Zahnärzte angerufen.
              </h2>
            </FadeIn>
          </div>
        </div>

        {/* Timeline — center line with milestones alternating */}
        <div className="relative">
          {/* Vertical line — center on desktop, left on mobile */}
          <div
            className="absolute top-0 bottom-0 left-5 md:left-1/2 md:-translate-x-1/2 w-px"
            style={{ background: "rgba(196,168,130,0.4)" }}
          />

          <div className="space-y-10 md:space-y-16">
            {MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  initial={{ y: 40, opacity: 0, x: isLeft ? -20 : 20 }}
                  whileInView={{ y: 0, opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pl-14 md:pl-0`}
                >
                  {/* Dot on the timeline */}
                  <div
                    className="absolute left-5 md:left-1/2 top-0 w-2.5 h-2.5 rounded-full -translate-x-1/2 z-10"
                    style={{ background: "var(--wood)" }}
                  />

                  {/* Content: alternates side on desktop */}
                  <div
                    className={`${
                      isLeft
                        ? "md:col-start-1 md:text-right md:pr-12"
                        : "md:col-start-2 md:pl-12"
                    }`}
                  >
                    <div className="flex items-start gap-4 md:gap-5">
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center ${
                          isLeft ? "md:order-last" : ""
                        }`}
                        style={{ background: "var(--sand)" }}
                      >
                        <Image
                          src={ICON}
                          alt=""
                          width={44}
                          height={44}
                          className="w-7 h-7 object-contain"
                          unoptimized
                        />
                      </div>

                      <div className="flex-1">
                        {/* Year badge */}
                        <span
                          className="font-serif-italic block mb-1"
                          style={{
                            fontSize: "clamp(32px, 4vw, 52px)",
                            color: "var(--wood)",
                            lineHeight: 1,
                          }}
                        >
                          {m.year}
                        </span>
                        <h3
                          className="font-serif text-xl md:text-2xl mb-2"
                          style={{ color: "var(--text)" }}
                        >
                          {m.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {m.body}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Empty column for the alternating side */}
                  {isLeft ? (
                    <div className="hidden md:block md:col-start-2" />
                  ) : (
                    <div className="hidden md:block md:col-start-1 md:row-start-1" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pull quote + author */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-20 md:mt-28">
          <div className="md:col-start-3 md:col-span-8">
            <FadeIn delay={0.1}>
              <blockquote
                className="font-serif-italic max-w-[26ch]"
                style={{
                  fontSize: "clamp(26px, 3.5vw, 40px)",
                  lineHeight: 1.2,
                  color: "var(--wood)",
                  borderLeft: "4px solid var(--wood)",
                  paddingLeft: 24,
                }}
              >
                Wachstum und Geld um jeden Preis ist nicht der Weg.
              </blockquote>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-10 flex items-center gap-5">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center"
                  style={{
                    background: "var(--sand)",
                    border: "1px solid rgba(196,168,130,0.4)",
                    color: "var(--wood)",
                  }}
                >
                  <LogoMark className="h-8 w-auto" />
                </div>
                <div>
                  <div className="font-medium" style={{ color: "var(--text)" }}>
                    Pütter
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Operator · Seit 2017
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
