import { Router } from "express"

// defines valid input shape for POST to prevent unwanted data from entering
// our backend
import { z } from "zod"
import prisma from "../lib/prisma"


const router = Router()

// ** replaced temporary array with real database

// type ClothingItem = {
//   id: string
//   name: string
//   category: string
//   color: string
// }

// temporary fake database 
// const clothingItems: ClothingItem[] = [
//   { id: "1", name: "Cream Tee", category: "Tops", color: "Beige" },
//   { id: "2", name: "Wide Trousers", category: "Bottoms", color: "Sand" },
// ]

const createClothingSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  color: z.string().min(1),
})


// returns current clothing list
router.get("/", async (_req, res) => {
  const items = await prisma.clothingItem.findMany({
    orderBy: { createdAt: "desc"},
  })
  res.json({ ok: true, data: items })
})

// adds a new item
router.post("/", async (req, res) => {
  const parsed = createClothingSchema.safeParse(req.body)
  
  if (!parsed.success) {
    return res.status(400).json({ok: false, error: parsed.error.flatten() })
  }
  
  const newItem = await prisma.clothingItem.create({ data: parsed.data })
  return res.status(201).json({ ok: true, data: newItem})

})

export default router




