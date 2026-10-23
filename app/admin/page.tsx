"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { site } from "@/data/site";
import {
  leadsInitiaux,
  rdvSemaineMock,
  conversationsMock,
  LeadMock,
  StatutLead,
} from "@/data/adminMock";
import {
  produits as produitsData,
  mainOeuvre as mainOeuvreInitiale,
  acomptePourcentage,
} from "@/data/produits";
import { packs as packsData } from "@/data/packs";
import { formatFCFA } from "@/lib/format";
import { Button } from "@/components/Button";
import { Input, Select } from "@/components/FormFields";

type OngletAdmin =
  | "dashboard"
  | "leads"
  | "devis"
  | "rdv"
  | "chat"
  | "facture"
  | "prix";

export default function AdminPage() {
  const router = useRouter();
  const [ongletActif, setOngletActif] = useState<OngletAdmin>("dashboard");
  const [deconnexionEnCours, setDeconnexionEnCours] = useState(false);

  // État local des leads (synchronisé avec localStorage)
  const [leads, setLeads] = useState<LeadMock[]>(leadsInitiaux);
  const [filtreStatut, setFiltreStatut] = useState<string>("tous");
  const [leadFactureId, setLeadFactureId] = useState<string | null>(null);

  // Charger les leads enregistrés dans le navigateur
  useEffect(() => {
    try {
      const existants = localStorage.getItem("neodomotique_leads");
      if (existants) {
        const parsed = JSON.parse(existants);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLeads(parsed);
        }
      }
    } catch {
      // Ignorer
    }
  }, []);

  // État local des tarifs
  const [prixLocaux, setPrixLocaux] = useState(
    produitsData.map((p) => ({ ...p, prix: p.prix ?? 0 }))
  );
  const [prixPacks, setPrixPacks] = useState(
    packsData.map((pk) => ({ id: pk.id, nom: pk.nom, prix: pk.prix }))
  );
  const [mainOeuvre, setMainOeuvre] = useState<number>(mainOeuvreInitiale);
  const [sauvegardeMessage, setSauvegardeMessage] = useState<string | null>(null);

  // Mise à jour du statut d'un lead
  const changerStatutLead = (id: string, nouveauStatut: StatutLead) => {
    setLeads((prev) => {
      const misAJour = prev.map((l) => (l.id === id ? { ...l, statut: nouveauStatut } : l));
      try {
        localStorage.setItem("neodomotique_leads", JSON.stringify(misAJour));
      } catch {
        // Ignorer
      }
      return misAJour;
    });
  };

  // Filtrage des leads
  const leadsFiltres = leads.filter((l) => {
    if (filtreStatut === "tous") return true;
    return l.statut === filtreStatut;
  });

  // Calculs KPIs
  const totalLeads = leads.length;
  const caEstime = leads.reduce((acc, curr) => acc + curr.montantEstime, 0);
  const installes = leads.filter((l) => l.statut === "installe").length;
  const acomptesRecus = leads.filter((l) => l.statut === "acompte_recu").length;

  const libelleStatut: Record<StatutLead, { label: string; classe: string }> = {
    nouveau: { label: "Nouveau", classe: "border-blue-500/60 text-blue-400 bg-blue-950/40" },
    contacte: { label: "Contacté", classe: "border-purple-500/60 text-purple-400 bg-purple-950/40" },
    devis_envoye: { label: "Devis envoyé", classe: "border-or/60 text-or bg-noir-950" },
    acompte_recu: { label: "Acompte reçu (40%)", classe: "border-amber-500/60 text-amber-400 bg-amber-950/40" },
    installe: { label: "Installé & Validé", classe: "border-emerald-500/60 text-emerald-400 bg-emerald-950/40" },
  };

  const handleEnregistrerTarifs = (e: React.FormEvent) => {
    e.preventDefault();
    // // BRANCHER_ICI : Sauvegarder dans la table produits de Supabase
    setSauvegardeMessage("✓ Tarifs mis à jour avec succès en mémoire locale.");
    setTimeout(() => setSauvegardeMessage(null), 3000);
  };

  const handleDeconnexion = async () => {
    setDeconnexionEnCours(true);
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/connexion");
      router.refresh();
    } catch {
      router.push("/admin/connexion");
    }
  };

  return (
    <div className="min-h-screen bg-noir text-ivoire">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* En-tête Admin */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-noir-800 mb-8">
          <div>
            <span className="font-titre text-xs uppercase tracking-logo text-or">
              Gestion Interne · Neodomotique Congo
            </span>
            <h1 className="font-titre text-2xl sm:text-3xl uppercase tracking-accroche text-ivoire mt-1">
              Tableau de Bord & Opérations
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-titre text-xs uppercase tracking-wide border border-noir-700 bg-noir-900 px-4 py-2 text-ivoire hover:border-or transition-colors"
            >
              ← Voir le site public
            </Link>
            <button
              type="button"
              onClick={handleDeconnexion}
              disabled={deconnexionEnCours}
              className="font-titre text-xs uppercase tracking-wide border border-red-500/40 bg-red-950/20 px-4 py-2 text-red-300 hover:bg-red-950/40 hover:border-red-500 transition-colors"
            >
              {deconnexionEnCours ? "Déconnexion..." : "Se déconnecter"}
            </button>
          </div>
        </div>

        {/* Navigation des Onglets de l'Admin */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-noir-800 scrollbar-thin">
          {[
            { id: "dashboard", label: "01 · Tableau de bord" },
            { id: "leads", label: "02 · Leads & Prospects" },
            { id: "devis", label: "03 · Devis émis" },
            { id: "rdv", label: "04 · Calendrier RDV" },
            { id: "chat", label: "05 · Journal Chat" },
            { id: "facture", label: "06 · Aperçu Facture" },
            { id: "prix", label: "07 · Éditeur de Tarifs" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setOngletActif(tab.id as OngletAdmin)}
              className={`px-4 py-2 text-xs font-titre uppercase tracking-wide border whitespace-nowrap transition-colors rounded-none ${
                ongletActif === tab.id
                  ? "border-or bg-or text-noir font-medium"
                  : "border-noir-700 bg-noir-900 text-ivoire-700 hover:border-noir-600 hover:text-ivoire"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= ONGLET 1 : TABLEAU DE BORD ================= */}
        {ongletActif === "dashboard" && (
          <div className="space-y-8">
            {/* Grille de 4 KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-noir-700 bg-noir-900 p-5">
                <span className="font-texte text-xs text-ivoire-800 uppercase block">
                  Total Leads Reçus
                </span>
                <span className="font-titre text-3xl sm:text-4xl text-ivoire mt-2 block font-normal">
                  {totalLeads}
                </span>
                <span className="text-[11px] text-or mt-1 block">
                  Via Simulateur, WhatsApp et Chat
                </span>
              </div>

              <div className="border border-noir-700 bg-noir-900 p-5">
                <span className="font-texte text-xs text-ivoire-800 uppercase block">
                  Volume d&apos;Affaires Estimé
                </span>
                <span className="font-titre text-2xl sm:text-3xl text-or mt-2 block font-normal">
                  {formatFCFA(caEstime)}
                </span>
                <span className="text-[11px] text-ivoire-800 mt-1 block">
                  Somme des devis en cours
                </span>
              </div>

              <div className="border border-noir-700 bg-noir-900 p-5">
                <span className="font-texte text-xs text-ivoire-800 uppercase block">
                  Acomptes Reçus (40%)
                </span>
                <span className="font-titre text-3xl sm:text-4xl text-amber-400 mt-2 block font-normal">
                  {acomptesRecus}
                </span>
                <span className="text-[11px] text-ivoire-800 mt-1 block">
                  Travaux en phase de planification
                </span>
              </div>

              <div className="border border-noir-700 bg-noir-900 p-5">
                <span className="font-texte text-xs text-ivoire-800 uppercase block">
                  Installations Livrées
                </span>
                <span className="font-titre text-3xl sm:text-4xl text-emerald-400 mt-2 block font-normal">
                  {installes}
                </span>
                <span className="text-[11px] text-emerald-500/80 mt-1 block">
                  30 jours d&apos;assistance actifs
                </span>
              </div>
            </div>

            {/* Derniers Leads */}
            <div className="border border-noir-700 bg-noir-900 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-titre text-base uppercase tracking-accroche text-ivoire">
                  Derniers contacts enregistrés
                </h3>
                <button
                  type="button"
                  onClick={() => setOngletActif("leads")}
                  className="font-titre text-xs uppercase tracking-wide text-or hover:underline"
                >
                  Gérer tous les leads →
                </button>
              </div>

              <div className="divide-y divide-noir-800">
                {leads.length === 0 ? (
                  <p className="py-8 text-center text-xs text-ivoire-800 font-texte">
                    Aucun prospect enregistré pour le moment. Les demandes reçues via le formulaire de contact, le simulateur de devis ou WhatsApp apparaîtront ici.
                  </p>
                ) : (
                  leads.slice(0, 4).map((lead) => (
                    <div key={lead.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <strong className="font-titre text-sm uppercase tracking-wide text-ivoire">
                            {lead.nom}
                          </strong>
                          <span className="text-xs text-ivoire-800">
                            {lead.telephone}
                          </span>
                        </div>
                        <p className="font-texte text-xs text-ivoire-700 mt-1">
                          {lead.typeLogement} à {lead.quartier} ({lead.ville}) · {lead.packInteret}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-titre text-sm text-or">
                          {formatFCFA(lead.montantEstime)}
                        </span>
                        <span className={`px-2.5 py-1 text-[10px] font-titre uppercase border ${libelleStatut[lead.statut].classe}`}>
                          {libelleStatut[lead.statut].label}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= ONGLET 2 : LEADS AVEC CHANGEMENT DE STATUT LOCAL ================= */}
        {ongletActif === "leads" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-noir-800 pb-4">
              <div>
                <h2 className="font-titre text-lg uppercase tracking-accroche text-ivoire">
                  Gestion des prospects & Chantiers
                </h2>
                <p className="font-texte text-xs text-ivoire-700">
                  Modifiez les statuts en direct dans la colonne d&apos;action (enregistré en mémoire locale).
                </p>
              </div>

              {/* Filtres par statut */}
              <div className="flex items-center gap-2">
                <span className="font-texte text-xs text-ivoire-800">Filtrer :</span>
                <select
                  value={filtreStatut}
                  onChange={(e) => setFiltreStatut(e.target.value)}
                  className="bg-noir-900 border border-noir-700 px-3 py-1.5 text-xs font-texte text-ivoire focus:border-or rounded-none"
                >
                  <option value="tous">Tous les statuts ({leads.length})</option>
                  <option value="nouveau">Nouveaux</option>
                  <option value="contacte">Contactés</option>
                  <option value="devis_envoye">Devis envoyé</option>
                  <option value="acompte_recu">Acompte reçu</option>
                  <option value="installe">Installés</option>
                </select>
              </div>
            </div>

            {/* Tableau des Leads */}
            <div className="overflow-x-auto border border-noir-700 bg-noir-900">
              <table className="w-full text-left font-texte text-sm border-collapse">
                <thead>
                  <tr className="border-b border-noir-800 bg-noir-950 font-titre uppercase tracking-wide text-[11px] text-ivoire-800">
                    <th className="py-3.5 px-4">Client</th>
                    <th className="py-3.5 px-4">Localisation</th>
                    <th className="py-3.5 px-4">Projet / Pack</th>
                    <th className="py-3.5 px-4 text-right">Montant</th>
                    <th className="py-3.5 px-4">Statut Actuel</th>
                    <th className="py-3.5 px-4">Modifier le statut (local)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-noir-800">
                  {leadsFiltres.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-xs text-ivoire-800 font-texte">
                        Aucun prospect enregistré ou correspondant aux critères de filtre.
                      </td>
                    </tr>
                  ) : (
                    leadsFiltres.map((lead) => (
                      <tr key={lead.id} className="hover:bg-noir-950/50 transition-colors">
                        <td className="py-4 px-4">
                          <span className="font-titre text-xs uppercase tracking-wide text-ivoire block">
                            {lead.nom}
                          </span>
                          <a
                            href={`tel:${lead.telephone}`}
                            className="font-texte text-xs text-or hover:underline"
                          >
                            {lead.telephone}
                          </a>
                        </td>
                        <td className="py-4 px-4 text-xs text-ivoire-700">
                          {lead.quartier}, {lead.ville}
                        </td>
                        <td className="py-4 px-4 text-xs text-ivoire-700">
                          <span className="block text-ivoire">{lead.packInteret}</span>
                          <span className="text-[11px] text-ivoire-800">{lead.typeLogement}</span>
                        </td>
                        <td className="py-4 px-4 text-right font-titre text-xs text-or">
                          {formatFCFA(lead.montantEstime)}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2 py-0.5 text-[10px] font-titre uppercase border ${libelleStatut[lead.statut].classe}`}>
                            {libelleStatut[lead.statut].label}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={lead.statut}
                            onChange={(e) => changerStatutLead(lead.id, e.target.value as StatutLead)}
                            className="bg-noir-950 border border-noir-700 text-xs px-2 py-1 text-ivoire hover:border-or focus:border-or rounded-none"
                          >
                            <option value="nouveau">Nouveau</option>
                            <option value="contacte">Contacté</option>
                            <option value="devis_envoye">Devis envoyé</option>
                            <option value="acompte_recu">Acompte reçu (40%)</option>
                            <option value="installe">Installé & Validé</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= ONGLET 3 : DEVIS ================= */}
        {ongletActif === "devis" && (
          <div className="space-y-6">
            <h2 className="font-titre text-lg uppercase tracking-accroche text-ivoire">
              Liste des propositions et devis chiffrés
            </h2>

            {leads.length === 0 ? (
              <div className="border border-noir-700 bg-noir-900 p-8 text-center text-xs text-ivoire-800 font-texte">
                Aucun devis enregistré pour le moment. Les devis générés depuis le simulateur public ou saisis pour vos clients apparaîtront ici.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {leads.map((l, idx) => (
                  <div key={l.id} className="border border-noir-700 bg-noir-900 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-noir-800 pb-2 mb-3">
                        <span className="font-titre text-[10px] uppercase tracking-logo text-or">
                          DEV-2026-00{idx + 1}
                        </span>
                        <span className="font-texte text-[11px] text-ivoire-800">
                          {l.dateCreation}
                        </span>
                      </div>
                      <h3 className="font-titre text-sm uppercase tracking-wide text-ivoire">
                        {l.nom}
                      </h3>
                      <p className="font-texte text-xs text-ivoire-700 mt-1">
                        {l.typeLogement} · {l.quartier} ({l.ville})
                      </p>
                      <div className="mt-4 pt-3 border-t border-noir-800 space-y-1 text-xs font-texte">
                        <div className="flex justify-between">
                          <span className="text-ivoire-800">Matériel estimé :</span>
                          <span>{formatFCFA(Math.max(0, l.montantEstime - 40000))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-ivoire-800">Main d&apos;œuvre :</span>
                          <span>40 000 FCFA</span>
                        </div>
                        <div className="flex justify-between font-titre text-sm text-or pt-1 border-t border-noir-800">
                          <span>Total Devis :</span>
                          <span>{formatFCFA(l.montantEstime)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-noir-800 flex justify-between items-center">
                      <span className={`px-2 py-0.5 text-[9px] font-titre uppercase border ${libelleStatut[l.statut].classe}`}>
                        {libelleStatut[l.statut].label}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setLeadFactureId(l.id);
                          setOngletActif("facture");
                        }}
                        className="text-xs font-titre uppercase tracking-wide text-or hover:underline"
                      >
                        Voir facture →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= ONGLET 4 : CALENDRIER RENDEZ-VOUS ================= */}
        {ongletActif === "rdv" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-titre text-lg uppercase tracking-accroche text-ivoire">
                Planning des visites techniques et installations
              </h2>
              <p className="font-texte text-xs text-ivoire-700">
                Interventions hebdomadaires programmées à Brazzaville et Pointe-Noire.
              </p>
            </div>

            {rdvSemaineMock.length === 0 ? (
              <div className="border border-noir-700 bg-noir-900 p-8 text-center text-xs text-ivoire-800 font-texte">
                Aucun rendez-vous ni visite technique planifié cette semaine.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rdvSemaineMock.map((rdv) => (
                  <div key={rdv.id} className="border border-or/40 bg-noir-900 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-noir-800 pb-2 mb-3">
                        <span className="font-titre text-xs uppercase tracking-logo text-or">
                          {rdv.jour}
                        </span>
                        <span className="font-titre text-xs text-ivoire bg-noir-950 px-2 py-0.5 border border-noir-700">
                          {rdv.heure}
                        </span>
                      </div>
                      <h3 className="font-titre text-sm uppercase tracking-wide text-ivoire">
                        {rdv.client}
                      </h3>
                      <p className="font-texte text-xs text-or mt-0.5">
                        {rdv.telephone}
                      </p>
                      <p className="font-texte text-xs text-ivoire-700 mt-2">
                        📍 {rdv.quartier}, {rdv.ville}
                      </p>
                      <p className="font-texte text-xs text-ivoire-800 mt-3 pt-2 border-t border-noir-800">
                        {rdv.objet}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-noir-800 flex justify-end">
                      <a
                        href={`https://wa.me/${rdv.telephone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-titre text-[11px] uppercase tracking-wide text-or hover:underline"
                      >
                        Confirmer sur WhatsApp →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= ONGLET 5 : JOURNAL DU CHAT ================= */}
        {ongletActif === "chat" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-titre text-lg uppercase tracking-accroche text-ivoire">
                Historique des échanges de l&apos;assistant
              </h2>
              <p className="font-texte text-xs text-ivoire-700">
                Visualisation des conversations pré-qualifiées par le widget de chat.
              </p>
            </div>

            {conversationsMock.length === 0 ? (
              <div className="border border-noir-700 bg-noir-900 p-8 text-center text-xs text-ivoire-800 font-texte">
                Aucune conversation archivée pour le moment.
              </div>
            ) : (
              <div className="border border-noir-700 bg-noir-900 divide-y divide-noir-800">
                {conversationsMock.map((conv) => (
                  <div key={conv.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-titre text-xs uppercase tracking-wide text-ivoire">
                          {conv.client}
                        </span>
                        <span className="text-[11px] text-ivoire-800">
                          {conv.date}
                        </span>
                      </div>
                      <p className="font-texte text-xs text-ivoire-700 mt-1 italic">
                        {conv.derniersMessages}
                      </p>
                    </div>
                    <span className="px-2.5 py-0.5 text-[10px] font-titre uppercase border border-or/40 text-or bg-noir-950 self-start sm:self-auto">
                      {conv.statut === "qualifie" ? "Lead qualifié" : "En cours"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= ONGLET 6 : APERÇU DE FACTURE PRO-FORMA ================= */}
        {ongletActif === "facture" && (() => {
          const leadActif = leads.find((l) => l.id === leadFactureId) || leads[0];
          const totalFacture = leadActif ? leadActif.montantEstime : 150000;
          const acompte = Math.round(totalFacture * 0.4);
          const solde = totalFacture - acompte;

          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-titre text-lg uppercase tracking-accroche text-ivoire">
                    Aperçu de facture pro-forma
                  </h2>
                  <p className="font-texte text-xs text-ivoire-700">
                    Document officiel imprimable pour le client avec mention d&apos;acompte et solde.
                  </p>
                </div>
                <Button
                  variant="secondaire"
                  size="sm"
                  onClick={() => window.print()}
                >
                  Imprimer la facture
                </Button>
              </div>

              {/* Fiche facture */}
              <div className="border-2 border-or/60 bg-noir-950 p-8 sm:p-12 print:bg-white print:text-black print:border-black">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-noir-800 print:border-gray-300 pb-6">
                  <div>
                    <span className="font-titre text-xs uppercase tracking-logo text-or print:text-black">
                      {site.nom}
                    </span>
                    <h3 className="font-titre text-2xl uppercase tracking-logo text-ivoire print:text-black mt-1">
                      Facture Pro-Forma N° FP-{new Date().getFullYear()}-{leadActif ? leadActif.id.slice(-3).toUpperCase() : "001"}
                    </h3>
                    <p className="font-texte text-xs text-ivoire-700 print:text-gray-600">
                      Brazzaville & Pointe-Noire · Tél : {site.whatsapp.affichage}
                    </p>
                  </div>
                  <div className="text-left sm:text-right text-xs font-texte text-ivoire-700 print:text-gray-600">
                    <p>Date : <strong>{new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</strong></p>
                    <p>Facturé à : <strong className="text-ivoire print:text-black">{leadActif ? leadActif.nom : "Client Neodomotique"}</strong></p>
                    <p>Adresse : {leadActif ? `${leadActif.quartier}, ${leadActif.ville}` : "Brazzaville / Pointe-Noire"}</p>
                  </div>
                </div>

                <div className="my-6">
                  <table className="w-full text-left font-texte text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-noir-800 print:border-gray-300 font-titre uppercase text-ivoire-800 print:text-black">
                        <th className="py-2.5">Article / Prestation</th>
                        <th className="py-2.5 text-center">Qté</th>
                        <th className="py-2.5 text-right">Montant</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-noir-800 print:divide-gray-200">
                      <tr>
                        <td className="py-2.5">{leadActif ? leadActif.packInteret : "Pack Studio Confort (Éclairage + Prises + Télécommande + Echo)"}</td>
                        <td className="py-2.5 text-center">1</td>
                        <td className="py-2.5 text-right">{formatFCFA(Math.max(0, totalFacture - 40000))}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5">Pose, paramétrage Wi-Fi, scénarios personnalisés & 30 jours d&apos;assistance</td>
                        <td className="py-2.5 text-center">1</td>
                        <td className="py-2.5 text-right">40 000 FCFA</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border-t-2 border-noir-800 print:border-gray-300 pt-4 flex justify-end text-xs font-texte">
                  <div className="w-64 space-y-1.5">
                    <div className="flex justify-between">
                      <span>Sous-total HT :</span>
                      <span>{formatFCFA(totalFacture)}</span>
                    </div>
                    <div className="flex justify-between text-or print:text-black font-medium">
                      <span>Acompte 40% :</span>
                      <span>{formatFCFA(acompte)}</span>
                    </div>
                    <div className="flex justify-between text-ivoire print:text-black font-medium">
                      <span>Solde après test & validation :</span>
                      <span>{formatFCFA(solde)}</span>
                    </div>
                    <div className="border-t border-or print:border-black pt-2 flex justify-between font-titre text-base text-or print:text-black font-normal">
                      <span>Total Facture :</span>
                      <span>{formatFCFA(totalFacture)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ================= ONGLET 7 : ÉDITEUR DE TARIFS ================= */}
        {ongletActif === "prix" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-titre text-lg uppercase tracking-accroche text-ivoire">
                Éditeur de prix unitaires et forfaits
              </h2>
              <p className="font-texte text-xs text-ivoire-700">
                Ajustez les tarifs appliqués dans le simulateur de devis et sur les fiches produits.
              </p>
            </div>

            {sauvegardeMessage && (
              <div className="border border-emerald-500 bg-emerald-950/40 p-3 text-xs text-emerald-300 font-texte">
                {sauvegardeMessage}
              </div>
            )}

            <form onSubmit={handleEnregistrerTarifs} className="space-y-8 border border-noir-700 bg-noir-900 p-6 sm:p-8">
              {/* Produits unitaires */}
              <div>
                <span className="font-titre text-xs uppercase tracking-logo text-or block mb-4">
                  01 · Prix unitaires des produits (FCFA)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {prixLocaux.map((p, idx) => (
                    <div key={p.id}>
                      <Input
                        label={p.nom}
                        type="number"
                        value={p.prix}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setPrixLocaux((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, prix: val } : item))
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Main d'œuvre */}
              <div className="pt-6 border-t border-noir-800">
                <span className="font-titre text-xs uppercase tracking-logo text-or block mb-4">
                  02 · Forfait main d&apos;œuvre (FCFA)
                </span>
                <div className="max-w-xs">
                  <Input
                    label="Main d'œuvre d'installation"
                    type="number"
                    value={mainOeuvre}
                    onChange={(e) => setMainOeuvre(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Packs Forfaitaires */}
              <div className="pt-6 border-t border-noir-800">
                <span className="font-titre text-xs uppercase tracking-logo text-or block mb-4">
                  03 · Prix des packs tout inclus (FCFA)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {prixPacks.map((pk, idx) => (
                    <div key={pk.id}>
                      <Input
                        label={pk.nom}
                        type="number"
                        value={pk.prix}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setPrixPacks((prev) =>
                            prev.map((item, i) => (i === idx ? { ...item, prix: val } : item))
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" variant="primaire" size="md">
                  Enregistrer les modifications en local
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
