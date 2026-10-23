import type { Video } from "@/lib/types";

// Démonstrations réelles fournies par le client.
// TODO: titres définitifs à valider avec le client.
// Attention : la vidéo 02 montre un enfant (visage masqué par un emoji), à valider avant publication.
export const videos: Video[] = [
  { id: "demo-01", titre: "Contrôle des couleurs depuis le smartphone", src: "/videos/demo-01-couleurs-smartphone.mp4", poster: "/posters/demo-01-couleurs-smartphone.jpg" },
  { id: "demo-02", titre: "Assistant vocal", src: "/videos/demo-02-assistant-vocal.mp4", poster: "/posters/demo-02-assistant-vocal.jpg" },
  { id: "demo-03", titre: "Commande vocale de nuit", src: "/videos/demo-03-bonjour-nuit.mp4", poster: "/posters/demo-03-bonjour-nuit.jpg" },
  { id: "demo-04", titre: "Installation complète pour moins de 150 000 FCFA", src: "/videos/demo-04-installation-complete.mp4", poster: "/posters/demo-04-installation-complete.jpg" },
  { id: "demo-05", titre: "Éclairage commandé à la voix", src: "/videos/demo-05-eclairage-vocal.mp4", poster: "/posters/demo-05-eclairage-vocal.jpg" },
  { id: "demo-06", titre: "Réveil intelligent", src: "/videos/demo-06-reveil-smart.mp4", poster: "/posters/demo-06-reveil-smart.jpg" },
];
