import React from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { Button } from "@/components/Button";

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-noir text-ivoire py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="border-b border-or/20 pb-6 mb-10">
          <span className="font-titre text-xs uppercase tracking-logo text-or block mb-1">
            Informations Légales
          </span>
          <h1 className="font-titre text-3xl uppercase tracking-logo text-ivoire">
            Mentions Légales
          </h1>
          <p className="font-texte text-sm text-ivoire-700 mt-2">
            Informations juridiques, propriété intellectuelle et gestion des données personnelles.
          </p>
        </div>

        <div className="space-y-8 font-texte text-sm text-ivoire-700 border border-noir-700 bg-noir-900 p-8">
          <div>
            <h2 className="font-titre text-base uppercase tracking-accroche text-or mb-2">
              1. Éditeur du site
            </h2>
            <p><strong>Dénomination :</strong> {site.nom}</p>
            <p><strong>Activité :</strong> Intégration de solutions domotiques, automatisation résidentielle et tertiaire</p>
            <p><strong>Siège social :</strong> {site.ville}, République du Congo</p>
            <p><strong>Zones d&apos;intervention :</strong> {site.zones.join(" et ")}</p>
            <p><strong>Ligne directe / WhatsApp :</strong> {site.whatsapp.affichage}</p>
          </div>

          <div className="border-t border-noir-800 pt-6">
            <h2 className="font-titre text-base uppercase tracking-accroche text-or mb-2">
              2. Propriété intellectuelle
            </h2>
            <p className="leading-relaxed">
              L&apos;ensemble des contenus (textes, logos, photographies, vidéos de démonstration et charte graphique) présents sur ce site relèvent de la législation congolaise et internationale sur le droit d&apos;auteur et la propriété intellectuelle. Toute reproduction totale ou partielle sans autorisation expresse de {site.nom} est strictement interdite.
            </p>
          </div>

          <div className="border-t border-noir-800 pt-6">
            <h2 className="font-titre text-base uppercase tracking-accroche text-or mb-2">
              3. Protection des données personnelles
            </h2>
            <p className="leading-relaxed">
              Les données et coordonnées transmises volontairement par les utilisateurs via les formulaires ou par messagerie instantanée (WhatsApp) sont réservées à l&apos;usage exclusif de {site.nom} afin de traiter les demandes de devis, planifier les visites techniques et assurer le suivi après-vente. Aucune information personnelle n&apos;est cédée ou vendue à des tiers.
            </p>
          </div>

          <div className="border-t border-noir-800 pt-6">
            <h2 className="font-titre text-base uppercase tracking-accroche text-or mb-2">
              4. Modalités d&apos;intervention & Garanties
            </h2>
            <p className="leading-relaxed">
              Toutes nos interventions comprennent le matériel neuf garanti, la pose, la configuration complète et 30 jours d&apos;assistance après-vente. L&apos;acompte standard de 40 % est dû à la commande du matériel avant le début des travaux, et le solde est réglé après test complet de l&apos;installation.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Button variant="neutre" size="md" href="/">
            ← Retour à l&apos;accueil
          </Button>
        </div>
      </div>
    </div>
  );
}
