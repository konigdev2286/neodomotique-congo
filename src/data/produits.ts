import type { Produit } from "@/lib/types";

export type SwitchTech = "wifi" | "zigbee";
export type SwitchGang = 1 | 2 | 3 | 4;

export interface GrilleInterrupteurItem {
  gang: SwitchGang;
  label: string;
  wifi: number;
  zigbee: number;
}

export const grilleInterrupteurs: GrilleInterrupteurItem[] = [
  { gang: 1, label: "1 gang", wifi: 13500, zigbee: 15000 },
  { gang: 2, label: "2 gang", wifi: 15500, zigbee: 17500 },
  { gang: 3, label: "3 gang", wifi: 18500, zigbee: 20000 },
  { gang: 4, label: "4 gang", wifi: 22500, zigbee: 25000 },
];

// Prix unitaires du simulateur de devis (FCFA). Modifiables.
// Echo Pop : prix à confirmer (Amazon a arrêté la production)
export const produits: Produit[] = [
  { id: "ampoule", nom: "Ampoule intelligente", prix: 7000 },
  { id: "interrupteur-wifi-1", nom: "Interrupteur tactile WiFi 1 gang", prix: 13500 },
  { id: "interrupteur-wifi-2", nom: "Interrupteur tactile WiFi 2 gang", prix: 15500 },
  { id: "interrupteur-wifi-3", nom: "Interrupteur tactile WiFi 3 gang", prix: 18500 },
  { id: "interrupteur-wifi-4", nom: "Interrupteur tactile WiFi 4 gang", prix: 22500 },
  { id: "interrupteur-zigbee-1", nom: "Interrupteur tactile Zigbee 1 gang", prix: 15000 },
  { id: "interrupteur-zigbee-2", nom: "Interrupteur tactile Zigbee 2 gang", prix: 17500 },
  { id: "interrupteur-zigbee-3", nom: "Interrupteur tactile Zigbee 3 gang", prix: 20000 },
  { id: "interrupteur-zigbee-4", nom: "Interrupteur tactile Zigbee 4 gang", prix: 25000 },
  { id: "interrupteur-2", nom: "Interrupteur wifi 2 gang", prix: 15500 },
  { id: "telecommande", nom: "Télécommande universelle", prix: 12500 },
  { id: "prise", nom: "Prise intelligente", prix: 7500 },
  { id: "echo-dot", nom: "Echo Dot", prix: 85000 },
  { id: "echo-pop", nom: "Echo Pop", prix: null },
];

export const mainOeuvre = 40000; // FCFA
export const acomptePourcentage = 40; // % du matériel, avant installation
export const validiteDevisJours = 30;
