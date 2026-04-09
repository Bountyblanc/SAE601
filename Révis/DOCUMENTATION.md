# Documentation du projet – Séance Badminton

Ce document explique **tout** le projet pour que tu puisses le comprendre et l'expliquer à ton prof.

> **Pour une explication ligne par ligne** (chaque instruction, chaque concept), consulte **`GUIDE_LIGNE_PAR_LIGNE.md`**. Idéal si le prof te demande "c'est quoi `e.preventDefault()` ?" ou "explique-moi cette ligne".

---

## 1. Vue d’ensemble

**Objectif :** Une application web qui génère des séances d’entraînement de badminton personnalisées.

**Fonctionnement :**
1. L’utilisateur remplit un formulaire (niveau, objectif, durée, etc.)
2. L’application appelle une API qui génère une séance
3. La séance s’affiche avec échauffement, exercices et retour au calme
4. L’utilisateur peut télécharger la séance en PDF

---

## 2. Structure des dossiers

```
sae601/
├── app/                    # Pages et routes Next.js
│   ├── api/training/       # Route API (GET)
│   ├── generator/          # Page formulaire
│   ├── result/             # Page résultat
│   ├── page.tsx            # Page d'accueil
│   ├── layout.tsx          # Layout global
│   └── globals.css         # Styles globaux
├── lib/                    # Logique métier
│   ├── schema.ts           # Validation Zod
│   ├── training.ts         # Génération des séances
│   ├── exercisesData.ts    # Données des exercices
│   └── pdfExport.ts        # Export PDF
├── public/img/             # Logo (servi par Next.js)
└── package.json            # Dépendances
```

---

## 3. Parcours utilisateur (flow)

```
Accueil (/) 
    → "Commencer ma séance" → Formulaire (/generator)
    → "Voir un exemple" → Résultat avec paramètres pré-remplis (/result?source=example&...)

Formulaire (/generator)
    → Soumission → Redirection vers /result?niveau=...&objectif=...&duree=...&intensite=...&contexte=...

Résultat (/result)
    → Lit les paramètres dans l'URL
    → Appelle l'API /api/training?niveau=...&objectif=...&...
    → Affiche la séance
    → Boutons : Télécharger PDF, Recommencer, Régénérer, Retour accueil
```

---

## 4. Fichiers détaillés

### 4.1 `lib/schema.ts` – Validation avec Zod

**Rôle :** Définir et valider les données du formulaire.

**Ce que fait Zod :**
- Vérifie que les valeurs sont dans les listes autorisées
- Retourne un objet typé si tout est valide
- Retourne une erreur détaillée si une valeur est invalide

**Schéma :**
```ts
niveau: "debutant" | "intermediaire" | "avance"
objectif: "endurance" | "smash" | "regularite" | "deplacement" | "defense" | "double"
duree: "30" | "60" | "90"
intensite: "faible" | "moyenne" | "elevee"
contexte: "solo" | "avec_partenaire" (défaut: "avec_partenaire")
```

**Utilisation :** `trainingSchema.safeParse(data)` → si succès → `result.data`, sinon → `result.error`.

---

### 4.2 `lib/exercisesData.ts` – Données des exercices

**Rôle :** Stocker tous les exercices (échauffement, exercices principaux, retour au calme).

**Structure :**
- `exercicesEchauffement` : liste d’exercices d’échauffement
- `exercicesRetourCalme` : liste d’exercices de retour au calme
- `objectiveExercises` : liste d’exercices par objectif (endurance, smash, etc.) + `default`

**Chaque exercice :**
```ts
{
  title: string
  description: string
  duree: number
  solo?: boolean   // true = faisable seul, false = besoin partenaire
}
```

**Pourquoi c’est important :**  
Pour ajouter un exercice, il suffit de l’ajouter dans le bon tableau. Pas besoin de modifier la logique.

---

### 4.3 `lib/training.ts` – Génération des séances

**Rôle :** Créer une séance à partir des paramètres.

**Entrée :** `niveau`, `objectif`, `duree`, `intensite`, `contexte`

