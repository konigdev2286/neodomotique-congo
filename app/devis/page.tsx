"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { site, lienWhatsApp } from "@/data/site";
import {
  produits,
  grilleInterrupteurs,
  SwitchTech,
  SwitchGang,
  mainOeuvre,
  acomptePourcentage,
  validiteDevisJours,
} from "@/data/produits";
import { formatFCFA } from "@/lib/format";
import { Button } from "@/components/Button";
import { Input, Select, Checkbox } from "@/components/FormFields";
import {
  IconAmpoule,
  IconPrise,
  IconTelecommande,
  IconWifi,
  IconCheck,
} from "@/components/Icons";

type TypeLogement = "studio" | "appartement" | "maison";

export default function DevisSimulatorPage() {
  // Parcours en 8 étapes
  const [etape, setEtape] = useState<number>(1);

  // État des réponses du formulaire (conservées lors du retour arrière)
  const [typeLogement, setTypeLogement] = useState<TypeLogement>("appartement");
  const [nombrePieces, setNombrePieces] = useState<number>(2);
  const [pointsLumineux, setPointsLumineux] = useState<number>(2);
  const [techInterrupteur, setTechInterrupteur] = useState<SwitchTech>("wifi");
  const [interrupteursParGang, setInterrupteursParGang] = useState<Record<SwitchGang, number>>({
    1: 0,
    2: 1,
    3: 0,
    4: 0,
  });
  const [controleTV, setControleTV] = useState<boolean>(true);
  const [controleClim, setControleClim] = useState<boolean>(true);
  const [controleVentilateur, setControleVentilateur] = useState<boolean>(false);
  const [prisesSupplementaires, setPrisesSupplementaires] = useState<number>(1);
  const [assistantVocal, setAssistantVocal] = useState<"aucun" | "echo-dot" | "echo-pop">("echo-dot");
  const [wifiExistant, setWifiExistant] = useState<boolean>(true);
  const [ville, setVille] = useState<string>("Brazzaville");
  const [quartier, setQuartier] = useState<string>("");
  const [nom, setNom] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");

  const [erreurEtape, setErreurEtape] = useState<string | null>(null);

  // Total d'interrupteurs sélectionnés
  const totalInterrupteurs = useMemo(
    () => Object.values(interrupteursParGang).reduce((a, b) => a + b, 0),
    [interrupteursParGang]
  );

  // Recherche des tarifs dans src/data/produits.ts
  const prixAmpoule = produits.find((p) => p.id === "ampoule")?.prix ?? 7000;
  const prixTelecommande = produits.find((p) => p.id === "telecommande")?.prix ?? 12500;
  const prixPrise = produits.find((p) => p.id === "prise")?.prix ?? 7500;
  const produitEchoDot = produits.find((p) => p.id === "echo-dot");
  const produitEchoPop = produits.find((p) => p.id === "echo-pop");

  // Détermination si télécommande IR requise (TV, Clim ou Ventilateur)
  const besoinTelecommande = controleTV || controleClim || controleVentilateur;

  // Calcul ligne par ligne en temps réel
  const calcul = useMemo(() => {
    const lignes: {
      nom: string;
      quantite: number;
      prixUnitaire: number | null;
      total: number | null;
      note?: string;
    }[] = [];

    // 1. Ampoules intelligentes
    if (pointsLumineux > 0) {
      lignes.push({
        nom: "Ampoules intelligentes RGB",
        quantite: pointsLumineux,
        prixUnitaire: prixAmpoule,
        total: pointsLumineux * prixAmpoule,
      });
    }

    // 2. Interrupteurs tactiles muraux
    ([1, 2, 3, 4] as SwitchGang[]).forEach((gang) => {
      const qte = interrupteursParGang[gang];
      if (qte > 0) {
        const itemGrille = grilleInterrupteurs.find((g) => g.gang === gang);
        const pu = itemGrille ? itemGrille[techInterrupteur] : 15500;
        lignes.push({
          nom: `Interrupteur tactile ${techInterrupteur === "wifi" ? "WiFi" : "Zigbee"} ${gang} gang`,
          quantite: qte,
          prixUnitaire: pu,
          total: qte * pu,
        });
      }
    });

    // 3. Télécommande universelle IR
    if (besoinTelecommande) {
      lignes.push({
        nom: "Télécommande universelle (TV, clim, ventilateur)",
        quantite: 1,
        prixUnitaire: prixTelecommande,
        total: prixTelecommande,
      });
    }

    // 4. Prises connectées
    if (prisesSupplementaires > 0) {
      lignes.push({
        nom: "Prises intelligentes",
        quantite: prisesSupplementaires,
        prixUnitaire: prixPrise,
        total: prisesSupplementaires * prixPrise,
      });
    }

    // 5. Assistant vocal
    if (assistantVocal === "echo-dot") {
      lignes.push({
        nom: "Echo Dot (Alexa)",
        quantite: 1,
        prixUnitaire: produitEchoDot?.prix ?? 85000,
        total: produitEchoDot?.prix ?? 85000,
      });
    } else if (assistantVocal === "echo-pop") {
      lignes.push({
        nom: "Echo Pop (Alexa)",
        quantite: 1,
        prixUnitaire: null,
        total: null,
        note: "Prix à confirmer (production Amazon arrêtée)",
      });
    }

    // Total matériel connu
    let totalMat = 0;
    let contientProduitPrixAConfirmer = false;

    lignes.forEach((l) => {
      if (l.total !== null) {
        totalMat += l.total;
      } else {
        contientProduitPrixAConfirmer = true;
      }
    });

    const acompte = Math.round((totalMat * acomptePourcentage) / 100);
    const solde = totalMat - acompte + mainOeuvre;
    const totalGeneral = totalMat + mainOeuvre;

    // Recommandation de pack si studio ou 1 pièce
    const packRecommande =
      typeLogement === "studio" || nombrePieces <= 1
        ? {
            nom: "Pack Studio Starter (110 000 FCFA) ou Confort (150 000 FCFA)",
            economie: "Formule tout inclus plus avantageuse pour 1 studio.",
          }
        : null;

    return {
      lignes,
      totalMateriel: totalMat,
      acompte,
      solde,
      totalGeneral,
      contientProduitPrixAConfirmer,
      packRecommande,
    };
  }, [
    pointsLumineux,
    interrupteursParGang,
    techInterrupteur,
    besoinTelecommande,
    prisesSupplementaires,
    assistantVocal,
    prixAmpoule,
    prixTelecommande,
    prixPrise,
    produitEchoDot,
    typeLogement,
    nombrePieces,
  ]);

  // Validation avant passage à l'étape suivante
  const etapeSuivante = () => {
    setErreurEtape(null);

    if (etape === 7 && !quartier.trim()) {
      setErreurEtape("Veuillez indiquer votre quartier.");
      return;
    }

    if (etape === 8) {
      if (!nom.trim()) {
        setErreurEtape("Veuillez renseigner votre nom complet.");
        return;
      }
      if (!telephone.trim() || telephone.trim().length < 6) {
        setErreurEtape("Veuillez renseigner un numéro de téléphone joignable.");
        return;
      }
    }

    setEtape((prev) => Math.min(prev + 1, 9));
  };

  const etapePrecedente = () => {
    setErreurEtape(null);
    setEtape((prev) => Math.max(prev - 1, 1));
  };

  // Date d'émission et date d'expiration (+30 jours)
  const dateEmission = useMemo(() => new Date().toLocaleDateString("fr-FR"), []);
  const dateExpiration = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + validiteDevisJours);
    return d.toLocaleDateString("fr-FR");
  }, []);

  // Message WhatsApp formaté ligne par ligne
  const messageWhatsAppDevis = useMemo(() => {
    let msg = `*DEVIS NEODOMOTIQUE CONGO*\n`;
    msg += `Client : ${nom || "Client"} (${telephone || "N/A"})\n`;
    msg += `Lieu : ${quartier || "Non précisé"}, ${ville}\n`;
    msg += `Logement : ${typeLogement} (${nombrePieces} pièce(s))\n`;
    msg += `Wi-Fi : ${wifiExistant ? "Oui" : "À installer"}\n\n`;
    msg += `*DÉTAIL DU MATÉRIEL :*\n`;
    calcul.lignes.forEach((l) => {
      msg += `• ${l.quantite}× ${l.nom} : ${
        l.total !== null ? formatFCFA(l.total) : "Prix à confirmer"
      }\n`;
    });
    msg += `\n*FINANCEMENT :*\n`;
    msg += `Total matériel : ${formatFCFA(calcul.totalMateriel)}\n`;
    msg += `Main d'œuvre : ${formatFCFA(mainOeuvre)}\n`;
    msg += `Acompte 40% avant pose : ${formatFCFA(calcul.acompte)}\n`;
    msg += `Solde après installation : ${formatFCFA(calcul.solde)}\n`;
    msg += `*TOTAL ESTIMÉ : ${formatFCFA(calcul.totalGeneral)}*\n`;
    msg += `Validité : 30 jours (jusqu'au ${dateExpiration})\n\n`;
    msg += `Bonjour, je vous transmets mon devis calculé sur votre site pour validation.`;
    return msg;
  }, [nom, telephone, quartier, ville, typeLogement, nombrePieces, wifiExistant, calcul, dateExpiration]);

  const imprimerDevis = () => {
    window.print();
  };

  // Enregistrement automatique du devis généré pour le suivi dans l'espace admin
  useEffect(() => {
    if (etape === 9 && (nom || telephone)) {
      try {
        const nouveauLead = {
          id: `dev-${Date.now()}`,
          nom: nom || "Prospect Devis En Ligne",
          telephone: telephone || "Non renseigné",
          ville: ville || "Brazzaville",
          quartier: quartier || "Non précisé",
          typeLogement: `${typeLogement} (${nombrePieces} p.)`,
          packInteret: calcul.packRecommande ? `Pack : ${calcul.packRecommande.nom}` : "Devis Simulateur",
          montantEstime: calcul.totalGeneral,
          statut: "devis_envoye" as const,
          dateCreation: "À l'instant",
          source: "simulateur" as const,
        };
        const existants = JSON.parse(localStorage.getItem("neodomotique_leads") || "[]");
        const sansDoublon = existants.filter((l: any) => l.telephone !== telephone || l.id === nouveauLead.id);
        localStorage.setItem("neodomotique_leads", JSON.stringify([nouveauLead, ...sansDoublon]));
      } catch {
        // Ignorer
      }
    }
  }, [etape, nom, telephone, ville, quartier, typeLogement, nombrePieces, calcul]);

  return (
    <div className="min-h-screen bg-noir text-ivoire py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* En-tête */}
        <div className="border-b border-or/20 pb-6 mb-8 print:hidden">
          <span className="font-titre text-xs uppercase tracking-logo text-or block mb-1">
            Simulateur En Ligne
          </span>
          <h1 className="font-titre text-2xl sm:text-4xl uppercase tracking-logo text-ivoire">
            Simulateur de Devis en 2 Minutes
          </h1>
          <p className="font-texte text-sm text-ivoire-700 mt-2">
            Répondez aux 8 questions pour chiffrer l&apos;installation complète de votre logement. Calcul transparent en direct.
          </p>
        </div>

        {/* Barre de progression avec le motif du fil d'or */}
        {etape <= 8 && (
          <div className="mb-10 print:hidden">
            <div className="flex items-center justify-between text-xs font-titre uppercase tracking-wide text-ivoire-800 mb-2">
              <span className="text-or">Étape {etape} sur 08</span>
              <span>
                {etape === 1 && "Type de logement"}
                {etape === 2 && "Nombre de pièces"}
                {etape === 3 && "Points lumineux"}
                {etape === 4 && "Interrupteurs muraux"}
                {etape === 5 && "Appareils à commander"}
                {etape === 6 && "Connexion Wi-Fi"}
                {etape === 7 && "Localisation"}
                {etape === 8 && "Coordonnées"}
              </span>
            </div>

            {/* Ligne d'or fine montrant la progression */}
            <div className="h-1 w-full bg-noir-800 relative">
              <div
                className="h-full bg-or transition-all duration-300"
                style={{ width: `${(etape / 8) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* ================= ÉCRANS 1 À 8 ================= */}
        {etape <= 8 ? (
          <div className="border border-noir-700 bg-noir-900 p-6 sm:p-10 mb-8 min-h-[380px] flex flex-col justify-between">
            {/* Contenu spécifique de chaque étape */}
            <div>
              {/* ÉCRAN 1 : Type de logement */}
              {etape === 1 && (
                <div className="space-y-6">
                  <span className="font-titre text-xs uppercase tracking-logo text-or block">
                    Question 01
                  </span>
                  <h2 className="font-titre text-xl sm:text-2xl uppercase tracking-accroche text-ivoire">
                    Quel est le type de votre logement ?
                  </h2>
                  <p className="font-texte text-sm text-ivoire-700">
                    Sélectionnez la configuration qui correspond le mieux à votre résidence :
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    {[
                      { id: "studio", titre: "Studio", desc: "1 pièce principale connectée" },
                      { id: "appartement", titre: "Appartement", desc: "2 à 4 pièces avec couloir" },
                      { id: "maison", titre: "Maison / Villa", desc: "Plusieurs pièces ou étages" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setTypeLogement(opt.id as TypeLogement)}
                        className={`p-5 text-left border transition-colors flex flex-col justify-between ${
                          typeLogement === opt.id
                            ? "border-or bg-noir-950 text-ivoire"
                            : "border-noir-700 bg-noir-800 text-ivoire-700 hover:border-noir-600"
                        }`}
                      >
                        <span className="font-titre text-base uppercase tracking-wide text-ivoire block mb-1">
                          {opt.titre}
                        </span>
                        <span className="font-texte text-xs text-ivoire-700">
                          {opt.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ÉCRAN 2 : Nombre de pièces */}
              {etape === 2 && (
                <div className="space-y-6">
                  <span className="font-titre text-xs uppercase tracking-logo text-or block">
                    Question 02
                  </span>
                  <h2 className="font-titre text-xl sm:text-2xl uppercase tracking-accroche text-ivoire">
                    Combien de pièces souhaitez-vous équiper ?
                  </h2>
                  <p className="font-texte text-sm text-ivoire-700">
                    (Salon, chambres, cuisine, terrasse couverte...)
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setNombrePieces((prev) => Math.max(1, prev - 1))}
                      className="h-12 w-12 border border-noir-700 bg-noir-800 font-titre text-xl text-ivoire hover:border-or transition-colors flex items-center justify-center"
                    >
                      —
                    </button>
                    <span className="font-titre text-3xl text-or w-16 text-center">
                      {nombrePieces}
                    </span>
                    <button
                      type="button"
                      onClick={() => setNombrePieces((prev) => Math.min(10, prev + 1))}
                      className="h-12 w-12 border border-noir-700 bg-noir-800 font-titre text-xl text-ivoire hover:border-or transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                    <span className="font-texte text-sm text-ivoire-700 ml-2">
                      pièce(s) sélectionnée(s)
                    </span>
                  </div>
                </div>
              )}

              {/* ÉCRAN 3 : Points lumineux */}
              {etape === 3 && (
                <div className="space-y-6">
                  <span className="font-titre text-xs uppercase tracking-logo text-or block">
                    Question 03
                  </span>
                  <h2 className="font-titre text-xl sm:text-2xl uppercase tracking-accroche text-ivoire">
                    Combien d&apos;ampoules intelligentes souhaitez-vous ?
                  </h2>
                  <p className="font-texte text-sm text-ivoire-700">
                    Ampoules multicolores 16 millions de couleurs avec variation d&apos;intensité ({formatFCFA(prixAmpoule)} / unité).
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setPointsLumineux((prev) => Math.max(0, prev - 1))}
                      className="h-12 w-12 border border-noir-700 bg-noir-800 font-titre text-xl text-ivoire hover:border-or transition-colors flex items-center justify-center"
                    >
                      —
                    </button>
                    <span className="font-titre text-3xl text-or w-16 text-center">
                      {pointsLumineux}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPointsLumineux((prev) => Math.min(20, prev + 1))}
                      className="h-12 w-12 border border-noir-700 bg-noir-800 font-titre text-xl text-ivoire hover:border-or transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                    <span className="font-texte text-sm text-ivoire-700 ml-2">
                      ampoule(s) ({formatFCFA(pointsLumineux * prixAmpoule)})
                    </span>
                  </div>
                </div>
              )}

              {/* ÉCRAN 4 : Interrupteurs à remplacer */}
              {etape === 4 && (
                <div className="space-y-6">
                  <span className="font-titre text-xs uppercase tracking-logo text-or block">
                    Question 04
                  </span>
                  <h2 className="font-titre text-xl sm:text-2xl uppercase tracking-accroche text-ivoire">
                    Combien d&apos;interrupteurs muraux et quelle technologie ?
                  </h2>

                  {/* Bloc pédagogique officiel */}
                  <div className="border border-or/40 bg-noir-950 p-4 sm:p-5 space-y-3">
                    <h3 className="font-titre text-sm uppercase tracking-wide text-or">
                      Quelle technologie pour vos interrupteurs ?
                    </h3>
                    <div className="space-y-2 text-xs font-texte text-ivoire-700 leading-relaxed">
                      <p>
                        <strong className="text-ivoire font-medium">📶 WiFi</strong> — Se connecte directement à votre box internet. Idéal pour 1 à 3 interrupteurs. Simple et rapide à installer.
                      </p>
                      <p>
                        <strong className="text-ivoire font-medium">🔗 Zigbee</strong> — Passe par une passerelle dédiée, plus stable et plus rapide, sans surcharger votre WiFi. Recommandé à partir de 4 interrupteurs ou pour une maison complète, et plus facile à faire évoluer plus tard (ajout de capteurs, ampoules...).
                      </p>
                      <p className="text-ivoire-800 pt-1 border-t border-noir-800">
                        <strong className="text-or font-medium">💡 Vous hésitez ?</strong> Le WiFi suffit pour une petite installation. Le Zigbee devient plus avantageux dès que votre maison compte plusieurs pièces connectées.
                      </p>
                    </div>
                  </div>

                  {/* Choix de la technologie */}
                  <div className="space-y-2">
                    <span className="font-titre text-xs uppercase tracking-wide text-ivoire block">
                      Sélectionnez la technologie souhaitée :
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setTechInterrupteur("wifi")}
                        className={`p-4 text-left border transition-colors ${
                          techInterrupteur === "wifi"
                            ? "border-or bg-noir-950 text-ivoire"
                            : "border-noir-700 bg-noir-800 text-ivoire-700 hover:border-noir-600"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-titre text-sm uppercase tracking-wide text-ivoire">
                            📶 WiFi
                          </span>
                          {techInterrupteur === "wifi" && (
                            <span className="text-[10px] text-or font-titre uppercase tracking-wide">Sélectionné</span>
                          )}
                        </div>
                        <span className="font-texte text-xs text-ivoire-700 block">
                          Connexion directe box · Idéal 1 à 3 interrupteurs
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTechInterrupteur("zigbee")}
                        className={`p-4 text-left border transition-colors ${
                          techInterrupteur === "zigbee"
                            ? "border-or bg-noir-950 text-ivoire"
                            : "border-noir-700 bg-noir-800 text-ivoire-700 hover:border-noir-600"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-titre text-sm uppercase tracking-wide text-ivoire">
                            🔗 Zigbee
                          </span>
                          {techInterrupteur === "zigbee" && (
                            <span className="text-[10px] text-or font-titre uppercase tracking-wide">Sélectionné</span>
                          )}
                        </div>
                        <span className="font-texte text-xs text-ivoire-700 block">
                          Passerelle dédiée · Recommandé dès 4 interrupteurs
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Grille de prix officielle */}
                  <div className="border border-noir-800 bg-noir-950 p-4">
                    <span className="font-titre text-xs uppercase tracking-accroche text-or block mb-2">
                      Grille de prix (gangs WiFi — équivalents Zigbee)
                    </span>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-texte text-xs">
                        <thead>
                          <tr className="border-b border-noir-800 text-ivoire-800 font-titre uppercase text-[10px]">
                            <th className="py-2 px-2">Interrupteur</th>
                            <th className={`py-2 px-2 text-right ${techInterrupteur === "wifi" ? "text-or font-medium" : ""}`}>
                              WiFi {techInterrupteur === "wifi" && "✓"}
                            </th>
                            <th className={`py-2 px-2 text-right ${techInterrupteur === "zigbee" ? "text-or font-medium" : ""}`}>
                              Zigbee {techInterrupteur === "zigbee" && "✓"}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-noir-900">
                          {grilleInterrupteurs.map((item) => (
                            <tr key={item.gang}>
                              <td className="py-2 px-2 text-ivoire font-medium">{item.label}</td>
                              <td className={`py-2 px-2 text-right ${techInterrupteur === "wifi" ? "text-or font-semibold" : "text-ivoire-700"}`}>
                                {formatFCFA(item.wifi)}
                              </td>
                              <td className={`py-2 px-2 text-right ${techInterrupteur === "zigbee" ? "text-or font-semibold" : "text-ivoire-700"}`}>
                                {formatFCFA(item.zigbee)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Compteurs de quantité par modèle */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-titre text-xs uppercase tracking-wide text-ivoire">
                        Nombre d&apos;interrupteurs à installer :
                      </span>
                      <span className="font-titre text-xs text-or">
                        Total : {totalInterrupteurs} unité(s)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {grilleInterrupteurs.map((item) => {
                        const qte = interrupteursParGang[item.gang];
                        const pu = item[techInterrupteur];
                        return (
                          <div
                            key={item.gang}
                            className="border border-noir-800 bg-noir-900 p-3 flex items-center justify-between"
                          >
                            <div>
                              <span className="font-titre text-xs uppercase tracking-wide text-ivoire block">
                                {item.label} ({techInterrupteur.toUpperCase()})
                              </span>
                              <span className="font-texte text-[11px] text-ivoire-700">
                                {formatFCFA(pu)} / unité
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setInterrupteursParGang((prev) => ({
                                    ...prev,
                                    [item.gang]: Math.max(0, prev[item.gang] - 1),
                                  }))
                                }
                                className="h-8 w-8 border border-noir-700 bg-noir-800 font-titre text-sm text-ivoire hover:border-or flex items-center justify-center transition-colors"
                              >
                                —
                              </button>
                              <span className="font-titre text-base text-or w-7 text-center">
                                {qte}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setInterrupteursParGang((prev) => ({
                                    ...prev,
                                    [item.gang]: Math.min(10, prev[item.gang] + 1),
                                  }))
                                }
                                className="h-8 w-8 border border-noir-700 bg-noir-800 font-titre text-sm text-ivoire hover:border-or flex items-center justify-center transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {totalInterrupteurs >= 4 && techInterrupteur === "wifi" && (
                      <div className="font-texte text-xs text-or bg-noir-950 border border-or/40 p-3">
                        💡 <strong>Conseil d&apos;expert :</strong> Vous avez sélectionné {totalInterrupteurs} interrupteurs. Nous vous recommandons d&apos;opter pour la technologie <strong>Zigbee</strong> pour garantir une réactivité instantanée et éviter d&apos;encombrer votre Wi-Fi.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ÉCRAN 5 : Appareils à contrôler */}
              {etape === 5 && (
                <div className="space-y-6">
                  <span className="font-titre text-xs uppercase tracking-logo text-or block">
                    Question 05
                  </span>
                  <h2 className="font-titre text-xl sm:text-2xl uppercase tracking-accroche text-ivoire">
                    Quels appareils souhaitez-vous piloter ?
                  </h2>
                  <p className="font-texte text-sm text-ivoire-700">
                    La télécommande infrarouge centralise TV, clim et ventilateur. Les prises intelligentes gèrent les autres équipements.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <Checkbox
                      label="Téléviseur (Allumage, volume, chaînes)"
                      checked={controleTV}
                      onChange={(e) => setControleTV(e.target.checked)}
                    />
                    <Checkbox
                      label="Climatiseur (Thermostat, marche/arrêt)"
                      checked={controleClim}
                      onChange={(e) => setControleClim(e.target.checked)}
                    />
                    <Checkbox
                      label="Ventilateur ou brasseur d'air"
                      checked={controleVentilateur}
                      onChange={(e) => setControleVentilateur(e.target.checked)}
                    />
                  </div>

                  <div className="pt-4 border-t border-noir-800">
                    <span className="font-titre text-xs uppercase tracking-wide text-ivoire block mb-2">
                      Prises intelligentes supplémentaires ({formatFCFA(prixPrise)} / unité) :
                    </span>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setPrisesSupplementaires((prev) => Math.max(0, prev - 1))}
                        className="h-10 w-10 border border-noir-700 bg-noir-800 font-titre text-lg text-ivoire hover:border-or flex items-center justify-center"
                      >
                        —
                      </button>
                      <span className="font-titre text-2xl text-or w-12 text-center">
                        {prisesSupplementaires}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPrisesSupplementaires((prev) => Math.min(10, prev + 1))}
                        className="h-10 w-10 border border-noir-700 bg-noir-800 font-titre text-lg text-ivoire hover:border-or flex items-center justify-center"
                      >
                        +
                      </button>
                      <span className="font-texte text-xs text-ivoire-700">
                        prise(s) ({formatFCFA(prisesSupplementaires * prixPrise)})
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-noir-800">
                    <span className="font-titre text-xs uppercase tracking-wide text-ivoire block mb-2">
                      Assistant vocal pour commande à la voix :
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          id: "echo-dot",
                          label: "Echo Dot (85 000 FCFA)",
                          desc: "Son supérieur puissant, capteur de température, détecteur de présence & commandes tactiles.",
                        },
                        {
                          id: "echo-pop",
                          label: "Echo Pop (Prix à confirmer)",
                          desc: "Format compact hémisphérique. Note : Amazon ne les produit plus (tarif à confirmer).",
                        },
                        {
                          id: "aucun",
                          label: "Aucun assistant vocal",
                          desc: "Pilotage tactile mural et via smartphone uniquement.",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setAssistantVocal(opt.id as any)}
                          className={`p-3 text-left border text-xs transition-colors flex flex-col justify-between ${
                            assistantVocal === opt.id
                              ? "border-or bg-noir-950 text-ivoire"
                              : "border-noir-700 bg-noir-800 text-ivoire-700 hover:border-noir-600"
                          }`}
                        >
                          <div>
                            <span className="font-titre uppercase tracking-wide text-ivoire font-medium block mb-1">
                              {opt.label}
                            </span>
                            <span className="font-texte text-[11px] text-ivoire-700 leading-snug block">
                              {opt.desc}
                            </span>
                          </div>
                          {assistantVocal === opt.id && (
                            <span className="font-titre text-[10px] text-or uppercase tracking-wide mt-2 block">
                              ✓ Choisi
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ÉCRAN 6 : Wi-Fi existant */}
              {etape === 6 && (
                <div className="space-y-6">
                  <span className="font-titre text-xs uppercase tracking-logo text-or block">
                    Question 06
                  </span>
                  <h2 className="font-titre text-xl sm:text-2xl uppercase tracking-accroche text-ivoire">
                    Disposez-vous d&apos;une connexion Wi-Fi à domicile ?
                  </h2>
                  <p className="font-texte text-sm text-ivoire-700">
                    Une connexion Wi-Fi stable est indispensable pour synchroniser vos appareils connectés.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setWifiExistant(true)}
                      className={`p-6 text-left border transition-colors ${
                        wifiExistant
                          ? "border-or bg-noir-950 text-ivoire"
                          : "border-noir-700 bg-noir-800 text-ivoire-700 hover:border-noir-600"
                      }`}
                    >
                      <span className="font-titre text-base uppercase tracking-wide text-ivoire block mb-1">
                        Oui, j&apos;ai le Wi-Fi
                      </span>
                      <span className="font-texte text-xs text-ivoire-700">
                        Box fibre ou routeur 4G déjà actif chez moi
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWifiExistant(false)}
                      className={`p-6 text-left border transition-colors ${
                        !wifiExistant
                          ? "border-or bg-noir-950 text-ivoire"
                          : "border-noir-700 bg-noir-800 text-ivoire-700 hover:border-noir-600"
                      }`}
                    >
                      <span className="font-titre text-base uppercase tracking-wide text-ivoire block mb-1">
                        Non, pas de Wi-Fi actuellement
                      </span>
                      <span className="font-texte text-xs text-ivoire-700">
                        Je souhaite que Neodomotique me conseille sur la configuration réseau
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* ÉCRAN 7 : Localisation */}
              {etape === 7 && (
                <div className="space-y-6">
                  <span className="font-titre text-xs uppercase tracking-logo text-or block">
                    Question 07
                  </span>
                  <h2 className="font-titre text-xl sm:text-2xl uppercase tracking-accroche text-ivoire">
                    Où se situe votre logement ?
                  </h2>
                  <p className="font-texte text-sm text-ivoire-700">
                    Nous intervenons avec nos techniciens locaux à Brazzaville et Pointe-Noire, ainsi que sur tout le territoire national selon l&apos;envergure de votre projet.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <Select
                      label="Ville d'intervention"
                      value={ville}
                      onChange={(e) => setVille(e.target.value)}
                      options={[
                        { value: "Brazzaville", label: "Brazzaville" },
                        { value: "Pointe-Noire", label: "Pointe-Noire" },
                        { value: "Dolisie", label: "Dolisie" },
                        { value: "Nkayi", label: "Nkayi" },
                        { value: "Oyo", label: "Oyo" },
                        { value: "Ouesso", label: "Ouesso" },
                        { value: "Kinkala", label: "Kinkala" },
                        { value: "Mossendjo", label: "Mossendjo" },
                        { value: "Autre localité (Congo)", label: "Autre localité (Congo - Projet national)" },
                      ]}
                    />

                    <Input
                      label="Quartier / Arrondissement"
                      placeholder="Ex : Moungali, Bacongo, Centre-ville..."
                      value={quartier}
                      onChange={(e) => setQuartier(e.target.value)}
                      required
                      aide="Indispensable pour estimer le déplacement de l'installateur"
                    />
                  </div>
                </div>
              )}

              {/* ÉCRAN 8 : Coordonnées */}
              {etape === 8 && (
                <div className="space-y-6">
                  <span className="font-titre text-xs uppercase tracking-logo text-or block">
                    Question 08
                  </span>
                  <h2 className="font-titre text-xl sm:text-2xl uppercase tracking-accroche text-ivoire">
                    À quel nom établir votre devis ?
                  </h2>
                  <p className="font-texte text-sm text-ivoire-700">
                    Vos coordonnées serviront à générer votre devis imprimable et votre récapitulatif WhatsApp.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <Input
                      label="Nom & Prénom"
                      placeholder="Ex : Guy-Aimé Mabiala"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      required
                    />

                    <Input
                      label="Numéro de Téléphone"
                      placeholder="Ex : +242 06 123 45 67"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      required
                      aide="Numéro joint pour le suivi de votre devis"
                    />
                  </div>
                </div>
              )}

              {/* Message d'erreur d'étape */}
              {erreurEtape && (
                <p className="font-texte text-xs text-red-400 mt-4 border-l-2 border-red-500 pl-3">
                  {erreurEtape}
                </p>
              )}
            </div>

            {/* Barre de navigation entre les étapes */}
            <div className="pt-8 border-t border-noir-800 flex items-center justify-between gap-4">
              {etape > 1 ? (
                <Button
                  variant="neutre"
                  size="md"
                  onClick={etapePrecedente}
                >
                  ← Étape précédente
                </Button>
              ) : (
                <div />
              )}

              <Button
                variant="primaire"
                size="md"
                onClick={etapeSuivante}
              >
                {etape === 8 ? "Calculer mon devis final →" : "Étape suivante →"}
              </Button>
            </div>
          </div>
        ) : (
          /* ================= ÉCRAN FINAL : RÉCAPITULATIF DU DEVIS ================= */
          <div className="space-y-10">
            {/* Boîte imprimable du devis */}
            <div
              id="devis-imprimable"
              className="border-2 border-or/60 bg-noir-900 p-6 sm:p-10 text-ivoire print:bg-white print:text-black print:border-black print:p-8"
            >
              {/* En-tête officiel du devis */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-noir-700 print:border-gray-300 pb-6">
                <div>
                  <span className="font-titre text-xs uppercase tracking-logo text-or print:text-black block mb-1">
                    {site.nom}
                  </span>
                  <h2 className="font-titre text-2xl sm:text-3xl uppercase tracking-logo text-ivoire print:text-black">
                    Devis Estimatif Domotique
                  </h2>
                  <p className="font-texte text-xs text-ivoire-700 print:text-gray-600 mt-1">
                    {site.slogan} · {site.whatsapp.affichage}
                  </p>
                </div>

                <div className="text-left sm:text-right font-texte text-xs text-ivoire-700 print:text-gray-600">
                  <p>Date d&apos;émission : <strong className="text-ivoire print:text-black">{dateEmission}</strong></p>
                  <p>Validité : <strong className="text-or print:text-black">{validiteDevisJours} jours</strong> (jusqu&apos;au {dateExpiration})</p>
                  <p className="mt-2">Lieu d&apos;intervention : <strong className="text-ivoire print:text-black">{quartier}, {ville}</strong></p>
                  <p>Client : <strong className="text-ivoire print:text-black">{nom} ({telephone})</strong></p>
                </div>
              </div>

              {/* Recommandation de pack si studio */}
              {calcul.packRecommande && (
                <div className="my-6 border border-or bg-noir-950 p-4 print:border-gray-300 print:bg-gray-50">
                  <span className="font-titre text-xs uppercase tracking-accroche text-or print:text-black block mb-1">
                    Pack Recommandé : {calcul.packRecommande.nom}
                  </span>
                  <p className="font-texte text-xs text-ivoire-700 print:text-gray-700">
                    {calcul.packRecommande.economie} Découvrez les détails sur notre page{" "}
                    <Link href="/packs" className="text-or underline print:text-black">
                      Packs Domotiques
                    </Link>.
                  </p>
                </div>
              )}

              {/* Tableau ligne par ligne */}
              <div className="my-8 overflow-x-auto">
                <table className="w-full text-left font-texte text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-noir-700 print:border-gray-300 font-titre uppercase tracking-accroche text-xs text-ivoire-800 print:text-black">
                      <th className="py-3 px-3">Désignation</th>
                      <th className="py-3 px-3 text-center">Qté</th>
                      <th className="py-3 px-3 text-right">P.U (FCFA)</th>
                      <th className="py-3 px-3 text-right">Total (FCFA)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-noir-800 print:divide-gray-200">
                    {calcul.lignes.map((l, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-3">
                          <span className="font-medium text-ivoire print:text-black">{l.nom}</span>
                          {l.note && (
                            <span className="block text-xs text-or print:text-gray-600 italic">
                              {l.note}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center">{l.quantite}</td>
                        <td className="py-3 px-3 text-right text-ivoire-700 print:text-gray-600">
                          {l.prixUnitaire !== null ? formatFCFA(l.prixUnitaire) : "À confirmer"}
                        </td>
                        <td className="py-3 px-3 text-right font-medium text-ivoire print:text-black">
                          {l.total !== null ? formatFCFA(l.total) : "À confirmer"}
                        </td>
                      </tr>
                    ))}
                    {/* Ligne Main d'œuvre */}
                    <tr className="bg-noir-950/40 print:bg-gray-50">
                      <td className="py-3 px-3">
                        <span className="font-medium text-ivoire print:text-black">
                          Main d&apos;œuvre & Configuration sur place
                        </span>
                        <span className="block text-xs text-ivoire-800 print:text-gray-500">
                          Pose, raccordement, paramétrage Wi-Fi et test de chaque appareil
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">1</td>
                      <td className="py-3 px-3 text-right text-ivoire-700 print:text-gray-600">
                        {formatFCFA(mainOeuvre)}
                      </td>
                      <td className="py-3 px-3 text-right font-medium text-ivoire print:text-black">
                        {formatFCFA(mainOeuvre)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totaux, Acompte et Solde */}
              <div className="border-t-2 border-noir-700 print:border-gray-400 pt-6 flex flex-col sm:items-end font-texte text-sm">
                <div className="w-full sm:w-80 space-y-2">
                  <div className="flex justify-between text-ivoire-700 print:text-gray-600">
                    <span>Total Matériel :</span>
                    <span className="font-medium text-ivoire print:text-black">
                      {formatFCFA(calcul.totalMateriel)}
                    </span>
                  </div>
                  <div className="flex justify-between text-ivoire-700 print:text-gray-600">
                    <span>Main d&apos;œuvre d&apos;installation :</span>
                    <span className="font-medium text-ivoire print:text-black">
                      {formatFCFA(mainOeuvre)}
                    </span>
                  </div>

                  <div className="border-t border-noir-800 print:border-gray-300 pt-2 flex justify-between text-sm">
                    <span className="text-or print:text-black font-medium">
                      Acompte ({acomptePourcentage}% du matériel avant pose) :
                    </span>
                    <span className="font-titre text-base text-or print:text-black">
                      {formatFCFA(calcul.acompte)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-ivoire-700 print:text-gray-600">
                    <span>Solde à la fin des tests :</span>
                    <span className="font-medium text-ivoire print:text-black">
                      {formatFCFA(calcul.solde)}
                    </span>
                  </div>

                  <div className="border-t-2 border-or print:border-black pt-3 flex justify-between items-baseline">
                    <span className="font-titre text-base uppercase tracking-wide text-ivoire print:text-black font-medium">
                      Total Devis :
                    </span>
                    <span className="font-titre text-2xl sm:text-3xl text-or print:text-black font-normal">
                      {formatFCFA(calcul.totalGeneral)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mentions de garantie */}
              <div className="mt-8 pt-6 border-t border-noir-800 print:border-gray-300 font-texte text-xs text-ivoire-800 print:text-gray-500">
                <p>• Matériel 100% neuf et garanti constructeur.</p>
                <p>• 30 jours d&apos;assistance technique réactive inclus après l&apos;installation.</p>
                <p>• Devis gratuit, valable 30 jours à compter de son émission.</p>
              </div>
            </div>

            {/* Boutons d'action : WhatsApp, Imprimer / PDF, Recommencer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
              <Button
                variant="neutre"
                size="md"
                onClick={() => setEtape(1)}
              >
                ← Modifier mes réponses
              </Button>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Button
                  variant="secondaire"
                  size="md"
                  onClick={imprimerDevis}
                  fullWidth
                >
                  Imprimer / Enregistrer en PDF
                </Button>

                <Button
                  variant="primaire"
                  size="lg"
                  href={lienWhatsApp(messageWhatsAppDevis)}
                  isExternal
                  fullWidth
                >
                  Envoyer sur WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
