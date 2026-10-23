"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { videos } from "@/data/videos";
import type { Video } from "@/lib/types";
import { Modal } from "../Modal";

export function VideoDemos() {
  const [videoActive, setVideoActive] = useState<Video | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-noir-800">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="font-titre text-xs uppercase tracking-logo text-or block mb-1">
            Preuves concrètes
          </span>
          <h2 className="font-titre text-2xl sm:text-3xl uppercase tracking-accroche text-ivoire">
            Démonstrations réelles chez nos clients
          </h2>
          <p className="font-texte text-sm text-ivoire-700 mt-2 max-w-xl">
            Découvrez nos vraies installations filmées à Brazzaville. Aucune mise en scène, des équipements en fonctionnement direct.
          </p>
        </div>
        <Link
          href="/realisations"
          className="font-titre text-xs uppercase tracking-accroche text-ivoire-700 hover:text-or transition-colors py-1 border-b border-noir-700 hover:border-or self-start sm:self-auto shrink-0"
        >
          Voir toutes les vidéos →
        </Link>
      </div>

      {/* Rangée horizontale de cartes vidéo verticales défilable avec scrollbar discrète */}
      <div className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-thin">
        {videos.map((v) => {
          const estMiseEnAvant = v.id === "demo-04"; // « Installation complète pour moins de 150 000 FCFA »
          return (
            <div
              key={v.id}
              role="button"
              tabIndex={0}
              aria-label={`Lancer la vidéo : ${v.titre}`}
              className={`shrink-0 w-64 sm:w-72 snap-start border bg-noir-900 group cursor-pointer transition-colors relative flex flex-col justify-between ${
                estMiseEnAvant ? "border-or" : "border-noir-700 hover:border-or/60"
              }`}
              onClick={() => setVideoActive(v)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setVideoActive(v); } }}
            >
              {/* Badge mise en avant sur demo-04 */}
              {estMiseEnAvant && (
                <div className="absolute top-3 left-3 z-10 border border-or bg-noir px-2 py-0.5 font-titre text-[10px] uppercase tracking-wide text-or">
                  Installation &lt; 150 000 FCFA
                </div>
              )}

              {/* Aperçu vidéo vertical */}
              <div className="relative aspect-[9/16] w-full bg-noir-950 overflow-hidden">
                <Image
                  src={v.poster}
                  alt={v.titre}
                  fill
                  sizes="(max-width: 640px) 256px, 288px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Bouton de lecture central sobre */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center border border-or bg-noir text-or group-hover:bg-or group-hover:text-noir transition-colors">
                    <svg className="h-5 w-5 fill-current ml-0.5" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Titre et détails */}
              <div className="p-4 border-t border-noir-800">
                <h3 className="font-titre text-xs uppercase tracking-wide text-ivoire group-hover:text-or transition-colors line-clamp-2">
                  {v.titre}
                </h3>
                <span className="font-texte text-[11px] text-ivoire-800 mt-2 block">
                  Cliquer pour lancer la vidéo
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lecteur en Fenêtre Modale (sans lecture automatique avec son) */}
      {videoActive && (
        <Modal
          ouvert={!!videoActive}
          onFermer={() => setVideoActive(null)}
          titre={videoActive.titre}
          sousTitre="Démonstration réelle tournée sur place chez nos clients"
          taille="md"
        >
          <div className="relative aspect-[9/16] max-h-[70vh] mx-auto w-full bg-noir-950 overflow-hidden border border-noir-800">
            <video
              src={videoActive.src}
              poster={videoActive.poster}
              controls
              autoPlay
              playsInline
              preload="none"
              className="h-full w-full object-contain"
            >
              Votre navigateur ne prend pas en charge la lecture vidéo HTML5.
            </video>
          </div>
        </Modal>
      )}
    </section>
  );
}
