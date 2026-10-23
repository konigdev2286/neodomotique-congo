# DOSSIER DE PASSATION TECHNIQUE : INTERFACE NEODOMOTIQUE CONGO

> Document de transmission pour l'équipe technique et les intégrateurs backend / fullstack.
> Date de livraison : Octobre 2026.
> Statut de l'interface : 100 % achevée (Phases 1 à 8 validées, zéro erreur TypeScript / ESLint / Next.js Build).

---

## 1. Vue d'ensemble du projet

Ce projet constitue l'interface web officielle et haut de gamme de **Neodomotique Congo**, entreprise pionnière en domotique et maisons intelligentes à Brazzaville et Pointe-Noire (République du Congo).

L'interface a été conçue selon une direction artistique stricte :
- **Palette** : Noir profond (`#050505`), or brossé (`#C49C4F`), ivoire (`#F3EEE4`).
- **Typographie** : Jost (titres en capitales espacées) et Source Sans 3 (textes et données).
- **Style visuel** : Sobriété luxueuse, angles droits (`rounded-none`), contrastes conformes WCAG AA, mobile-first optimisé pour les connexions locales.
- **Architecture** : Next.js 14 (App Router), TypeScript, Tailwind CSS étendu, polices auto-hébergées via `@fontsource`.

---

## 2. Commandes de lancement et d'exploitation

Toutes les commandes s'exécutent à la racine du projet (`neodomotique-congo`) :

```bash
# 1. Installation des dépendances
npm install

# 2. Démarrage du serveur de développement (http://localhost:3000)
npm run dev

# 3. Validation TypeScript stricte
npm run typecheck

# 4. Analyse et vérification ESLint
npm run lint

# 5. Compilation et build de production Next.js
npm run build

# 6. Démarrage du serveur en mode production
npm run start
```

---

## 3. Inventaire des points d'intégration (`// BRANCHER_ICI`)

Chaque action nécessitant un serveur, une base de données, un modèle d'IA ou un tiers a été isolée avec le marqueur explicite `// BRANCHER_ICI`. Voici la liste exhaustive pour le raccordement backend :

### 3.1. Chat IA & Assistant conversationnel
- **Fichier** : `src/components/chat/ChatWidget.tsx` (ligne ~105)
  - **État actuel** : Simule un délai de réflexion de 750 ms et appelle le moteur de dialogue local `obtenirReponseScript(texte, messages)`.
  - **À connecter** : Remplacer par une requête POST vers une route API Next.js locale :
    ```typescript
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: texte, historique: messages }),
    });
    const data = await res.json();
    ```
- **Fichier** : `src/data/chatScript.ts` (lignes 2 et 29)
  - **État actuel** : Règles de dialogue et intentions pré-programmées (Packs, Devis, RDV, Tarifs).
  - **À connecter** : Utiliser un LLM comme **Mistral AI** (`mistral-small-latest` ou `mistral-medium`) ou **Claude 3.5 Sonnet** via leur SDK officiel dans `app/api/chat/route.ts`. Injecter dans le système prompt le catalogue Neodomotique (`src/data/packs.ts`, `src/data/produits.ts`, `src/data/site.ts`).
- **Fichier** : `src/components/FloatingActions.tsx` (ligne ~8)
  - **État actuel** : Déclenche l'événement global `window.dispatchEvent(new CustomEvent("neodomotique:open-chat"))`.
  - **À connecter** : Conserver ce pont ou le lier à un état global / context si migration vers Redux/Zustand.

### 3.2. Formulaire de contact & Demandes clients
- **Fichier** : `app/contact/page.tsx` (ligne ~41)
  - **État actuel** : Validation front-end, simulation de temporisation de 900 ms, affichage de l'écran de confirmation et bouton de réinitialisation.
  - **À connecter** : Remplacer par un appel à une route API Next.js `POST /api/contact` qui :
    1. Enregistre la demande dans la table `leads` de Supabase.
    2. Notifie l'équipe Neodomotique par email via **Resend** (ou SendGrid).
    3. (Optionnel) Envoie une alerte WhatsApp à l'administrateur via l'API Twilio ou Green-API.

