"use client"

import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-16">
        {/* Hero */}
        <section className="grid gap-10 lg:grid-cols-[1.1fr_minmax(0,0.9fr)] items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 backdrop-blur p-2.5 ring-1 ring-white/10">
                <Image
                  src="/img/logo.png"
                  alt="Logo Badminton"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
              </div>
              <div className="badge">
                <span className="badge-dot" />
                <span>Coach virtuel badminton</span>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-50">
                Génère ta séance de badminton
                <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                  en quelques secondes.
                </span>
              </h1>

              <p className="text-sm md:text-base text-slate-300 max-w-xl">
                Choisis ton niveau, ton objectif (endurance, smash, régularité…)
                et la durée de ta séance. Nous construisons un programme
                équilibré avec échauffement, corps de séance et retour au calme.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link href="/generator" className="btn-primary">
                Commencer ma séance
              </Link>
              <Link
                href="/result?niveau=intermediaire&objectif=endurance&duree=60&intensite=moyenne&contexte=avec_partenaire&source=example"
                className="btn-secondary text-sm"
              >
                Voir un exemple
              </Link>
            </div>

            <p className="text-xs text-slate-400">
              100% gratuit · Aucun compte requis · Clubs & joueurs loisirs
            </p>
          </div>

          <aside className="card-soft relative overflow-hidden">
            <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-sky-500/30 blur-3xl" />
            <div className="absolute -bottom-32 -left-10 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="relative p-7 md:p-8 space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    À quoi ça ressemble
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-50">
                    Échauffement · Exercices · Retour au calme
                  </p>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 border border-emerald-400/30">
                  Personnalisable
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[0.7rem] text-slate-400">Durée</p>
                  <p className="mt-1 text-sm font-semibold text-slate-50">30 à 90 min</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[0.7rem] text-slate-400">Objectifs</p>
                  <p className="mt-1 text-sm font-semibold text-sky-300">Endurance, smash…</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[0.7rem] text-slate-400">Sections</p>
                  <p className="mt-1 text-sm font-semibold text-slate-50">3 sections</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-[0.7rem]">
                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-200 border border-white/5">
                  Échauffement
                </span>
                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-200 border border-white/5">
                  Exercices ciblés
                </span>
                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-200 border border-white/5">
                  Retour au calme
                </span>
              </div>
            </div>
          </aside>
        </section>

        {/* Comment ça marche */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-50">
            Comment ça marche
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2">
            <div className="card-soft p-6 space-y-3 w-full md:flex-1">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300 font-bold text-lg">
                1
              </span>
              <h3 className="font-medium text-slate-50">Remplis le formulaire</h3>
              <p className="text-sm text-slate-400">
                Niveau, objectif, durée, intensité et contexte (solo ou partenaire).
              </p>
            </div>
            <span className="text-sky-400 text-2xl shrink-0 rotate-90 md:rotate-0" aria-hidden>→</span>
            <div className="card-soft p-6 space-y-3 w-full md:flex-1">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300 font-bold text-lg">
                2
              </span>
              <h3 className="font-medium text-slate-50">Génération automatique</h3>
              <p className="text-sm text-slate-400">
                Un programme complet est créé : échauffement, exercices ciblés, retour au calme.
              </p>
            </div>
            <span className="text-sky-400 text-2xl shrink-0 rotate-90 md:rotate-0" aria-hidden>→</span>
            <div className="card-soft p-6 space-y-3 w-full md:flex-1">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300 font-bold text-lg">
                3
              </span>
              <h3 className="font-medium text-slate-50">Télécharge ou régénère</h3>
              <p className="text-sm text-slate-400">
                Exporte en PDF ou régénère une nouvelle séance en un clic.
              </p>
            </div>
          </div>
        </section>

        {/* Objectifs disponibles */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-50">
            Objectifs disponibles
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Endurance", desc: "Améliorer ta résistance" },
              { label: "Smash / Puissance", desc: "Travailler la frappe" },
              { label: "Régularité", desc: "Précision et contrôle" },
              { label: "Déplacements", desc: "Vitesse et placement" },
              { label: "Défense", desc: "Bloc et contre-attaque" },
              { label: "Double / Mixte", desc: "Jeu à deux" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-medium text-slate-50">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="card-soft p-8 md:p-10 text-center space-y-4">
          <h2 className="text-2xl font-semibold text-slate-50">
            Prêt à t&apos;entraîner ?
          </h2>
          <p className="text-slate-300 max-w-md mx-auto">
            Crée ta première séance personnalisée en moins d&apos;une minute.
          </p>
          <Link href="/generator" className="btn-primary inline-block">
            Créer ma séance
          </Link>
        </section>
      </div>
    </main>
  )
}
