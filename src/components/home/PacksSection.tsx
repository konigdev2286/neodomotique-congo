import React from "react";
import Link from "next/link";
import { packs } from "@/data/packs";
import { PackCard } from "../PackCard";

export function PacksSection() {
  return (
    <section id="packs" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-noir-800">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <span className="font-titre text-xs uppercase tracking-logo text-or block mb-1">
            Formules complètes avec pose
          </span>
          <h2 className="font-titre text-2xl sm:text-4xl uppercase tracking-accroche text-ivoire">
            Les deux packs d&apos;installation
          </h2>
          <p className="font-texte text-sm sm:text-base text-ivoire-700 mt-2 max-w-2xl leading-relaxed">
            Des tarifs fixes et transparents comprenant le matériel 100% neuf, la configuration sur place et 30 jours d&apos;assistance.
          </p>
        </div>
        <Link
          href="/packs"
          className="font-titre text-xs uppercase tracking-accroche text-ivoire-700 hover:text-or transition-colors py-1 border-b border-noir-700 hover:border-or self-start sm:self-auto shrink-0"
        >
          Comparer les packs en détail →
        </Link>
      </div>

      {/* Les deux packs côte à côte sur bureau, empilés sur mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {packs.map((pack, idx) => (
          <PackCard
            key={pack.id}
            pack={pack}
            miseEnAvant={idx === 1}
            lienDetail={true}
          />
        ))}
      </div>
    </section>
  );
}
