# Texte de Soutenance - Badminton Training Generator
**Durée : ~5 minutes**

---

## [Diapositive 1 : Titre]

Bonjour, je vais vous présenter mon projet de générateur de séances d'entraînement de badminton. C'est une application web développée dans le cadre du BUT MMI 3ème année.

---

## [Diapositive 2 : Contexte]

Le badminton est un sport qui nécessite des entraînements variés et adaptés au niveau du joueur. Cependant, créer une séance équilibrée n'est pas toujours évident : il faut penser à l'échauffement, choisir les bons exercices selon l'objectif, répartir le temps correctement, et prévoir un retour au calme.

C'est pour répondre à ce besoin que j'ai développé cette application qui génère automatiquement des séances personnalisées.

---

## [Diapositive 3 : Solution]

Mon application permet à un joueur de badminton de remplir un formulaire simple avec son niveau, son objectif d'entraînement, la durée souhaitée, l'intensité et le contexte - c'est-à-dire s'il s'entraîne seul ou avec un partenaire.

L'application génère alors automatiquement une séance complète avec trois sections : un échauffement adapté, des exercices principaux selon l'objectif choisi, et un retour au calme. L'utilisateur peut ensuite télécharger sa séance en PDF pour l'emporter avec lui.

---

## [Diapositive 4 : Technologies]

Pour développer cette application, j'ai utilisé plusieurs technologies modernes.

**Next.js 16** avec l'App Router pour le framework React, qui me permet d'avoir un routing automatique et des API Routes intégrées.

**React 19** pour les composants interactifs côté client.

**TypeScript** pour le typage statique, ce qui m'aide à éviter les erreurs avant même d'exécuter le code.

**Zod** pour la validation des données, que j'utilise à la fois côté client pour une meilleure expérience utilisateur, et côté serveur pour la sécurité.

**Tailwind CSS** pour les styles, ce qui permet un développement rapide avec des classes utilitaires.

**Framer Motion** pour les animations fluides qui améliorent l'expérience utilisateur.

Et enfin **jsPDF** pour générer les PDFs directement dans le navigateur, sans avoir besoin d'un serveur dédié.

---

## [Diapositive 5 : Architecture]

L'architecture de l'application suit un flow simple mais efficace.

Quand l'utilisateur remplit le formulaire, les données sont validées avec Zod côté client. Si tout est correct, l'utilisateur est redirigé vers la page résultat avec les paramètres dans l'URL.

La page résultat lit ces paramètres et appelle une API Route que j'ai créée : `/api/training`. Cette API valide à nouveau les données côté serveur - c'est important pour la sécurité - puis appelle la fonction de génération qui choisit les exercices appropriés selon les critères.

La séance générée est ensuite affichée avec trois sections bien distinctes : échauffement, exercices principaux, et retour au calme.

J'ai organisé le code en séparant la logique métier dans le dossier `/lib` - c'est là que se trouvent la validation, la génération des séances, et l'export PDF - et l'interface utilisateur dans `/app` avec les pages Next.js.

---

## [Diapositive 6 : Fonctionnalités]

Les fonctionnalités principales de l'application sont les suivantes :

La génération est intelligente : elle prend en compte le niveau du joueur, son objectif - par exemple améliorer son smash ou son endurance - et adapte les exercices en conséquence.

Si l'utilisateur choisit de s'entraîner seul, l'application filtre automatiquement les exercices qui nécessitent un partenaire.

L'intensité choisie ajuste la durée des exercices : faible intensité = exercices plus courts, intensité élevée = exercices plus longs.

Le temps est réparti de manière équilibrée entre les trois sections pour que la séance soit cohérente.

Chaque exercice a une description détaillée accessible au survol, ce qui aide l'utilisateur à comprendre ce qu'il doit faire.

L'export PDF inclut le logo, toutes les informations de la séance, et est prêt à être imprimé ou consulté sur mobile.

Et enfin, l'interface est moderne et intuitive, avec des animations qui rendent l'expérience agréable.

---

## [Diapositive 7 : Points Techniques]

Ce projet m'a surtout permis d'apprendre concrètement à utiliser **Next.js** et **Zod**.

Avec **Next.js**, j'ai appris à travailler avec l’App Router, à créer des pages client et serveur, à utiliser les **API Routes** pour séparer le front et le back, et à exploiter les hooks comme `useRouter` et `useSearchParams` pour gérer la navigation et les paramètres d’URL.

Avec **Zod**, j’ai appris à décrire un schéma de données typé, à utiliser `safeParse` pour faire une **validation double** côté client et côté serveur, et à sécuriser mon API contre les paramètres invalides.

Plus globalement, ce projet m’a aussi appris à mieux structurer mon code : logique métier dans `/lib`, interface dans `/app`, données centralisées dans `exercisesData.ts`, et typage strict avec TypeScript pour limiter les erreurs avant l’exécution.

---

## [Diapositive 8 : Conclusion]

Pour conclure, cette application répond à un besoin réel des joueurs de badminton en leur permettant de générer rapidement des séances d'entraînement personnalisées.

Pour l'avenir, je pourrais ajouter une base de données pour sauvegarder les séances, créer un système de comptes utilisateurs avec un historique, ou même des recommandations basées sur les séances précédentes.

Je suis prêt à répondre à vos questions et à faire une démonstration si vous le souhaitez.

Merci pour votre attention.

---

## Notes pour la Présentation

### Conseils d'élocution :
- **Parler naturellement** : Ne pas lire mot à mot, mais s'approprier le texte
- **Rythme** : Parler calmement, faire des pauses entre les sections
- **Regard** : Regarder le jury, pas seulement l'écran
- **Gestes** : Utiliser des gestes pour accompagner les explications

### Si démonstration :
- Ouvrir l'application avant la présentation
- Montrer rapidement : formulaire → résultat → export PDF
- Ne pas passer trop de temps sur la démo (max 1 minute)

### Réponses aux questions fréquentes :

**"Pourquoi Zod ?"**  
→ Validation côté client ET serveur. Si quelqu'un appelle l'API directement avec de mauvais paramètres, on renvoie une erreur. Ça garantit la sécurité et la cohérence des données.

**"Pourquoi une API route ?"**  
→ Séparation front/back. Le front fait un `fetch()`, le serveur exécute la logique. Utile pour une future évolution (base de données, autre client mobile, etc.).

**"Comment tu génères les exercices ?"**  
→ On choisit aléatoirement des exercices dans `exercisesData.ts` selon l'objectif. On filtre par `solo` si besoin. On répartit le temps sur plusieurs blocs et on ajuste selon l'intensité.

**"Pourquoi TypeScript ?"**  
→ Typage statique. Si je fais une erreur, TypeScript me le dit avant d'exécuter. Ça évite des bugs.

**"Pourquoi passer les paramètres dans l'URL ?"**  
→ Pour que la page résultat sache quoi générer. L'URL est lisible, partageable, et on peut revenir en arrière avec le bouton précédent du navigateur.
