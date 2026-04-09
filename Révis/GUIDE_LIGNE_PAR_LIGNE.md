# Guide ligne par ligne – Tout comprendre pour le prof

Ce fichier explique **chaque ligne importante** du code. Si le prof te demande "c'est quoi ça ?", tu auras la réponse.

---

## 1. `app/generator/page.tsx` – Le formulaire

### Ligne 1 : `"use client"`
**C'est quoi ?** Une directive Next.js.  
**Ça fait quoi ?** Indique que ce composant s'exécute côté **client** (dans le navigateur), pas sur le serveur.  
**Pourquoi ?** Parce qu'on utilise `useState`, `useRouter`, etc. – des hooks React qui ne marchent que côté client.

---

### Ligne 3-5 : Les imports
```ts
import { useState } from "react"
import { useRouter } from "next/navigation"
import { trainingSchema } from "@/lib/schema"
```
- `useState` : hook React pour stocker une valeur qui change (ex. message d'erreur)
- `useRouter` : hook Next.js pour changer de page (navigation)
- `trainingSchema` : le schéma Zod qui valide les données du formulaire

---

### Ligne 8 : `const router = useRouter()`
**Rôle :** Récupère l'objet `router` pour naviguer.  
**Exemple :** `router.push("/result?niveau=...")` redirige vers la page résultat.

---

### Ligne 9 : `const [error, setError] = useState<string | null>(null)`
**Rôle :** State React pour le message d'erreur.  
- `error` : la valeur actuelle (null ou string)
- `setError("texte")` : met à jour la valeur
- `null` au départ = pas d'erreur

---

### Ligne 11 : `function handleSubmit(e: React.FormEvent<HTMLFormElement>) {`
**Rôle :** Fonction appelée quand l'utilisateur soumet le formulaire.  
**`e`** : l'événement de soumission (objet natif du navigateur).

---

### Ligne 12 : `e.preventDefault()`
**C'est quoi ?** Méthode de l'objet événement.  
**Ça fait quoi ?** **Empêche le comportement par défaut** du formulaire.  
**Comportement par défaut :** Quand on clique sur "Envoyer", le navigateur recharge la page et envoie les données en GET/POST.  
**Sans `preventDefault()` :** La page se recharge, on perd tout, on ne peut pas faire notre logique (validation, redirection).  
**Avec `preventDefault()` :** La page ne recharge pas, on garde le contrôle et on fait notre code (validation, `router.push`).

---

### Ligne 14 : `const formData = new FormData(e.currentTarget)`
**C'est quoi ?** `FormData` est une API native du navigateur.  
**Ça fait quoi ?** Récupère toutes les données du formulaire sous forme de paires clé/valeur.  
**`e.currentTarget`** : le formulaire HTML qui a déclenché l'événement.

---

### Ligne 16-22 : Récupération des valeurs
```ts
const data = {
  niveau: formData.get("niveau"),
  objectif: formData.get("objectif"),
  ...
}
```
**`formData.get("niveau")`** : récupère la valeur du champ dont l'attribut `name="niveau"`.  
**Exemple :** Si l'utilisateur a choisi "Débutant" dans le select, `formData.get("niveau")` retourne `"debutant"`.

---

### Ligne 24 : `const result = trainingSchema.safeParse(data)`
**Rôle :** Valide les données avec Zod.  
**`safeParse`** : ne lance pas d'erreur, retourne un objet avec `success` (true/false) et `data` ou `error`.  
**Si succès :** `result.success === true`, `result.data` contient les données validées.  
**Si échec :** `result.success === false`, `result.error` contient les détails.

---

### Ligne 26-28 : Gestion de l'erreur
```ts
if (!result.success) {
  setError("Veuillez remplir correctement le formulaire")
  return
}
```
**Si la validation échoue :** on affiche un message, on arrête la fonction (`return`).

---

### Ligne 30-32 : Redirection
```ts
router.push(
  `/result?niveau=${data.niveau}&objectif=${data.objectif}&duree=${data.duree}&intensite=${data.intensite}&contexte=${data.contexte}`
)
```
**`router.push`** : change l'URL et affiche la page résultat.  
**Les paramètres dans l'URL** : la page résultat les lit avec `useSearchParams()` pour savoir quoi générer.

---

### Ligne 56 : `onSubmit={handleSubmit}`
**Rôle :** Quand l'utilisateur clique sur le bouton submit, le navigateur appelle `handleSubmit` avec l'événement en paramètre.

---

### Ligne 64 : `name="niveau"`
**Rôle :** C'est ce qui permet à `formData.get("niveau")` de récupérer la valeur. Le `name` doit correspondre.

---

### Ligne 166-172 : Affichage conditionnel de l'erreur
```ts
{error && (
  <p className="...">{error}</p>
)}
```
**`error && (...)`** : si `error` est truthy (ex. une string), on affiche le contenu. Sinon, rien.

---

### Ligne 178-180 : `onClick={() => router.push("/")}`
**Rôle :** Au clic sur "Retour à l'accueil", on navigue vers la page d'accueil (`/`).

---

## 2. `app/result/page.tsx` – La page résultat

### Ligne 3 : `import { Suspense } from "react"`
**Rôle :** Composant React pour gérer le chargement asynchrone.  
**Pourquoi ?** `useSearchParams()` dans Next.js doit être dans un `Suspense` (requis par Next.js pour le streaming).

---

### Ligne 4 : `import { useSearchParams, useRouter } from "next/navigation"`
- **`useSearchParams()`** : retourne les paramètres de l'URL (ex. `?niveau=debutant&objectif=endurance&...`)
- **`useRouter()`** : pour naviguer (comme dans le formulaire)

---

### Ligne 10-25 : `fetchSession`
```ts
async function fetchSession(params: {...}): Promise<Session> {
  const url = `/api/training?niveau=${params.niveau}&objectif=${params.objectif}&...`
  const res = await fetch(url)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? "Erreur lors de la génération")
  }
  const data = await res.json()
  return data.session
}
```
**Ligne par ligne :**
- `url` : construit l'URL de l'API avec les paramètres
- `fetch(url)` : appelle l'API (requête HTTP GET)
- `res.ok` : `false` si la réponse est une erreur (400, 500, etc.)
- `res.json().catch(() => ({}))` : si le JSON est invalide, on retourne `{}` pour éviter un crash
- `throw new Error(...)` : si erreur, on lance une exception pour la capturer plus bas
- `data.session` : la réponse de l'API contient `{ session: {...} }`, on retourne la session

---

### Ligne 27 : `const searchParams = useSearchParams()`
**Rôle :** Récupère l'objet qui permet de lire les paramètres de l'URL.  
**Exemple :** `searchParams.get("niveau")` → `"debutant"`.

---

### Ligne 30-36 : Lecture des paramètres
```ts
const niveau = searchParams.get("niveau")
const objectif = searchParams.get("objectif")
const dureeParam = searchParams.get("duree") || "30"
const duree = parseInt(dureeParam)
const intensite = searchParams.get("intensite") || "moyenne"
const contexte = searchParams.get("contexte") || "avec_partenaire"
const isExample = searchParams.get("source") === "example"
```
- `|| "30"` : si le paramètre est absent, on utilise une valeur par défaut
- `parseInt(dureeParam)` : convertit la string "60" en nombre 60
- `isExample` : true si on vient du lien "Voir un exemple"

---

### Ligne 38-40 : Les states
```ts
const [sessionState, setSessionState] = useState<Session | null>(null)
const [error, setError] = useState<string | null>(null)
const [isRegenerating, setIsRegenerating] = useState(false)
```
- `sessionState` : la séance générée (null tant qu'on n'a pas reçu la réponse)
- `error` : message d'erreur si l'API échoue
- `isRegenerating` : true pendant qu'on régénère (pour afficher "Génération…" et désactiver le bouton)

---

### Ligne 42-58 : `useCallback` et `loadSession`
```ts
const loadSession = useCallback(async () => {
  if (!niveau || !objectif) return
  setError(null)
  try {
    const session = await fetchSession({...})
    setSessionState(session)
  } catch (e) {
    setError(e instanceof Error ? e.message : "Erreur inattendue")
    setSessionState(null)
  }
}, [niveau, objectif, duree, intensite, contexte])
```
**`useCallback`** : mémorise la fonction pour éviter de la recréer à chaque render. Les dépendances `[niveau, ...]` : si elles changent, la fonction est recréée.  
**`if (!niveau || !objectif) return`** : si pas de paramètres, on ne fait rien.  
**`try/catch`** : si `fetchSession` lance une erreur, on la capture et on met à jour `error`.

---

### Ligne 60-62 : `useEffect`
```ts
useEffect(() => {
  loadSession()
}, [loadSession])
```
**Rôle :** Au montage du composant (et quand `loadSession` change), on appelle `loadSession` pour charger la séance.  
**En gros :** "dès que la page s'affiche, on appelle l'API".

---

### Ligne 64-88 : Cas "données manquantes"
Si `niveau`, `objectif` ou `duree` sont absents, on affiche un message et des boutons pour revenir.

---

### Ligne 114-122 : Cas "chargement"
Si `sessionState` est encore null et qu'il n'y a pas d'erreur, on affiche "Chargement...".

---

### Ligne 124-126 : Calcul du temps total
```ts
const totalTime =
  [...sessionState.echauffement, ...sessionState.exercices, ...sessionState.retourCalme]
    .reduce((acc, ex) => acc + ex.duree, 0)
```
**`[...a, ...b, ...c]`** : fusionne les 3 tableaux en un seul.  
**`.reduce((acc, ex) => acc + ex.duree, 0)`** : additionne toutes les durées. `acc` = accumulateur, `ex` = chaque exercice.

---

### Ligne 135-164 : Composant `Section`
Composant interne qui affiche une section (titre + liste d'exercices).  
**`motion.div`** : composant Framer Motion pour l'animation (opacity, y).  
**`group` et `group-hover:opacity-100`** : au survol (hover) sur un élément, le tooltip (description) devient visible.  
**`cursor-help`** : curseur en point d'interrogation pour indiquer qu'il y a une info au survol.

---

### Ligne 244-246 : `Suspense`
```ts
<Suspense fallback={...}>
  <ResultContent />
</Suspense>
```
**Rôle :** Pendant que `ResultContent` charge (ou si `useSearchParams` n'est pas prêt), on affiche `fallback` ("Chargement...").  
**Obligatoire** avec `useSearchParams` dans Next.js 15+.

---

## 3. `app/api/training/route.ts` – L'API

### Ligne 5 : `export async function GET(req: NextRequest)`
**Rôle :** Définit une route API qui répond aux requêtes GET.  
**`req`** : la requête HTTP (avec l'URL, les headers, etc.).

---

### Ligne 6 : `const { searchParams } = new URL(req.url)`
**Rôle :** Parse l'URL de la requête pour récupérer les paramètres de query.  
**Exemple :** `/api/training?niveau=debutant` → `searchParams.get("niveau")` = `"debutant"`.

---

### Ligne 8-12 : Récupération des paramètres
```ts
const niveau = searchParams.get("niveau")
const objectif = searchParams.get("objectif")
...
```
Même principe que côté client : on lit les paramètres de l'URL.

---

### Ligne 14-20 : Validation Zod
```ts
const result = trainingSchema.safeParse({
  niveau, objectif, duree, intensite, contexte,
})
```
On valide les données côté serveur. Si quelqu'un appelle l'API avec des paramètres invalides, on renvoie une erreur.

---

### Ligne 22-26 : Réponse d'erreur
```ts
if (!result.success) {
  return NextResponse.json(
    { error: "Paramètres invalides", details: result.error.flatten() },
    { status: 400 }
  )
}
```
**`NextResponse.json`** : retourne une réponse JSON.  
**`status: 400`** : code HTTP "Bad Request" (requête invalide).

---

### Ligne 28 : `const { niveau: n, objectif: o, duree: d, intensite: i, contexte: c } = result.data`
**Rôle :** Destructuration avec renommage. On extrait les valeurs de `result.data` et on les renomme en `n`, `o`, `d`, etc. (pour éviter les conflits de noms).

---

### Ligne 30 : `const session = generateTraining(n, o, parseInt(d, 10), i, c)`
**`parseInt(d, 10)`** : convertit `"60"` en `60` (nombre). Le `10` = base décimale.

---

### Ligne 32 : `return NextResponse.json({ session })`
Retourne la séance en JSON. Le client reçoit `{ session: { echauffement: [...], exercices: [...], retourCalme: [...] } }`.

---

## 4. `lib/schema.ts` – Validation Zod

### Ligne 3-16 : Le schéma
```ts
export const trainingSchema = z.object({
  niveau: z.enum(["debutant", "intermediaire", "avance"]),
  objectif: z.enum(["endurance", "smash", ...]),
  duree: z.enum(["30", "60", "90"]),
  intensite: z.enum(["faible", "moyenne", "elevee"]),
  contexte: z.enum(["solo", "avec_partenaire"]).default("avec_partenaire"),
})
```
**`z.object`** : objet avec des champs.  
**`z.enum([...])`** : la valeur doit être une des valeurs listées.  
**`.default("avec_partenaire")`** : si absent, on met cette valeur par défaut.

---

## 5. `lib/training.ts` – Génération

### Ligne 19-21 : `randomItem`
```ts
function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}
```
**`Math.random()`** : nombre entre 0 et 1.  
**`array.length`** : ex. 5.  
**`Math.random() * 5`** : entre 0 et 5.  
**`Math.floor(...)`** : arrondit (0, 1, 2, 3 ou 4).  
**Résultat :** un index aléatoire, on retourne l'élément à cet index.

---

### Ligne 23-26 : `pickRandomUnique`
```ts
function pickRandomUnique<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, array.length))
}
```
**`[...array]`** : copie du tableau (pour ne pas modifier l'original).  
**`.sort(() => Math.random() - 0.5)`** : mélange aléatoire (trick classique).  
**`.slice(0, count)`** : prend les `count` premiers éléments après mélange.  
**Résultat :** `count` éléments différents, choisis aléatoirement.

---

### Ligne 28-31 : `ajusterDuree`
```ts
function ajusterDuree(base: number, intensite: string) {
  if (intensite === "faible") return Math.max(1, base - 2)
  if (intensite === "elevee") return base + 3
  return base
}
```
**Rôle :** Adapte la durée selon l'intensité. Faible = moins long, élevée = plus long.

---

### Ligne 45 : `const cibleEchauffement = 6 + Math.floor(duree / 30) * 2 + Math.floor(Math.random() * 2)`
**Exemple :** duree = 60 → `6 + 4 + 0 ou 1` = 10 ou 11 minutes cibles pour l'échauffement.

---

### Ligne 51 : `picksEchauffement.map((ex) => {
**`map`** : transforme chaque élément. Ici on crée un nouvel exercice avec une durée ajustée.

---

### Ligne 57 : `return { ...ex, duree: ajusterDuree(dur, intensite) }`
**`...ex`** : copie toutes les propriétés de l'exercice.  
**`duree: ...`** : on écrase la durée avec la nouvelle valeur.

---

### Ligne 59 : `echauffement.reduce((acc, ex) => acc + ex.duree, 0)`
**`reduce`** : parcourt le tableau et accumule une valeur. Ici on additionne toutes les durées.

---

### Ligne 62 : `?? (objectiveExercises.default as Exercise[])`
**`??`** : si la partie gauche est `null` ou `undefined`, on prend la valeur de droite.  
**Rôle :** Si l'objectif n'existe pas dans la liste, on utilise les exercices par défaut.

---

### Ligne 121-132 : Boucle de rééquilibrage
```ts
while (diff !== 0 && safety < 100) {
  for (let i = 0; i < exercices.length && diff !== 0; i++) {
    if (diff > 0) {
      exercices[i].duree += 1
      diff -= 1
    } else if (diff < 0 && exercices[i].duree > 3) {
      exercices[i].duree -= 1
      diff += 1
    }
  }
  safety++
}
```
**Rôle :** Ajuste les durées pour que le total soit exactement `tempsExercicesCible`.  
**`diff > 0`** : on a trop peu de minutes → on ajoute 1 min à un exercice.  
**`diff < 0`** : on a trop → on enlève 1 min (sans descendre en dessous de 3).  
**`safety`** : évite une boucle infinie (max 100 itérations).

---

## 6. `lib/pdfExport.ts` – Export PDF

### Ligne 16-27 : `chargerLogoBase64`
```ts
async function chargerLogoBase64(): Promise<string | null> {
  try {
    const res = await fetch("/img/logo.png")
    const blob = await res.blob()
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}
```
**Rôle :** Charge le logo et le convertit en base64 (format que jsPDF peut utiliser).  
**`fetch`** : récupère la image.  
**`res.blob()`** : données binaires.  
**`FileReader.readAsDataURL`** : convertit en string base64 (ex. `data:image/png;base64,iVBORw0...`).

---

### Ligne 31 : `const doc = new jsPDF({ format: "a4", unit: "mm" })`
**Rôle :** Crée un document PDF A4, unités en millimètres.

---

### Ligne 96 : `const descLines = doc.splitTextToSize(ex.description, contentWidth - 10)`
**Rôle :** Découpe le texte en lignes pour qu'il ne dépasse pas la largeur. Retourne un tableau de lignes.

---

### Ligne 132 : `doc.save(fileName)`
**Rôle :** Déclenche le téléchargement du fichier PDF dans le navigateur.

---

## 7. `app/page.tsx` – Page d'accueil

### Ligne 46-47 : `Link` vs `<a>`
```ts
<Link href="/generator" className="btn-primary">
  Commencer ma séance
</Link>
```
**`Link`** : composant Next.js pour la navigation.  
**Différence avec `<a href="...">`** : `Link` fait une navigation côté client (pas de rechargement complet), plus rapide. Le `<a>` rechargerait toute la page.

---

### Ligne 49-50 : Lien avec paramètres
```ts
href="/result?niveau=intermediaire&objectif=endurance&duree=60&intensite=moyenne&contexte=avec_partenaire&source=example"
```
**Rôle :** Le lien "Voir un exemple" envoie vers la page résultat avec des paramètres pré-remplis.  
**`source=example`** : permet à la page résultat de savoir que c'est un exemple (boutons différents : "Télécharger cet exemple", "Créer ma séance" au lieu de "Recommencer", "Régénérer").

---

### Ligne 161-174 : `.map()` pour afficher une liste
```ts
{[...].map((item) => (
  <div key={item.label} ...>
    ...
  </div>
))}
```
**`.map()`** : transforme chaque élément du tableau en un élément JSX.  
**`key={item.label}`** : obligatoire en React pour identifier chaque élément dans une liste. Sans `key`, React ne peut pas optimiser les mises à jour.

---

## 8. `lib/exercisesData.ts` – Données des exercices

### Ligne 1-7 : Type `ExerciseDef`
```ts
export type ExerciseDef = {
  title: string
  description: string
  duree: number
  solo?: boolean
}
```
**`solo?: boolean`** : le `?` signifie que la propriété est **optionnelle**. Si absente, elle vaut `undefined`.  
**Rôle de `solo`** : `true` = exercice faisable seul, `false` = besoin d'un partenaire.

---

### Ligne 94 : `Record<string, ExerciseDef[]>`
**Rôle :** Type TypeScript. Un objet dont les clés sont des strings (ex. "endurance", "smash") et les valeurs des tableaux d'exercices.

---

## 9. `app/globals.css` – Styles

### Ligne 1 : `@import "tailwindcss"`
**Rôle :** Importe Tailwind CSS pour utiliser les classes utilitaires (`flex`, `p-4`, etc.).

---

### Ligne 3-6 : Variables CSS
```css
:root {
  --background: #030712;
  --foreground: #f9fafb;
}
```
**Rôle :** Variables CSS réutilisables. On peut les utiliser avec `var(--background)`.

---

### Ligne 57-59 : `.card-soft`
```css
.card-soft {
  @apply bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl;
}
```
**`@apply`** : directive Tailwind pour appliquer des classes dans du CSS.  
**`bg-slate-900/70`** : fond gris foncé avec 70% d'opacité.  
**`backdrop-blur-xl`** : flou d'arrière-plan.

---

## 10. `app/layout.tsx` – Layout racine

### Ligne 5-8 : Polices Geist
```ts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
```
**Rôle :** Charge la police Google Fonts et la stocke dans une variable CSS.

---

### Ligne 20-24 : `children`
```ts
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={...}>{children}</body>
    </html>
  );
}
```
**`children`** : le contenu de la page (tout ce qui est dans `app/page.tsx`, `app/generator/page.tsx`, etc.). Next.js l'injecte automatiquement.

---

## 11. Récap des mots-clés importants

| Terme | Signification |
|-------|---------------|
| `preventDefault()` | Empêche le comportement par défaut (ex. rechargement de page) |
| `FormData` | API native pour lire les données d'un formulaire |
| `safeParse` | Validation Zod sans lancer d'exception |
| `useState` | Hook React pour une valeur qui change |
| `useEffect` | Hook React pour exécuter du code après le render |
| `useCallback` | Hook React pour mémoriser une fonction |
| `useSearchParams` | Hook Next.js pour lire les paramètres de l'URL |
| `router.push` | Navigation vers une autre page |
| `Suspense` | Composant pour gérer le chargement asynchrone |
| `fetch` | Requête HTTP (GET, POST, etc.) |
| `reduce` | Méthode sur tableau pour accumuler une valeur |
| `map` | Méthode sur tableau pour transformer chaque élément |
| `??` | Opérateur "nullish coalescing" : si gauche est null/undefined, prend droite |
| `...ex` | Spread : copie les propriétés d'un objet |

---

## 12. Questions que le prof pourrait poser

**"C'est quoi `e.preventDefault()` ?"**  
→ Ça empêche le rechargement de la page quand on soumet le formulaire. Sans ça, le navigateur rechargerait la page et on perdrait notre logique.

**"Pourquoi tu passes les paramètres dans l'URL ?"**  
→ Pour que la page résultat sache quoi générer. L'URL est lisible, partageable, et on peut revenir en arrière.

**"C'est quoi Zod ?"**  
→ Une librairie de validation. Elle vérifie que les données correspondent au schéma (types, valeurs autorisées). Si c'est OK, on a des données typées. Si non, on a une erreur détaillée.

**"Pourquoi `useCallback` ?"**  
→ Pour éviter de recréer la fonction `loadSession` à chaque render. On la mémorise tant que les dépendances ne changent pas. Utile pour `useEffect` qui dépend de cette fonction.

**"Pourquoi `Suspense` autour de ResultContent ?"**  
→ Next.js l'exige pour `useSearchParams()` car il peut y avoir un délai avant que les paramètres soient disponibles. Pendant ce temps, on affiche le fallback.

**"C'est quoi le `??` ?"**  
→ Opérateur nullish coalescing. Si la valeur à gauche est `null` ou `undefined`, on prend celle de droite. Différent de `||` qui prend la droite pour toute valeur "falsy" (0, "", false).

---

**Tu as maintenant tout ce qu'il faut pour te défendre face au prof.**
