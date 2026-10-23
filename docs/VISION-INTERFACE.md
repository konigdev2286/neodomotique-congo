# VISION COMPLÈTE DE L'INTERFACE : Neodomotique Congo

Ce document décrit l'interface entière : concept, écrans, sections, contenus, interactions. Il sert de référence pendant tout le loop. Les phases de `docs/LOOP-INTERFACE.md` construisent cette vision morceau par morceau. En cas de conflit, `docs/PROMPT-MAITRE.md` (périmètre, interdits) l'emporte.

## 1. Concept
**« La maison qui s'allume. »** Un site de nuit, noir profond, où la lumière chaude et l'or du logo sont les seules sources de couleur, comme dans le flyer. L'idée vient du logo : un fil d'or vertical qui relie un point lumineux à un petit cercle. Ce fil devient le motif signature du site : il relie les sections, les étapes du devis et le déroulé en 4 étapes. Un seul point lumineux doré s'illumine à la fin du chargement de la page d'accueil (une fois, pas en boucle).

Ton : concret, rassurant, sans jargon. Chaque phrase énonce un fait (ce qui est installé, combien ça coûte, ce qui est inclus). Public : habitants de Brazzaville et Pointe-Noire qui découvrent la domotique, souvent sur téléphone, via WhatsApp, TikTok ou Facebook. Le message à faire passer : la domotique n'est pas réservée aux riches (une vraie vidéo du client le dit : installation complète à moins de 150 000 FCFA).

## 2. Navigation et éléments globaux
- **En-tête** fixe : icône du logo + nom en capitales espacées à gauche, liens Packs, Services, Réalisations, Devis, Contact, bouton « Devis gratuit » (WhatsApp) à droite. Sur mobile : bouton menu qui ouvre un panneau plein écran noir, liens en grand, numéro WhatsApp en bas.
- **Barre d'actions mobile** fixée en bas : deux boutons, « Assistant » (ouvre le chat) et « WhatsApp ». Sur bureau : bouton WhatsApp rond flottant en bas à droite et lanceur de chat juste au-dessus.
- **Pied de page** : logo complet, slogan, numéro WhatsApp, zones (Brazzaville, Pointe-Noire), liens vers les réseaux (placeholders tant que les URLs manquent), mentions (page placeholder).
- **Page 404** soignée avec retour à l'accueil et WhatsApp.

## 3. Écrans

### 3.1 Accueil `/`
1. **Hero plein écran.** Fond noir avec une image d'intérieur sombre éclairée en chaud (placeholder si absente, jamais d'illustration générique). Titre : « Offrez à votre maison le confort du futur ». Sous-titre : « En le transformant en une maison intelligente ». Deux boutons : « Devis gratuit sur WhatsApp » (principal, or) et « Voir les packs » (contour or). Sous les boutons, une ligne de faits : « Installation incluse · 30 jours d'assistance · Réponse rapide, sans engagement ». Le fil d'or descend du bas du hero vers la section suivante.
2. **Les six services** en liste numérotée de 01 à 06, une ligne par service, séparée par un filet fin : éclairage intelligent, contrôle total de vos appareils, réseau Wi-Fi optimisé, automatisation sur mesure, commande vocale avec Alexa, gestion complète depuis votre smartphone. Au survol ou au toucher, la ligne s'ouvre et affiche une phrase factuelle. Pas de trois cartes alignées.
3. **Les deux packs** côte à côte sur bureau, empilés sur mobile. Chaque pack : visuel, nom, contenu détaillé (quantités réelles), prix en grand (110 000 FCFA, 150 000 FCFA), mention « installation incluse », bouton « Choisir ce pack » (ouvre WhatsApp avec le nom du pack) et lien « Voir le détail ».
4. **Démonstrations réelles.** Rangée horizontale de cartes vidéo verticales (les 6 vidéos), défilement avec accroche, image d'aperçu, titre, bouton lecture. Clic : lecteur en fenêtre modale. Aucune lecture automatique avec son. Mise en avant de la vidéo « Installation complète pour moins de 150 000 FCFA ».
5. **Comment ça marche** : 4 étapes le long du fil d'or vertical, avec un point à chaque étape : 1. Vous nous écrivez sur WhatsApp. 2. Vous recevez un devis gratuit. 3. Nous installons, configurons et testons chez vous. 4. Vous profitez de 30 jours d'assistance. Le fil se dessine une seule fois à l'arrivée dans la section.
6. **Garanties** : six faits en grille sobre (installation professionnelle incluse, configuration complète et test, matériel 100 % neuf et garanti, assistance après-vente réactive, 30 jours d'assistance, devis gratuit et sans engagement).
7. **Bandeau simulateur** : « Calculez votre devis en 2 minutes » + bouton vers `/devis`.
8. **Appel final** : grand numéro +242 06 613 00 09, bouton WhatsApp, zones d'intervention.

### 3.2 Packs `/packs`
- Introduction courte, puis les deux packs en grand format avec le visuel du pack.
- Sur le pack Confort : sélecteur « 2 ampoules intelligentes » ou « Interrupteur wifi 2 gang » qui met à jour la liste du contenu (le prix reste 150 000 FCFA).
- **Tableau comparatif** Starter / Confort : lignes Assistant vocal (Echo Pop / Echo Dot), éclairage, télécommande universelle, prises intelligentes, installation, assistance, prix. Sur mobile : le tableau devient deux colonnes empilées lisibles, sans défilement horizontal.
- Bouton WhatsApp avec message prérempli au nom du pack choisi.

### 3.3 Services `/services`
Six sections, une par service, avec mise en page qui alterne (texte à gauche puis à droite) et un visuel ou une vidéo de démonstration liée quand il existe. Texte court et factuel tiré du flyer ; tout texte supplémentaire non fourni est un placeholder visible.

### 3.4 Réalisations `/realisations`
Galerie des 6 vidéos en grille, titre, durée, lecture en fenêtre modale avec navigation précédente/suivante et touche Échap. Espace prévu pour de futures photos (état vide propre).

### 3.5 Simulateur de devis `/devis`
Parcours en 8 écrans, une question par écran sur mobile, fil d'or vertical (ou barre fine sur mobile) qui montre la progression : type de logement (studio, appartement, maison) ; nombre de pièces ; points lumineux ; interrupteurs à remplacer ; appareils à contrôler (TV, climatiseur, ventilateur, autre) ; Wi-Fi existant ou non ; quartier et ville ; nom et téléphone. Bouton retour à chaque écran, réponses conservées. Calcul en direct depuis `src/data/produits.ts`.
Écran final : récapitulatif ligne par ligne, total matériel, main d'œuvre, acompte de 40 % du matériel avant installation, solde, validité 30 jours, pack recommandé si pertinent. Boutons : « Envoyer sur WhatsApp » (lien wa.me avec le récapitulatif), « Imprimer / enregistrer en PDF » (mise en page d'impression propre). Le produit sans prix (Echo Pop) apparaît « prix à confirmer ».

