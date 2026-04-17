"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FadeIn from "./FadeIn";

const PAIN_CARDS = [
  {
    icon: "https://beuwy.com/wp-content/uploads/2025/11/Audit-Lupe-uai-258x258.webp",
    title: "Skills? Hast du.",
    body: "Expertise, Netzwerk, Erfahrung — die Bretter sind da. Du bist kein Anfänger. Du lieferst seit Jahren.",
  },
  {
    icon: "https://beuwy.com/wp-content/uploads/2025/11/Audit-Lupe-uai-258x258.webp",
    title: "Trotzdem: jeden Monat neu.",
    body: "Woher kommt der nächste Kunde? Wann? Du postest, du networkst, du hoffst. Planbar sieht anders aus.",
  },
  {
    icon: "https://beuwy.com/wp-content/uploads/2025/11/Audit-Lupe-uai-258x258.webp",
    title: "Tools? Auch da.",
    body: "ChatGPT, Zapier, LinkedIn Automation. Die Tools hat jeder. Was fehlt, ist das System, das sie zusammenbringt.",
  },
];

export default function PainSection() {
  return (
    <section
      id="story"
      className="relative py-28 md:py-40 px-6 md:px-10 overflow-hidden"
      style={{ background: "var(--white)" }}
    >
      {/* Decorative oversized background word */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
        className="absolute -right-10 top-20 font-serif-italic pointer-events-none select-none"
        style={{
          fontSize: "clamp(200px, 30vw, 480px)",
          color: "var(--wood)",
          lineHeight: 0.8,
        }}
      >
        genug.
      </motion.span>

      <div className="relative mx-auto max-w-[1400px]">
        {/* Header — asymmetric left */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="md:col-start-2 md:col-span-7">
            <FadeIn>
              <span className="eyebrow">Das kennen wir beide</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="h2 font-serif max-w-[18ch]">
                Die meisten haben genug Bretter.
                <br />
                <span className="font-serif-italic" style={{ color: "var(--wood)" }}>
                  Sie schwimmen nur noch daneben.
                </span>
              </h2>
            </FadeIn>
          </div>
        </div>

        {/* Pain cards — zig-zag asymmetric, NOT a 3-col grid */}
        <div className="space-y-5 md:space-y-4">
          {PAIN_CARDS.map((card, i) => {
            const offsets = [
              "md:ml-0 md:mr-[22%]",
              "md:ml-[18%] md:mr-[4%]",
              "md:ml-[32%] md:mr-0",
            ];
            return (
              <motion.div
                key={card.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -3 }}
                className={`group ${offsets[i]}`}
              >
                <div
                  className="flex items-start gap-6 md:gap-8 p-6 md:p-8 rounded-2xl md:rounded-3xl"
                  style={{
                    background: "var(--cream)",
                    border: "1px solid rgba(140,146,160,0.3)",
                    transition: "border-color 300ms ease",
                  }}
                >
                  {/* 3D Icon placeholder */}
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden flex items-center justify-center"
                    style={{ background: "var(--sand)" }}
                  >
                    <Image
                      src={card.icon}
                      alt=""
                      width={64}
                      height={64}
                      className="w-10 h-10 md:w-12 md:h-12 object-contain"
                      unoptimized
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-serif text-xl md:text-2xl mb-2"
                      style={{ color: "var(--text)" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-sm md:text-base leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {card.body}
                    </p>
                  </div>

                  <span
                    className="hidden md:block flex-shrink-0 font-mono text-xs mt-1"
                    style={{ color: "var(--rope)" }}
                  >
                    0{i + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pull quote */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-16 md:mt-24">
          <div className="md:col-start-2 md:col-span-8">
            <FadeIn delay={0.1}>
              <div className="flex items-start gap-6">
                <div
                  className="hidden md:block flex-shrink-0 w-[4px] self-stretch rounded-full"
                  style={{ background: "var(--wood)" }}
                />
                <p
                  className="font-serif-italic max-w-[22ch]"
                  style={{
                    fontSize: "clamp(28px, 4vw, 44px)",
                    lineHeight: 1.15,
                    color: "var(--text)",
                    borderLeft: "4px solid var(--wood)",
                    paddingLeft: 20,
                  }}
                >
                  Bretter sind kein Floß.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
