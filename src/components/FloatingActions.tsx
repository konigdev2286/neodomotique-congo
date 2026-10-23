"use client";

import React from "react";
import { site, lienWhatsApp } from "@/data/site";

export function FloatingActions() {
  const ouvrirAssistant = () => {
    // // BRANCHER_ICI : ouverture de la modale de chat agent (Phase 6)
    window.dispatchEvent(new CustomEvent("neodomotique:open-chat"));
  };

  return (
    <>
      {/* Barre d'actions Mobile (fixée en bas, cibles tactiles >= 44px) */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-noir-900 border-t border-or/20 px-3 py-2">
        <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
          {/* Bouton Assistant */}
          <button
            type="button"
            onClick={ouvrirAssistant}
            className="flex h-11 items-center justify-center gap-2 border border-noir-700 bg-noir-800 px-3 font-titre text-xs uppercase tracking-accroche text-ivoire hover:border-or hover:text-or transition-colors active:bg-noir-700"
            aria-label="Ouvrir l'assistant virtuel"
          >
            <span className="h-2 w-2 rounded-none bg-or point-or-init" />
            <span>Assistant</span>
          </button>

          {/* Bouton WhatsApp */}
          <a
            href={lienWhatsApp("Bonjour, je souhaite un devis gratuit pour mon logement.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center justify-center gap-2 border border-or bg-or px-3 font-titre text-xs uppercase tracking-accroche text-noir font-medium hover:bg-or-clair transition-colors active:bg-or-fonce"
            aria-label="Contacter Neodomotique sur WhatsApp"
          >
            <svg
              className="h-4 w-4 fill-current shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Boutons flottants Bureau (en bas à droite) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3">
        {/* Lanceur de Chat Assistant */}
        <button
          type="button"
          onClick={ouvrirAssistant}
          className="group flex h-11 items-center gap-2 border border-noir-700 bg-noir-900 px-4 font-titre text-xs uppercase tracking-accroche text-ivoire hover:border-or transition-colors shadow-none"
          title="Poser une question à l'assistant"
          aria-label="Ouvrir l'assistant Neodomotique"
        >
          <span className="h-2 w-2 rounded-none bg-or point-or-init" />
          <span className="group-hover:text-or transition-colors">Assistant</span>
        </button>

        {/* Bouton WhatsApp Flottant */}
        <a
          href={lienWhatsApp("Bonjour, je souhaite un devis gratuit pour mon logement.")}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-13 w-13 items-center justify-center border border-or bg-noir-900 hover:bg-or text-or hover:text-noir transition-colors"
          title={`WhatsApp : ${site.whatsapp.affichage}`}
          aria-label="Contacter Neodomotique sur WhatsApp"
        >
          <svg
            className="h-6 w-6 fill-current transition-colors"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
          </svg>
        </a>
      </div>
    </>
  );
}
