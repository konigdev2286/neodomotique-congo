import React from "react";
import { site } from "@/data/site";
import { IconCheck } from "../Icons";

export function GarantiesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-noir-800">
      <div className="max-w-2xl mb-12">
        <span className="font-titre text-xs uppercase tracking-logo text-or block mb-1">
          Engagements & Confiance
        </span>
        <h2 className="font-titre text-2xl sm:text-3xl uppercase tracking-accroche text-ivoire">
          Nos six garanties de service
        </h2>
        <p className="font-texte text-sm text-ivoire-700 mt-2">
          Des engagements stricts appliqués à chaque intervention, sans mauvaise surprise.
        </p>
      </div>

      {/* Grille sobre de 6 faits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {site.garanties.map((garantie, idx) => (
          <div
            key={idx}
            className="border border-noir-700 bg-noir-900 p-6 flex items-start gap-4 hover:border-or/60 transition-colors"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-or/40 bg-noir-950 text-or mt-0.5">
              <IconCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-titre text-[10px] uppercase tracking-logo text-or block mb-1">
                Fait garanti 0{idx + 1}
              </span>
              <p className="font-titre text-sm sm:text-base uppercase tracking-wide text-ivoire">
                {garantie}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
