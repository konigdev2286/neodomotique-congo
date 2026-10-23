import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/data/site";
import { formatFCFA } from "@/lib/format";

import { DesignGallery } from "@/components/DesignGallery";

export const metadata: Metadata = {
  title: `Système de Design & Composants | ${site.nom}`,
  description: "Tokens, typographies, espacements et composants complets du système visuel Neodomotique Congo.",
};

export default function DesignSystemPage() {
  const couleursOr = [

    { nom: "Or Principal (Logo)", code: "#C49C4F", classe: "bg-or text-noir", role: "Couleur signature, accents majeurs, boutons primaires, prix" },
    { nom: "Or Clair (Accent)", code: "#E3C77A", classe: "bg-or-clair text-noir", role: "Points lumineux, état de survol des éléments or" },
    { nom: "Or Foncé (Filets)", code: "#8E6F2E", classe: "bg-or-fonce text-ivoire", role: "Bordures, séparateurs discrets, contrastes atténués" },
    { nom: "Or Subtil (Bordures)", code: "rgba(196,156,79,0.2)", classe: "bg-or/20 text-ivoire border border-or/40", role: "Filets horizontaux et verticaux des sections" },
  ];

  const couleursNoir = [
    { nom: "Noir Fond (Page)", code: "#050505", classe: "bg-noir text-ivoire border border-noir-700", role: "Fond principal du site, nuit totale" },
    { nom: "Noir 900 (Surfaces)", code: "#0A0A0A", classe: "bg-noir-900 text-ivoire border border-noir-700", role: "Pied de page, en-tête, panneaux" },
    { nom: "Noir 800 (Cartes)", code: "#121212", classe: "bg-noir-800 text-ivoire border border-noir-700", role: "Conteneurs de packs, modales" },
    { nom: "Noir 700 (Séparateurs)", code: "#1C1C1C", classe: "bg-noir-700 text-ivoire", role: "Bordures neutres secondaires" },
    { nom: "Noir 600 (Bordures)", code: "#2A2A2A", classe: "bg-noir-600 text-ivoire", role: "Bordures de contrôle au repos" },
  ];

  const couleursIvoire = [
    { nom: "Ivoire (Texte principal)", code: "#F3EEE4", classe: "bg-ivoire text-noir", role: "Titres, textes courants à fort contraste" },
    { nom: "Ivoire 700 (Secondaire)", code: "#C9C3B6", classe: "bg-ivoire-700 text-noir", role: "Descriptions secondaires, métadonnées" },
    { nom: "Ivoire 800 (Estompé)", code: "#A39E93", classe: "bg-ivoire-800 text-noir", role: "Mentions légales, notes de bas de page" },
  ];

  const espacements = [
    { taille: "8 px", token: "p-2 / gap-2", px: 8, usage: "Espacement minimum, micro-marges" },
    { taille: "16 px", token: "p-4 / gap-4", px: 16, usage: "Espacement standard entre petits éléments" },
    { taille: "24 px", token: "p-6 / gap-6", px: 24, usage: "Padding intérieur des cartes et panneaux" },
    { taille: "32 px", token: "p-8 / gap-8", px: 32, usage: "Marges moyennes de sections" },
    { taille: "40 px", token: "p-10 / gap-10", px: 40, usage: "Séparations majeures de blocs" },
    { taille: "48 px", token: "p-12 / gap-12", px: 48, usage: "Padding de respirations d'écrans" },
    { taille: "64 px", token: "p-16 / gap-16", px: 64, usage: "Espacements de modules verticaux" },
    { taille: "72 px", token: "h-18 / py-18", px: 72, usage: "Hauteur de l'en-tête de navigation" },
    { taille: "88 px", token: "py-22", px: 88, usage: "Espacement des grandes sections sur bureau" },
  ];

  return (
    <div className="min-h-screen bg-noir text-ivoire py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* En-tête de la page */}
        <div className="border-b border-or/20 pb-8 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative h-12 w-12 shrink-0">
              <Image
                src="/brand/logo-icone.png"
                alt="Logo icône"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-titre text-xs uppercase tracking-logo text-or">
                Neodomotique Congo
              </span>
              <h1 className="font-titre text-2xl sm:text-3xl uppercase tracking-logo text-ivoire mt-1">
                Système de Design · Phase 1
              </h1>
            </div>
          </div>
          <p className="font-texte text-base text-ivoire-700 max-w-3xl leading-relaxed">
            Fondation visuelle « La maison qui s&apos;allume ». Nuit totale en noir profond, lumière chaude et or signature du logo. Grille stricte de 8 px, typographies Jost et Source Sans 3, zéro effet de verre, zéro dégradé multicolore.
          </p>
        </div>

        {/* 1. PALETTE DE COULEURS */}
        <section className="mb-16">
          <div className="flex items-center justify-between pb-3 border-b border-noir-700 mb-6">
            <h2 className="font-titre text-lg uppercase tracking-accroche text-or">
              01 · Palette Chromatique
            </h2>
            <span className="font-texte text-xs text-ivoire-800">
              WCAG AA vérifié (contraste élevé)
            </span>
          </div>

          {/* Nuances Or */}
          <div className="mb-8">
            <h3 className="font-titre text-xs uppercase tracking-accroche text-ivoire mb-3">
              Nuances d&apos;or (Signature & Lumière)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {couleursOr.map((c) => (
                <div key={c.nom} className="border border-noir-700 bg-noir-900 p-4">
                  <div className={`h-16 w-full ${c.classe} flex items-end p-2 mb-3 rounded-none`}>
                    <span className="font-titre text-xs font-bold">{c.code}</span>
                  </div>
                  <h4 className="font-titre text-xs uppercase tracking-wide text-ivoire">
                    {c.nom}
                  </h4>
                  <p className="font-texte text-xs text-ivoire-700 mt-1 leading-normal">
                    {c.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Nuances Noir */}
          <div className="mb-8">
            <h3 className="font-titre text-xs uppercase tracking-accroche text-ivoire mb-3">
              Nuances de noir (La Nuit Sombre)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {couleursNoir.map((c) => (
                <div key={c.nom} className="border border-noir-700 bg-noir-900 p-3">
                  <div className={`h-12 w-full ${c.classe} flex items-end p-2 mb-2 rounded-none`}>
                    <span className="font-titre text-[10px] tracking-wide">{c.code}</span>
                  </div>
                  <h4 className="font-titre text-[11px] uppercase tracking-wide text-ivoire">
                    {c.nom}
                  </h4>
                  <p className="font-texte text-[11px] text-ivoire-800 mt-1 leading-tight">
                    {c.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Nuances Ivoire */}
          <div>
            <h3 className="font-titre text-xs uppercase tracking-accroche text-ivoire mb-3">
              Nuances d&apos;ivoire (Textes & Lisibilité)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {couleursIvoire.map((c) => (
                <div key={c.nom} className="border border-noir-700 bg-noir-900 p-4">
                  <div className={`h-14 w-full ${c.classe} flex items-end p-2 mb-3 rounded-none`}>
                    <span className="font-titre text-xs font-bold">{c.code}</span>
                  </div>
                  <h4 className="font-titre text-xs uppercase tracking-wide text-ivoire">
                    {c.nom}
                  </h4>
                  <p className="font-texte text-xs text-ivoire-700 mt-1 leading-normal">
                    {c.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. TYPOGRAPHIES */}
        <section className="mb-16">
          <div className="flex items-center justify-between pb-3 border-b border-noir-700 mb-6">
            <h2 className="font-titre text-lg uppercase tracking-accroche text-or">
              02 · Échelle Typographique
            </h2>
            <span className="font-texte text-xs text-ivoire-800">
              Jost (Titres) · Source Sans 3 (Texte)
            </span>
          </div>

          <div className="space-y-6 border border-noir-700 bg-noir-900 p-6">
            {/* Titre Principal H1 */}
            <div className="border-b border-noir-800 pb-5">
              <span className="font-titre text-[10px] uppercase tracking-accroche text-or">
                H1 · Jost Variable · Light · Tracking Logo 0.28em
              </span>
              <p className="font-titre text-2xl sm:text-3xl uppercase tracking-logo text-ivoire mt-1">
                Offrez à votre maison le confort du futur
              </p>
            </div>

            {/* Titre de Section H2 */}
            <div className="border-b border-noir-800 pb-5">
              <span className="font-titre text-[10px] uppercase tracking-accroche text-or">
                H2 · Jost Variable · Regular · Tracking Accroche 0.18em
              </span>
              <p className="font-titre text-xl sm:text-2xl uppercase tracking-accroche text-ivoire mt-1">
                Les deux packs d&apos;installation
              </p>
            </div>

            {/* Titre de Carte H3 */}
            <div className="border-b border-noir-800 pb-5">
              <span className="font-titre text-[10px] uppercase tracking-accroche text-or">
                H3 · Jost Variable · Light · Tracking Large 0.12em
              </span>
              <p className="font-titre text-lg uppercase tracking-large text-ivoire mt-1">
                Pack Studio Confort
              </p>
            </div>

            {/* Affichage des Prix en Or */}
            <div className="border-b border-noir-800 pb-5">
              <span className="font-titre text-[10px] uppercase tracking-accroche text-or">
                Prix en grand · Jost · Couleur Or signature
              </span>
              <div className="flex flex-wrap items-baseline gap-6 mt-2">
                <span className="font-titre text-3xl sm:text-4xl font-normal text-or tracking-tight">
                  {formatFCFA(110000)}
                </span>
                <span className="font-titre text-3xl sm:text-4xl font-normal text-or tracking-tight">
                  {formatFCFA(150000)}
                </span>
                <span className="font-texte text-xs text-ivoire-700">
                  (Installation professionnelle incluse)
                </span>
              </div>
            </div>

            {/* Texte de corps */}
            <div className="border-b border-noir-800 pb-5">
              <span className="font-titre text-[10px] uppercase tracking-accroche text-or">
                Corps de texte · Source Sans 3 · Régulier 16px
              </span>
              <p className="font-texte text-base text-ivoire-700 mt-1 max-w-2xl leading-relaxed">
                Transformez votre logement en un espace connecté sans travaux lourds. Nous installons, configurons et testons chaque équipement directement chez vous à Brazzaville et Pointe-Noire.
              </p>
            </div>

            {/* Faits concrets / Mentions */}
            <div>
              <span className="font-titre text-[10px] uppercase tracking-accroche text-or">
                Faits concrets · Ligne de réassurance
              </span>
              <p className="font-texte text-sm text-ivoire-800 mt-1">
                Installation incluse · 30 jours d&apos;assistance · Matériel 100% neuf et garanti
              </p>
            </div>
          </div>
        </section>

        {/* 3. GRILLE D'ESPACEMENT (8 PX) */}
        <section className="mb-16">
          <div className="flex items-center justify-between pb-3 border-b border-noir-700 mb-6">
            <h2 className="font-titre text-lg uppercase tracking-accroche text-or">
              03 · Grille d&apos;Espacement (Multiples de 8 px)
            </h2>
            <span className="font-texte text-xs text-ivoire-800">
              Rigueur géométrique absolue
            </span>
          </div>

          <div className="border border-noir-700 bg-noir-900 p-6 space-y-4">
            {espacements.map((e) => (
              <div key={e.taille} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-noir-800 pb-3">
                <div className="w-48 shrink-0">
                  <span className="font-titre text-xs uppercase tracking-wide text-ivoire">
                    {e.taille}
                  </span>
                  <span className="block font-texte text-[11px] text-ivoire-800">
                    {e.token}
                  </span>
                </div>
                <div className="flex-1 flex items-center">
                  <div
                    className="h-3 bg-or/30 border border-or/60"
                    style={{ width: `${Math.min(e.px * 2, 400)}px` }}
                  />
                </div>
                <div className="w-64 text-right">
                  <span className="font-texte text-xs text-ivoire-700">
                    {e.usage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. MOTIFS SIGNATURES & COMPOSANTS DE BASE */}
        <section className="mb-16">
          <div className="flex items-center justify-between pb-3 border-b border-noir-700 mb-6">
            <h2 className="font-titre text-lg uppercase tracking-accroche text-or">
              04 · Motifs Signatures & Éléments de Base
            </h2>
            <span className="font-texte text-xs text-ivoire-800">
              Le fil d&apos;or et le point lumineux
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Démonstration Fil d'Or & Point */}
            <div className="border border-noir-700 bg-noir-900 p-6">
              <h3 className="font-titre text-xs uppercase tracking-accroche text-or mb-4">
                Le Fil d&apos;Or Vertical Signature
              </h3>
              <p className="font-texte text-xs text-ivoire-700 mb-6 leading-relaxed">
                Issu du logo : un fil d&apos;or fin qui guide le regard à travers les étapes et les sections.
              </p>

              {/* Étapes verticales reliées par le fil */}
              <div className="relative pl-8 space-y-8">
                {/* Filet vertical */}
                <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-or via-or/40 to-transparent" />

                <div className="relative flex items-start gap-4">
                  <div className="absolute -left-8 top-1 h-3.5 w-3.5 bg-or point-or-init rounded-none" />
                  <div>
                    <span className="font-titre text-xs uppercase tracking-wide text-or">Étape 01</span>
                    <p className="font-texte text-sm text-ivoire">Vous nous écrivez sur WhatsApp</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="absolute -left-8 top-1 h-3.5 w-3.5 border border-or bg-noir rounded-none" />
                  <div>
                    <span className="font-titre text-xs uppercase tracking-wide text-ivoire">Étape 02</span>
                    <p className="font-texte text-sm text-ivoire-700">Vous recevez un devis gratuit</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="absolute -left-8 top-1 h-3.5 w-3.5 border border-or bg-noir rounded-none" />
                  <div>
                    <span className="font-titre text-xs uppercase tracking-wide text-ivoire">Étape 03</span>
                    <p className="font-texte text-sm text-ivoire-700">Nous installons et configurons chez vous</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons et interactions (aucun fade d'opacité au survol) */}
            <div className="border border-noir-700 bg-noir-900 p-6">
              <h3 className="font-titre text-xs uppercase tracking-accroche text-or mb-4">
                Boutons & États (Zéro opacité au survol)
              </h3>
              <p className="font-texte text-xs text-ivoire-700 mb-6 leading-relaxed">
                Le survol change la bordure ou la teinte d&apos;or, jamais l&apos;opacité.
              </p>

              <div className="space-y-4">
                <div>
                  <span className="block font-texte text-[11px] text-ivoire-800 mb-1.5">
                    1. Bouton Principal Plein (Or)
                  </span>
                  <button
                    type="button"
                    className="inline-flex h-11 items-center justify-center border border-or bg-or px-6 font-titre text-xs uppercase tracking-accroche text-noir font-medium hover:bg-or-clair transition-colors"
                  >
                    Devis gratuit sur WhatsApp
                  </button>
                </div>

                <div>
                  <span className="block font-texte text-[11px] text-ivoire-800 mb-1.5">
                    2. Bouton Secondaire (Contour Or)
                  </span>
                  <button
                    type="button"
                    className="inline-flex h-11 items-center justify-center border border-or bg-transparent px-6 font-titre text-xs uppercase tracking-accroche text-or hover:bg-or hover:text-noir transition-colors"
                  >
                    Voir les packs
                  </button>
                </div>

                <div>
                  <span className="block font-texte text-[11px] text-ivoire-800 mb-1.5">
                    3. Bouton Neutre (Sobre Nuit)
                  </span>
                  <button
                    type="button"
                    className="inline-flex h-11 items-center justify-center border border-noir-700 bg-noir-800 px-6 font-titre text-xs uppercase tracking-accroche text-ivoire hover:border-or hover:text-or transition-colors"
                  >
                    Retour à l&apos;étape précédente
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. COMPOSANTS RÉUTILISABLES (PHASE 2) */}
        <section className="mb-16">
          <div className="flex items-center justify-between pb-3 border-b border-noir-700 mb-8">
            <div>
              <span className="font-titre text-[10px] uppercase tracking-logo text-or">
                Phase 2 · Bibliothèque
              </span>
              <h2 className="font-titre text-lg sm:text-xl uppercase tracking-accroche text-ivoire">
                05 · Composants de l&apos;Interface
              </h2>
            </div>
            <span className="font-texte text-xs text-ivoire-800">
              Composés à la main sans librairie générique
            </span>
          </div>

          <DesignGallery />
        </section>

        {/* 6. VÉRIFICATION STRICTE DES INTERDITS */}
        <section className="mb-12 border border-or/30 bg-noir-900 p-6">
          <h2 className="font-titre text-base uppercase tracking-accroche text-or mb-4">
            06 · Registre de Conformité aux Interdits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-texte text-xs text-ivoire-700">
            <div className="flex items-center gap-2">
              <span className="text-or">✓</span> Zéro dégradé violet vers bleu
            </div>
            <div className="flex items-center gap-2">
              <span className="text-or">✓</span> Zéro titre en dégradé
            </div>
            <div className="flex items-center gap-2">
              <span className="text-or">✓</span> Zéro emoji dans les titres
            </div>
            <div className="flex items-center gap-2">
              <span className="text-or">✓</span> Zéro Inter par défaut (Jost + Source Sans 3)
            </div>
            <div className="flex items-center gap-2">
              <span className="text-or">✓</span> Zéro glassmorphism / flou d&apos;arrière-plan
            </div>
            <div className="flex items-center gap-2">
              <span className="text-or">✓</span> Zéro ombre portée lourde
            </div>
            <div className="flex items-center gap-2">
              <span className="text-or">✓</span> Zéro bouton qui s&apos;estompe au survol
            </div>
            <div className="flex items-center gap-2">
              <span className="text-or">✓</span> Grille d&apos;espacement stricte de 8 px
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
