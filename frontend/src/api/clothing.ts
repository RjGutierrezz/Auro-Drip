// API helper: to centralize backend calls


export type ClothingItems = {
  id: string
  name: string
  category: string
  color: string
  createdAt: string
}


const BASE_URL = "http://localhost:4000"

export async function getClothingItems(): Promise<ClothingItems[]> {
  const res = await fetch(`${BASE_URL}/api/clothing`)
  if (!res.ok) {
    throw new Error("Failed to fetch clothing items")
  }
  const json = await res.json()
  return json.data
}
