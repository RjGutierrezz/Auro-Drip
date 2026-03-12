// API helper: to centralize backend calls


const BASE_URL = import.meta.env.VITE_API_URL;



export type ClothingItems = {
  id: string;
  name: string;
  category: string;
  color: string;
  createdAt: string;
};


export async function getClothingItems(): Promise<ClothingItems[]> {
	const res = await fetch(`${BASE_URL}/api/clothing`);
	if (!res.ok) {
		throw new Error("Failed to fetch clothing items");
	}
	const json = await res.json();
	return json.data;
}



// POST functionality
export type CreateClothingInput = {
	name: string;
	category: string;
	color: string;
};

export async function createClothingItems(input: CreateClothingInput) {
	const res = await fetch(`${BASE_URL}/api/clothing`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(input),
	});

	if (!res.ok) {
		throw new Error("Failed to fetch clothing items");
	}
	const json = await res.json();
	return json.data;
}
