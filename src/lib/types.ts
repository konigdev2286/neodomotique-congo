export type LignePack = {
  quantite: number;
  nom: string;
  detail: string;
  alternative?: { nom: string; detail: string };
};
export type Pack = { id: string; nom: string; prix: number; description: string; image: string; contenu: LignePack[] };
export type Produit = { id: string; nom: string; prix: number | null };
export type Video = { id: string; titre: string; src: string; poster: string };