**Sortie :** `Session` avec `echauffement`, `exercices`, `retourCalme`

**Logique :**

1. **Échauffement**
   - Filtre par `solo` si contexte = solo
   - Choisit 2 ou 3 exercices aléatoires
   - Répartit la durée selon la durée totale et l’intensité

2. **Exercices principaux**
   - Prend les exercices de l’objectif choisi
   - Filtre par `solo` si besoin
   - Choisit 1 à 6 blocs aléatoires
   - Répartit le temps restant sur les blocs

3. **Retour au calme**
   - Même principe que l’échauffement

4. **Ajustements**
   - `ajusterDuree()` : diminue si intensité faible, augmente si élevée
   - Rééquilibrage pour que la somme des durées soit cohérente

**Fonctions utilitaires :**
- `randomItem()` : retourne un élément aléatoire
- `pickRandomUnique()` : retourne N éléments différents aléatoires

---

### 4.4 `app/api/training/route.ts` – Route API

**Rôle :** Exposer une API GET pour générer une séance.

**URL :** `/api/training?niveau=...&objectif=...&duree=...&intensite=...&contexte=...`

**Étapes :**
1. Récupère les paramètres dans l’URL (`searchParams`)
2. Valide avec `trainingSchema.safeParse()`
3. Si invalide → retourne 400 avec message d’erreur
4. Si valide → appelle `generateTraining()` et retourne `{ session }`

**Pourquoi une API :**  
Séparation front / back. Le front fait un `fetch()`, le serveur exécute la logique. Utile pour une future évolution (base de données, autre client, etc.).

---

### 4.5 `app/page.tsx` – Page d’accueil

**Rôle :** Page d’accueil avec présentation et liens.

**Contenu :**
- Logo + badge
- Titre + description
- Boutons : "Commencer ma séance" (→ formulaire) et "Voir un exemple" (→ résultat avec paramètres)
- Section "Comment ça marche" (3 étapes)
- Section "Objectifs disponibles"
- Section CTA final

**Technologies :** React, Next.js `Link`, Tailwind CSS.

---

### 4.6 `app/generator/page.tsx` – Page formulaire

**Rôle :** Formulaire pour configurer la séance.

**Champs :**
- Niveau (debutant / intermediaire / avance)
- Objectif (endurance, smash, etc.)
- Contexte (solo / avec partenaire)
- Durée (30 / 60 / 90 min)
- Intensité (faible / moyenne / élevée)

**Soumission :**
1. `e.preventDefault()` pour éviter le rechargement
2. Récupération des données avec `FormData`
3. Validation avec `trainingSchema.safeParse()`
4. Si erreur → affichage du message
5. Si OK → `router.push("/result?niveau=...&objectif=...&...")`

**Pourquoi passer par l’URL :**  
La page résultat lit les paramètres dans l’URL (`useSearchParams`) et appelle l’API. Pas de state global.

---

### 4.7 `app/result/page.tsx` – Page résultat

**Rôle :** Afficher la séance générée.

**Structure :**
- `ResultContent` : composant principal (utilise `useSearchParams`)
- `Result` : wrapper avec `Suspense` (requis par Next.js pour `useSearchParams`)

**Étapes :**
1. Lit les paramètres de l’URL (`niveau`, `objectif`, `duree`, `intensite`, `contexte`)
2. Appelle `fetchSession()` → `fetch("/api/training?niveau=...&...")`
3. Si succès → affiche la séance
4. Si erreur → affiche message + bouton Réessayer

**États :**
- Données manquantes → message + bouton retour formulaire
- Erreur API → message + Réessayer
- Chargement → "Chargement..."
- Succès → affichage des 3 sections (échauffement, exercices, retour au calme)

**Boutons :**
- Télécharger PDF
- Recommencer (→ formulaire)
- Retour à l’accueil
- Régénérer (nouvel appel API)

**Tooltip :** Au survol d’un exercice, affichage de la description.

**Animations :** Framer Motion pour les apparitions.

---

### 4.8 `lib/pdfExport.ts` – Export PDF

