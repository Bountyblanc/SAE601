import { z } from "zod"

export const trainingSchema = z.object({
  niveau: z.enum(["debutant", "intermediaire", "avance"]),
  objectif: z.enum([
    "endurance",
    "smash",
    "regularite",
    "deplacement",
    "defense",
    "double",
  ]),
  duree: z.enum(["30", "60", "90"]),
  intensite: z.enum(["faible", "moyenne", "elevee"]),
  contexte: z.enum(["solo", "avec_partenaire"]).default("avec_partenaire"),
});
