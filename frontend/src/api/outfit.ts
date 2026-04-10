import type { ClothingItems } from "./clothing";

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
  const res = await fetch(`${BASE_URL}/api/outfits/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  })
}

