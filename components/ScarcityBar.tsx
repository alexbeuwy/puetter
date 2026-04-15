"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import useMeasure from "react-use-measure";

// DACH market reality: urgency theater ("2 seats left!") erodes trust
// with successful entrepreneurs. Reframed as selectivity — the cap is
// a statement about craft, not a countdown.
const ITEMS = [
  "Arbeit auf Empfehlung, seit 2017",
  "Bewerbung statt Buchung",
  "Maximal vier Kunden pro Quartal",
  "Keine Cold Outreach. Keine Ads.",
  "Nicht alles lässt sich skalieren",
  "Handwerk vor Volumen",
];

/**
 * Infinite marquee that measures its own width to decide how often
 * the content needs to be repeated for a seamless loop.
 */
export default function ScarcityBar() {
  const [measureRef, bounds] = useMeasure();

  // Duplicate content enough times to cover viewport + 1 pass
  const copies = useMemo(() => {
    if (!bounds.width) return 2;
    return Math.max(2, Math.ceil(1400 / Math.max(400, bounds.width / 2)) + 1);
  }, [bounds.width]);

  return (
    <section
      aria-label="Arbeitsweise und Selektivität"
      className="relative py-6 overflow-hidden"
      style={{
        background: "var(--wood)",
        color: "var(--cream)",
        borderTop: "1px solid rgba(196,168,130,0.2)",
        borderBottom: "1px solid rgba(196,168,130,0.2)",
      }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: Math.max(30, bounds.width / 40 || 45),
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex whitespace-nowrap"
      >
        <div ref={measureRef} className="flex items-center">
          {Array.from({ length: copies }).flatMap((_, c) =>
            ITEMS.map((item, i) => (
              <span
                key={`${c}-${i}`}
                className="flex items-center gap-5 pr-10"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--water)" }}
                />
                <span className="font-serif-italic text-xl md:text-2xl">
                  {item}
                </span>
              </span>
            )),
          )}
        </div>
        <div aria-hidden className="flex items-center">
          {Array.from({ length: copies }).flatMap((_, c) =>
            ITEMS.map((item, i) => (
              <span
                key={`dup-${c}-${i}`}
                className="flex items-center gap-5 pr-10"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--water)" }}
                />
                <span className="font-serif-italic text-xl md:text-2xl">
                  {item}
                </span>
              </span>
            )),
          )}
        </div>
      </motion.div>
    </section>
  );
}
