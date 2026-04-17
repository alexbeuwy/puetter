"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import FadeIn from "./FadeIn";

const ITEMS = [
  {
    q: "Für wen ist das überhaupt?",
    a: "Für Selbstständige und Unternehmer, die schon liefern können — Designer, Berater, Agenturen, Coaches, Developer — und die von Skills zu System wollen. Nicht für Anfänger, die mal eben ein Business probieren wollen.",
  },
  {
    q: "Was kostet es?",
    a: "Die Preise hängen davon ab, wo du heute stehst und was wir konkret aufbauen. Im ersten Gespräch klären wir das — und ich sage dir direkt, ob es sich für dich lohnt. Kein Druck, kein Pitch.",
  },
  {
    q: "Wie lange dauert das?",
    a: "Minimum 3 Monate. Nicht weil ich dich lange binden will, sondern weil ein System Zeit braucht, bis es läuft. Quick Fixes gibt es genug woanders.",
  },
  {
    q: "Warum ausgerechnet du?",
    a: "Weil ich das, was ich zeige, selbst gebaut habe — als Operator, nicht als Berater. Sieben Jahre solo, 300k aus einer Studentenwohnung, später eine Agentur bis 15 Leute und wieder zurück. Kein Funnel, kein Cold Outreach, kein Kurs-Portfolio. Und weil ich regelmäßig Nein sage, wenn wir nicht zusammenpassen.",
  },
  {
    q: "Kommt da noch ein Kurs oder eine Gruppe?",
    a: "Nein. Keine Kohorte, kein Mastermind, kein Membership. Der Grund ist einfach: Das, was hier funktioniert, funktioniert nicht in Gruppen. Wenn du den nächstgünstigeren Einstieg willst, gibt es in Deutschland genug gute Adressen. Hier ist nur 1:1.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="relative py-40 md:py-48 px-6 md:px-10"
      style={{ background: "var(--white)" }}
    >
      <div className="relative mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-10">
        <aside className="md:col-start-2 md:col-span-3">
          <FadeIn>
            <div
              className="text-[11px] tracking-[0.2em] uppercase mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              Fragen & Antworten
            </div>
            <h2 className="h2 font-serif leading-[1.05] max-w-[14ch]">
              Was du gerade denkst —
              <br />
              <span className="font-serif-italic">und was ich sage.</span>
            </h2>
          </FadeIn>
        </aside>

        <div className="md:col-span-7">
          <ul className="divide-y" style={{ borderColor: "rgba(140,146,160,0.3)" }}>
            {ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={item.q}
                  style={{ borderBottom: "1px solid rgba(140,146,160,0.3)" }}
                >
                  <FadeIn delay={i * 0.06}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-6 py-7 text-left"
                      aria-expanded={isOpen}
                    >
                      <span
                        className="font-medium pr-4"
                        style={{ fontSize: 20, color: "var(--text)" }}
                      >
                        {item.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 18 }}
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full"
                        style={{
                          border: "1px solid var(--rope)",
                          color: "var(--wood)",
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M6 1 L6 11 M1 6 L11 6" />
                        </svg>
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p
                            className="pb-8 pr-10 max-w-[60ch]"
                            style={{ color: "var(--text-muted)", lineHeight: 1.75 }}
                          >
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </FadeIn>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
