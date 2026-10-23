"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { videos } from "@/data/videos";
import type { Video } from "@/lib/types";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { WhatsAppBanner } from "@/components/WhatsAppBanner";
import { IconFlecheDroite } from "@/components/Icons";

export default function RealisationsPage() {
  const [indexVideoActive, setIndexVideoActive] = useState<number | null>(null);

  const videoActive = indexVideoActive !== null ? videos[indexVideoActive] : null;

  const passerSuivante = useCallback(() => {
    if (indexVideoActive !== null) {
      setIndexVideoActive((indexVideoActive + 1) % videos.length);
    }
  }, [indexVideoActive]);

  const passerPrecedente = useCallback(() => {
    if (indexVideoActive !== null) {
      setIndexVideoActive((indexVideoActive - 1 + videos.length) % videos.length);
    }
  }, [indexVideoActive]);

  // Navigation clavier flèche gauche / flèche droite dans la modale
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (indexVideoActive === null) return;
      if (e.key === "ArrowRight") {
        passerSuivante();
      } else if (e.key === "ArrowLeft") {
        passerPrecedente();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [indexVideoActive, passerSuivante, passerPrecedente]);

  return (
    <div className="min-h-screen bg-noir text-ivoire py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* En-tête de la page */}
        <div className="border-b border-or/20 pb-8 mb-16 max-w-3xl">
          <span className="font-titre text-xs uppercase tracking-logo text-or block mb-1">
            Chantiers & Démonstrations
          </span>
          <h1 className="font-titre text-3xl sm:text-5xl uppercase tracking-logo text-ivoire">
            Nos Réalisations
          </h1>
          <p className="font-texte text-base text-ivoire-700 mt-4 leading-relaxed">
            Preuves filmées de nos interventions chez des particuliers à Brazzaville. Regardez comment fonctionnent les équipements installés et configurés par notre équipe.
          </p>
        </div>

        {/* 1. Galerie des 6 vidéos en grille */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-noir-800">
            <h2 className="font-titre text-xl uppercase tracking-accroche text-or">
              Vidéos d&apos;installations réelles (06)
            </h2>
            <span className="font-texte text-xs text-ivoire-800">
              Format vertical smartphone
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((v, idx) => (
              <div
                key={v.id}
                className="border border-noir-700 bg-noir-900 group cursor-pointer transition-colors hover:border-or flex flex-col justify-between"
                onClick={() => setIndexVideoActive(idx)}
              >
                {/* Poster 9/16 */}
                <div className="relative aspect-[9/16] w-full bg-noir-950 overflow-hidden">
                  <Image
                    src={v.poster}
                    alt={v.titre}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                    <div className="flex h-14 w-14 items-center justify-center border border-or bg-noir text-or group-hover:bg-or group-hover:text-noir transition-colors">
                      <svg className="h-6 w-6 fill-current ml-0.5" viewBox="0 0 24 24">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-noir/80 border border-noir-700 px-2.5 py-1 font-titre text-[10px] uppercase tracking-wide text-ivoire">
                    Démo 0{idx + 1}
                  </div>
                </div>

                {/* Titre et call to action */}
                <div className="p-5 border-t border-noir-800">
                  <h3 className="font-titre text-sm uppercase tracking-accroche text-ivoire group-hover:text-or transition-colors">
                    {v.titre}
                  </h3>
                  <div className="mt-4 flex items-center justify-between text-[11px] text-ivoire-800 pt-2 border-t border-noir-800">
                    <span>Installation Neodomotique</span>
                    <span className="text-or group-hover:underline flex items-center gap-1">
                      Lire la vidéo <IconFlecheDroite className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Espace prévu pour de futures photos (état vide propre) */}
        <section className="mb-20 border border-noir-800 bg-noir-950 p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="h-10 w-10 border border-noir-700 bg-noir-900 flex items-center justify-center text-or">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                <polyline points="21 15 16 10 5 21" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <span className="font-titre text-xs uppercase tracking-logo text-or block mb-1">
            Galerie Photographique
          </span>
          <h2 className="font-titre text-xl uppercase tracking-accroche text-ivoire">
            Prochainement : Photos Haute Résolution
          </h2>
          <p className="font-texte text-sm text-ivoire-700 mt-2 max-w-md mx-auto leading-relaxed">
            Nos installateurs photographient actuellement les finitions d&apos;interrupteurs tactiles et d&apos;éclairages d&apos;ambiance sur nos chantiers de Brazzaville et Pointe-Noire.
          </p>
          <div className="mt-6">
            <span className="inline-block border border-noir-700 px-4 py-1.5 font-titre text-[10px] uppercase tracking-wide text-ivoire-800">
              État vide propre · Disponibilité prochaine
            </span>
          </div>
        </section>

        {/* 3. Bandeau WhatsApp */}
        <WhatsAppBanner
          titre="Vous souhaitez voir un cas similaire à votre logement ?"
          sousTitre="Contactez-nous sur WhatsApp, nous pouvons vous envoyer des extraits vidéo ciblés sur vos équipements."
          messagePredefini="Bonjour, je souhaite des vidéos de démonstration pour un appartement similaire au mien."
        />

        {/* 4. Modale Vidéo avec Navigation Précédente / Suivante et Échap */}
        {videoActive && indexVideoActive !== null && (
          <Modal
            ouvert={true}
            onFermer={() => setIndexVideoActive(null)}
            titre={videoActive.titre}
            sousTitre={`Vidéo ${indexVideoActive + 1} sur ${videos.length} · Navigation au clavier avec les flèches ou les boutons`}
            taille="md"
          >
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[9/16] max-h-[65vh] mx-auto w-full bg-noir-950 overflow-hidden border border-noir-800">
                <video
                  key={videoActive.src}
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

              {/* Contrôles de navigation Précédente / Suivante */}
              <div className="flex items-center justify-between pt-2 border-t border-noir-800">
                <Button
                  variant="neutre"
                  size="sm"
                  onClick={passerPrecedente}
                >
                  ← Vidéo précédente
                </Button>
                <span className="font-titre text-xs text-ivoire-800">
                  {indexVideoActive + 1} / {videos.length}
                </span>
                <Button
                  variant="neutre"
                  size="sm"
                  onClick={passerSuivante}
                >
                  Vidéo suivante →
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
