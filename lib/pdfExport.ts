import { jsPDF } from "jspdf"
import type { Session } from "./training"

type PdfMeta = {
  niveau: string
  objectif: string
  duree: number
  intensite: string
  contexte?: string
}

const accent = [14, 165, 233] as [number, number, number] // sky-500
const muted = [100, 116, 139] as [number, number, number]   // slate-400
const lightBg = [241, 245, 249] as [number, number, number] // slate-100

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

export async function downloadSessionPdf(session: Session, meta: PdfMeta) {
  const doc = new jsPDF({ format: "a4", unit: "mm" })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = 30

  const totalTime = [
    ...session.echauffement,
    ...session.exercices,
    ...session.retourCalme,
  ].reduce((acc, ex) => acc + ex.duree, 0)

  // Bandeau header avec logo
  doc.setFillColor(...accent)
  doc.rect(0, 0, pageWidth, 18, "F")
  const logoBase64 = await chargerLogoBase64()
  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", margin, 3, 12, 12)
  }
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Séance de badminton", margin + (logoBase64 ? 16 : 0), 10)
  doc.setTextColor(0, 0, 0)

  // Infos
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(...muted)
  let metaStr = `Niveau ${meta.niveau} · Objectif ${meta.objectif} · ${meta.duree} min · Intensité ${meta.intensite}`
  if (meta.contexte === "solo") metaStr += " · Solo"
  doc.text(metaStr, margin, y)
  y += 6
  doc.text(`Temps total : ${totalTime} minutes`, margin, y)
  y += 14

  function addSection(title: string, exercises: { title: string; description: string; duree: number }[]) {
    if (y > pageHeight - 55) {
      doc.addPage()
      y = 20
    }

    // Titre section avec fond léger
    doc.setFillColor(...lightBg)
    doc.rect(margin, y - 5, contentWidth, 10, "F")
    doc.setDrawColor(203, 213, 225) // slate-300
    doc.setLineWidth(0.2)
    doc.line(margin, y + 4, margin + contentWidth, y + 4)
    doc.setTextColor(...accent)
    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.text(title, margin + 3, y + 2)
    doc.setTextColor(0, 0, 0)
    y += 12

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)

    for (const ex of exercises) {
      if (y > pageHeight - 45) {
        doc.addPage()
        y = 20
      }

      // Légère boîte par exercice
      const descLines = doc.splitTextToSize(ex.description, contentWidth - 10)
      const boxH = 14 + descLines.length * 5
      doc.setFillColor(248, 250, 252) // slate-50
      doc.roundedRect(margin, y - 4, contentWidth, boxH, 2, 2, "F")
      doc.setDrawColor(226, 232, 240) // slate-200
      doc.setLineWidth(0.1)
      doc.roundedRect(margin, y - 4, contentWidth, boxH, 2, 2, "S")

      doc.text(ex.title, margin + 5, y + 3)
      doc.setTextColor(...accent)
      doc.setFont("helvetica", "bold")
      doc.text(`${ex.duree} min`, pageWidth - margin - 18, y + 3)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(0, 0, 0)

      doc.setFontSize(9)
      doc.setTextColor(...muted)
      doc.text(descLines, margin + 5, y + 10)
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(10)
      y += boxH + 4
    }

    y += 6
  }

  addSection("Échauffement", session.echauffement)
  addSection("Exercices", session.exercices)
  addSection("Retour au calme", session.retourCalme)

  // Footer
  doc.setFontSize(8)
  doc.setTextColor(...muted)
  doc.text("Badminton Training Generator", margin, pageHeight - 10)
  doc.setTextColor(0, 0, 0)

  const fileName = `seance-badminton-${meta.objectif}-${new Date().toISOString().slice(0, 10)}.pdf`
  doc.save(fileName)
}
