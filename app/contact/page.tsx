"use client";

import React, { useState } from "react";
import { site, lienWhatsApp } from "@/data/site";
import { Button } from "@/components/Button";
import { Input, Textarea, Select } from "@/components/FormFields";
import { IconCheck } from "@/components/Icons";

export default function ContactPage() {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [ville, setVille] = useState("Brazzaville");
  const [quartier, setQuartier] = useState("");
  const [message, setMessage] = useState("");

  const [erreurs, setErreurs] = useState<{ nom?: string; telephone?: string }>({});
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [envoiConfirme, setEnvoiConfirme] = useState(false);

  const validerEtEnvoyer = (e: React.FormEvent) => {
    e.preventDefault();
    const nouvellesErreurs: { nom?: string; telephone?: string } = {};

    if (!nom.trim()) {
      nouvellesErreurs.nom = "Veuillez renseigner votre nom complet.";
    }
    if (!telephone.trim()) {
      nouvellesErreurs.telephone = "Veuillez renseigner votre numéro de téléphone.";
    } else if (telephone.trim().length < 6) {
      nouvellesErreurs.telephone = "Numéro de téléphone incomplet.";
    }

    if (Object.keys(nouvellesErreurs).length > 0) {
      setErreurs(nouvellesErreurs);
      return;
    }

    setErreurs({});
    setEnvoiEnCours(true);

    // Enregistrement de la demande pour l'espace d'administration
    try {
      const nouveauLead = {
        id: `contact-${Date.now()}`,
        nom,
        telephone,
        ville,
        quartier: quartier || "Centre",
        typeLogement: "Demande de devis / contact",
        packInteret: message ? `Message : ${message.slice(0, 35)}...` : "Devis personnalisé",
        montantEstime: 110000,
        statut: "nouveau" as const,
        dateCreation: "À l'instant",
        source: "formulaire" as const,
      };
      const existants = JSON.parse(localStorage.getItem("neodomotique_leads") || "[]");
      localStorage.setItem("neodomotique_leads", JSON.stringify([nouveauLead, ...existants]));
    } catch {
      // Stockage local optionnel
    }

    setTimeout(() => {
      setEnvoiEnCours(false);
      setEnvoiConfirme(true);
    }, 600);
  };

  const reinitialiserFormulaire = () => {
    setNom("");
    setTelephone("");
    setQuartier("");
    setMessage("");
    setEnvoiConfirme(false);
  };

  return (
    <div className="min-h-screen bg-noir text-ivoire py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* En-tête */}
        <div className="border-b border-or/20 pb-8 mb-16 max-w-3xl">
          <span className="font-titre text-xs uppercase tracking-logo text-or block mb-1">
            Échange & Devis Gratuit
          </span>
          <h1 className="font-titre text-3xl sm:text-5xl uppercase tracking-logo text-ivoire">
            Contactez Neodomotique
          </h1>
          <p className="font-texte text-base text-ivoire-700 mt-4 leading-relaxed">
            Pour toute demande d&apos;information, étude de plan ou devis gratuit sans engagement à Brazzaville et Pointe-Noire.
          </p>
        </div>

        {/* 1. WHATSAPP EN PREMIER (Mise en avant géante) */}
        <section className="mb-16 border-2 border-or bg-noir-900 p-8 sm:p-12 relative">
          <div className="max-w-3xl">
            <span className="font-titre text-xs uppercase tracking-logo text-or block mb-2">
              Canal Recommandé · Réponse Rapide
            </span>
            <h2 className="font-titre text-2xl sm:text-4xl uppercase tracking-accroche text-ivoire">
              Échangez directement sur WhatsApp
            </h2>
            <p className="font-texte text-sm sm:text-base text-ivoire-700 mt-3 leading-relaxed">
              C&apos;est le moyen le plus rapide d&apos;obtenir un conseil technique, de nous envoyer les photos de vos pièces ou de recevoir une proposition chiffrée.
            </p>

            {/* Grand numéro */}
            <div className="my-6">
              <span className="font-texte text-xs text-ivoire-800 block mb-1">
                Ligne directe installateurs :
              </span>
              <a
                href={lienWhatsApp("Bonjour, je souhaite un devis gratuit pour mon logement.")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-titre text-3xl sm:text-5xl text-or hover:text-or-clair tracking-wide transition-colors inline-block"
              >
                {site.whatsapp.affichage}
              </a>
            </div>

            {/* Bouton géant WhatsApp */}
            <Button
              variant="primaire"
              size="lg"
              href={lienWhatsApp("Bonjour, je souhaite un devis gratuit pour mon logement.")}
              isExternal
            >
              Ouvrir WhatsApp et démarrer la discussion
            </Button>
          </div>
        </section>

        {/* 2. FORMULAIRE VISUEL ET INFORMATIONS COMPLÉMENTAIRES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Formulaire (7 colonnes) */}
          <div className="lg:col-span-7 border border-noir-700 bg-noir-900 p-6 sm:p-8">
            <h3 className="font-titre text-xl uppercase tracking-accroche text-ivoire mb-2">
              Formulaire de demande de devis
            </h3>
            <p className="font-texte text-xs text-ivoire-700 mb-8">
              Remplissez ce formulaire si vous préférez être recontacté par téléphone ou WhatsApp.
            </p>

            {envoiConfirme ? (
              <div className="border border-or bg-noir-950 p-8 text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center border border-or bg-noir text-or">
                  <IconCheck className="w-6 h-6" />
                </div>
                <h4 className="font-titre text-xl uppercase tracking-wide text-ivoire">
                  Demande bien reçue !
                </h4>
                <p className="font-texte text-sm text-ivoire-700 max-w-md mx-auto leading-relaxed">
                  Merci <strong className="text-ivoire font-normal">{nom}</strong>. Nos techniciens étudient votre demande pour <strong className="text-ivoire font-normal">{ville} ({quartier || "centre"})</strong> et vous répondront rapidement au <strong className="text-or font-normal">{telephone}</strong>.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    variant="secondaire"
                    size="sm"
                    onClick={reinitialiserFormulaire}
                  >
                    Envoyer une autre demande
                  </Button>
                  <Button
                    variant="primaire"
                    size="sm"
                    href={lienWhatsApp(`Bonjour, j'ai envoyé une demande pour ${nom} (${telephone}).`)}
                    isExternal
                  >
                    Nous notifier sur WhatsApp
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={validerEtEnvoyer} className="space-y-6">
                <Input
                  label="Nom & Prénom"
                  placeholder="Ex : Brice Ondongo"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  erreur={erreurs.nom}
                  required
                />

                <Input
                  label="Numéro de Téléphone"
                  placeholder="Ex : +242 06 123 45 67"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  erreur={erreurs.telephone}
                  aide="Numéro joignable par appel direct ou WhatsApp"
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Ville d'intervention"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    options={[
                      { value: "Brazzaville", label: "Brazzaville" },
                      { value: "Pointe-Noire", label: "Pointe-Noire" },
                    ]}
                  />

                  <Input
                    label="Quartier"
                    placeholder="Ex : Bacongo, Moungali, Tié-Tié..."
                    value={quartier}
                    onChange={(e) => setQuartier(e.target.value)}
                  />
                </div>

                <Textarea
                  label="Détail de votre projet ou question"
                  placeholder="Ex : Je souhaite automatiser le salon et 2 chambres, avec gestion de la climatisation..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <Button
                  type="submit"
                  variant="primaire"
                  size="lg"
                  fullWidth
                  disabled={envoiEnCours}
                >
                  {envoiEnCours ? "Envoi de la demande en cours..." : "Transmettre ma demande de devis"}
                </Button>
              </form>
            )}
          </div>

          {/* Informations zones et réseaux (5 colonnes) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Zones d'intervention */}
            <div className="border border-noir-700 bg-noir-900 p-6 sm:p-8">
              <span className="font-titre text-xs uppercase tracking-logo text-or block mb-2">
                Périmètre géographique
              </span>
              <h3 className="font-titre text-xl uppercase tracking-accroche text-ivoire">
                Zones d&apos;intervention
              </h3>
              <p className="font-texte text-sm text-ivoire-700 mt-2 leading-relaxed">
                Nos équipes interviennent et installent le matériel directement chez vous dans les deux grandes agglomérations de la République du Congo :
              </p>
              <div className="mt-6 space-y-3">
                <div className="border border-noir-800 bg-noir-950 p-4">
                  <span className="font-titre text-sm uppercase tracking-wide text-ivoire block">
                    Brazzaville
                  </span>
                  <span className="font-texte text-xs text-ivoire-700">
                    Intervention dans tous les arrondissements (Centre, Bacongo, Moungali, Poto-Poto, Ouenzé, Talangaï...)
                  </span>
                </div>
                <div className="border border-noir-800 bg-noir-950 p-4">
                  <span className="font-titre text-sm uppercase tracking-wide text-ivoire block">
                    Pointe-Noire
                  </span>
                  <span className="font-texte text-xs text-ivoire-700">
                    Intervention sur rendez-vous pour résidences et appartements (Centre, Tié-Tié, Lumumba...)
                  </span>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="border border-noir-700 bg-noir-900 p-6 sm:p-8">
              <span className="font-titre text-xs uppercase tracking-logo text-or block mb-2">
                Communauté
              </span>
              <h3 className="font-titre text-xl uppercase tracking-accroche text-ivoire">
                Suivez nos chantiers
              </h3>
              <p className="font-texte text-xs text-ivoire-700 mt-2">
                Retrouvez nos démonstrations vidéo sous le nom officiel :
                <strong className="block text-ivoire font-normal mt-1">{site.reseaux.nom}</strong>
              </p>
              <div className="mt-4 space-y-2">
                {site.reseaux.plateformes.map((p) => (
                  <div
                    key={p}
                    className="flex items-center justify-between py-2 border-b border-noir-800 text-xs font-texte"
                  >
                    <span className="text-ivoire font-medium">{p}</span>
                    <span className="text-ivoire-800 italic">(Lien bientôt disponible)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
