"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Pack } from "@/lib/types";
import { formatFCFA } from "@/lib/format";
import { lienWhatsApp } from "@/data/site";
import { EquipmentLine } from "./EquipmentLine";
import { Button } from "./Button";

export interface PackCardProps {
  pack: Pack;
  miseEnAvant?: boolean;
  lienDetail?: boolean;
}

export function PackCard({ pack, miseEnAvant = false, lienDetail = true }: PackCardProps) {
  // Gestion de l'option alternative sur les packs (ex: Pack Studio Confort)
  const [varianteAlternative, setVarianteAlternative] = useState(false);

  const messageWhatsApp = varianteAlternative
    ? `Bonjour, je choisis le ${pack.nom} (option interrupteur 2 gang) à ${formatFCFA(pack.prix)} avec installation incluse.`
    : `Bonjour, je choisis le ${pack.nom} à ${formatFCFA(pack.prix)} avec installation incluse.`;

  return (
    <div
      className={`relative flex flex-col justify-between border bg-noir-900 transition-colors ${
        miseEnAvant
          ? "border-or shadow-none"
          : "border-noir-700 hover:border-or/60"
      }`}
    >
      {/* Badge de réassurance / mise en avant sobre */}
      {miseEnAvant && (
        <div className="absolute -top-3 left-6 border border-or bg-noir px-3 py-0.5 font-titre text-[10px] uppercase tracking-logo text-or">
          Pack Recommandé
        </div>
      )}

      {/* Partie Haute : Image et Titre */}
      <div>
        <div className="relative h-56 sm:h-64 w-full bg-noir-950 border-b border-noir-800 overflow-hidden">
          <Image
            src={pack.image}
            alt={pack.nom}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={miseEnAvant}
          />
          {/* Filet doré décoratif bas d'image */}
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-or/40 to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-titre text-[11px] uppercase tracking-logo text-or">
              Formule clé en main
            </span>
            {pack.id === "studio-confort" && (
              <span className="font-titre text-[10px] uppercase tracking-wide px-2 py-0.5 border border-or/50 text-or bg-noir-950">
                Idéal Studio ou Salon Intelligent
              </span>
            )}
          </div>
          <h3 className="font-titre text-xl sm:text-2xl uppercase tracking-accroche text-ivoire mt-1">
            {pack.nom}
          </h3>
          <p className="font-texte text-sm text-ivoire-700 mt-2 leading-relaxed">
            {pack.description}
          </p>

          {/* Liste des équipements réels */}
          <div className="mt-6 pt-4 border-t border-noir-800">
            <span className="font-titre text-[10px] uppercase tracking-accroche text-ivoire-800 block mb-2">
              Contenu détaillé de l&apos;installation :
            </span>
            <div className="flex flex-col">
              {pack.contenu.map((ligne, idx) => (
                <EquipmentLine
                  key={`${pack.id}-${idx}-${ligne.nom}`}
                  ligne={ligne}
                  varianteAlternative={varianteAlternative}
                  onBasculerAlternative={() => setVarianteAlternative(!varianteAlternative)}
                  interactive={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Partie Basse : Prix et Actions */}
      <div className="p-6 pt-4 border-t border-noir-800 bg-noir-950/60 flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="block font-texte text-[11px] text-ivoire-800 uppercase">
              Prix tout inclus
            </span>
            <span className="font-titre text-2xl sm:text-3xl font-normal text-or tracking-tight">
              {formatFCFA(pack.prix)}
            </span>
          </div>
          <span className="font-texte text-xs text-ivoire-700 text-right">
            Installation incluse<br />
            <strong className="text-ivoire font-normal">30 jours d&apos;assistance</strong>
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="primaire"
            size="md"
            href={lienWhatsApp(messageWhatsApp)}
            isExternal
            fullWidth
          >
            Choisir ce pack
          </Button>

          {lienDetail && (
            <Button
              variant="secondaire"
              size="md"
              href={`/packs#${pack.id}`}
              fullWidth
            >
              Voir le détail
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
