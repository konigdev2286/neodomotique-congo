"use client";

import React, { useState } from "react";
import Image from "next/image";
import { site, lienWhatsApp } from "@/data/site";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { WhatsAppBanner } from "@/components/WhatsAppBanner";
import {
  IconAmpoule,
  IconPrise,
  IconWifi,
  IconSmartphone,
  IconMicro,
  IconTelecommande,
} from "@/components/Icons";

interface ServiceDetail {
  id: string;
  numero: string;
  titre: string;
  accroche: string;
  points: string[];
  visuelType: "video" | "image";
  visuelSrc: string;
  visuelPoster?: string;
  icone: React.ReactNode;
}

const servicesDetailles: ServiceDetail[] = [
  {
    id: "eclairage",
    numero: "01",
    titre: "Éclairage intelligent",
    accroche: "16 millions de couleurs et contrôle complet à distance de tous vos points lumineux.",
    points: [
      "Allumage et extinction instantanés depuis le smartphone ou à la voix",
      "Variateur d'intensité et palette de 16 millions de couleurs d'ambiance",
      "Remplacement propre des ampoules ou des interrupteurs existants (interrupteur wifi 2 gang)",
      "Programmation horaire automatique (coucher du soleil, réveil)",
    ],
    visuelType: "video",
    visuelSrc: "/videos/demo-01-couleurs-smartphone.mp4",
    visuelPoster: "/posters/demo-01-couleurs-smartphone.jpg",
    icone: <IconAmpoule className="w-6 h-6 text-or" />,
  },
  {
    id: "appareils",
    numero: "02",
    titre: "Contrôle total de vos appareils",
    accroche: "Pilotez téléviseur, climatiseur, ventilateur et électroménager sans vous déplacer.",
    points: [
      "Télécommande universelle infrarouge connectée pour centraliser tous vos appareils",
      "Prises intelligentes avec coupure à distance pour économiser l'électricité",
      "Minuterie et suivi de mise sous tension",
      "Compatibilité avec toutes les marques courantes d'appareils à Brazzaville",
    ],
    visuelType: "video",
    visuelSrc: "/videos/demo-04-installation-complete.mp4",
    visuelPoster: "/posters/demo-04-installation-complete.jpg",
    icone: <IconTelecommande className="w-6 h-6 text-or" />,
  },
  {
    id: "wifi",
    numero: "03",
    titre: "Réseau Wi-Fi optimisé",
    accroche: "Un réseau domestique stable et sécurisé pour connecter tous vos modules domotiques.",
    points: [
      "Configuration complète des bandes 2.4 GHz requises par les équipements domotiques",
      "Test de couverture et d'atténuation dans chaque pièce de votre logement",
      "Sécurisation des accès et isolation des appareils connectés",
    ],
    visuelType: "image",
    visuelSrc: "/images/flyers/le-confort-du-futur.jpg",
    icone: <IconWifi className="w-6 h-6 text-or" />,
  },
  {
    id: "automatisation",
    numero: "04",
    titre: "Automatisation sur mesure",
    accroche: "Votre maison s'adapte à vos habitudes quotidiennes automatiquement.",
    points: [
      "Scénario « Départ » : extinction générale de toutes les lumières et coupure des prises non essentielles",
      "Scénario « Nuit » : tamisage doux et climatisation régulée",
      "Scénario « Réveil » : allumage progressif et mise en marche du ventilateur",
    ],
    visuelType: "video",
    visuelSrc: "/videos/demo-06-reveil-smart.mp4",
    visuelPoster: "/posters/demo-06-reveil-smart.jpg",
    icone: <IconPrise className="w-6 h-6 text-or" />,
  },
  {
    id: "vocal",
    numero: "05",
    titre: "Commande vocale avec Alexa",
    accroche: "« Alexa, allume le salon » — pilotez chaque pièce simplement au son de votre voix.",
    points: [
      "Installation et appairage des assistants vocaux Echo Pop ou Echo Dot",
      "Création de groupes de pièces (chambre, salon, terrasse, couloir)",
      "Commandes vocales en français simples, naturelles et réactives",
      "Fonctionne sans toucher le smartphone",
    ],
    visuelType: "video",
    visuelSrc: "/videos/demo-02-assistant-vocal.mp4",
    visuelPoster: "/posters/demo-02-assistant-vocal.jpg",
    icone: <IconMicro className="w-6 h-6 text-or" />,
  },
  {
    id: "smartphone",
    numero: "06",
    titre: "Gestion complète depuis votre smartphone",
    accroche: "Une application unique, fluide et intuitive disponible sur iOS et Android.",
    points: [
      "Contrôle à distance depuis n'importe où (au bureau, en voyage, à Pointe-Noire)",
      "Partage d'accès simple avec tous les membres de votre famille",
      "Notifications en direct de l'état de vos lumières et prises",
      "Configuration et prise en main accompagnées par nos installateurs",
    ],
    visuelType: "video",
    visuelSrc: "/videos/demo-03-bonjour-nuit.mp4",
    visuelPoster: "/posters/demo-03-bonjour-nuit.jpg",
    icone: <IconSmartphone className="w-6 h-6 text-or" />,
  },
];

