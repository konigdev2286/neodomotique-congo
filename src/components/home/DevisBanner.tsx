import React from "react";
import Link from "next/link";
import { site, lienWhatsApp } from "@/data/site";
import { Button } from "../Button";

export function DevisBanner() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-noir-800">
      {/* 7. Bandeau Simulateur */}
      <div className="border border-or/40 bg-noir-900 p-8 sm:p-12 mb-16 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div className="max-w-2xl">
            <span className="font-titre text-xs uppercase tracking-logo text-or block mb-2">
              Estimation sur mesure en direct
            </span>
            <h2 className="font-titre text-2xl sm:text-3xl uppercase tracking-accroche text-ivoire">
              Calculez votre devis en 2 minutes
            </h2>
            <p className="font-texte text-sm text-ivoire-700 mt-2 leading-relaxed">
              Sélectionnez vos pièces, vos interrupteurs et vos appareils à automatiser. Obtenez un montant exact avec le détail du matériel, de la main-d&apos;œuvre et de l&apos;acompte de 40%.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              variant="primaire"
              size="lg"
              href="/devis"
            >
              Lancer le simulateur →
            </Button>
          </div>
        </div>
      </div>

      {/* 8. Appel Final */}
      <div className="border-t border-noir-800 pt-16 text-center max-w-3xl mx-auto flex flex-col items-center">
        <span className="font-titre text-xs uppercase tracking-logo text-or block mb-2">
          Contact direct immédiat
        </span>
        <h2 className="font-titre text-2xl sm:text-4xl uppercase tracking-logo text-ivoire">
          Une question avant de vous lancer ?
        </h2>
        <p className="font-texte text-base text-ivoire-700 mt-3 max-w-xl">
          Nos techniciens vous répondent directement sur WhatsApp pour étudier votre projet.
        </p>

        {/* Grand Numéro */}
        <div className="my-6">
          <a
            href={lienWhatsApp("Bonjour, je souhaite poser une question à propos de vos installations domotiques.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-titre text-3xl sm:text-5xl tracking-wide text-or hover:text-or-clair transition-colors"
          >
            {site.whatsapp.affichage}
          </a>
        </div>

        {/* Bouton WhatsApp */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button
            variant="primaire"
            size="lg"
            href={lienWhatsApp("Bonjour, je souhaite un devis gratuit pour mon logement.")}
            isExternal
          >
            Écrire à un technicien sur WhatsApp
          </Button>
        </div>

        {/* Zones d'intervention */}
        <p className="font-texte text-xs text-ivoire-800 mt-6">
          Interventions et déplacements réguliers à{" "}
          <strong className="text-ivoire font-normal">{site.zones.join(" et ")}</strong>.
        </p>
      </div>
    </section>
  );
}
