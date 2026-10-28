// Données d'administration pour Neodomotique Congo
// // BRANCHER_ICI : Connecter aux tables réelles de base de données (ex: Supabase / PostgreSQL)

export type StatutLead = "nouveau" | "contacte" | "devis_envoye" | "acompte_recu" | "installe";

export interface LeadMock {
  id: string;
  nom: string;
  telephone: string;
  ville: string;
  quartier: string;
  typeLogement: string;
  packInteret: string;
  montantEstime: number;
  statut: StatutLead;
  dateCreation: string;
  source: "simulateur" | "whatsapp" | "chat" | "formulaire";
}

// Les prospects réels enregistrés (initialement vide en production)
export const leadsInitiaux: LeadMock[] = [];

export interface RendezVousMock {
  id: string;
  client: string;
  telephone: string;
  jour: string;
  heure: string;
  ville: string;
  quartier: string;
  objet: string;
}

// Les rendez-vous réels planifiés (initialement vide en production)
export const rdvSemaineMock: RendezVousMock[] = [];

export interface ConversationChatMock {
  id: string;
  client: string;
  derniersMessages: string;
  date: string;
  statut: "en_cours" | "qualifie" | "abandon";
}

// Les conversations réelles archivées (initialement vide en production)
export const conversationsMock: ConversationChatMock[] = [];