export default function ServicesPage() {
  const [videoModale, setVideoModale] = useState<{ src: string; titre: string; poster?: string } | null>(null);


  return (
    <div className="min-h-screen bg-noir text-ivoire py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* En-tête de la page */}
        <div className="border-b border-or/20 pb-8 mb-16 max-w-3xl">
          <span className="font-titre text-xs uppercase tracking-logo text-or block mb-1">
            Expertise & Prestations
          </span>
          <h1 className="font-titre text-3xl sm:text-5xl uppercase tracking-logo text-ivoire">
            Nos Six Services Domotiques
          </h1>
          <p className="font-texte text-base text-ivoire-700 mt-4 leading-relaxed">
            Chaque service répond à un besoin concret de votre quotidien : confort, sécurité et économie d&apos;énergie. Présentation détaillée avec les démonstrations réelles de nos installations.
          </p>
        </div>

        {/* 6 Sections alternées (gauche / droite) */}
        <div className="space-y-24">
          {servicesDetailles.map((service, index) => {
            const inversion = index % 2 === 1;

            return (
              <section
                key={service.id}
                id={service.id}
                className="border-t border-noir-800 pt-16"
              >
                <div
                  className={`flex flex-col lg:flex-row items-center gap-12 ${
                    inversion ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Colonne Texte */}
                  <div className="w-full lg:w-1/2 flex flex-col">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="font-titre text-sm font-light text-or tracking-wide">
                        {service.numero} / 06
                      </span>
                      <span className="shrink-0">{service.icone}</span>
                    </div>

                    <h2 className="font-titre text-2xl sm:text-3xl uppercase tracking-accroche text-ivoire">
                      {service.titre}
                    </h2>
                    <p className="font-titre text-base uppercase tracking-wide text-or mt-2 font-normal">
                      {service.accroche}
                    </p>

                    {/* Faits concrets */}
                    <ul className="mt-6 space-y-3 font-texte text-sm text-ivoire-700 border-l border-or/30 pl-4">
                      {service.points.map((point, pIdx) => (
                        <li key={pIdx} className="leading-relaxed">
                          • {point}
                        </li>
                      ))}
                    </ul>

                    {/* Action rapide WhatsApp */}
                    <div className="mt-8 pt-4">
                      <Button
                        variant="secondaire"
                        size="md"
                        href={lienWhatsApp(`Bonjour, je souhaite des informations sur le service : ${service.titre}.`)}
                        isExternal
                      >
                        Demander un devis pour ce service
                      </Button>
                    </div>
                  </div>

                  {/* Colonne Visuel / Vidéo associée */}
                  <div className="w-full lg:w-1/2">
                    {service.visuelType === "video" ? (
                      <div
                        className="relative aspect-[9/16] max-h-[460px] mx-auto w-full max-w-sm border border-noir-700 bg-noir-900 overflow-hidden group cursor-pointer"
                        onClick={() =>
                          setVideoModale({
                            src: service.visuelSrc,
                            titre: service.titre,
                            poster: service.visuelPoster,
                          })
                        }
                      >
                        {service.visuelPoster && (
                          <Image
                            src={service.visuelPoster}
                            alt={service.titre}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                          <div className="flex h-14 w-14 items-center justify-center border border-or bg-noir text-or group-hover:bg-or group-hover:text-noir transition-colors">
                            <svg className="h-6 w-6 fill-current ml-0.5" viewBox="0 0 24 24">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-3 inset-x-3 bg-noir/80 border border-noir-700 p-2 text-center font-titre text-[10px] uppercase tracking-wide text-ivoire">
                          Démonstration réelle vidéo (cliquer pour voir)
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-video max-h-[380px] w-full border border-noir-700 bg-noir-900 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                        <Image
                          src={service.visuelSrc}
                          alt={service.titre}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Bandeau WhatsApp final */}
        <div className="mt-24">
          <WhatsAppBanner
            titre="Vous souhaitez combiner plusieurs services ?"
            sousTitre="Nos techniciens assemblent les modules selon vos besoins et votre budget."
            messagePredefini="Bonjour, je souhaite assembler plusieurs services pour mon logement."
          />
        </div>

        {/* Modale de lecture vidéo */}
        {videoModale && (
          <Modal
            ouvert={!!videoModale}
            onFermer={() => setVideoModale(null)}
            titre={videoModale.titre}
            sousTitre="Démonstration réelle tournée chez nos clients"
            taille="md"
          >
            <div className="relative aspect-[9/16] max-h-[70vh] mx-auto w-full bg-noir-950 overflow-hidden border border-noir-800">
              <video
                src={videoModale.src}
                poster={videoModale.poster}
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
      </div>
    </div>
  );
}

