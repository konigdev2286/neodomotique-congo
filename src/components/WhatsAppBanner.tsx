import React from "react";
import { site, lienWhatsApp } from "@/data/site";
import { Button } from "./Button";

export interface WhatsAppBannerProps {
  titre?: string;
  sousTitre?: string;
  messagePredefini?: string;
  afficherZones?: boolean;
}

export function WhatsAppBanner({
  titre = "Un projet domotique ? Échangez directement avec nous",
  sousTitre = "Réponse rapide, devis gratuit sans engagement et conseils adaptés à votre logement.",
  messagePredefini = "Bonjour, je souhaite un devis gratuit pour mon logement.",
  afficherZones = true,
}: WhatsAppBannerProps) {
  return (
    <div className="relative border border-or/40 bg-noir-900 p-8 sm:p-10 my-8">
      {/* Filet décoratif vertical fin */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-or" />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="max-w-2xl">
          <span className="font-titre text-[11px] uppercase tracking-logo text-or block mb-1">
            Contact direct WhatsApp
          </span>
          <h2 className="font-titre text-xl sm:text-2xl uppercase tracking-accroche text-ivoire">
            {titre}
          </h2>
          <p className="font-texte text-sm text-ivoire-700 mt-2 leading-relaxed">
            {sousTitre}
          </p>
          {afficherZones && (
            <p className="font-texte text-xs text-ivoire-800 mt-3">
              Interventions à <span className="text-ivoire">{site.zones.join(" et ")}</span> · 30 jours d&apos;assistance après installation
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
          <div className="flex flex-col">
            <span className="font-titre text-[10px] uppercase tracking-wide text-ivoire-800">
              Numéro direct
            </span>
            <span className="font-titre text-lg sm:text-xl text-ivoire font-normal">
              {site.whatsapp.affichage}
            </span>
          </div>

          <Button
            variant="primaire"
            size="lg"
            href={lienWhatsApp(messagePredefini)}
            isExternal
          >
            Écrire sur WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
