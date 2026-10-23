import React from "react";
import Link from "next/link";
import { site, lienWhatsApp } from "@/data/site";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center py-20 bg-noir text-ivoire">
      <div className="relative mb-6">
        <span className="font-titre text-7xl sm:text-9xl font-light text-or tracking-widest opacity-80">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-4 bg-or point-or-init rounded-none" />
        </div>
      </div>

      <h1 className="font-titre text-2xl sm:text-3xl uppercase tracking-logo text-ivoire max-w-md">
        Cette page n&apos;est pas connectée
      </h1>
      <p className="font-texte text-sm text-ivoire-700 mt-3 max-w-md leading-relaxed">
        L&apos;adresse demandée est introuvable ou a été déplacée. Vous pouvez retourner à l&apos;accueil ou échanger directement avec notre équipe.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <Button
          variant="primaire"
          size="md"
          href="/"
        >
          Retourner à l&apos;accueil
        </Button>

        <Button
          variant="secondaire"
          size="md"
          href={lienWhatsApp("Bonjour, je cherchais une page sur votre site qui est introuvable.")}
          isExternal
        >
          Contacter sur WhatsApp
        </Button>
      </div>

      <p className="font-texte text-xs text-ivoire-800 mt-10">
        Assistance Neodomotique Congo · {site.whatsapp.affichage}
      </p>
    </div>
  );
}
