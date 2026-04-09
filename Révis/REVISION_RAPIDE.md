# Révision rapide – 5 minutes avant la soutenance

## 🎯 Le projet en 30 secondes

**Quoi ?** Générateur de séances d'entraînement badminton personnalisées.  
**Technos :** Next.js (App Router), React, Zod, Tailwind, jsPDF.  
**Flow :** Formulaire → API → Génération → Affichage → Export PDF.

---

## 📁 Structure des fichiers (à retenir)

| Fichier | Rôle en 1 phrase |
|---------|------------------|
| `app/page.tsx` | Page d'accueil avec présentation |
| `app/generator/page.tsx` | Formulaire de configuration |
| `app/result/page.tsx` | Affichage de la séance générée |
| `app/api/training/route.ts` | API GET qui génère la séance |
| `lib/schema.ts` | Schéma Zod pour valider les données |
| `lib/training.ts` | Logique de génération des séances |
| `lib/exercisesData.ts` | Tous les exercices (échauffement, principal, retour au calme) |
| `lib/pdfExport.ts` | Génération du PDF avec jsPDF |

---

## 🔑 Concepts clés à expliquer

### Next.js App Router
- `app/` = routes automatiques
- `page.tsx` = page visible
- `layout.tsx` = layout partagé
- `app/api/.../route.ts` = route API

### Zod
- **Rôle :** Validation des données
- **Comment :** `schema.safeParse(data)` → `{ success: true, data }` ou `{ success: false, error }`
- **Où utilisé :** Formulaire (client) + API (serveur)

### React Hooks utilisés
- `useState` : valeur qui change (ex. `error`, `sessionState`)
- `useEffect` : exécute du code après le render (ex. charger la séance)
- `useCallback` : mémorise une fonction
- `useRouter` : navigation (`router.push("/page")`)
- `useSearchParams` : lit les paramètres de l'URL

### Flow des données
```
Formulaire → URL (paramètres) → Page résultat → fetch API → generateTraining() → Affichage
```

---

## 💡 Questions fréquentes du prof (réponses courtes)

**"Pourquoi Zod ?"**  
→ Validation côté client ET serveur. Si quelqu'un appelle l'API directement avec de mauvais paramètres, on renvoie une erreur. Ça garantit la sécurité et la cohérence des données.

**"Pourquoi une API route ?"**  
→ Séparation front/back. Le front fait un `fetch()`, le serveur exécute la logique. Utile pour une future évolution (base de données, autre client mobile, etc.).

**"C'est quoi `e.preventDefault()` ?"**  
→ Empêche le rechargement de la page quand on soumet le formulaire. Sans ça, le navigateur rechargerait la page et on perdrait notre logique (validation, redirection).

**"Pourquoi passer les paramètres dans l'URL ?"**  
→ Pour que la page résultat sache quoi générer. L'URL est lisible, partageable, et on peut revenir en arrière avec le bouton précédent du navigateur.

**"Pourquoi `Suspense` autour de `ResultContent` ?"**  
→ Next.js l'exige pour `useSearchParams()` car il peut y avoir un délai avant que les paramètres soient disponibles. Pendant ce temps, on affiche le fallback.

**"Comment tu génères les exercices ?"**  
→ On choisit aléatoirement des exercices dans `exercisesData.ts` selon l'objectif. On filtre par `solo` si besoin. On répartit le temps sur plusieurs blocs (1 à 6 pour les exercices principaux, 2-3 pour échauffement/retour au calme).

**"Pourquoi TypeScript ?"**  
→ Typage statique. Si je fais une erreur (ex. `session.echauffement` au lieu de `session.echauffement`), TypeScript me le dit avant d'exécuter. Ça évite des bugs.

**"C'est quoi le `??` ?"**  
→ Opérateur nullish coalescing. Si la valeur à gauche est `null` ou `undefined`, on prend celle de droite. Différent de `||` qui prend la droite pour toute valeur "falsy" (0, "", false).

---

## 🎨 Technologies et pourquoi

| Techno | Pourquoi |
|--------|----------|
| **Next.js** | Framework React avec routing automatique, API routes, optimisations |
| **Zod** | Validation de données avec typage automatique |
| **Tailwind CSS** | Styles rapides avec classes utilitaires |
| **Framer Motion** | Animations fluides pour l'UX |
| **jsPDF** | Génération PDF côté client (pas besoin de serveur) |
| **TypeScript** | Typage statique pour éviter les erreurs |

---

## 🔄 Flow complet (à expliquer)

1. **Utilisateur remplit le formulaire** (`app/generator/page.tsx`)
   - Validation Zod côté client
   - Redirection vers `/result?niveau=...&objectif=...&...`

2. **Page résultat charge** (`app/result/page.tsx`)
   - Lit les paramètres avec `useSearchParams()`
   - Appelle `fetch("/api/training?niveau=...&...")`

3. **API route traite** (`app/api/training/route.ts`)
   - Valide avec Zod (sécurité)
   - Appelle `generateTraining()`
   - Retourne `{ session }` en JSON

4. **Génération** (`lib/training.ts`)
   - Choisit des exercices selon objectif/niveau/contexte
   - Répartit le temps sur plusieurs blocs
   - Ajuste selon l'intensité

5. **Affichage** (`app/result/page.tsx`)
   - Affiche les 3 sections (échauffement, exercices, retour au calme)
   - Tooltip au survol pour les descriptions
   - Bouton PDF pour télécharger

6. **Export PDF** (`lib/pdfExport.ts`)
   - Charge le logo en base64
   - Crée un document jsPDF
   - Dessine header, sections, exercices
   - Déclenche le téléchargement

---

## 📊 Données (exercisesData.ts)

- **Structure :** Tableaux d'exercices par catégorie
- **Propriété `solo` :** `true` = faisable seul, `false` = besoin partenaire
- **Pourquoi centralisé :** Facile d'ajouter un exercice sans toucher au code

---

## 🚀 Commandes importantes

```bash
npm install          # Installer les dépendances
npm run dev          # Lancer en développement (localhost:3000)
npm run build        # Build de production
npm run start        # Lancer en production (après build)
```

---

## ⚠️ Points d'attention

- **`"use client"`** : Obligatoire pour les composants qui utilisent des hooks React (`useState`, `useEffect`, etc.)
- **`Suspense`** : Obligatoire pour `useSearchParams()` dans Next.js 15+
- **Validation double** : Zod côté client (UX) ET serveur (sécurité)
- **Filtrage solo** : Si contexte = solo, on filtre les exercices avec `solo: true`

---

## 🎯 Ce que ça montre au prof

✅ **Next.js App Router** : Routing, API routes, Server/Client Components  
✅ **Zod** : Validation de données avec typage  
✅ **Architecture propre** : Séparation logique (lib) / UI (app)  
✅ **TypeScript** : Typage statique  
✅ **UX** : Animations, tooltips, export PDF  
✅ **Logique métier** : Génération intelligente selon niveau/objectif/intensité

---

**Tu es prêt. Respire et explique calmement. 🚀**
