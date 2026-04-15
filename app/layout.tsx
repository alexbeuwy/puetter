import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
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
    <html lang="de" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <link rel="preload" as="image" href="/raft/bild1.jpg" />
        <link rel="preload" as="image" href="/raft/bild2.jpg" />
        <link rel="preload" as="image" href="/raft/bild3.jpg" />
        <link rel="preload" as="image" href="/raft/bild4.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
