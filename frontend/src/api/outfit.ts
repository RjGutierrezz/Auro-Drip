import { authFetch } from "./authFetch";
import type { ClothingItems } from "./clothing";

const BASE_URL = import.meta.env.VITE_API_URL;

export type GeneratedOutfit = {
  reasoning: string;
  items: {
    top: ClothingItems | null;
    bottom: ClothingItems | null;
    shoes: ClothingItems | null;
    outerwear: ClothingItems | null;
  }
}

export type GenerateOutfitInput = {
  prompt: string;
}

export async function generateOutfit(input: GenerateOutfitInput): Promise<GeneratedOutfit> {
  const res = await authFetch(`${BASE_URL}/api/outfits/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  })

  if (!res.ok) {
    throw new Error("Failed to generate outfit");
  }

  const json = await res.json();
  return json.data;
}

