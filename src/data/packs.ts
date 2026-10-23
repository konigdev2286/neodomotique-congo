import type { Pack } from "@/lib/types";

// Prix fixes, installation incluse. Ne jamais recalculer à partir des prix unitaires.
export const packs: Pack[] = [
  {
    id: "studio-starter",
    nom: "Pack Studio Starter",
    prix: 110000,
    description: "La solution idéale pour transformer votre studio en un espace moderne, connecté et confortable.",
    image: "/images/packs/pack-studio-starter.jpg",
    contenu: [
      { quantite: 1, nom: "Echo Pop", detail: "Contrôle vocal avec Alexa" },
      { quantite: 2, nom: "Ampoules intelligentes", detail: "16 millions de couleurs, contrôle à distance" },
      { quantite: 1, nom: "Télécommande universelle", detail: "Contrôle TV, climatiseur, ventilateur et autres appareils IR" },
      { quantite: 1, nom: "Prise intelligente", detail: "Contrôle à distance, programmation et minuterie" },
    ],
  },
  {
    id: "studio-confort",
    nom: "Pack Studio Confort",
    prix: 150000,
    description: "La solution idéale pour transformer votre studio en un espace moderne, connecté et confortable.",
    image: "/images/packs/pack-studio-confort.jpg",
    contenu: [
      { quantite: 1, nom: "Echo Dot", detail: "Contrôle vocal avec Alexa" },
      {
        quantite: 2,
        nom: "Ampoules intelligentes",
        detail: "16 millions de couleurs, contrôle à distance",
        alternative: { nom: "Interrupteur wifi 2 gang", detail: "Contrôle de vos 2 points lumineux, allumage et extinction" },
      },
      { quantite: 1, nom: "Télécommande universelle", detail: "Contrôle TV, climatiseur, ventilateur et autres appareils IR" },
      { quantite: 2, nom: "Prises intelligentes", detail: "Contrôle à distance, programmation et minuterie" },
    ],
  },
];
