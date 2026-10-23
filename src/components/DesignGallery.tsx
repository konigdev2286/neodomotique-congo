"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { Input, Textarea, Select, Checkbox } from "./FormFields";
import { EquipmentLine } from "./EquipmentLine";
import { PackCard } from "./PackCard";
import { WhatsAppBanner } from "./WhatsAppBanner";
import { WhatsAppFloatingButton } from "./WhatsAppFloatingButton";
import { Modal } from "./Modal";
import { Notification } from "./Notification";
import {
  IconAmpoule,
  IconPrise,
  IconTelecommande,
  IconWifi,
  IconMicro,
  IconSmartphone,
} from "./Icons";
import { packs } from "@/data/packs";

export function DesignGallery() {
  const [modaleOuverte, setModaleOuverte] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(true);

  // Exemple d'options select
  const optionsLogement = [
    { value: "", label: "Sélectionnez votre type de logement" },
    { value: "studio", label: "Studio (1 pièce principale)" },
    { value: "appartement", label: "Appartement (2 à 4 pièces)" },
    { value: "villa", label: "Villa / Maison individuelle" },
  ];

  // Exemple d'équipement avec alternative
  const equipementExemple = {
    quantite: 2,
    nom: "Ampoules intelligentes",
    detail: "16 millions de couleurs, contrôle à distance",
    alternative: {
      nom: "Interrupteur wifi 2 gang",
      detail: "Contrôle de vos 2 points lumineux existants",
    },
  };
  const [alternativeActive, setAlternativeActive] = useState(false);

  return (
    <div className="space-y-16">
      {/* 1. JEU D'ICÔNES SUR MESURE */}
      <section className="border border-noir-700 bg-noir-900 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-3 border-b border-noir-800 mb-6">
          <div>
            <span className="font-titre text-[10px] uppercase tracking-logo text-or">
              Composants · Graphisme
            </span>
            <h3 className="font-titre text-lg uppercase tracking-accroche text-ivoire">
              Jeu d&apos;icônes dédié (Traits fins 1.5px)
            </h3>
          </div>
          <span className="font-texte text-xs text-ivoire-800">
            Style aligné sur le logo
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="border border-noir-800 bg-noir-950 p-4 flex flex-col items-center justify-center gap-2 text-center">
            <IconAmpoule className="w-8 h-8 text-or" />
            <span className="font-titre text-[11px] uppercase tracking-wide text-ivoire">
              Éclairage
            </span>
          </div>
          <div className="border border-noir-800 bg-noir-950 p-4 flex flex-col items-center justify-center gap-2 text-center">
            <IconPrise className="w-8 h-8 text-or" />
            <span className="font-titre text-[11px] uppercase tracking-wide text-ivoire">
              Prise connectée
            </span>
          </div>
          <div className="border border-noir-800 bg-noir-950 p-4 flex flex-col items-center justify-center gap-2 text-center">
            <IconTelecommande className="w-8 h-8 text-or" />
            <span className="font-titre text-[11px] uppercase tracking-wide text-ivoire">
              Télécommande
            </span>
          </div>
          <div className="border border-noir-800 bg-noir-950 p-4 flex flex-col items-center justify-center gap-2 text-center">
            <IconWifi className="w-8 h-8 text-or" />
            <span className="font-titre text-[11px] uppercase tracking-wide text-ivoire">
              Wi-Fi optimisé
            </span>
          </div>
          <div className="border border-noir-800 bg-noir-950 p-4 flex flex-col items-center justify-center gap-2 text-center">
            <IconMicro className="w-8 h-8 text-or" />
            <span className="font-titre text-[11px] uppercase tracking-wide text-ivoire">
              Contrôle vocal
            </span>
          </div>
          <div className="border border-noir-800 bg-noir-950 p-4 flex flex-col items-center justify-center gap-2 text-center">
            <IconSmartphone className="w-8 h-8 text-or" />
            <span className="font-titre text-[11px] uppercase tracking-wide text-ivoire">
              Smartphone
            </span>
          </div>
        </div>
      </section>

      {/* 2. BOUTONS & ÉTATS */}
      <section className="border border-noir-700 bg-noir-900 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-3 border-b border-noir-800 mb-6">
          <div>
            <span className="font-titre text-[10px] uppercase tracking-logo text-or">
              Composants · Actions
            </span>
            <h3 className="font-titre text-lg uppercase tracking-accroche text-ivoire">
              Boutons (3 Variantes & Tous les états)
            </h3>
          </div>
          <span className="font-texte text-xs text-ivoire-800">
            Zéro opacité au survol
          </span>
        </div>

        {/* Grille des 3 variantes et états */}
        <div className="space-y-6">
          {/* Ligne 1 : Bouton Primaire (Or) */}
          <div className="border-b border-noir-800 pb-5">
            <span className="font-titre text-xs uppercase tracking-wide text-or block mb-3">
              Variante 1 : Primaire (Or plein)
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primaire" size="sm">Taille Petite (sm)</Button>
              <Button variant="primaire" size="md">Taille Standard (md)</Button>
              <Button variant="primaire" size="lg">Taille Grande (lg)</Button>
              <Button variant="primaire" size="md" disabled>Désactivé</Button>
            </div>
          </div>

          {/* Ligne 2 : Bouton Secondaire (Contour Or) */}
          <div className="border-b border-noir-800 pb-5">
            <span className="font-titre text-xs uppercase tracking-wide text-or block mb-3">
              Variante 2 : Secondaire (Contour Or)
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="secondaire" size="sm">Taille Petite (sm)</Button>
              <Button variant="secondaire" size="md">Taille Standard (md)</Button>
              <Button variant="secondaire" size="lg">Taille Grande (lg)</Button>
              <Button variant="secondaire" size="md" disabled>Désactivé</Button>
            </div>
          </div>

          {/* Ligne 3 : Bouton Neutre (Noir 800) */}
          <div>
            <span className="font-titre text-xs uppercase tracking-wide text-or block mb-3">
              Variante 3 : Neutre (Sombre)
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="neutre" size="sm">Taille Petite (sm)</Button>
              <Button variant="neutre" size="md">Taille Standard (md)</Button>
              <Button variant="neutre" size="lg">Taille Grande (lg)</Button>
              <Button variant="neutre" size="md" disabled>Désactivé</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CHAMPS DE FORMULAIRE & ÉTATS */}
      <section className="border border-noir-700 bg-noir-900 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-3 border-b border-noir-800 mb-6">
          <div>
            <span className="font-titre text-[10px] uppercase tracking-logo text-or">
              Composants · Saisie
            </span>
            <h3 className="font-titre text-lg uppercase tracking-accroche text-ivoire">
              Champs de formulaire & États
            </h3>
          </div>
          <span className="font-texte text-xs text-ivoire-800">
            Repos, Focus, Erreur, Désactivé
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Standard & Focus */}
          <Input
            label="Nom & Prénom"
            placeholder="Ex : Guy-Aimé Mabiala"
            aide="Votre nom complet pour le devis"
            required
          />

          {/* Input en Erreur */}
          <Input
            label="Numéro de téléphone"
            placeholder="+242 06 123 45 67"
            defaultValue="061234"
            erreur="Veuillez saisir un numéro valide au Congo (+242)"
            required
          />

          {/* Select Standard */}
          <Select
            label="Type de logement"
            options={optionsLogement}
            defaultValue="studio"
            aide="Permet de calibrer l'équipement recommandé"
          />

          {/* Input Désactivé */}
          <Input
            label="Devise du devis (Fixe)"
            defaultValue="FCFA (Franc CFA)"
            disabled
            aide="Non modifiable pour la zone Congo"
          />

          {/* Textarea */}
          <div className="md:col-span-2">
            <Textarea
              label="Précisions sur votre logement ou vos besoins"
              placeholder="Ex : J'ai 3 pièces à équiper dans le quartier Moungali..."
              rows={3}
            />
          </div>

          {/* Checkbox */}
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-6 pt-2">
            <Checkbox
              label="Disposer d'une connexion Wi-Fi fonctionnelle"
              description="Nécessaire pour le fonctionnement des équipements connectés"
              defaultChecked
            />
            <Checkbox
              label="Option désactivée d'exemple"
              description="Ce champ n'est pas sélectionnable"
              disabled
            />
          </div>
        </div>
      </section>

      {/* 4. LIGNE D'ÉQUIPEMENT */}
      <section className="border border-noir-700 bg-noir-900 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-3 border-b border-noir-800 mb-6">
          <div>
            <span className="font-titre text-[10px] uppercase tracking-logo text-or">
              Composants · Contenu
            </span>
            <h3 className="font-titre text-lg uppercase tracking-accroche text-ivoire">
              Ligne d&apos;équipement (EquipmentLine)
            </h3>
          </div>
          <span className="font-texte text-xs text-ivoire-800">
            Avec alternative interactive
          </span>
        </div>

        <div className="border border-noir-800 bg-noir-950 p-4 max-w-xl">
          <EquipmentLine
            ligne={equipementExemple}
            varianteAlternative={alternativeActive}
            onBasculerAlternative={() => setAlternativeActive(!alternativeActive)}
            interactive={true}
          />
        </div>
      </section>

      {/* 5. CARTES DE PACK (LES 2 PACKS RÉELS) */}
      <section className="border border-noir-700 bg-noir-900 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-3 border-b border-noir-800 mb-6">
          <div>
            <span className="font-titre text-[10px] uppercase tracking-logo text-or">
              Composants · Offres
            </span>
            <h3 className="font-titre text-lg uppercase tracking-accroche text-ivoire">
              Cartes de Packs (Starter & Confort)
            </h3>
          </div>
          <span className="font-texte text-xs text-ivoire-800">
            Données réelles et prix fixes
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {packs.map((p, idx) => (
            <PackCard
              key={p.id}
              pack={p}
              miseEnAvant={idx === 1}
              lienDetail={false}
            />
          ))}
        </div>
      </section>

      {/* 6. BANDEAU WHATSAPP & BOUTON FLOTTANT */}
      <section className="border border-noir-700 bg-noir-900 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-3 border-b border-noir-800 mb-6">
          <div>
            <span className="font-titre text-[10px] uppercase tracking-logo text-or">
              Composants · Conversion
            </span>
            <h3 className="font-titre text-lg uppercase tracking-accroche text-ivoire">
              Bandeau WhatsApp & Bouton Flottant
            </h3>
          </div>
          <span className="font-texte text-xs text-ivoire-800">
            Contact direct instantané
          </span>
        </div>

        <WhatsAppBanner
          titre="Prêt à automatiser votre logement ?"
          sousTitre="Recevez votre devis sur-mesure sous 2h par nos techniciens à Brazzaville et Pointe-Noire."
        />

        <div className="pt-4 flex items-center gap-4">
          <span className="font-texte text-xs text-ivoire-700">
            Bouton flottant unitaire isolé :
          </span>
          <WhatsAppFloatingButton />
        </div>
      </section>

      {/* 7. MODALE & NOTIFICATIONS */}
      <section className="border border-noir-700 bg-noir-900 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-3 border-b border-noir-800 mb-6">
          <div>
            <span className="font-titre text-[10px] uppercase tracking-logo text-or">
              Composants · Dialogue & Feedback
            </span>
            <h3 className="font-titre text-lg uppercase tracking-accroche text-ivoire">
              Fenêtre modale & Notifications
            </h3>
          </div>
          <span className="font-texte text-xs text-ivoire-800">
            Accessibilité et clarté
          </span>
        </div>

        {/* Bouton pour déclencher la modale */}
        <div className="mb-8">
          <Button
            variant="secondaire"
            size="md"
            onClick={() => setModaleOuverte(true)}
          >
            Ouvrir un exemple de modale
          </Button>
        </div>

        {/* Modale de test */}
        <Modal
          ouvert={modaleOuverte}
          onFermer={() => setModaleOuverte(false)}
          titre="Installation domotique · Détail"
          sousTitre="Exemple de fenêtre modale sans effet de verre et accessible avec touche Échap"
        >
          <div className="space-y-4">
            <p className="font-texte text-sm text-ivoire-700 leading-relaxed">
              Toutes les installations Neodomotique Congo comprennent le matériel 100% neuf, la configuration sur vos smartphones et le test complet de chaque équipement.
            </p>
            <div className="border border-noir-800 bg-noir-900 p-4">
              <span className="font-titre text-xs uppercase tracking-accroche text-or block mb-1">
                Garantie 30 jours
              </span>
              <p className="font-texte text-xs text-ivoire-800">
                Une assistance technique continue vous accompagne après la pose.
              </p>
            </div>
            <div className="pt-2 flex justify-end gap-3">
              <Button
                variant="neutre"
                size="sm"
                onClick={() => setModaleOuverte(false)}
              >
                Fermer
              </Button>
              <Button
                variant="primaire"
                size="sm"
                onClick={() => setModaleOuverte(false)}
              >
                Compris
              </Button>
            </div>
          </div>
        </Modal>

        {/* Notifications */}
        <div className="space-y-4 max-w-xl">
          <span className="font-titre text-xs uppercase tracking-wide text-ivoire block mb-2">
            Variantes de notification (Toast / Alert) :
          </span>

          {notificationVisible && (
            <Notification
              type="succes"
              titre="Devis envoyé avec succès"
              message="Votre récapitulatif a été transmis à nos installateurs sur WhatsApp."
              onFermer={() => setNotificationVisible(false)}
              action={{
                label: "Voir le détail",
                onClick: () => setModaleOuverte(true),
              }}
            />
          )}

          <Notification
            type="info"
            titre="Information technique"
            message="Les prix indiqués comprennent l'installation et le paramétrage complet."
          />

          <Notification
            type="erreur"
            titre="Erreur de saisie"
            message="Veuillez renseigner un numéro de téléphone valide avant d'envoyer votre demande."
          />
        </div>
      </section>
    </div>
  );
}
