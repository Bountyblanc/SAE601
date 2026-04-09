export type ExerciseDef = {
  title: string
  description: string
  duree: number
  /** true = faisable en solo, false = nécessite partenaire(s) */
  solo?: boolean
}

export const exercicesEchauffement: ExerciseDef[] = [
  {
    title: "Échauffement articulaire",
    description:
      "10 rotations des épaules, 10 des poignets, 10 flexions-extensions des genoux. Puis 2 min de petits sauts sur place et talons-fesses.",
    duree: 5,
    solo: true,
  },
  {
    title: "Échauffement avec volant",
    description:
      "5 min d'échanges en fond de court : uniquement clears et drops, sans smash. Augmente progressivement l'amplitude des frappes.",
    duree: 5,
    solo: false,
  },
  {
    title: "Course légère + pas chassés",
    description:
      "2 tours de terrain en course légère, puis 1 min de pas chassés latéraux sur chaque côté. Finis par 1 min de montées de genoux sur place.",
    duree: 6,
    solo: true,
  },
  {
    title: "Shadow + échanges légers",
    description:
      "2 min de déplacements shadow (4 coins du terrain sans volant), puis 3 min d'échanges au filet en poussette pour réveiller les appuis.",
    duree: 6,
    solo: false,
  },
  {
    title: "Échauffement dynamique complet",
    description:
      "1 min de talons-fesses, 1 min de montées de genoux, 1 min de pas chassés. Puis 3 min d'échanges en fond de court en augmentant le rythme.",
    duree: 6,
    solo: false,
  },
  {
    title: "Shadow d'échauffement",
    description:
      "Déplacements sans volant sur les 4 coins du terrain, en poussée d'appuis. Répète la séquence 8 à 10 fois. Augmente progressivement l'intensité.",
    duree: 6,
    solo: true,
  },
  {
    title: "Corde à sauter + pas chassés",
    description:
      "2 min de corde à sauter (ou simulation sans corde), puis 2 min de pas chassés latéraux. Finis par 1 min de montées de genoux.",
    duree: 5,
    solo: true,
  },
]

export const exercicesRetourCalme: ExerciseDef[] = [
  {
    title: "Étirements des jambes",
    description:
      "Étire quadriceps (30 s chaque jambe), ischio-jambiers (30 s), mollets (30 s). Garde chaque position sans à-coups.",
    duree: 5,
  },
  {
    title: "Retour au calme global",
    description:
      "Marche lente 1 min, puis étirements des épaules et du dos (30 s chacun). Finis par 5 grandes respirations profondes.",
    duree: 5,
  },
  {
    title: "Étirements du haut du corps",
    description:
      "Étire épaules, poignets et avant-bras (30 s chaque). Étire le dos en position assise jambes tendues (30 s). Respiration ventrale 1 min.",
    duree: 5,
  },
  {
    title: "Décontraction et respiration",
    description:
      "Marche sur place 2 min en soufflant bien. Puis étirements passifs des jambes et du dos, 2 min au total.",
    duree: 5,
  },
  {
    title: "Étirements ciblés badminton",
    description:
      "Étire l'épaule de frappe (rotation externe 30 s), le poignet (flexion 20 s), les adducteurs (position papillon 30 s). Respire lentement.",
    duree: 6,
  },
]

