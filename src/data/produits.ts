import type { Produit } from "@/lib/types";

// Prix unitaires du simulateur de devis (FCFA). Modifiables.
// TODO: prix de l'Echo Pop non fourni.
export const produits: Produit[] = [
  { id: "ampoule", nom: "Ampoule intelligente", prix: 7000 },
  { id: "interrupteur-2", nom: "Interrupteur wifi 2 gang", prix: 15500 },
  { id: "telecommande", nom: "Télécommande universelle", prix: 12500 },
  { id: "prise", nom: "Prise intelligente", prix: 7500 },
  { id: "echo-dot", nom: "Echo Dot", prix: 85000 },
  { id: "echo-pop", nom: "Echo Pop", prix: null },
];

export const mainOeuvre = 40000; // FCFA
export const acomptePourcentage = 40; // % du matériel, avant installation
export const validiteDevisJours = 30;
