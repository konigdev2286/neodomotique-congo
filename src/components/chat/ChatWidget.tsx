"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { site, lienWhatsApp } from "@/data/site";
import {
  MessageChat,
  messageInitial,
  obtenirReponseScript,
  creneauxDisponibles,
} from "@/data/chatScript";
import { packs } from "@/data/packs";
import { formatFCFA } from "@/lib/format";
import { Button } from "../Button";
import { IconFermer, IconCalendrier, IconCheck } from "../Icons";

export function ChatWidget() {
  const [ouvert, setOuvert] = useState(false);
  const [messages, setMessages] = useState<MessageChat[]>([messageInitial]);
  const [saisie, setSaisie] = useState("");
  const [enTrainDeTaper, setEnTrainDeTaper] = useState(false);

  // Gestion des états techniques demandés dans la vision : normal, chargement, erreur réseau, hors ligne
  const [etatReseau, setEtatReseau] = useState<"en-ligne" | "erreur-reseau" | "hors-ligne">("en-ligne");

  const finMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Écoute de l'événement global pour ouvrir le chat depuis la barre mobile ou le bureau
  useEffect(() => {
    const handleOuvrirChat = () => {
      setOuvert(true);
    };

    window.addEventListener("neodomotique:open-chat", handleOuvrirChat);
    return () => {
      window.removeEventListener("neodomotique:open-chat", handleOuvrirChat);
    };
  }, []);

  // Défilement automatique vers le bas à chaque nouveau message
  useEffect(() => {
    if (ouvert) {
      finMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, enTrainDeTaper, ouvert]);

  // Fermeture par la touche Échap et focus initial
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && ouvert) {
        setOuvert(false);
      }
    };
    if (ouvert) {
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [ouvert]);

  // Bloquer le scroll du body sur mobile quand le chat plein écran est ouvert
  useEffect(() => {
    if (ouvert && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [ouvert]);

  // Envoi d'un message utilisateur
  const envoyerMessage = (texteAEnvoyer?: string) => {
    const texte = (texteAEnvoyer || saisie).trim();
    if (!texte) return;

    if (etatReseau === "hors-ligne") {
      return;
    }

    const nouveauMsgUtilisateur: MessageChat = {
      id: `user-${Date.now()}`,
      expediteur: "utilisateur",
      texte,
      date: "À l'instant",
    };

    setMessages((prev) => [...prev, nouveauMsgUtilisateur]);
    setSaisie("");
    setEnTrainDeTaper(true);

    // Si simuler erreur réseau
    if (etatReseau === "erreur-reseau") {
      setTimeout(() => {
        setEnTrainDeTaper(false);
      }, 600);
      return;
    }

    // // BRANCHER_ICI : Remplacer ce délai par un fetch("/api/chat", { method: "POST", body: ... })
    setTimeout(() => {
      const reponse = obtenirReponseScript(texte, messages);
      const nouveauMsgAssistant: MessageChat = {
        ...reponse,
        id: `assistant-${Date.now()}`,
        date: "À l'instant",
      };
      setMessages((prev) => [...prev, nouveauMsgAssistant]);
      setEnTrainDeTaper(false);
    }, 750);
  };

  if (!ouvert) return null;

  return (
    <>
      {/* Fond sombre permettant de fermer en cliquant en dehors */}
      <div
        className="fixed inset-0 z-40 bg-noir/60 backdrop-blur-[1px] md:bg-transparent"
        onClick={() => setOuvert(false)}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Assistant Neodomotique"
        className="fixed inset-0 z-50 md:inset-auto md:bottom-20 md:right-6 md:w-[410px] md:h-[620px] bg-noir flex flex-col border border-or/40 shadow-2xl text-ivoire font-texte"
      >
        {/* 1. En-tête du Chat */}
        <div className="flex items-center justify-between border-b border-noir-800 bg-noir-950 px-4 py-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative h-7 w-7 shrink-0">
              <Image
                src="/brand/logo-icone.png"
                alt="Logo"
                fill
                sizes="28px"
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-titre text-xs uppercase tracking-logo text-ivoire">
                  Assistant Neodomotique
                </span>
                {/* Statut réseau */}
                <span
                  className="h-2 w-2 rounded-none bg-emerald-500 point-or-init"
                  title="En ligne"
                />
              </div>
              <span className="font-texte text-[11px] text-ivoire-800 block">
                En ligne · Réponses automatisées
              </span>
            </div>
          </div>

          {/* Bouton Fermer explicite */}
          <button
            type="button"
            onClick={() => setOuvert(false)}
            className="flex items-center gap-1.5 h-8 px-2.5 border border-noir-700 bg-noir-900 hover:border-or text-ivoire-700 hover:text-or transition-colors font-titre text-[11px] uppercase tracking-wide cursor-pointer"
            aria-label="Fermer la fenêtre d'assistant"
            title="Fermer (Échap)"
          >
            <span>Fermer</span>
            <IconFermer className="w-3.5 h-3.5 text-or" />
          </button>
        </div>

      {/* 2. Bandeau d'état d'erreur ou hors-ligne */}
      {etatReseau === "erreur-reseau" && (
        <div className="bg-red-950/80 border-b border-red-500/40 px-4 py-2 flex items-center justify-between text-xs text-red-300">
          <span>Connexion perturbée. Impossible de joindre l&apos;IA.</span>
          <button
            type="button"
            onClick={() => setEtatReseau("en-ligne")}
            className="underline font-medium hover:text-white"
          >
            Réessayer
          </button>
        </div>
      )}

      {etatReseau === "hors-ligne" && (
        <div className="bg-amber-950/80 border-b border-amber-500/40 px-4 py-2 text-xs text-amber-300">
          Vous êtes actuellement hors-ligne. Vous pouvez joindre un technicien par téléphone.
        </div>
      )}

      {/* 3. Zone de conversation / Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-noir-900/60">
        {messages.map((msg) => {
          const estAssistant = msg.expediteur === "assistant";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${estAssistant ? "items-start" : "items-end"}`}
            >
              {/* Bulle de texte */}
              <div
                className={`max-w-[85%] p-3.5 text-sm leading-relaxed ${
                  estAssistant
                    ? "bg-noir-950 border border-noir-800 text-ivoire"
                    : "bg-noir-800 border border-or/40 text-ivoire"
                }`}
              >
                <p>{msg.texte}</p>

                {/* Insertion d'une Carte de Pack dans la conversation */}
                {msg.typeContenu === "pack-recommande" && (() => {
                  const packAffiche = msg.donneesSupplementaires?.packId === "starter" ? packs[0] : packs[1];
                  return (
                    <div className="mt-3 border border-or/50 bg-noir p-3 space-y-2">
                      <span className="font-titre text-[10px] uppercase tracking-logo text-or block">
                        Formule Recommandée
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-14 shrink-0 bg-noir-900 border border-noir-800 overflow-hidden">
                          <Image
                            src={packAffiche.image}
                            alt={packAffiche.nom}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-titre text-xs uppercase tracking-wide text-ivoire">
                            {packAffiche.nom}
                          </h4>
                          <span className="font-titre text-sm text-or font-normal">
                            {formatFCFA(packAffiche.prix)}
                          </span>
                          <span className="block text-[10px] text-ivoire-800">
                            Pose incluse · 30 j d&apos;assistance
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="primaire"
                        size="sm"
                        href={lienWhatsApp(`Bonjour, l'assistant m'a recommandé le ${packAffiche.nom}.`)}
                        isExternal
                        fullWidth
                      >
                        Choisir ce pack sur WhatsApp
                      </Button>
                    </div>
                  );
                })()}

                {/* Insertion d'un Sélecteur de créneaux dans la conversation */}
                {msg.typeContenu === "creneaux" && (
                  <div className="mt-3 space-y-1.5 pt-2 border-t border-noir-800">
                    <span className="font-titre text-[10px] uppercase tracking-wide text-ivoire-800 block mb-1">
                      Sélectionnez un créneau de visite :
                    </span>
                    {creneauxDisponibles.map((creneau) => (
                      <button
                        key={creneau}
                        type="button"
                        onClick={() => {
                          envoyerMessage(creneau);
                          inputRef.current?.focus();
                        }}
                        className="w-full text-left p-2.5 border border-noir-700 bg-noir-900 hover:border-or hover:text-or text-xs font-texte transition-colors flex items-center gap-2 group"
                      >
                        <IconCalendrier className="w-4 h-4 text-or shrink-0 group-hover:scale-110 transition-transform" />
                        <span>{creneau}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Confirmation de rendez-vous avec bouton direct WhatsApp */}
                {msg.typeContenu === "confirmation-rdv" && (
                  <div className="mt-3 border border-emerald-500/40 bg-emerald-950/30 p-3 space-y-2 text-xs text-emerald-300">
                    <div className="flex items-start gap-2">
                      <IconCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Visite technique enregistrée. Prévoyez 30 minutes sur place pour le diagnostic Wi-Fi et les mesures.</span>
                    </div>
                    {msg.donneesSupplementaires?.creneau && (
                      <a
                        href={lienWhatsApp(`Bonjour, j'ai sélectionné le créneau suivant pour ma visite technique : ${msg.donneesSupplementaires.creneau}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-titre text-[10px] uppercase tracking-wide text-ivoire bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-500/40 px-2.5 py-1.5 transition-colors mt-1"
                      >
                        <span>Transmettre ce créneau sur WhatsApp</span> →
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Heure / Statut */}
              <span className="text-[10px] text-ivoire-800 mt-1 px-1">
                {msg.date}
              </span>

              {/* Boutons de Réponses rapides associées (visibles uniquement sur le dernier message) */}
              {estAssistant && msg.reponsesRapides && msg.reponsesRapides.length > 0 && (() => {
                const estDernierMessage = msg.id === messages[messages.length - 1]?.id;
                if (!estDernierMessage) return null;

                return (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.reponsesRapides.map((rep, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (rep === "Ouvrir WhatsApp" || rep === "Transmettre sur WhatsApp") {
                            window.open(
                              lienWhatsApp("Bonjour, je souhaite un devis suite à mon échange avec l'assistant."),
                              "_blank"
                            );
                          } else {
                            envoyerMessage(rep);
                            setTimeout(() => inputRef.current?.focus(), 50);
                          }
                        }}
                        className="border border-or/40 bg-noir-950 px-2.5 py-1 text-xs font-titre uppercase tracking-wide text-or hover:bg-or hover:text-noir transition-colors cursor-pointer"
                      >
                        {rep}
                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>
          );
        })}

        {/* Indicateur de frappe (trois points dorés) */}
        {enTrainDeTaper && (
          <div className="flex items-center gap-1.5 bg-noir-950 border border-noir-800 p-3 w-16">
            <span className="h-1.5 w-1.5 bg-or animate-pulse rounded-none" />
            <span className="h-1.5 w-1.5 bg-or animate-pulse delay-150 rounded-none" />
            <span className="h-1.5 w-1.5 bg-or animate-pulse delay-300 rounded-none" />
          </div>
        )}

        <div ref={finMessagesRef} />
      </div>

      {/* 4. Barre d'action rapide : Bouton « Parler à un humain » vers WhatsApp */}
      <div className="border-t border-noir-800 bg-noir-950 px-4 py-2 flex items-center justify-between">
        <span className="text-[11px] text-ivoire-800 font-texte">
          Besoin d&apos;un conseiller ?
        </span>
        <a
          href={lienWhatsApp("Bonjour, je souhaite échanger directement avec un installateur Neodomotique.")}
          target="_blank"
          rel="noopener noreferrer"
          className="font-titre text-[11px] uppercase tracking-wide text-or hover:underline flex items-center gap-1"
        >
          <span>Parler à un humain</span> →
        </a>
      </div>

      {/* 5. Barre de saisie */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          envoyerMessage();
        }}
        className="border-t border-noir-800 bg-noir-950 p-3 flex items-center gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
          disabled={etatReseau === "hors-ligne"}
          placeholder={
            etatReseau === "hors-ligne"
              ? "Assistant hors ligne..."
              : "Écrivez votre message..."
          }
          className="flex-1 h-10 bg-noir-900 border border-noir-700 px-3 text-sm text-ivoire placeholder:text-ivoire-800 focus-visible:outline-none focus-visible:border-or rounded-none"
        />
        <button
          type="submit"
          disabled={!saisie.trim() || etatReseau === "hors-ligne"}
          className="h-10 px-4 border border-or bg-or text-noir font-titre text-xs uppercase tracking-wide font-medium hover:bg-or-clair transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Envoyer
        </button>
      </form>
      </div>
    </>
  );
}
