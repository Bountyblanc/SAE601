"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import type { Session } from "@/lib/training"
import { downloadSessionPdf } from "@/lib/pdfExport"
import { motion } from "framer-motion"
import { useState, useEffect, useCallback } from "react"

async function fetchSession(params: {
  niveau: string
  objectif: string
  duree: number
  intensite: string
  contexte: string
}): Promise<Session> {
  const url = `/api/training?niveau=${params.niveau}&objectif=${params.objectif}&duree=${params.duree}&intensite=${params.intensite}&contexte=${params.contexte}`
  const res = await fetch(url)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? "Erreur lors de la génération")
  }
  const data = await res.json()
  return data.session
}

function ResultContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const niveau = searchParams.get("niveau")
  const objectif = searchParams.get("objectif")
  const dureeParam = searchParams.get("duree") || "30"
  const duree = parseInt(dureeParam)
  const intensite = searchParams.get("intensite") || "moyenne"
  const contexte = searchParams.get("contexte") || "avec_partenaire"
  const isExample = searchParams.get("source") === "example"

  const [sessionState, setSessionState] = useState<Session | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const loadSession = useCallback(async () => {
    if (!niveau || !objectif) return
    setError(null)
    try {
      const session = await fetchSession({
        niveau,
        objectif,
        duree,
        intensite,
        contexte,
      })
      setSessionState(session)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inattendue")
      setSessionState(null)
    }
  }, [niveau, objectif, duree, intensite, contexte])

  useEffect(() => {
    loadSession()
  }, [loadSession])

  if (!niveau || !objectif || !duree) {
    return (
      <main className="page-shell">
        <div className="page-container flex items-center justify-center">
          <div className="card-soft max-w-md w-full p-8 text-center space-y-4">
            <h1 className="text-xl font-semibold text-slate-50">
              Données manquantes
            </h1>
            <p className="text-sm text-slate-300">
              Nous n&apos;avons pas trouvé toutes les informations nécessaires
              pour générer ta séance. Retourne au configurateur pour
              recommencer.
            </p>
            <div className="flex flex-col gap-2">
              <button onClick={() => router.push("/generator")} className="btn-primary w-full">
                Revenir au formulaire
              </button>
              <button onClick={() => router.push("/")} className="btn-secondary w-full">
                Retour à l&apos;accueil
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error)
    return (
      <main className="page-shell">
        <div className="page-container flex items-center justify-center">
          <div className="card-soft max-w-md w-full p-8 text-center space-y-4">
            <h1 className="text-xl font-semibold text-slate-50">Erreur de génération</h1>
            <p className="text-sm text-slate-300">{error}</p>
            <div className="flex flex-col gap-2">
              <button onClick={() => loadSession()} className="btn-primary w-full">
                Réessayer
              </button>
              <button onClick={() => router.push("/generator")} className="btn-secondary w-full">
                Retour au formulaire
              </button>
              <button onClick={() => router.push("/")} className="btn-secondary w-full">
                Retour à l&apos;accueil
              </button>
            </div>
          </div>
        </div>
      </main>
    )

  if (!sessionState)
    return (
      <main className="page-shell">
        <div className="page-container flex items-center justify-center">
          <div className="card-soft max-w-md w-full p-8 text-center space-y-3">
            <p className="text-sm text-slate-300">Chargement de ta séance...</p>
          </div>
        </div>
      </main>
    )

  const totalTime =
    [...sessionState.echauffement, ...sessionState.exercices, ...sessionState.retourCalme]
      .reduce((acc, ex) => acc + ex.duree, 0)

  const pdfMeta = {
    niveau: niveau!,
    objectif: objectif!,
    duree,
    intensite,
    contexte,
  }

  function Section({ title, data, delay }: { title: string; data: Session["echauffement"]; delay?: number }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="card-soft p-6 md:p-7"
      >
        <h2 className="text-lg font-semibold mb-4 text-slate-50">{title}</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          {data.map((ex, i) => (
            <li
              key={i}
              className="group relative flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-2 border border-white/5 cursor-help transition-colors hover:border-sky-500/30 hover:bg-slate-800/80"
            >
              <span className="max-w-[70%]">{ex.title}</span>
              <span className="font-medium text-sky-300">{ex.duree} min</span>
              <div className="absolute left-0 right-0 top-full mt-2 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none">
                <div className="bg-slate-800 border border-sky-500/20 rounded-xl px-4 py-3 text-xs text-slate-200 shadow-xl">
                  {ex.description}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    )
  }

  return (
    <main className="page-shell">
      <div className="page-container space-y-7">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <div className="badge mx-auto w-fit">
            <span className="badge-dot" />
            <span>Plan d&apos;entraînement généré</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold text-slate-50">
            Ta séance personnalisée
          </h1>

          <p className="text-sm md:text-base text-slate-200">
            Niveau {niveau} • Objectif {objectif} • {duree} min • Intensité {intensite}
            {contexte === "solo" && " • Solo"}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Temps total calculé : {totalTime} minutes (échauffement + travail principal + retour au calme)
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          <Section title="Échauffement" data={sessionState.echauffement} delay={0.2} />
          <Section title="Exercices" data={sessionState.exercices} delay={0.3} />
          <Section title="Retour au calme" data={sessionState.retourCalme} delay={0.4} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-3 mt-4 flex-wrap"
        >
          <button onClick={() => downloadSessionPdf(sessionState, pdfMeta).catch(() => {})} className="btn-primary">
            {isExample ? "Télécharger cet exemple" : "Télécharger en PDF"}
          </button>
          <button onClick={() => router.push("/generator")} className="btn-secondary">
            {isExample ? "Créer ma séance" : "Recommencer"}
          </button>
          <button onClick={() => router.push("/")} className="btn-secondary">
            Retour à l&apos;accueil
          </button>
          {!isExample && (
            <button
              onClick={async () => {
                setIsRegenerating(true)
                try {
                  const session = await fetchSession(pdfMeta)
                  setSessionState(session)
                } finally {
                  setIsRegenerating(false)
                }
              }}
              disabled={isRegenerating}
              className="btn-primary"
            >
              {isRegenerating ? "Génération…" : "Régénérer"}
            </button>
          )}
        </motion.div>

      </div>
    </main>
  )
}

export default function Result() {
  return (
    <Suspense fallback={
      <main className="page-shell">
        <div className="page-container flex items-center justify-center">
          <p className="text-slate-300">Chargement...</p>
        </div>
      </main>
    }>
      <ResultContent />
    </Suspense>
  )
}