**Rôle :** Générer un PDF à partir d’une séance.

**Fonction principale :** `downloadSessionPdf(session, meta)` (async)

**Étapes :**
1. Charge le logo en base64 (`chargerLogoBase64()`)
2. Crée un document jsPDF (format A4)
3. Dessine le bandeau header avec logo
4. Affiche les infos (niveau, objectif, durée, etc.)
5. Pour chaque section : titre + liste d’exercices (titre, durée, description)
6. Gère le retour à la ligne si la page est pleine
7. Sauvegarde le fichier avec `doc.save(nomFichier)`

**Pourquoi async :**  
Le logo est chargé via `fetch()`, donc la fonction doit attendre.

---

### 4.9 `app/globals.css` – Styles globaux

**Rôle :** Styles globaux et composants Tailwind.

**Contenu :**
- Variables CSS (`--background`, `--foreground`)
- Fond du body (dégradés)
- Scrollbar personnalisée
- Classes utilitaires : `.card-soft`, `.btn-primary`, `.btn-secondary`, `.input-select`, `.page-shell`, `.page-container`, `.badge`, `.badge-dot`

---

### 4.10 `app/layout.tsx` – Layout racine

**Rôle :** Layout global (HTML, body, fonts, metadata).

**Contenu :**
- Polices Geist
- `lang="fr"`
- Métadonnées (title, description)
- `{children}` pour le contenu des pages

---

## 5. Technologies utilisées

| Techno | Rôle |
|--------|------|
| **Next.js** | Framework React, routing, API routes |
| **React** | Composants UI |
| **Zod** | Validation des données |
| **Tailwind CSS** | Styles |
| **Framer Motion** | Animations |
| **jsPDF** | Génération PDF |
| **TypeScript** | Typage |

---

## 6. Points à expliquer au prof

### 6.1 Next.js
- **App Router** : `app/` = routes (page.tsx = page, layout.tsx = layout)
- **API Routes** : `app/api/training/route.ts` = endpoint GET `/api/training`
- **Client / Server** : `"use client"` pour les composants qui utilisent `useState`, `useEffect`, etc.

### 6.2 Zod
- **Validation** : `schema.safeParse(data)` → `{ success: true, data }` ou `{ success: false, error }`
- **Typage** : `z.infer<typeof schema>` donne le type TypeScript
- **Utilisation** : formulaire (côté client) et API (côté serveur)

### 6.3 Architecture
- **Séparation** : lib = logique, app = UI
- **API** : le front appelle `fetch("/api/training?...")`, le serveur valide et génère
- **Données** : exercices centralisés dans `exercisesData.ts`

### 6.4 Flow des données
```
Formulaire → URL (paramètres) → Page résultat → fetch API → generateTraining() → Affichage
```

---

## 7. Résumé en une phrase par fichier

| Fichier | Rôle |
|---------|------|
| `schema.ts` | Définit et valide les paramètres avec Zod |
| `exercisesData.ts` | Stocke tous les exercices (échauffement, principal, retour au calme) |
| `training.ts` | Génère une séance à partir des paramètres |
| `api/training/route.ts` | API GET qui valide et génère une séance |
| `page.tsx` | Page d’accueil |
| `generator/page.tsx` | Formulaire de configuration |
| `result/page.tsx` | Affichage de la séance + appel API |
| `pdfExport.ts` | Génération du PDF |
| `globals.css` | Styles globaux |

---

## 8. Commandes utiles

```bash
npm install    # Installer les dépendances
npm run dev    # Lancer en développement (localhost:3000)
npm run build  # Build de production
npm run start  # Lancer en production (après build)
```

---

## 9. Pour ajouter un exercice

1. Ouvrir `lib/exercisesData.ts`
2. Trouver le bon tableau (`exercicesEchauffement`, `exercicesRetourCalme` ou `objectiveExercises.xxx`)
3. Ajouter un objet `{ title, description, duree, solo? }`

Aucune modification de code ailleurs.

---

Bonne chance pour ta soutenance.
