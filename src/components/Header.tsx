"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { site, lienWhatsApp } from "@/data/site";

export function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  // Verrouiller le défilement quand le menu mobile est ouvert
  useEffect(() => {
    if (menuOuvert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOuvert]);

  return (
    <header className="sticky top-0 z-40 w-full bg-noir border-b border-or/20 transition-colors">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo icône + nom en capitales espacées */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:ring-1 focus-visible:ring-or"
          aria-label="Accueil Neodomotique Congo"
          onClick={() => setMenuOuvert(false)}
        >
          <div className="relative h-9 w-9 shrink-0">
            <Image
              src="/brand/logo-icone.png"
              alt="Logo Neodomotique"
              fill
              sizes="36px"
              className="object-contain"
              priority
            />
          </div>
          <span className="font-titre text-xs sm:text-sm font-medium uppercase tracking-logo text-ivoire transition-colors group-hover:text-or">
            {site.nom}
          </span>
        </Link>

        {/* Navigation Bureau */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Navigation principale">
          <Link
            href="/packs"
            className="font-titre text-xs uppercase tracking-accroche text-ivoire-700 hover:text-or transition-colors py-2"
          >
            Packs
          </Link>
          <Link
            href="/services"
            className="font-titre text-xs uppercase tracking-accroche text-ivoire-700 hover:text-or transition-colors py-2"
          >
            Services
          </Link>
          <Link
            href="/realisations"
            className="font-titre text-xs uppercase tracking-accroche text-ivoire-700 hover:text-or transition-colors py-2"
          >
            Réalisations
          </Link>
          <Link
            href="/devis"
            className="font-titre text-xs uppercase tracking-accroche text-ivoire-700 hover:text-or transition-colors py-2"
          >
            Devis
          </Link>
          <Link
            href="/contact"
            className="font-titre text-xs uppercase tracking-accroche text-ivoire-700 hover:text-or transition-colors py-2"
          >
            Contact
          </Link>
        </nav>

        {/* Action WhatsApp Bureau */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={lienWhatsApp("Bonjour, je souhaite un devis gratuit pour mon logement.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center border border-or bg-transparent px-5 font-titre text-xs uppercase tracking-accroche text-or transition-colors hover:bg-or hover:text-noir"
          >
            Devis gratuit
          </a>
        </div>

        {/* Bouton Menu Mobile */}
        <button
          type="button"
          onClick={() => setMenuOuvert(!menuOuvert)}
          aria-expanded={menuOuvert}
          aria-controls="menu-mobile"
          aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
          className="flex h-11 w-11 items-center justify-center md:hidden border border-noir-700 hover:border-or text-ivoire transition-colors"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col items-center justify-center gap-1.5 w-5">
            <span
              className={`h-[1.5px] w-5 bg-ivoire transition-transform duration-200 ${
                menuOuvert ? "translate-y-[7.5px] rotate-45 bg-or" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-ivoire transition-opacity duration-200 ${
                menuOuvert ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-ivoire transition-transform duration-200 ${
                menuOuvert ? "-translate-y-[7.5px] -rotate-45 bg-or" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Panneau Mobile Plein Écran */}
      {menuOuvert && (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 bottom-0 top-18 z-50 flex flex-col justify-between bg-noir px-6 py-8 md:hidden border-t border-or/20 overflow-y-auto"
        >
          <nav className="flex flex-col gap-6" aria-label="Navigation mobile">
            <Link
              href="/"
              onClick={() => setMenuOuvert(false)}
              className="font-titre text-lg uppercase tracking-logo text-ivoire hover:text-or py-2 border-b border-noir-800"
            >
              Accueil
            </Link>
            <Link
              href="/packs"
              onClick={() => setMenuOuvert(false)}
              className="font-titre text-lg uppercase tracking-logo text-ivoire hover:text-or py-2 border-b border-noir-800"
            >
              Packs
            </Link>
            <Link
              href="/services"
              onClick={() => setMenuOuvert(false)}
              className="font-titre text-lg uppercase tracking-logo text-ivoire hover:text-or py-2 border-b border-noir-800"
            >
              Services
            </Link>
            <Link
              href="/realisations"
              onClick={() => setMenuOuvert(false)}
              className="font-titre text-lg uppercase tracking-logo text-ivoire hover:text-or py-2 border-b border-noir-800"
            >
              Réalisations
            </Link>
            <Link
              href="/devis"
              onClick={() => setMenuOuvert(false)}
              className="font-titre text-lg uppercase tracking-logo text-ivoire hover:text-or py-2 border-b border-noir-800"
            >
              Simulateur Devis
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOuvert(false)}
              className="font-titre text-lg uppercase tracking-logo text-ivoire hover:text-or py-2"
            >
              Contact
            </Link>
          </nav>

          <div className="flex flex-col gap-4 pt-8">
            <a
              href={lienWhatsApp("Bonjour, je souhaite un devis gratuit pour mon logement.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-full items-center justify-center border border-or bg-or px-6 font-titre text-xs uppercase tracking-accroche text-noir font-medium hover:bg-or-clair transition-colors"
            >
              Devis gratuit sur WhatsApp
            </a>
            <div className="text-center font-texte text-sm text-ivoire-700">
              WhatsApp : <span className="text-or">{site.whatsapp.affichage}</span>
            </div>
            <p className="text-center font-texte text-xs text-ivoire-800">
              Interventions à {site.zones.join(" et ")}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
