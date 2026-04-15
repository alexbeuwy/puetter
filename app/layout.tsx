import type { Metadata } from "next";
import { EB_Garamond, Rubik } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const serif = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const sans = Rubik({
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