### 3.3. Espace Administration (`/admin`) & Sécurité par mot de passe
- **Fichier** : `middleware.ts` & `src/lib/auth.ts`
  - **Protection active** : Tout accès à `/admin` ou à ses sous-pages exige désormais une session valide (cookie HTTP-only `neodomotique_admin_session`). En l'absence de session, redirection immédiate vers `/admin/connexion`.
  - **Mot de passe** : Configuré via la variable `ADMIN_PASSWORD` dans `.env.local` (valeur par défaut sécurisée : `neodomotique2026`).
  - **Déconnexion** : Un bouton « Se déconnecter » dans l'en-tête de l'admin détruit le cookie de session via l'API `DELETE /api/admin/auth`.
- **Fichier** : `app/admin/connexion/page.tsx`
  - **Écran de connexion** : Interface d'accès restreinte stylisée selon la charte du projet (noir profond, or brossé, logo, états d'erreur et de chargement).
- **Fichier** : `app/admin/layout.tsx`
  - **Confidentialité** : Directive `robots: { index: false, follow: false, nocache: true }` empêchant tout référencement par les moteurs de recherche.
- **Fichier** : `app/admin/page.tsx` (lignes 51, 79, 88)
  - **État actuel** : Gestion d'état locale avec `useState` initialisé depuis `src/data/adminMock.ts`. Les modifications de statuts (leads, RDV, devis) et l'éditeur de prix fonctionnent en mémoire.
  - **À connecter pour la V2** :
    1. **Base de données** : Requêtes `SELECT`, `UPDATE` (`PUT /api/admin/leads/:id`) sur la table Supabase `leads`.
    2. **Éditeur de tarifs** : Sauvegarde des prix dans une table `tarifs_produits` avec synchronisation temps réel.
  - **À connecter** :
    1. **Authentification** : Mettre en place **Supabase Auth** ou NextAuth avec middleware de protection sur `/admin`.
    2. **Gestion des leads** : Requêtes `SELECT`, `UPDATE` (`PUT /api/admin/leads/:id`) sur la table Supabase `leads`.
    3. **Éditeur de tarifs** : Sauvegarde des prix dans une table `tarifs_produits` avec synchronisation temps réel.
- **Fichier** : `src/data/adminMock.ts` (ligne ~2)
  - **État actuel** : Données fictives réalistes de Brazzaville/Pointe-Noire (Plateau, Bacongo, Centre-Ville, etc.).
  - **À connecter** : Peut servir de script de seed SQL initial (`supabase/seed.sql`) pour la base de test.

### 3.4. Simulateur de devis & Export PDF
- **Fichier** : `app/devis/page.tsx` (lignes 820-850)
  - **État actuel** :
    - Calcul dynamique des composants, main d'œuvre, acompte de 40 % et solde.
    - Export imprimable propre via les règles CSS `@media print` (`window.print()`).
    - Envoi pré-formaté du récapitulatif sur WhatsApp via `wa.me`.
  - **À connecter** :
    - Pour générer un fichier PDF natif certifié téléchargeable : intégrer `@react-pdf/renderer` ou une fonction serverless Puppeteer (`POST /api/devis/pdf`).
    - Sauvegarde automatique du devis généré dans la table `devis` de Supabase avec génération d'un numéro de référence unique (`DEV-2026-XXXX`).

---

## 4. Placeholders et éléments à remplacer en production

Avant la mise en ligne publique définitive, les éléments suivants doivent être complétés par le client ou l'équipe de déploiement :

