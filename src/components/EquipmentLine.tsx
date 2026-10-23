import React from "react";
import type { LignePack } from "@/lib/types";
import { IconAmpoule, IconPrise, IconTelecommande, IconMicro, IconSmartphone } from "./Icons";

export interface EquipmentLineProps {
  ligne: LignePack;
  varianteAlternative?: boolean;
  onBasculerAlternative?: () => void;
  interactive?: boolean;
}

// Sélecteur d'icône fine en fonction du nom d'équipement
function getIcone(nom: string) {
  const n = nom.toLowerCase();
  if (n.includes("ampoule") || n.includes("interrupteur") || n.includes("lumineux")) {
    return <IconAmpoule className="w-4 h-4 text-or" />;
  }
  if (n.includes("prise")) {
    return <IconPrise className="w-4 h-4 text-or" />;
  }
  if (n.includes("télécommande") || n.includes("telecommande")) {
    return <IconTelecommande className="w-4 h-4 text-or" />;
  }
  if (n.includes("echo") || n.includes("alexa") || n.includes("vocal")) {
    return <IconMicro className="w-4 h-4 text-or" />;
  }
  return <IconSmartphone className="w-4 h-4 text-or" />;
}

export function EquipmentLine({
  ligne,
  varianteAlternative = false,
  onBasculerAlternative,
  interactive = false,
}: EquipmentLineProps) {
  const elementActif =
    varianteAlternative && ligne.alternative
      ? {
          quantite: 1,
          nom: ligne.alternative.nom,
          detail: ligne.alternative.detail,
        }
      : {
          quantite: ligne.quantite,
          nom: ligne.nom,
          detail: ligne.detail,
        };

  return (
    <div className="flex flex-col gap-1 py-3 border-b border-noir-800 last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Badge quantité sobre */}
          <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-or/40 bg-noir-800 font-titre text-[11px] text-or mt-0.5">
            {elementActif.quantite}×
          </span>

          {/* Icône + Nom */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="shrink-0">{getIcone(elementActif.nom)}</span>
              <span className="font-titre text-xs uppercase tracking-accroche text-ivoire">
                {elementActif.nom}
              </span>
            </div>
            <p className="font-texte text-xs text-ivoire-700 mt-1 leading-normal">
              {elementActif.detail}
            </p>
          </div>
        </div>

        {/* Sélecteur d'alternative (pour le Pack Confort) */}
        {ligne.alternative && interactive && onBasculerAlternative && (
          <button
            type="button"
            onClick={onBasculerAlternative}
            className="shrink-0 border border-or/60 bg-noir-900 px-2 py-1 font-titre text-[10px] uppercase tracking-wide text-or hover:bg-or hover:text-noir transition-colors"
            title="Changer pour l'option alternative"
          >
            {varianteAlternative ? "Revenir aux ampoules" : "Remplacer par interrupteur"}
          </button>
        )}
      </div>

      {ligne.alternative && !interactive && (
        <span className="font-texte text-[11px] text-ivoire-800 italic pl-8">
          Option interchangeable : ou {ligne.alternative.nom} ({ligne.alternative.detail})
        </span>
      )}
    </div>
  );
}
