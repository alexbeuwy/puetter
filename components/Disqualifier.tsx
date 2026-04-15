"use client";

import FadeIn from "./FadeIn";

const NOT_FOR = [
  "Du suchst Abkürzung ohne Arbeit",
  "Du glaubst ein besseres Logo reicht",
  "Du kannst keine Entscheidungen treffen",
];

const FOR = [
  "Du weißt, dass du mehr draufhast",
  "Du stellst Klarheit über Komfort",
  "Du willst planbar wachsen — nicht viral",
];

export default function Disqualifier() {
  return (
    <section
      className="relative py-40 md:py-48 px-6 md:px-10"
      style={{ background: "var(--cream)" }}
    >
      <div className="relative mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-start-2 md:col-span-10">
          <FadeIn>
            <span className="eyebrow">Bevor du anfragst</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="h2 font-serif max-w-[24ch] mb-20">
              Ich nehme maximal <span className="font-serif-italic">vier</span>{" "}
              neue Kunden pro Quartal.
              <br />
              <span className="font-serif-italic" style={{ color: "var(--wood)" }}>
                Und ich sage regelmäßig Nein.
              </span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <FadeIn delay={0.15}>
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className="w-8 h-[1px]"
                    style={{ background: "var(--rope)" }}
                  />
                  <span
                    className="text-[11px] tracking-widest uppercase"
                    style={{ color: "var(--rope)" }}
                  >
                    Nicht für dich
                  </span>
                </div>
                <ul className="space-y-5">
                  {NOT_FOR.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span
                        className="mt-[10px] w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: "var(--rope)" }}
                      />
                      <span
                        className="font-serif-italic text-2xl md:text-[26px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.22}>
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className="w-8 h-[1px]"
                    style={{ background: "var(--water)" }}
                  />
                  <span
                    className="text-[11px] tracking-widest uppercase"
                    style={{ color: "var(--wood)" }}
                  >
                    Für dich
                  </span>
                </div>
                <ul className="space-y-5">
                  {FOR.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span
                        className="mt-[10px] w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: "var(--water)" }}
                      />
                      <span
                        className="font-serif-italic text-2xl md:text-[26px]"
                        style={{ color: "var(--text)" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
