"use client";

import React, { useEffect, useCallback } from "react";
import { IconFermer } from "./Icons";

export interface ModalProps {
  ouvert: boolean;
  onFermer: () => void;
  titre?: string;
  sousTitre?: string;
  children: React.ReactNode;
  taille?: "sm" | "md" | "lg" | "plein";
}

export function Modal({
  ouvert,
  onFermer,
  titre,
  sousTitre,
  children,
  taille = "md",
}: ModalProps) {
  // Fermeture avec la touche Échap
  const gererToucheEchap = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onFermer();
      }
    },
    [onFermer]
  );

  useEffect(() => {
    if (ouvert) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", gererToucheEchap);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", gererToucheEchap);
    };
  }, [ouvert, gererToucheEchap]);

  if (!ouvert) return null;

  const tailleClasses = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    plein: "max-w-5xl",
  }[taille];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titre ? "modal-titre" : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Fond d'occultation noir sobre (sans effet de verre / sans blur) */}
      <div
        className="fixed inset-0 bg-black/90 transition-opacity"
        onClick={onFermer}
        aria-hidden="true"
      />

      {/* Conteneur de la modale */}
      <div
        className={`relative w-full ${tailleClasses} border border-or/40 bg-noir-950 p-6 sm:p-8 text-ivoire shadow-none max-h-[90vh] overflow-y-auto rounded-none`}
      >
        {/* En-tête */}
        <div className="flex items-start justify-between gap-4 border-b border-noir-800 pb-4 mb-6">
          <div>
            {titre && (
              <h3 id="modal-titre" className="font-titre text-lg sm:text-xl uppercase tracking-accroche text-ivoire">
                {titre}
              </h3>
            )}
            {sousTitre && (
              <p className="font-texte text-xs text-ivoire-700 mt-1">
                {sousTitre}
              </p>
            )}
          </div>

          {/* Bouton Fermer */}
          <button
            type="button"
            onClick={onFermer}
            className="flex h-9 w-9 items-center justify-center border border-noir-700 hover:border-or text-ivoire-700 hover:text-or transition-colors shrink-0"
            aria-label="Fermer la modale"
          >
            <IconFermer className="w-4 h-4" />
          </button>
        </div>

        {/* Contenu */}
        <div>{children}</div>
      </div>
    </div>
  );
}
