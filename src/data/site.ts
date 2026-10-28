// Source de vérité unique des informations de l'entreprise.
// Rien ici n'est inventé : tout vient du flyer et du logo fournis.
export const site = {
  nom: "Neodomotique Congo",
  slogan: "L'intelligence au service de votre confort",
  sloganAlt: "Maison intelligente • Confort absolu",
  ville: "Brazzaville",
  zones: ["Brazzaville", "Pointe-Noire", "National (selon projet)"],
  whatsapp: { affichage: "+242 06 613 00 09", e164: "242066130009" },
  reseaux: {
    nom: "neodomo.cg",
    handle: "@neodomo.cg",
    plateformes: ["TikTok", "Instagram", "Facebook"],
  },
  liens: {
    tiktok: "https://www.tiktok.com/@neodomo.cg",
    facebook: "https://www.facebook.com/share/1CFkVAM7sc/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/neodomo.cg?obrf=a2k3cXVudmRueWZ5&utm_source=qr",
  },
  assistanceJours: 30,
  garanties: [
    "Installation professionnelle incluse",
    "Configuration complète et test",
    "Matériel 100 % neuf et garanti",
    "Assistance après-vente réactive",
    "30 jours d'assistance",
    "Devis gratuit, réponse rapide, sans engagement",
  ],
} as const;

export const lienWhatsApp = (message = "Bonjour, je souhaite un devis gratuit.") =>
  `https://wa.me/${site.whatsapp.e164}?text=${encodeURIComponent(message)}`;
