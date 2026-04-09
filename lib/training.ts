import {
  exercicesEchauffement,
  exercicesRetourCalme,
  objectiveExercises,
} from "@/lib/exercisesData"

export type Exercise = {
  title: string
  description: string
  duree: number
}

export type Session = {
  echauffement: Exercise[]
  exercices: Exercise[]
  retourCalme: Exercise[]
}

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function pickRandomUnique<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, array.length))
}

function ajusterDuree(base: number, intensite: string) {
  if (intensite === "faible") return Math.max(1, base - 2)
  if (intensite === "elevee") return base + 3
  return base
}

export function generateTraining(
  niveau: string,
  objectif: string,
  duree: number,
  intensite: string,
  contexte: "solo" | "avec_partenaire" = "avec_partenaire"
): Session {
  const isSolo = contexte === "solo"

  const poolEchauffement = isSolo
    ? exercicesEchauffement.filter((ex) => ex.solo === true)
    : exercicesEchauffement
  const cibleEchauffement = 6 + Math.floor(duree / 30) * 2 + Math.floor(Math.random() * 2)
  const nbBlocsEchauffement = 2 + Math.floor(Math.random() * 2)
  const picksEchauffement = pickRandomUnique(poolEchauffement as Exercise[], nbBlocsEchauffement)
  const dureeBaseEchauffement = Math.max(2, Math.floor(cibleEchauffement / nbBlocsEchauffement))
  let resteEchauffement = cibleEchauffement - dureeBaseEchauffement * nbBlocsEchauffement

  const echauffement: Exercise[] = picksEchauffement.map((ex) => {
    let dur = dureeBaseEchauffement
    if (resteEchauffement > 0) {
      dur += 1
      resteEchauffement -= 1
    }
    return { ...ex, duree: ajusterDuree(dur, intensite) }
  })
  const tempsEchauffement = echauffement.reduce((acc, ex) => acc + ex.duree, 0)

  const variantesBrutes =
    (objectiveExercises[objectif] as Exercise[]) ?? (objectiveExercises.default as Exercise[])
  type WithSolo = Exercise & { solo?: boolean }
  let variantesExercices: Exercise[] = isSolo
    ? (variantesBrutes as WithSolo[]).filter((ex) => ex.solo === true)
    : variantesBrutes
  if (variantesExercices.length === 0) {
    variantesExercices = (objectiveExercises.default as WithSolo[]).filter((ex) => ex.solo === true)
  }
  if (variantesExercices.length === 0) variantesExercices = variantesBrutes

  const cibleRetourCalme = 5 + Math.floor(duree / 30) * 2 + Math.floor(Math.random() * 2)
  const nbBlocsRetourCalme = 2 + Math.floor(Math.random() * 2)
  const picksRetourCalme = pickRandomUnique(exercicesRetourCalme as Exercise[], nbBlocsRetourCalme)
  const dureeBaseRetourCalme = Math.max(2, Math.floor(cibleRetourCalme / nbBlocsRetourCalme))
  let resteRetourCalme = cibleRetourCalme - dureeBaseRetourCalme * nbBlocsRetourCalme

  const retourCalme: Exercise[] = picksRetourCalme.map((ex) => {
    let dur = dureeBaseRetourCalme
    if (resteRetourCalme > 0) {
      dur += 1
      resteRetourCalme -= 1
    }
    return { ...ex, duree: ajusterDuree(dur, intensite) }
  })
  const tempsRetourCalme = retourCalme.reduce((acc, ex) => acc + ex.duree, 0)

  const tempsExercicesCible = Math.max(10, duree - tempsEchauffement - tempsRetourCalme)

  let nbBlocsExercices = Math.floor(Math.random() * 6) + 1
  while (nbBlocsExercices > 1 && tempsExercicesCible / nbBlocsExercices < 5) {
    nbBlocsExercices--
  }

  const exercices: Exercise[] = []

  const dureeBaseBloc = Math.max(3, Math.floor(tempsExercicesCible / nbBlocsExercices))
  let resteBlocs = tempsExercicesCible - dureeBaseBloc * nbBlocsExercices

  for (let i = 0; i < nbBlocsExercices; i++) {
    const variant = randomItem(variantesExercices)
    let dur = dureeBaseBloc
    if (resteBlocs > 0) {
      dur += 1
      resteBlocs -= 1
    }

    if (niveau === "debutant") dur = Math.max(4, dur - 1)
    if (niveau === "avance") dur = dur + 1

    exercices.push({
      ...variant,
      duree: dur,
    })
  }

  let totalExercices = exercices.reduce((acc, ex) => acc + ex.duree, 0)
  let diff = tempsExercicesCible - totalExercices
  let safety = 0

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

  return {
    echauffement,
    exercices,
    retourCalme,
  }
}


