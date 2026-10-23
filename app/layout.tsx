import type { Metadata, Viewport } from "next";
import "@fontsource-variable/jost";
import "@fontsource-variable/source-sans-3";
import "./globals.css";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: `${site.nom} | ${site.slogan}`,
  description:
    "Domotique à Brazzaville : éclairage intelligent, commande vocale Alexa, automatisation. Installation professionnelle incluse, devis gratuit sur WhatsApp.",
  openGraph: { title: site.nom, description: site.slogan, locale: "fr_CG", type: "website" },
};

export const viewport: Viewport = { themeColor: "#050505", width: "device-width", initialScale: 1 };

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { ChatWidget } from "@/components/chat/ChatWidget";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="bg-noir">
      <body className="flex min-h-screen flex-col bg-noir text-ivoire font-texte antialiased pb-16 md:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
        <ChatWidget />
      </body>
    </html>
  );
}


