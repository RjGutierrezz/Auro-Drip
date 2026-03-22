// API helper: to centralize backend calls


const BASE_URL = import.meta.env.VITE_API_URL;



export type ClothingItems = {
  id: string;
  name: string;
  category: string;
  color: string;
  createdAt: string;
};


// Sends GET request to our backend for the items
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


// Sends a POST request to our backend for one item
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

// Sends DELETE request to our backend for one item
export async function deleteClothingItem(id: string) {

  const res = await fetch(`${BASE_URL}/api/clothing/${id}`, {
    method: "DELETE",
  }) 

  if (!res.ok) {
    throw new Error("Failed to delete clothing item")
  }

  return res.json()
}