### 3.6 Contact `/contact`
WhatsApp en premier (bouton géant et numéro), puis formulaire visuel : nom, téléphone, quartier, message. Validation visible, envoi simulé, écran de confirmation. Zones : Brazzaville et Pointe-Noire. Réseaux.

### 3.7 Assistant (chat) : composant global
Fenêtre qui s'ouvre depuis le lanceur : sur mobile plein écran, sur bureau panneau en bas à droite. Bulles, saisie, indicateur de frappe, réponses rapides en boutons, cartes de pack insérées dans la conversation, sélecteur de créneaux fictifs, bouton « Parler à un humain » vers WhatsApp. Scénario scripté dans `src/data` : accueil, questions de qualification (logement, pièces, points lumineux, interrupteurs, Wi-Fi, ville), recommandation d'un pack, proposition de rendez-vous, confirmation. `// BRANCHER_ICI` à l'endroit où l'IA sera connectée. États : chargement, erreur réseau, hors ligne.

### 3.8 Maquette admin `/admin`
Bandeau « maquette, données fictives ». Pages : tableau de bord (chiffres fictifs, derniers leads), leads (filtres, statut modifiable en local : nouveau, contacté, devis envoyé, acompte reçu, installé), devis (liste et aperçu), rendez-vous (calendrier semaine), conversations du chat, aperçu de facture, éditeur de prix et de packs. Tout en mémoire locale.

## 4. Système visuel
- Couleurs : `noir`, `or` (#C49C4F à affiner sur le logo), `ivoire`. Or clair pour les accents lumineux, or foncé pour les filets.
- Titres : Jost fin, capitales, espacement large, dans l'esprit du wordmark. Texte : Source Sans 3. Prix : Jost, gros, en or.
- Grille d'espacement de 8 px, largeur de contenu constante, alignements stricts.
- Filets fins dorés comme séparateurs, angles très peu arrondis, aucun effet de verre, aucune ombre lourde.
- Icônes : jeu unique dessiné en traits fins dans le même style que le logo (ampoule, prise, télécommande, Wi-Fi, micro, smartphone).
- Photos : intérieurs sombres à lumière chaude uniquement. En l'absence de vraie photo, placeholder sobre étiqueté, jamais d'image générique.

## 5. Mouvement
Peu et utile : le point du logo s'illumine une fois au chargement, le fil d'or se dessine une fois, les accordéons et fenêtres s'ouvrent avec une transition courte. Survol des boutons : changement de bordure ou de teinte d'or, jamais d'opacité. Respecte `prefers-reduced-motion`.

## 6. Qualité
Mobile first (360 px), connexion lente (images optimisées, vidéos en `preload="none"`, polices auto-hébergées), contraste AA, navigation clavier complète, focus visible, textes alternatifs, cibles tactiles de 44 px minimum, états vides, erreurs et chargements pour chaque écran.
