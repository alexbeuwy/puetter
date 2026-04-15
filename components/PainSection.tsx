"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

export default function PainSection() {
  return (
    <section
      id="story"
      className="relative py-40 md:py-48 px-6 md:px-10 overflow-hidden"
      style={{ background: "var(--white)" }}
    >
      {/* Asymmetric layout — text left-offset, decorative serif right */}
      <div className="relative mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Decorative oversized background word */}
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.06 }}
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

        <div className="md:col-start-2 md:col-span-7 relative">
          <FadeIn>
            <span className="eyebrow">Das kennen wir beide</span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="h2 font-serif mb-14 max-w-[18ch]">
              Die meisten haben genug Bretter.
              <br />
              <span className="font-serif-italic" style={{ color: "var(--wood)" }}>
                Sie schwimmen nur noch daneben.
              </span>
            </h2>
          </FadeIn>

          <div className="max-w-[60ch] space-y-8">
            <FadeIn delay={0.15}>
              <p>
                Design-Skill? <strong>Hast du.</strong>
                <br />
                Sales-Talent? <strong>Auch.</strong>
                <br />
                Erfahrung, Netzwerk, Ideen? <strong>Alles da.</strong>
              </p>
            </FadeIn>

            <FadeIn delay={0.22}>
              <p>
                Und trotzdem: Jeden Monat wieder das gleiche Spiel. Woher kommt
                der nächste Kunde? Wann? Kommt er überhaupt?
              </p>
            </FadeIn>

            <FadeIn delay={0.28}>
              <p>
                Du postest. Du networkst. Du hoffst. Manchmal läuft's. Manchmal
                nicht. <strong>Planbar sieht anders aus.</strong>
              </p>
            </FadeIn>

            <FadeIn delay={0.34}>
              <p>
                Das Problem ist nicht was du kannst.
                <br />
                Das Problem ist, dass deine Skills noch kein System sind.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.42}>
            <p className="pull-quote mt-16 max-w-[20ch]">
              Bretter sind kein Floß.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
