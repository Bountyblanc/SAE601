import { NextRequest, NextResponse } from "next/server"
import { trainingSchema } from "@/lib/schema"
import { generateTraining } from "@/lib/training"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const niveau = searchParams.get("niveau")
  const objectif = searchParams.get("objectif")
  const duree = searchParams.get("duree")
  const intensite = searchParams.get("intensite")
  const contexte = searchParams.get("contexte")

  const result = trainingSchema.safeParse({
    niveau,
    objectif,
    duree,
    intensite,
    contexte,
  })

  if (!result.success) {
    return NextResponse.json(
      { error: "Paramètres invalides", details: result.error.flatten() },
      { status: 400 }
    )
  }

  const { niveau: n, objectif: o, duree: d, intensite: i, contexte: c } = result.data

  const session = generateTraining(n, o, parseInt(d, 10), i, c)

  return NextResponse.json({ session })
}

