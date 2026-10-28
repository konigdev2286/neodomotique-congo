import React from "react";
import { lienWhatsApp } from "@/data/site";
import { Button } from "../Button";

const etapes = [
  {
    numero: "01",
    titre: "Vous nous écrivez sur WhatsApp",
    description: "Vous nous décrivez brièvement votre logement et vos besoins (pièces, éclairage, appareils à commander).",
  },
  {
    numero: "02",
    titre: "Vous recevez un devis gratuit",
    description: "Nous vous envoyons immédiatement une proposition claire et détaillée, chiffrée au centime près, sans engagement.",
  },
  {
    numero: "03",
    titre: "Nous installons, configurons et testons chez vous",
    description: "Nos techniciens interviennent chez vous à Brazzaville, Pointe-Noire ou au niveau national selon votre projet : pose propre, raccordement et test complet de chaque équipement.",
  },
  {
    numero: "04",
    titre: "Vous profitez de 30 jours d'assistance",
    description: "Vous utilisez votre maison intelligente en toute sérénité avec un accompagnement technique réactif en cas de besoin.",
  },
];

export function StepsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-noir-800">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-titre text-xs uppercase tracking-logo text-or block mb-1">
          Déroulé transparent
        </span>
        <h2 className="font-titre text-2xl sm:text-4xl uppercase tracking-accroche text-ivoire">
          Comment ça marche
        </h2>
        <p className="font-texte text-sm sm:text-base text-ivoire-700 mt-2">
          De votre premier message à une maison entièrement connectée en 4 étapes simples.
        </p>
      </div>

      {/* Les 4 étapes le long du fil d'or vertical signature */}
      <div className="relative pl-6 sm:pl-10 space-y-12 sm:space-y-16">
        {/* Le fil d'or vertical continu */}
        <div
          className="absolute left-[11px] sm:left-[19px] top-3 bottom-6 w-[1.5px] bg-gradient-to-b from-or via-or/50 to-or"
          aria-hidden="true"
        />

        {etapes.map((etape) => (
          <div key={etape.numero} className="relative flex items-start gap-6 sm:gap-8 group">
            {/* Point d'or marquant l'étape */}
            <div className="absolute -left-6 sm:-left-10 top-1.5 flex items-center justify-center">
              <div className="h-4 w-4 bg-noir border border-or flex items-center justify-center rounded-none group-hover:bg-or transition-colors">
                <div className="h-1.5 w-1.5 bg-or group-hover:bg-noir transition-colors rounded-none" />
              </div>
            </div>

            {/* Contenu de l'étape */}
            <div className="flex flex-col border border-noir-700 bg-noir-900 p-6 sm:p-8 w-full group-hover:border-or/60 transition-colors">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="font-titre text-xs uppercase tracking-logo text-or font-medium">
                  Étape {etape.numero}
                </span>
                <span className="font-texte text-xs text-ivoire-800">
                  Étape {etape.numero} sur 04
                </span>
              </div>
              <h3 className="font-titre text-lg sm:text-xl uppercase tracking-accroche text-ivoire">
                {etape.titre}
              </h3>
              <p className="font-texte text-sm text-ivoire-700 mt-2 leading-relaxed">
                {etape.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Appel à l'action sous les étapes */}
      <div className="mt-16 text-center">
        <Button
          variant="primaire"
          size="lg"
          href={lienWhatsApp("Bonjour, je souhaite démarrer un devis gratuit pour mon logement.")}
          isExternal
        >
          Démarrer à l&apos;étape 1 sur WhatsApp
        </Button>
      </div>
    </section>
  );
}
