"use client";

import FadeIn from "./FadeIn";
import LogoMark from "./LogoMark";

export default function OriginStory() {
  return (
    <section
      id="ueber-mich"
      className="relative py-40 md:py-48 px-6 md:px-10 overflow-hidden"
      style={{ background: "var(--white)" }}
    >
      <div className="relative mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left: small meta column */}
        <aside className="md:col-start-1 md:col-span-2 md:pt-4">
          <FadeIn>
            <div
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Kapitel 01
            </div>
            <div
              className="mt-2 font-serif-italic text-2xl"
              style={{ color: "var(--wood)" }}
            >
              Ursprung
            </div>
            <div
              className="mt-6 w-10 h-[1px]"
              style={{ background: "var(--rope)" }}
            />
          </FadeIn>
        </aside>

        {/* Main story */}
        <div className="md:col-span-8">
          <FadeIn>
            <span className="eyebrow">Warum ich das überhaupt weiß</span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="h2 font-serif-italic max-w-[24ch] mb-14">
              Ich hab mal mit zitternden Händen Zahnärzte angerufen.
            </h2>
          </FadeIn>

          <div className="max-w-[60ch] space-y-7">
            <FadeIn delay={0.15}>
              <p>
                2017. Studentenwohnung in Bochum. Kein Startkapital, kein
                Netzwerk, kein Plan B. Mein erstes Angebot:{" "}
                <strong style={{ color: "var(--wood)" }}>50 Euro</strong> für
                eine Website. Ich hab es selbst nicht geglaubt.
              </p>
            </FadeIn>

            <FadeIn delay={0.22}>
              <p>
                Der zweite Kunde kam über Empfehlung. Der dritte auch. Der
                Preis stieg. Irgendwann:{" "}
                <strong style={{ color: "var(--wood)" }}>650 Euro</strong>. Dann
                vierstellig. Dann fünfstellig pro Projekt. Ohne dass ich je
                einen Cold Call gemacht hätte.
              </p>
            </FadeIn>

            <FadeIn delay={0.28}>
              <p>
                Nach ein paar Jahren:{" "}
                <strong style={{ color: "var(--wood)" }}>300k</strong> als
                Einzelperson, aus derselben Wohnung heraus. Ohne Agentur, ohne
                Sales-Team, ohne Funnels, die mich selbst angewidert hätten.
              </p>
            </FadeIn>

            <FadeIn delay={0.34}>
              <p>
                Später: Agentur gegründet. Bis zu{" "}
                <strong style={{ color: "var(--wood)" }}>15 Mitarbeiter</strong>
                . Und gemerkt, dass Wachstum um jeden Preis nicht mein Weg ist.
                Zurück aufs Wesentliche: Arbeiten mit Menschen, die ich mag,
                an Projekten, die ich verstehe.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p>
                Alles, was ich dir heute zeige, ist das was funktioniert hat.
                Nicht die Theorie. Nicht der Kurs. Das System, das ich selbst
                benutzt habe, bevor ich es weitergegeben habe.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.5}>
            <hr
              className="my-14 border-0 h-[1px]"
              style={{ background: "var(--rope)", opacity: 0.4 }}
            />
          </FadeIn>

          <FadeIn delay={0.55}>
            <blockquote
              className="font-serif-italic max-w-[26ch]"
              style={{
                fontSize: 32,
                lineHeight: 1.25,
                color: "var(--wood)",
                borderLeft: "4px solid var(--wood)",
                paddingLeft: 24,
              }}
            >
              Wachstum und Geld um jeden Preis ist nicht der Weg.
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.65}>
            <div className="mt-14 flex items-center gap-5">
              <div
                className="w-[120px] h-[120px] rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  background: "var(--sand)",
                  border: "1px solid rgba(196,168,130,0.4)",
                  color: "var(--wood)",
                }}
              >
                <LogoMark className="h-[60px] w-auto" />
              </div>
              <div>
                <div className="font-medium">Pütter</div>
                <div
                  className="text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  Berater · Unternehmer · Floß-Bauer seit 2017
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
