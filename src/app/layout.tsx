import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zürich Nachhilfe | Qualifizierte Tutoren für nachhaltigen Lernerfolg",
  description: "Professionelle Nachhilfe in Zürich und Umgebung. Qualifizierte Tutoren, individuelle Betreuung und nachweisbare Erfolge. Jetzt kostenloses Beratungsgespräch vereinbaren.",
  keywords: "Nachhilfe Zürich, Privatunterricht, Tutoren, Mathematik, Lernhilfe, Schülerhilfe",
  robots: "index, follow",
  openGraph: {
    title: "Zürich Nachhilfe | Qualifizierte Tutoren für nachhaltigen Lernerfolg",
    description: "Professionelle Nachhilfe in Zürich und Umgebung. Qualifizierte Tutoren, individuelle Betreuung und nachweisbare Erfolge.",
    type: "website",
    locale: "de_CH",
  },
  icons: {
    icon: "/images/logo/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
