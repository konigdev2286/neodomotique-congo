"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export default function AdminConnexionPage() {
  const router = useRouter();
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);
  const [afficherMdp, setAfficherMdp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur(null);

    if (!motDePasse.trim()) {
      setErreur("Veuillez saisir le mot de passe administrateur.");
      return;
    }

    setChargement(true);

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: motDePasse }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErreur(data.error || "Mot de passe incorrect.");
        setChargement(false);
        return;
      }

      // Succès : redirection vers le tableau de bord admin
      router.push("/admin");
      router.refresh();
    } catch {
      setErreur("Erreur de communication avec le serveur.");
      setChargement(false);
    }
  };

  return (
    <div className="min-h-screen bg-noir flex flex-col justify-center items-center px-4 py-12 text-ivoire">
      {/* Conteneur de connexion */}
      <div className="w-full max-w-md border border-noir-800 bg-noir-950 p-8 sm:p-10 shadow-2xl relative">
        {/* Accentuation bordure supérieure dorée */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-or-fonce via-or to-or-clair" />

        {/* Logo & En-tête */}
        <div className="text-center mb-8">
          <div className="relative mx-auto h-16 w-16 mb-4">
            <Image
              src="/brand/logo-icone.png"
              alt="Logo Neodomotique"
              fill
              sizes="64px"
              priority
              className="object-contain"
            />
          </div>
          <span className="font-titre text-xs uppercase tracking-logo text-or block mb-1">
            Espace Protégé
          </span>
          <h1 className="font-titre text-2xl uppercase tracking-accroche text-ivoire">
            Administration
          </h1>
          <p className="font-texte text-xs text-ivoire-800 mt-2">
            Accès strictement réservé à la direction et aux techniciens habilités.
          </p>
        </div>

        {/* Formulaire de déverrouillage */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="admin-password"
              className="block font-titre text-xs uppercase tracking-wide text-ivoire-700 mb-2"
            >
              Mot de passe sécurisé
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={afficherMdp ? "text" : "password"}
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="current-password"
                autoFocus
                className="w-full bg-noir border border-noir-700 px-4 py-3 text-sm text-ivoire placeholder-noir-500 focus:outline-none focus:border-or font-texte rounded-none transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setAfficherMdp(!afficherMdp)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-texte text-ivoire-800 hover:text-or transition-colors uppercase tracking-wider"
                tabIndex={-1}
              >
                {afficherMdp ? "Masquer" : "Voir"}
              </button>
            </div>
          </div>

          {/* Message d'erreur */}
          {erreur && (
            <div
              role="alert"
              className="border border-red-500/40 bg-red-950/30 p-3 text-xs font-texte text-red-300"
            >
              ⚠️ {erreur}
            </div>
          )}

          {/* Bouton de connexion */}
          <Button
            type="submit"
            variant="primaire"
            size="lg"
            fullWidth
            disabled={chargement}
          >
            {chargement ? "Vérification en cours..." : "Déverrouiller l'accès"}
          </Button>
        </form>

        {/* Note de sécurité */}
        <div className="mt-8 pt-6 border-t border-noir-800 text-center font-texte text-[11px] text-noir-500">
          Toutes les tentatives d&apos;accès non autorisées sont enregistrées.
        </div>
      </div>
    </div>
  );
}
