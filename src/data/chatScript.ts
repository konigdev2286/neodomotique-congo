// Scénario scripté de qualification pour l'assistant Neodomotique Congo
// // BRANCHER_ICI : Remplacer les réponses statiques par un appel API vers le modèle de langage (ex: Mistral / Claude)

export interface MessageChat {
  id: string;
  expediteur: "assistant" | "utilisateur";
  texte: string;
  reponsesRapides?: string[];
  typeContenu?: "texte" | "pack-recommande" | "creneaux" | "confirmation-rdv";
  donneesSupplementaires?: any;
  date: string;
}

export const messageInitial: MessageChat = {
  id: "msg-init",
  expediteur: "assistant",
  texte: "Bonjour ! Je suis l'assistant virtuel de Neodomotique Congo. Je peux vous guider pour trouver l'installation domotique idéale à Brazzaville ou Pointe-Noire. Quel est votre type de logement ?",
  reponsesRapides: ["Studio", "Appartement", "Maison / Villa", "Parler à un humain"],
  date: "À l'instant",
};

export const creneauxDisponibles = [
  "Demain entre 10h et 12h",
  "Demain entre 14h et 16h",
  "Samedi matin à 10h",
  "Samedi après-midi à 15h",
];
export const creneauxFictifsDisponibles = creneauxDisponibles;

// // BRANCHER_ICI : Logique de transition du dialogue (Remplacer par un endpoint POST /api/chat)
export function obtenirReponseScript(
  messageUtilisateur: string,
  historique: MessageChat[]
): Omit<MessageChat, "id" | "date"> {
  const texte = messageUtilisateur.toLowerCase();

  // 1. Demande de parler à un humain
  if (texte.includes("humain") || texte.includes("conseiller") || texte.includes("technicien")) {
    return {
      expediteur: "assistant",
      texte: "Vous pouvez échanger sans attendre avec l'un de nos installateurs sur WhatsApp au +242 06 613 00 09.",
      reponsesRapides: ["Ouvrir WhatsApp", "Reprendre le questionnaire"],
    };
  }

  // 2. Étape : Type de logement -> Demande du nombre de pièces
  if (texte.includes("studio")) {
    return {
      expediteur: "assistant",
      texte: "Très bien, pour un studio, nos installations sont particulièrement rapides (moins d'une demi-journée). Souhaitez-vous plutôt commander l'éclairage ou l'ensemble de vos appareils (TV, climatiseur) ?",
      reponsesRapides: ["Éclairage seul", "Éclairage + Climatiseur/TV", "Voir le Pack Studio"],
    };
  }

  if (texte.includes("appartement") || texte.includes("maison") || texte.includes("villa")) {
    return {
      expediteur: "assistant",
      texte: "Parfait ! Combien de pièces principales souhaitez-vous équiper (salon, chambres...) ?",
      reponsesRapides: ["2 pièces", "3 pièces", "4 pièces ou plus"],
    };
  }

  // 3. Étape : Nombre de pièces ou choix d'équipements -> Points lumineux
  if (texte.includes("pièce") || texte.includes("pièces")) {
    return {
      expediteur: "assistant",
      texte: "Noté ! Avez-vous une connexion Wi-Fi active dans votre logement pour relier les modules ?",
      reponsesRapides: ["Oui, j'ai le Wi-Fi", "Non, pas encore", "Je ne sais pas"],
    };
  }

  // 4. Étape Wi-Fi -> Recommandation de pack
  if (texte.includes("wi-fi") || texte.includes("wifi")) {
    const historiqueTexte = historique.map(h => h.texte.toLowerCase()).join(" ");
    const estPetitLogement = historiqueTexte.includes("studio") || historiqueTexte.includes("éclairage seul");

    return {
      expediteur: "assistant",
      texte: estPetitLogement
        ? "Voici la formule idéale pour démarrer simplement : le Pack Studio Starter (110 000 FCFA avec pose complète)."
        : "Voici la formule la plus adaptée que nous recommandons fréquemment chez nos clients : le Pack Studio Confort (150 000 FCFA tout compris avec pose).",
      typeContenu: "pack-recommande",
      donneesSupplementaires: {
        packId: estPetitLogement ? "starter" : "confort",
      },
      reponsesRapides: ["Prendre rendez-vous", "Calculer un devis sur mesure", "Parler à un humain"],
    };
  }

  // 5. Demande de pack
  if (texte.includes("pack")) {
    const historiqueTexte = historique.map(h => h.texte.toLowerCase()).join(" ");
    const estStarter = texte.includes("starter") || historiqueTexte.includes("studio");
    return {
      expediteur: "assistant",
      texte: estStarter
        ? "Voici notre Pack Studio Starter (110 000 FCFA) avec enceinte Echo Pop, commande d'éclairage et pose à domicile :"
        : "Voici notre Pack Studio Confort (150 000 FCFA) avec contrôle vocal Alexa et installation incluse chez vous :",
      typeContenu: "pack-recommande",
      donneesSupplementaires: {
        packId: estStarter ? "starter" : "confort",
      },
      reponsesRapides: ["Prendre rendez-vous", "Poser une question"],
    };
  }

  // 6. Prise de rendez-vous -> Choix de créneaux
  if (texte.includes("rendez-vous") || texte.includes("rdv") || texte.includes("créneau")) {
    return {
      expediteur: "assistant",
      texte: "Nos installateurs peuvent passer effectuer une visite technique gratuite. Quel créneau vous conviendrait le mieux ?",
      typeContenu: "creneaux",
      reponsesRapides: creneauxDisponibles,
    };
  }

  // 7. Choix d'un créneau -> Confirmation du rendez-vous
  const creneauTrouve = creneauxDisponibles.find((c) => texte.includes(c.toLowerCase()));
  if (creneauTrouve || texte.includes("demain") || texte.includes("samedi")) {
    const creneauFinal = creneauTrouve || messageUtilisateur;
    return {
      expediteur: "assistant",
      texte: `Créneau "${creneauFinal}" bien noté ! Pour bloquer définitivement ce créneau avec l'équipe de Brazzaville ou Pointe-Noire, confirmez-le dès maintenant sur WhatsApp.`,
      typeContenu: "confirmation-rdv",
      donneesSupplementaires: {
        creneau: creneauFinal,
      },
      reponsesRapides: ["Transmettre sur WhatsApp", "Calculer un devis", "Poser une autre question"],
    };
  }

  // Réponse par défaut
  return {
    expediteur: "assistant",
    texte: "Bien reçu ! Aimeriez-vous que nous vous proposions une date de passage pour évaluer votre installation ou préférez-vous recevoir un devis chiffré ?",
    reponsesRapides: ["Prendre rendez-vous", "Simuler un devis", "Parler à un humain"],
  };
}
