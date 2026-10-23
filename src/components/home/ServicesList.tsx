"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconAmpoule,
  IconPrise,
  IconWifi,
  IconSmartphone,
  IconMicro,
  IconTelecommande,
} from "../Icons";

interface ServiceItem {
  id: string;
  numero: string;
  titre: string;
  phrase: string;
  icone: React.ReactNode;
}

const servicesData: ServiceItem[] = [
  {
    id: "eclairage",
    numero: "01",
    titre: "Éclairage intelligent",
    phrase: "Allumage, extinction et variation de 16 millions de couleurs depuis votre smartphone ou à la voix, sans vous déplacer.",
    icone: <IconAmpoule className="w-5 h-5 text-or" />,
  },
  {
    id: "appareils",
    numero: "02",
    titre: "Contrôle total de vos appareils",
    phrase: "Gestion de votre téléviseur, climatiseur, ventilateur et appareils électroménagers via télécommande infrarouge et prises connectées.",
    icone: <IconTelecommande className="w-5 h-5 text-or" />,
  },
  {
    id: "wifi",
    numero: "03",
    titre: "Réseau Wi-Fi optimisé",
    phrase: "Configuration et optimisation de votre couverture sans fil pour garantir une réactivité immédiate de chaque équipement domotique.",
    icone: <IconWifi className="w-5 h-5 text-or" />,
  },
  {
    id: "automatisation",
    numero: "04",
    titre: "Automatisation sur mesure",
    phrase: "Création de scénarios quotidiens : extinction générale au coucher, allumage progressif au réveil et programmation horaire.",
    icone: <IconPrise className="w-5 h-5 text-or" />,
  },
  {
    id: "vocal",
    numero: "05",
    titre: "Commande vocale avec Alexa",
    phrase: "Pilotez vos luminaires et vos pièces au son de votre voix grâce aux assistants vocaux connectés Echo Pop et Echo Dot.",
    icone: <IconMicro className="w-5 h-5 text-or" />,
  },
  {
    id: "smartphone",
    numero: "06",
    titre: "Gestion complète depuis votre smartphone",
    phrase: "Une interface claire sur votre téléphone pour garder la maîtrise de votre maison où que vous soyez, chez vous ou en déplacement.",
    icone: <IconSmartphone className="w-5 h-5 text-or" />,
  },
];

export function ServicesList() {
  const [actif, setActif] = useState<string | null>("eclairage");

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-noir-800">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <span className="font-titre text-xs uppercase tracking-logo text-or block mb-1">
            Ce que nous installons
          </span>
          <h2 className="font-titre text-2xl sm:text-3xl uppercase tracking-accroche text-ivoire">
            Les six services Neodomotique
          </h2>
        </div>
        <Link
          href="/services"
          className="font-titre text-xs uppercase tracking-accroche text-ivoire-700 hover:text-or transition-colors py-1 border-b border-noir-700 hover:border-or self-start sm:self-auto"
        >
          Découvrir le détail des services →
        </Link>
      </div>

      {/* Liste numérotée de 01 à 06 en lignes séparées par un filet fin (PAS de 3 cartes alignées) */}
      <div className="border-t border-b border-or/20 divide-y divide-noir-800">
        {servicesData.map((service) => {
          const estOuvert = actif === service.id;
          return (
            <div
              key={service.id}
              className={`transition-colors cursor-pointer group ${
                estOuvert ? "bg-noir-900/60" : "hover:bg-noir-950"
              }`}
              onClick={() => setActif(estOuvert ? null : service.id)}
            >
              <div className="flex items-center justify-between py-5 px-4 sm:px-6">
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Numéro 01 à 06 */}
                  <span className="font-titre text-sm sm:text-base font-light text-or tracking-wide w-8 shrink-0">
                    {service.numero}
                  </span>

                  {/* Icône fine */}
                  <span className="shrink-0">{service.icone}</span>

                  {/* Titre du service */}
                  <h3 className="font-titre text-base sm:text-lg uppercase tracking-wide text-ivoire group-hover:text-or transition-colors">
                    {service.titre}
                  </h3>
                </div>

                {/* Indicateur d'ouverture sobre */}
                <span className="font-titre text-sm text-ivoire-800 group-hover:text-or transition-colors pl-4">
                  {estOuvert ? "—" : "+"}
                </span>
              </div>

              {/* Phrase factuelle qui s'ouvre au survol ou toucher */}
              {estOuvert && (
                <div className="px-4 sm:px-6 pb-6 pt-1 pl-16 sm:pl-20">
                  <p className="font-texte text-sm text-ivoire-700 max-w-2xl leading-relaxed">
                    {service.phrase}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
