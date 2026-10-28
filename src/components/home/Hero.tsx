import React from "react";
import Image from "next/image";
import { site, lienWhatsApp } from "@/data/site";
import { Button } from "../Button";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-12 pb-20 overflow-hidden bg-noir">
      {/* Halo de lumière chaude d'ambiance nocturne (ambiance "la maison de nuit à lumière chaude") */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-or/10 rounded-full blur-[120px]"
        aria-hidden="true"
      />

      {/* Point lumineux doré signature du logo au chargement */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative flex items-center justify-center">
          <div className="h-3 w-3 bg-or point-or-init rounded-none" />
          <div className="absolute h-8 w-8 border border-or/30 rounded-none pointer-events-none" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Titre principal */}
        <h1 className="font-titre text-2xl sm:text-4xl lg:text-[42px] uppercase tracking-logo text-ivoire font-light leading-tight max-w-3xl">
          Offrez à votre maison le confort du futur
        </h1>

        {/* Sous-titre */}
        <p className="font-titre text-base sm:text-xl uppercase tracking-accroche text-or mt-4 max-w-2xl font-normal">
          En le transformant en une maison intelligente
        </p>

        {/* Deux boutons d'action */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
          <Button
            variant="primaire"
            size="lg"
            href={lienWhatsApp("Bonjour, je souhaite un devis gratuit pour mon logement.")}
            isExternal
            fullWidth
          >
            Devis gratuit sur WhatsApp
          </Button>

          <Button
            variant="secondaire"
            size="lg"
            href="#packs"
            fullWidth
          >
            Voir les packs
          </Button>
        </div>

        {/* Ligne de faits concrets */}
        <div className="mt-8 pt-6 border-t border-noir-800 w-full max-w-2xl">
          <p className="font-texte text-xs sm:text-sm text-ivoire-700 tracking-wide">
            Installation incluse · 30 jours d&apos;assistance · Réponse rapide, sans engagement
          </p>
        </div>
      </div>

      {/* Le fil d'or qui descend du bas du hero vers la section suivante */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-or/60 to-or" />
        <div className="h-2 w-2 bg-or rounded-none" />
      </div>
    </section>
  );
}