export const objectiveExercises: Record<string, ExerciseDef[]> = {
  endurance: [
    {
      title: "Rallyes continus",
      description:
        "Échanges en fond de court : uniquement clears et drops, sans smash. Objectif : garder le volant en jeu le plus longtemps possible.",
      duree: 10,
      solo: false,
    },
    {
      title: "Déplacement + frappe",
      description:
        "Ton partenaire envoie le volant à gauche puis à droite. Tu te déplaces latéralement, frappe en clear ou drop, et reviens au centre après chaque coup.",
      duree: 10,
      solo: false,
    },
    {
      title: "Match à thème endurance",
      description:
        "Joue un match : le point ne compte que si l'échange dure au moins 6 frappes. Si quelqu'un finit avant, on rejoue le point.",
      duree: 10,
      solo: false,
    },
    {
      title: "Intervalles fond de court",
      description:
        "2 min d'échanges rapides en fond de court, puis 1 min de récup (marche). Répète 3 à 4 fois. Garde un rythme soutenu pendant les phases actives.",
      duree: 12,
      solo: false,
    },
    {
      title: "Multi-volants endurance",
      description:
        "Un partenaire lance des volants en continu. Tu frappes chaque volant en clear ou drop, sans t'arrêter. Change de rôle à mi-parcours.",
      duree: 12,
      solo: false,
    },
    // Solo
    {
      title: "Shadow endurance en croix",
      description:
        "Sans volant : déplace-toi vers les 4 coins du terrain en séquence. Répète 15 à 20 fois sans t'arrêter. Garde un rythme soutenu.",
      duree: 10,
      solo: true,
    },
    {
      title: "Course autour du terrain",
      description:
        "Tours de terrain en course légère ou footing. Alterne 2 min de course et 1 min de marche rapide. Répète 3 à 4 fois.",
      duree: 12,
      solo: true,
    },
    {
      title: "Panier de volants endurance",
      description:
        "Avec un panier : lance-toi les volants et frappe en clear ou drop. Récupère les volants, recommence. Travaille la régularité et le souffle.",
      duree: 10,
      solo: true,
    },
    {
      title: "Corde à sauter par intervalles",
      description:
        "2 min de corde à sauter (ou simulation), 1 min de récup en marchant. Répète 4 à 5 fois. Adapte l'intensité à ton niveau.",
      duree: 12,
      solo: true,
    },
    {
      title: "Shadow + frappe contre mur",
      description:
        "Si tu as un mur : alterne 1 min de shadow et 1 min de frappe contre le mur (clears, drops). Répète 4 à 5 fois. Sinon, double le shadow.",
      duree: 10,
      solo: true,
    },
  ],
  smash: [
    {
      title: "Série de smashs en fond de court",
      description:
        "Ton partenaire lance des volants. Tu smash côté coup droit pendant 2 min, puis côté revers 2 min. Récupération courte entre chaque frappe.",
      duree: 8,
      solo: false,
    },
    {
      title: "Smash + déplacement avant/arrière",
      description:
        "Smash en fond de court, puis monte au filet pour intercepter. Ton partenaire renvoie, tu recules et smash à nouveau. Répète le cycle.",
      duree: 8,
      solo: false,
    },
    {
      title: "Smash en situation de match",
      description:
        "Joue des rallyes : tu ne peux marquer le point qu'avec un smash. Si tu finis au drop ou clear, le point continue.",
      duree: 8,
      solo: false,
    },
    {
      title: "Multi-volants smash",
      description:
        "Un partenaire lance des volants en continu. Tu smash chacun avec puissance. Change de rôle à mi-parcours. Pas de récup entre les frappes.",
      duree: 10,
      solo: false,
    },
    {
      title: "Smash + amorti",
      description:
        "En rallye : alterne un smash puissant puis un amorti au filet pour casser le rythme. Répète la séquence. Travaille la variation de jeu.",
      duree: 10,
      solo: false,
    },
    // Solo
    {
      title: "Panier de volants smash",
      description:
        "Avec un panier : lance-toi les volants un par un et smash. Récupère, recommence. Travaille coup droit et revers. Rythme soutenu.",
      duree: 10,
      solo: true,
    },
    {
      title: "Smash contre mur",
      description:
        "Si tu as un mur : frappe en smash contre le mur, récupère le volant, recommence. Varie les angles (coup droit, revers, centre).",
      duree: 8,
      solo: true,
    },
    {
      title: "Shadow smash",
      description:
        "Sans volant : simule une montée au filet, recule en position smash, frappe (geste complet). Répète la séquence 20 à 30 fois.",
      duree: 8,
      solo: true,
    },
    {
      title: "Service smash répété",
      description:
        "Place des cibles au sol. Sers en smash (service long) et vise les cibles. Répète 30 à 40 services en variant les zones.",
      duree: 10,
      solo: true,
    },
  ],
  regularite: [
    {
      title: "Rallyes en zone",
      description:
        "Délimite 4 zones (ex. les 4 coins). Ton partenaire t'envoie le volant, tu dois le renvoyer dans la zone demandée. Compte les fautes.",
      duree: 8,
      solo: false,
    },
    {
      title: "Lifts / Clears continus",
      description:
        "Échanges uniquement en longueur (clears et lifts). Pas de drop ni smash. Objectif : régularité et trajectoire haute.",
      duree: 8,
      solo: false,
    },
    {
      title: "Routine coup droit / revers",
      description:
        "Ton partenaire alterne coup droit / revers. Tu renvoies chaque volant du côté où il arrive, sans faute. Augmente le rythme progressivement.",
      duree: 8,
      solo: false,
    },
    {
      title: "Régularité filet",
      description:
        "Échanges uniquement au filet (poussettes, contre-amortis). Le volant ne doit pas dépasser la ligne de service. Une faute = on recommence le compteur.",
      duree: 6,
      solo: false,
    },
    {
      title: "Rallyes croisés",
      description:
        "Échanges uniquement en diagonale (coup droit → coup droit, revers → revers). Garde un rythme constant, pas de faute. Compte les échanges.",
      duree: 8,
      solo: false,
    },
    // Solo
    {
      title: "Frappe contre mur en contrôle",
      description:
        "Frappe contre un mur en clear, drop, filet. Objectif : garder l'échange le plus longtemps possible sans faute. Compte les frappes.",
      duree: 8,
      solo: true,
    },
    {
      title: "Panier de volants en zone",
      description:
        "Place des cibles (cerceaux, plots). Lance-toi les volants et vise les zones. Compte les réussites sur 20 lancers.",
      duree: 8,
      solo: true,
    },
    {
      title: "Service en cible",
      description:
        "Place des cibles dans les zones de service. Sers court ou long et vise. Alterne coup droit et revers. 40 à 50 services.",
      duree: 8,
      solo: true,
    },
    {
      title: "Régularité contre mur",
      description:
        "Frappe contre le mur en alternant coup droit et revers. Pas de smash. Objectif : 50 frappes sans faute. Augmente le rythme.",
      duree: 8,
      solo: true,
    },
  ],
  deplacement: [
    {
      title: "Shadow en croix",
      description:
        "Sans volant : simule une frappe au centre, puis déplace-toi vers chaque coin (avant droit, avant gauche, arrière droit, arrière gauche) en poussée d'appuis. Répète la séquence.",
      duree: 8,
      solo: true,
    },
    {
      title: "Déplacement avant/arrière avec frappe",
      description:
        "Ton partenaire alterne drop au filet et clear en fond. Tu montes, frappe, recules, frappe. Répète en gardant un déplacement fluide.",
      duree: 8,
      solo: false,
    },
    {
      title: "Déplacements en diagonale",
      description:
        "Shadow ou avec volant : déplace-toi en diagonale (avant droit → arrière gauche, avant gauche → arrière droit). Insiste sur la vitesse de jambes et le retour au centre.",
      duree: 8,
      solo: true,
    },
    {
      title: "Déplacements + feintes",
      description:
        "Shadow : simule une direction, puis change brusquement vers un autre coin. Travaille les fausses pistes et la réactivité des appuis.",
      duree: 8,
      solo: true,
    },
    {
      title: "Échelle de vitesse",
      description:
        "Avec une échelle au sol ou des plots : pas chassés, pas croisés, montées de genoux. 30 s d'effort, 30 s de récup. Répète 6 à 8 fois.",
      duree: 8,
      solo: true,
    },
    {
      title: "Shadow en intensité",
      description:
        "Shadow sur les 4 coins à haute intensité. 20 s à fond, 20 s de récup. Répète 8 à 10 fois. Travaille l'explosivité des appuis.",
      duree: 10,
      solo: true,
    },
  ],
  defense: [
    {
      title: "Bloc de défense sur smashs",
      description:
        "Ton partenaire smash en continu. Tu bloques ou lifte pour renvoyer. Varie les zones de smash (coup droit, revers, centre). Change de rôle à mi-parcours.",
      duree: 8,
      solo: false,
    },
    {
      title: "Lift de défense",
      description:
        "En position défensive (filet ou mi-court), ton partenaire attaque. Tu dois lifter haut et long en fond de court pour te dégager. Répète sans faute.",
      duree: 8,
      solo: false,
    },
    {
      title: "Match à thème défense",
      description:
        "Joue un match : tu ne peux attaquer (smash, drop) qu'après avoir défendu au moins 3 coups de l'adversaire. Sinon tu continues à lifter/clear.",
      duree: 8,
      solo: false,
    },
    {
      title: "Enchaînement défense-longueur",
      description:
        "Ton partenaire attaque. Tu défends (bloc ou lift court), puis dès que tu peux tu enchaînes avec un clear long pour te dégager. Répète.",
      duree: 8,
      solo: false,
    },
    // Solo
    {
      title: "Shadow défensif",
      description:
        "Sans volant : simule une position basse (genoux fléchis, raquette devant). Déplace-toi latéralement et en recul comme si tu défendais des smashs. 30 s effort, 30 s récup.",
      duree: 8,
      solo: true,
    },
    {
      title: "Bloc contre mur",
      description:
        "Si tu as un mur : frappe fort contre le mur, le volant revient vite. Pratique le bloc (raccourcir le geste, renvoyer court). Répète.",
      duree: 8,
      solo: true,
    },
    {
      title: "Position défensive + déplacements",
      description:
        "En position basse, déplace-toi en shadow vers les zones de défense (côtés, centre). Simule des blocs. Travaille la réactivité et les appuis.",
      duree: 8,
      solo: true,
    },
  ],
  double: [
    {
      title: "Rotation avant/arrière",
      description:
        "En double : travaille les rotations. Quand le volant va en arrière, le joueur avant recule et celui du fond avance. Répète les changements de position.",
      duree: 8,
      solo: false,
    },
    {
      title: "Service + troisième coup en double",
      description:
        "En double : service court, adversaire remet au filet, tu joues le 3e coup (push, lift ou amorti) pour prendre l'attaque. Répète les scénarios.",
      duree: 8,
      solo: false,
    },
    {
      title: "Match de double à thème",
      description:
        "Joue un double : chaque point doit commencer par une montée au filet (service court + 3e coup). Pas de jeu uniquement en fond de court.",
      duree: 8,
      solo: false,
    },
    {
      title: "Rotation latérale en double",
      description:
        "En double : le partenaire envoie le volant dans les couloirs. Couvre ton côté, appelle « moi » ou « toi » pour la balle au centre. Travaille la communication.",
      duree: 8,
      solo: false,
    },
    // Solo - préparation double (shadow, service, déplacements)
    {
      title: "Shadow rotations double",
      description:
        "Sans partenaire : simule les rotations d'un double. Avance au filet (position attaque), recule en fond (position défense). Répète 20 à 30 fois.",
      duree: 8,
      solo: true,
    },
    {
      title: "Service double répété",
      description:
        "Place des cibles en zone de service court. Sers 50 à 60 fois en visant les cibles. Alterne coup droit et revers. Travaille la régularité.",
      duree: 8,
      solo: true,
    },
    {
      title: "Déplacements couloirs double",
      description:
        "Shadow : couvre les couloirs comme en double (gauche, centre, droite). Déplace-toi en position basse, simule des interceptions au filet.",
      duree: 8,
      solo: true,
    },
  ],
  default: [
    {
      title: "Rallyes mixtes",
      description:
        "Échanges libres : alterne clears, drops, filet et smash occasionnel. Pas de règle stricte, garde un rythme régulier et varié.",
      duree: 10,
      solo: false,
    },
    {
      title: "Déplacements en croix + frappe contrôlée",
      description:
        "Shadow ou avec volant : déplace-toi vers les 4 coins, frappe à chaque arrivée (clear ou drop). Retour au centre entre chaque coup.",
      duree: 10,
      solo: true,
    },
    {
      title: "Shadow complet",
      description:
        "Sans volant : déplace-toi vers les 4 coins en séquence. Simule une frappe à chaque arrivée. Répète 15 à 20 fois. Travail global.",
      duree: 10,
      solo: true,
    },
  ],
}

