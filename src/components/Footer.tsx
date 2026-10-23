import React from "react";
import Link from "next/link";
import Image from "next/image";
import { site, lienWhatsApp } from "@/data/site";

export function Footer() {
  return (
    <footer className="w-full bg-noir-900 border-t border-or/20 text-ivoire">
      {/* Filet décoratif or fin */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-or/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Colonne 1 : Marque et positionnement */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block" aria-label="Accueil Neodomotique Congo">
              <div className="relative h-16 w-56">
                <Image
                  src="/brand/logo-complet.png"
                  alt="Neodomotique Congo - Logo complet"
                  fill
                  sizes="224px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="font-texte text-sm text-ivoire-700 leading-relaxed">
              {site.slogan}. Domotique professionnelle accessible pour votre confort et votre sécurité.
            </p>
            <div className="pt-2">
              <span className="font-titre text-[11px] uppercase tracking-accroche text-or">
                Zones d&apos;intervention :
              </span>
              <p className="font-texte text-sm text-ivoire mt-0.5">
                {site.zones.join(" et ")}
              </p>
            </div>
          </div>

          {/* Colonne 2 : Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="font-titre text-xs uppercase tracking-accroche text-or pb-2 border-b border-noir-700">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5 font-texte text-sm text-ivoire-700">
              <li>
                <Link href="/" className="hover:text-or transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/packs" className="hover:text-or transition-colors">
                  Packs clés en main (dès 110 000 FCFA)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-or transition-colors">
                  Nos 6 services
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="hover:text-or transition-colors">
                  Vidéos de réalisations réelles
                </Link>
              </li>
              <li>
                <Link href="/devis" className="hover:text-or transition-colors">
                  Simulateur de devis en 2 min
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-or transition-colors">
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Contact & Devis direct */}
          <div className="flex flex-col gap-3">
            <h3 className="font-titre text-xs uppercase tracking-accroche text-or pb-2 border-b border-noir-700">
              Échange direct
            </h3>
            <p className="font-texte text-sm text-ivoire-700">
              Un devis immédiat, sans engagement, directement sur WhatsApp.
            </p>
            <div className="mt-1 flex flex-col gap-2">
              <a
                href={lienWhatsApp("Bonjour, je souhaite un devis gratuit pour mon logement.")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-titre text-base tracking-wide text-ivoire hover:text-or transition-colors"
              >
                {site.whatsapp.affichage}
              </a>
              <span className="font-texte text-xs text-ivoire-800">
                Installation incluse · 30 jours d&apos;assistance
              </span>
            </div>
            <div className="pt-2">
              <a
                href={lienWhatsApp("Bonjour, je souhaite des informations sur vos packs.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center justify-center border border-or bg-transparent px-4 font-titre text-xs uppercase tracking-accroche text-or transition-colors hover:bg-or hover:text-noir"
              >
                Ouvrir WhatsApp
              </a>
            </div>
          </div>

          {/* Colonne 4 : Réseaux & Garanties */}
          <div className="flex flex-col gap-3">
            <h3 className="font-titre text-xs uppercase tracking-accroche text-or pb-2 border-b border-noir-700">
              Réseaux & Confiance
            </h3>
            <p className="font-texte text-xs text-ivoire-800">
              Retrouvez nos vidéos et démos sous le nom :
              <strong className="block text-ivoire font-medium mt-0.5">{site.reseaux.nom}</strong>
            </p>
            <ul className="flex flex-col gap-1.5 font-texte text-xs text-ivoire-700">
              {site.reseaux.plateformes.map((plateforme) => (
                <li key={plateforme} className="flex items-center justify-between py-1 border-b border-noir-800">
                  <span>{plateforme}</span>
                  <span className="text-[11px] text-or font-titre uppercase tracking-wide">@{site.reseaux.nom.replace(/\s+/g, "").toLowerCase()}</span>
                </li>
              ))}
            </ul>
            <p className="font-texte text-xs text-or/80 pt-2">
              Matériel 100% neuf et garanti
            </p>
          </div>
        </div>

        {/* Ligne inférieure de mentions */}
        <div className="mt-12 pt-8 border-t border-noir-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-texte text-xs text-ivoire-800">
          <p>© {new Date().getFullYear()} {site.nom}. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <span>Brazzaville & Pointe-Noire (Congo)</span>
            <span className="text-noir-700">|</span>
            <Link href="/mentions-legales" className="hover:text-ivoire transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