| Élément | Fichier(s) concerné(s) | Action requise |
|---|---|---|
| **Lien page `/design`** | `src/components/Header.tsx`, `src/components/Footer.tsx` | Retirer ou restreindre la visibilité de la page de démonstration du design system en production. |
| **Réseaux sociaux** | `src/data/site.ts` (`site.reseaux`) | Remplacer les URLs par les vraies adresses des comptes officiels : TikTok, Instagram, Facebook. |
| **Numéro WhatsApp** | `src/data/site.ts` (`site.whatsapp`) | Confirmer le numéro international d'exploitation commerciale (actuellement `+242 06 613 00 09`). |
| **Prix Echo Pop** | `src/data/produits.ts` (id: `"echo-pop"`) | Renseigner le tarif en FCFA dès que le prix d'achat/vente est arrêté (actuellement `prix: null`, mentionné "Sur devis"). |
| **Validation vidéo 02** | `src/data/videos.ts` (id: `"video-02"`) | Obtenir l'accord formel du client pour la vidéo 02 où apparaît un enfant, ou la remplacer par une autre prise de vue. |
| **Titres des vidéos** | `src/data/videos.ts` | Valider les libellés et quartiers définitifs des 6 réalisations vidéo avec l'équipe de terrain. |
| **URL du site** | `.env.local` (`NEXT_PUBLIC_SITE_URL`) | Définir le nom de domaine de production réel (ex: `https://neodomotique-congo.com`). |

---

## 5. Recommandations d'architecture pour l'intégration complète

### 5.1. Base de données & Authentification : Supabase
- **Tables suggérées** :
  - `leads` : `id`, `created_at`, `nom`, `telephone`, `ville`, `quartier`, `statut` (nouveau, contacte, rdv_planifie, devis_envoye, gagne, perdu), `source`, `pack_souhaite`, `notes`.
  - `devis` : `id`, `reference`, `created_at`, `client_nom`, `client_telephone`, `client_quartier`, `total_ht`, `acompte_40`, `solde`, `details_json`, `statut`.
  - `rendez_vous` : `id`, `created_at`, `date_heure`, `client_nom`, `client_telephone`, `lieu`, `type_intervention`, `statut`.
  - `produits` : `id`, `nom`, `categorie`, `prix_fcfa`, `en_stock`, `ordre`.

### 5.2. IA Conversationnelle : Mistral AI
- Utiliser le SDK `@mistralai/mistralai` sur une route Edge/Node Next.js `app/api/chat/route.ts`.
- Fournir un contexte système strict :
  - Identité : Assistant Neodomotique Congo, courtois, haut de gamme, orienté solution.
  - Connaissance des prix : Starter = 110 000 FCFA, Confort = 150 000 FCFA.
  - Modalités : Acompte de 40 % sur le matériel, solde après test et validation.
  - Orientation vers WhatsApp (+242 06 613 00 09) dès que la demande est spécifique ou pour la confirmation d'un créneau.

### 5.3. Emails transactionnels : Resend
- Utiliser `resend` avec un domaine vérifié (`contact@neodomotique-congo.com`).
- Notifier instantanément les techniciens lors d'une soumission sur `/contact` ou d'un devis simulé sur `/devis`.

---

## 6. Synthèse des pages livrées

1. **`/` (Accueil)** : Hero avec promesse client et double CTA WhatsApp, les 2 packs, les 6 services détaillés, processus d'intervention en 4 étapes, garanties, démonstrations vidéo interactives, appel à l'action final.
2. **`/packs`** : Détail complet des packs Starter et Confort, sélection dynamique d'option (ampoules vs interrupteur), tableau comparatif responsive mobile.
3. **`/services`** : Fiches approfondies des 6 domaines d'intervention (Éclairage, Climatisation, Télécommande, Prises, Scénarios, Sécurité).
4. **`/realisations`** : Galerie des 6 vidéos réelles avec filtres thématiques, lecteur vidéo optimisé et fiche descriptive par intervention.
5. **`/devis`** : Simulateur interactif étape par étape avec calcul en direct des équipements, main d'œuvre, acompte 40%, solde, prévisualisation imprimable/PDF et bouton d'envoi WhatsApp pré-rempli.
6. **`/contact`** : Coordonnées WhatsApp en vedette, formulaire responsive avec quartiers de Brazzaville/Pointe-Noire et écran de confirmation soigné.
7. **`/admin`** : Espace de gestion interne maquetté avec métriques clés, filtrage des prospects, suivi des rendez-vous et simulateur de catalogue de prix.
8. **`/design`** : Référentiel du design system (couleurs, échelles typographiques, boutons, formulaires, cartes, modales et notifications).

---
*Fin du document de passation — Neodomotique Congo.*
