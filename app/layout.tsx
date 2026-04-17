import type { Metadata } from "next";
import { EB_Garamond, Outfit, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Outfit: geometric sans, close to Circular's feel — even x-height,
// friendly-but-technical. The primary typeface for the hologram/
// chrome brand direction.
const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

// EB Garamond kept only for rare italic display accents inside
// headlines (the "last word in italic" pattern). The brand is now
// primarily sans-serif / technical.
const serif = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

// JetBrains Mono for numerals, progress counters, technical labels.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Pütter — Planbar Kunden gewinnen. Klare Richtung. System.",
  description:
    "Für Selbstständige und Unternehmer: Positionierung, Personal Brand und ein Akquise-System, das funktioniert. Seit 2017. Nur auf Empfehlung gewachsen.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <link rel="preload" as="image" href="/raft/Bretter.png" />
      </head>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--cream)",
              color: "var(--text)",
              border: "1px solid rgba(196, 168, 130, 0.5)",
              fontFamily: "var(--font-sans)",
              borderRadius: 16,
              boxShadow: "0 30px 60px -20px rgba(92,61,46,0.3)",
            },
            className: "puetter-toast",
          }}
        />
      </body>
    </html>
  );
}
