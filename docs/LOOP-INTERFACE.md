# LOOP INTERFACE (le projet est déjà initialisé)

Règles générales et mécanique : voir `docs/PROMPT-MAITRE.md`. Chaque phase se termine par un STOP.

## PHASE 1 : Design system
Vérifie et affine les tokens de `tailwind.config.ts` (or exact d'après le logo, échelle d'espacement, rayons, ombres). Crée la page `/design` qui montre couleurs, typographies, espacements. Pose la mise en page globale (en-tête, pied de page). STOP.

## PHASE 2 : Composants
Compose à la main, dans `src/components` : en-tête avec menu mobile, pied de page, boutons (3 variantes), champs de formulaire, carte de pack, ligne d'équipement, bandeau WhatsApp, bouton WhatsApp flottant, fenêtre modale, notification. Tous les états (survol, focus, désactivé, erreur). Montre-les dans `/design`. STOP.

## PHASE 3 : Accueil
Hero avec promesse concrète et appel à l'action WhatsApp, les deux packs avec leur contenu réel, les six services, déroulé en quatre étapes (échange, devis, installation, assistance 30 jours), bloc de garanties, section démonstrations avec les vidéos, appel final. Mise en page variée d'une section à l'autre. STOP.

## PHASE 4 : Packs, Services, Réalisations, Contact
Packs : détail de Starter et Confort, choix ampoules OU interrupteur sur Confort, tableau comparatif lisible sur téléphone. Services : une section par service. Réalisations : galerie des 6 vidéos. Contact : WhatsApp en premier, formulaire visuel (nom, téléphone, quartier, message) avec envoi simulé et écran de confirmation. STOP.

## PHASE 5 : Simulateur de devis
Parcours pas à pas, une question par écran sur mobile : logement, pièces, points lumineux, interrupteurs, appareils à contrôler, Wi-Fi, quartier, coordonnées. Progression, retour arrière, calcul en direct depuis `src/data/produits.ts`, récapitulatif avec acompte 40 % du matériel et solde, recommandation d'un pack. Aperçu imprimable du devis. Bouton « Envoyer sur WhatsApp » (lien wa.me prérempli). STOP.

## PHASE 6 : Chat de l'agent (interface seule)
Fenêtre de chat flottante : bulles, saisie, indicateur de frappe, réponses rapides en boutons, cartes de pack, sélecteur de créneaux fictifs, bouton « parler à un humain » vers WhatsApp. Conversation scriptée dans `src/data` avec `// BRANCHER_ICI` là où l'IA sera connectée. États : chargement, erreur réseau, hors ligne. STOP.

## PHASE 7 : Maquette admin
Pages `/admin` sans authentification réelle (bandeau « maquette ») : tableau de bord fictif, leads avec filtres et changement de statut local, devis, calendrier de rendez-vous, aperçu de facture, éditeur de prix. Tout en mémoire locale. STOP.

## PHASE 8 : Finition
Audit mobile (360 px), tablette, bureau. Accessibilité (clavier, focus, contrastes). Performance (images, vidéos, polices, Lighthouse). Cohérence des espacements. Relecture de tous les textes. Rapport chiffré. STOP.

## PHASE 9 : Passation
Liste de tous les `// BRANCHER_ICI` avec ce qu'il faudra connecter (Supabase, Mistral, Resend, PDF), liste des placeholders à remplacer, commandes de lancement et de build. FIN.

## BOUCLE DE RETOUCHE
« CORRIGE : [problème, avec la page ou le composant]. Reprends la phase concernée, relance typecheck, lint et build, refais l'auto-revue, puis attends GO. »
