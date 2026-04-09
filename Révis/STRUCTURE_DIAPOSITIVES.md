# Structure des Diapositives - Soutenance Badminton Training Generator

## Diapositive 1 : Titre et Présentation
**Titre :** Générateur de Séances d'Entraînement Badminton  
**Sous-titre :** Application web personnalisée  
**Contenu :**
- Logo du projet (si disponible)
- Nom et prénom
- BUT MMI 3ème année
- Date de la soutenance

**Design :** Fond sombre avec dégradé, titre en grand, informations essentielles

---

## Diapositive 2 : Contexte et Problématique
**Titre :** Pourquoi ce projet ?  
**Contenu :**
- Les joueurs de badminton ont besoin de séances adaptées à leur niveau
- Difficulté à créer des entraînements équilibrés (échauffement, exercices, retour au calme)
- Besoin de personnalisation selon l'objectif (endurance, smash, déplacement, etc.)

**Design :** Points clairs, visuels simples

---

## Diapositive 3 : Solution - Vue d'ensemble
**Titre :** Notre Solution  
**Contenu :**
- Application web qui génère automatiquement des séances personnalisées
- Formulaire simple : niveau, objectif, durée, intensité, contexte
- Génération intelligente d'une séance complète
- Export PDF pour emporter sa séance

**Design :** Schéma simple : Formulaire → Génération → Résultat → PDF

---

## Diapositive 4 : Technologies Utilisées
**Titre :** Stack Technique  
**Contenu :**
- **Next.js 16** : Framework React avec App Router et API Routes
- **React 19** : Composants UI interactifs
- **TypeScript** : Typage statique pour la robustesse
- **Zod** : Validation des données côté client et serveur
- **Tailwind CSS** : Styles modernes et responsives
- **Framer Motion** : Animations fluides
- **jsPDF** : Génération PDF côté client

**Design :** Logos des technologies (si disponibles) ou liste claire

---

## Diapositive 5 : Architecture et Flow
**Titre :** Comment ça fonctionne ?  
**Contenu :**
- **Flow utilisateur :**
  1. Formulaire → Validation Zod
  2. Redirection avec paramètres dans l'URL
  3. Page résultat → Appel API `/api/training`
  4. Génération de la séance selon les critères
  5. Affichage avec 3 sections (échauffement, exercices, retour au calme)
  6. Export PDF

- **Architecture :**
  - Frontend : Pages Next.js (App Router)
  - Backend : API Route pour la génération
  - Logique métier : Séparée dans `/lib`

**Design :** Schéma de flux avec flèches, code couleur

---

## Diapositive 6 : Fonctionnalités Clés
**Titre :** Fonctionnalités Principales  
**Contenu :**
- ✅ Génération intelligente selon niveau et objectif
- ✅ Filtrage automatique (solo vs avec partenaire)
- ✅ Ajustement de l'intensité (durée des exercices)
- ✅ Répartition équilibrée du temps
- ✅ Tooltips avec descriptions détaillées
- ✅ Export PDF professionnel avec logo
- ✅ Interface moderne et intuitive

**Design :** Liste à puces avec icônes, visuels de l'interface

---

## Diapositive 7 : Points Techniques Importants
**Titre :** Choix Techniques  
**Contenu :**
- **Validation double** : Zod côté client (UX) ET serveur (sécurité)
- **Séparation des responsabilités** : `/lib` pour la logique, `/app` pour l'UI
- **API Route** : Permet une évolution future (base de données, mobile)
- **TypeScript** : Typage strict pour éviter les erreurs
- **Données centralisées** : Tous les exercices dans `exercisesData.ts` (facile à modifier)

**Design :** Points clairs avec exemples de code si nécessaire

---

## Diapositive 8 : Démonstration / Conclusion
**Titre :** Démonstration & Perspectives  
**Contenu :**
- Démonstration rapide de l'application (si temps)
- **Perspectives d'évolution :**
  - Base de données pour sauvegarder les séances
  - Comptes utilisateurs
  - Historique des séances
  - Recommandations basées sur les performances

- **Remerciements**

**Design :** Visuels de l'app en action, liste des perspectives

---

## Notes pour la Présentation

### Timing (5 minutes) :
- Diapo 1 : 15 secondes
- Diapo 2 : 30 secondes
- Diapo 3 : 45 secondes
- Diapo 4 : 45 secondes
- Diapo 5 : 1 minute
- Diapo 6 : 45 secondes
- Diapo 7 : 45 secondes
- Diapo 8 : 15 secondes

### Conseils :
- Ne pas lire les diapositives mot à mot
- Parler naturellement
- Montrer l'application si possible
- Être prêt à répondre aux questions techniques
- Rester calme et confiant
