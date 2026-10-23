import React from "react";
import type { Metadata } from "next";
import { site } from "@/data/site";
import { Hero } from "@/components/home/Hero";
import { ServicesList } from "@/components/home/ServicesList";
import { PacksSection } from "@/components/home/PacksSection";
import { VideoDemos } from "@/components/home/VideoDemos";
import { StepsSection } from "@/components/home/StepsSection";
import { GarantiesSection } from "@/components/home/GarantiesSection";
import { DevisBanner } from "@/components/home/DevisBanner";

export const metadata: Metadata = {
  title: `${site.nom} | ${site.slogan}`,
  description:
    "Domotique à Brazzaville et Pointe-Noire : éclairage intelligent, commande vocale Alexa, automatisation complète. Packs dès 110 000 FCFA avec pose incluse et 30 jours d'assistance.",
};

export default function AccueilPage() {
  return (
    <div className="flex flex-col w-full bg-noir text-ivoire">
      {/* 1. Hero Plein Écran */}
      <Hero />

      {/* 2. Les Six Services en liste 01-06 */}
      <ServicesList />

      {/* 3. Les Deux Packs (Starter 110k, Confort 150k) */}
      <PacksSection />

      {/* 4. Démonstrations Réelles (6 vidéos réelles, modale, mise en avant vidéo 04) */}
      <VideoDemos />

      {/* 5. Comment ça marche (4 étapes le long du fil d'or vertical) */}
      <StepsSection />

      {/* 6. Garanties (6 faits en grille sobre) */}
      <GarantiesSection />

      {/* 7. Bandeau Simulateur & 8. Appel Final avec Grand Numéro */}
      <DevisBanner />
    </div>
  );
}
