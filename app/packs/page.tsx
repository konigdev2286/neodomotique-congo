"use client";

import React, { useState } from "react";
import Image from "next/image";
import { site, lienWhatsApp } from "@/data/site";
import { packs } from "@/data/packs";
import { formatFCFA } from "@/lib/format";
import { Button } from "@/components/Button";
import { EquipmentLine } from "@/components/EquipmentLine";
import { WhatsAppBanner } from "@/components/WhatsAppBanner";
import { IconCheck } from "@/components/Icons";

export default function PacksPage() {
  const [optionAlternativeConfort, setOptionAlternativeConfort] = useState(false);

  const packStarter = packs[0];
  const packConfort = packs[1];

  const messageStarter = `Bonjour, je souhaite commander le ${packStarter.nom} à ${formatFCFA(packStarter.prix)} avec installation incluse.`;
  const messageConfort = optionAlternativeConfort
    ? `Bonjour, je souhaite commander le ${packConfort.nom} (option Interrupteur wifi 2 gang) à ${formatFCFA(packConfort.prix)} avec installation incluse.`
    : `Bonjour, je souhaite commander le ${packConfort.nom} à ${formatFCFA(packConfort.prix)} avec installation incluse.`;

  // Données du tableau comparatif
  const lignesComparatif = [
    {
      critere: "Assistant vocal intelligent",
      starter: "1× Echo Pop (Alexa)",
      confort: "1× Echo Dot (Alexa, son supérieur)",
    },
    {
      critere: "Éclairage connecté",
      starter: "2× Ampoules RGB 16 millions de couleurs",
      confort: optionAlternativeConfort
        ? "1× Interrupteur tactile Wi-Fi 2 gang"
        : "2× Ampoules RGB 16 millions de couleurs (ou interrupteur)",
    },
    {
      critere: "Télécommande universelle",
      starter: "1× Télécommande IR (TV, clim, ventilateur)",
      confort: "1× Télécommande IR (TV, clim, ventilateur)",
    },
    {
      critere: "Prises connectées",
      starter: "1× Prise intelligente (minuterie & programmation)",
      confort: "2× Prises intelligentes (minuterie & programmation)",
    },
    {
      critere: "Installation & Configuration",
      starter: "Incluse à Brazzaville et Pointe-Noire",
      confort: "Incluse à Brazzaville et Pointe-Noire",
    },
    {
      critere: "Période d'assistance",
      starter: "30 jours d'assistance inclus",
      confort: "30 jours d'assistance inclus",
    },
    {
      critere: "Prix tout compris",
      starter: formatFCFA(packStarter.prix),
      confort: formatFCFA(packConfort.prix),
      estPrix: true,
    },
  ];

  return (
    <div className="min-h-screen bg-noir text-ivoire py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* En-tête de la page */}
        <div className="border-b border-or/20 pb-8 mb-16 max-w-3xl">
          <span className="font-titre text-xs uppercase tracking-logo text-or block mb-1">
            Formules Clés en Main
          </span>
          <h1 className="font-titre text-3xl sm:text-5xl uppercase tracking-logo text-ivoire">
            Nos Packs Domotiques
          </h1>
          <p className="font-texte text-base text-ivoire-700 mt-4 leading-relaxed">
            Deux solutions pensées pour équiper immédiatement votre studio ou votre appartement. Prix fixes, matériel garanti et installation professionnelle complète réalisée chez vous.
          </p>
        </div>

        {/* 1. Les Deux Packs en Grand Format */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {/* Pack Starter */}
          <div
            id={packStarter.id}
            className="border border-noir-700 bg-noir-900 p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-64 sm:h-72 w-full bg-noir-950 border-b border-noir-800 mb-6 overflow-hidden">
                <Image
                  src={packStarter.image}
                  alt={packStarter.nom}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>

              <span className="font-titre text-xs uppercase tracking-logo text-or">
                Entrée dans la maison connectée
              </span>
              <h2 className="font-titre text-2xl sm:text-3xl uppercase tracking-accroche text-ivoire mt-1">
                {packStarter.nom}
              </h2>
              <p className="font-texte text-sm text-ivoire-700 mt-2">
                {packStarter.description}
              </p>

              {/* Contenu détaillé */}
              <div className="mt-8 pt-6 border-t border-noir-800">
                <span className="font-titre text-xs uppercase tracking-accroche text-ivoire-800 block mb-3">
                  Équipements inclus :
                </span>
                <div className="divide-y divide-noir-800">
                  {packStarter.contenu.map((l, i) => (
                    <EquipmentLine key={i} ligne={l} interactive={false} />
                  ))}
                </div>
              </div>
            </div>

            {/* Prix et CTA */}
            <div className="mt-8 pt-6 border-t border-noir-800 bg-noir-950/60 p-4">
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-texte text-xs text-ivoire-800">Prix forfaitaire</span>
                <span className="font-titre text-3xl font-normal text-or">
                  {formatFCFA(packStarter.prix)}
                </span>
              </div>
              <Button
                variant="primaire"
                size="lg"
                href={lienWhatsApp(messageStarter)}
                isExternal
                fullWidth
              >
                Choisir le Pack Starter
              </Button>
            </div>
          </div>

          {/* Pack Confort */}
          <div
            id={packConfort.id}
            className="border border-or bg-noir-900 p-6 sm:p-8 flex flex-col justify-between relative"
          >
            <div className="absolute -top-3 left-8 border border-or bg-noir px-3 py-0.5 font-titre text-[10px] uppercase tracking-logo text-or">
              Formule la plus complète
            </div>

            <div>
              <div className="relative h-64 sm:h-72 w-full bg-noir-950 border-b border-noir-800 mb-6 overflow-hidden">
                <Image
                  src={packConfort.image}
                  alt={packConfort.nom}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>

              <span className="font-titre text-xs uppercase tracking-logo text-or">
                Confort & Contrôle maximal
              </span>
              <h2 className="font-titre text-2xl sm:text-3xl uppercase tracking-accroche text-ivoire mt-1">
                {packConfort.nom}
              </h2>
              <p className="font-texte text-sm text-ivoire-700 mt-2">
                {packConfort.description}
              </p>

              {/* Sélecteur d'alternative ampoules / interrupteur */}
              <div className="my-6 p-4 border border-or/40 bg-noir-950">
                <span className="font-titre text-xs uppercase tracking-accroche text-or block mb-2">
                  Personnalisation de l&apos;éclairage :
                </span>
                <p className="font-texte text-xs text-ivoire-700 mb-3">
                  Choisissez selon vos préférences (le prix reste identique à 150 000 FCFA) :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOptionAlternativeConfort(false)}
                    className={`p-2.5 text-left border font-titre text-xs uppercase tracking-wide transition-colors ${
                      !optionAlternativeConfort
                        ? "border-or bg-or text-noir font-medium"
                        : "border-noir-700 bg-noir-900 text-ivoire-700 hover:border-noir-600"
                    }`}
                  >
                    2× Ampoules RGB
                  </button>
                  <button
                    type="button"
                    onClick={() => setOptionAlternativeConfort(true)}
                    className={`p-2.5 text-left border font-titre text-xs uppercase tracking-wide transition-colors ${
                      optionAlternativeConfort
                        ? "border-or bg-or text-noir font-medium"
                        : "border-noir-700 bg-noir-900 text-ivoire-700 hover:border-noir-600"
                    }`}
                  >
                    1× Interrupteur wifi 2 gang
                  </button>
                </div>
              </div>

              {/* Contenu détaillé du Pack Confort */}
              <div className="pt-2 border-t border-noir-800">
                <span className="font-titre text-xs uppercase tracking-accroche text-ivoire-800 block mb-3">
                  Équipements inclus :
                </span>
                <div className="divide-y divide-noir-800">
                  {packConfort.contenu.map((l, i) => (
                    <EquipmentLine
                      key={i}
                      ligne={l}
                      varianteAlternative={optionAlternativeConfort}
                      interactive={false}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Prix et CTA */}
            <div className="mt-8 pt-6 border-t border-noir-800 bg-noir-950/60 p-4">
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-texte text-xs text-ivoire-800">Prix forfaitaire</span>
                <span className="font-titre text-3xl font-normal text-or">
                  {formatFCFA(packConfort.prix)}
                </span>
              </div>
              <Button
                variant="primaire"
                size="lg"
                href={lienWhatsApp(messageConfort)}
                isExternal
                fullWidth
              >
                Choisir le Pack Confort
              </Button>
            </div>
          </div>
        </div>

        {/* 2. Tableau Comparatif Starter / Confort (lisible sur téléphone sans scroll horizontal) */}
        <section className="mb-20 border border-noir-700 bg-noir-900 p-6 sm:p-10">
          <div className="mb-8 max-w-2xl">
            <span className="font-titre text-xs uppercase tracking-logo text-or block mb-1">
              Vue comparative
            </span>
            <h2 className="font-titre text-xl sm:text-3xl uppercase tracking-accroche text-ivoire">
              Tableau comparatif des formules
            </h2>
            <p className="font-texte text-xs sm:text-sm text-ivoire-700 mt-2">
              Chaque ligne détaille les spécifications matérielles et les services associés.
            </p>
          </div>

          {/* Tableau Bureau (md et plus) */}
          <div className="hidden md:block overflow-hidden border border-noir-800">
            <table className="w-full text-left font-texte text-sm border-collapse">
              <thead>
                <tr className="border-b border-noir-700 bg-noir-950 font-titre uppercase tracking-accroche text-xs">
                  <th className="py-4 px-6 text-ivoire-800 font-normal">Critère</th>
                  <th className="py-4 px-6 text-ivoire font-normal w-1/3">Pack Studio Starter</th>
                  <th className="py-4 px-6 text-or font-normal w-1/3 border-l border-noir-800">
                    Pack Studio Confort
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-noir-800">
                {lignesComparatif.map((ligne, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors hover:bg-noir-950/40 ${
                      ligne.estPrix ? "bg-noir-950 font-medium" : ""
                    }`}
                  >
                    <td className="py-4 px-6 font-titre text-xs uppercase tracking-wide text-ivoire">
                      {ligne.critere}
                    </td>
                    <td
                      className={`py-4 px-6 ${
                        ligne.estPrix ? "font-titre text-2xl text-or" : "text-ivoire-700"
                      }`}
                    >
                      {ligne.starter}
                    </td>
                    <td
                      className={`py-4 px-6 border-l border-noir-800 ${
                        ligne.estPrix ? "font-titre text-2xl text-or" : "text-ivoire-700"
                      }`}
                    >
                      {ligne.confort}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Version Mobile empilée sans aucun défilement horizontal */}
          <div className="md:hidden space-y-6">
            {lignesComparatif.map((ligne, idx) => (
              <div
                key={idx}
                className="border border-noir-800 bg-noir-950 p-4 flex flex-col gap-3"
              >
                <span className="font-titre text-xs uppercase tracking-wide text-or border-b border-noir-800 pb-2">
                  {ligne.critere}
                </span>

                <div className="flex flex-col gap-2">
                  <div>
                    <span className="font-texte text-[11px] text-ivoire-800 block">
                      Pack Starter :
                    </span>
                    <span
                      className={`font-texte text-sm ${
                        ligne.estPrix ? "font-titre text-xl text-or" : "text-ivoire-700"
                      }`}
                    >
                      {ligne.starter}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-noir-800">
                    <span className="font-texte text-[11px] text-or/80 block">
                      Pack Confort :
                    </span>
                    <span
                      className={`font-texte text-sm ${
                        ligne.estPrix ? "font-titre text-xl text-or" : "text-ivoire"
                      }`}
                    >
                      {ligne.confort}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA du tableau */}
          <div className="mt-8 pt-6 border-t border-noir-800 flex flex-col sm:flex-row justify-end gap-4">
            <Button
              variant="secondaire"
              size="md"
              href={lienWhatsApp(messageStarter)}
              isExternal
            >
              Commander Starter (110 000 FCFA)
            </Button>
            <Button
              variant="primaire"
              size="md"
              href={lienWhatsApp(messageConfort)}
              isExternal
            >
              Commander Confort (150 000 FCFA)
            </Button>
          </div>
        </section>

        {/* 3. Bandeau WhatsApp final */}
        <WhatsAppBanner
          titre="Besoin d'une configuration personnalisée hors pack ?"
          sousTitre="Nous étudions gratuitement votre plan pour équiper 3 pièces, une maison ou un duplex complet."
          messagePredefini="Bonjour, je souhaite un devis personnalisé pour équiper plusieurs pièces."
        />
      </div>
    </div>
  );
}
