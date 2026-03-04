import { Router } from "express"

// defines valid input shape for POST to prevent unwanted data from entering
// our backend
import { z } from "zod"

const router = Router()

type ClothingItem = {
  id: string
  name: string
  category: string
  color: string
}

// temporary fake database 
const clothingItems: ClothingItem[] = [
  { id: "1", name: "Cream Tee", category: "Tops", color: "Beige" },
  { id: "2", name: "Wide Trousers", category: "Bottoms", color: "Sand" },
]

const createClothingSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  color: z.string().min(1),
})


// returns current clothing list
router.get("/", (_req, res) => {
  res.json({ ok: true, data: clothingItems})
})

// adds a new item
router.post("/", (req, res) => {
  const parsed = createClothingSchema.safeParse(req.body)
  
  if (!parsed.success) {
    return res.status(400).json({ok: false, error: parsed.error.flatten() })
  }

  const newItem: ClothingItem = {
    id: crypto.randomUUID(), ...parsed.data,
  }

  clothingItems.push(newItem)
  return res.status(201).json({ ok: true, data: newItem})

})

export default router




