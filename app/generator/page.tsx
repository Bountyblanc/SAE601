"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { trainingSchema } from "@/lib/schema"

export default function Generator() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const data = {
      niveau: formData.get("niveau"),
      objectif: formData.get("objectif"),
      duree: formData.get("duree"),
      intensite: formData.get("intensite"),
      contexte: formData.get("contexte"),
    }

    const result = trainingSchema.safeParse(data)

    if (!result.success) {
      setError("Veuillez remplir correctement le formulaire")
      return
    }

    router.push(
      `/result?niveau=${data.niveau}&objectif=${data.objectif}&duree=${data.duree}&intensite=${data.intensite}&contexte=${data.contexte}`
    )
  }

  return (
    <main className="page-shell">
      <div className="page-container">
        <div className="max-w-xl mx-auto card-soft p-7 md:p-9 space-y-7">
          <header className="space-y-3 text-center">
            <p className="badge mx-auto w-fit">
              <span className="badge-dot" />
              <span>Configuration de ta séance</span>
            </p>
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
                Paramètres de ta séance
              </h1>
              <p className="text-sm text-slate-300">
                Quelques clics suffisent pour générer une séance complète :
                échauffement, exercices ciblés et retour au calme.
              </p>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="niveau"
                className="block text-sm font-medium text-slate-100"
              >
                Niveau de jeu
              </label>
              <select id="niveau" name="niveau" className="input-select" required>
                <option value="">Sélectionne ton niveau</option>
                <option value="debutant">Débutant</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="avance">Avancé</option>
              </select>
              <p className="text-xs text-slate-400">
                Nous adaptons le volume et la complexité des exercices à ton
                expérience.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="objectif"
                className="block text-sm font-medium text-slate-100"
              >
                Objectif principal
              </label>
              <select
                id="objectif"
                name="objectif"
                className="input-select"
                required
              >
                <option value="">Choisis ton axe de travail</option>
                <option value="endurance">Endurance</option>
                <option value="smash">Puissance / Smash</option>
                <option value="regularite">Régularité / Précision</option>
                <option value="deplacement">Déplacements</option>
                <option value="defense">Défense</option>
                <option value="double">Double / Mixte</option>
              </select>
              <p className="text-xs text-slate-400">
                L’objectif influence le type d’exercices et le temps passé sur
                chaque bloc.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contexte"
                className="block text-sm font-medium text-slate-100"
              >
                Tu t&apos;entraînes comment ?
              </label>
              <select
                id="contexte"
                name="contexte"
                className="input-select"
                required
              >
                <option value="">Solo ou à plusieurs</option>
                <option value="solo">En solo (sans partenaire)</option>
                <option value="avec_partenaire">Avec partenaire(s)</option>
              </select>
              <p className="text-xs text-slate-400">
                En solo, tu auras des exercices adaptés (shadow, panier de volants, mur, etc.).
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="duree"
                  className="block text-sm font-medium text-slate-100"
                >
                  Durée de la séance
                </label>
                <select
                  id="duree"
                  name="duree"
                  className="input-select"
                  required
                >
                  <option value="">Durée totale</option>
                  <option value="30">30 min</option>
                  <option value="60">1 h</option>
                  <option value="90">1 h 30</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="intensite"
                  className="block text-sm font-medium text-slate-100"
                >
                  Intensité souhaitée
                </label>
                <select
                  id="intensite"
                  name="intensite"
                  className="input-select"
                  required
                >
                  <option value="">Choisis l&apos;intensité</option>
                  <option value="faible">Faible</option>
                  <option value="moyenne">Moyenne</option>
                  <option value="elevee">Élevée</option>
                </select>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 text-center bg-red-500/10 border border-red-500/40 rounded-2xl px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3 pt-2">
              <button type="submit" className="btn-primary w-full">
                Générer ma séance personnalisée
              </button>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="btn-secondary w-full text-sm"
              >
                Retour à l’accueil
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}