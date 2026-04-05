// Frontend API helper: to centralize backend calls


const BASE_URL = import.meta.env.VITE_API_URL;



export type ClothingItems = {
  id: string;
  name: string;
  category: string;
  color: string;
  imageUrl: string;
  createdAt: string;
};

export type UpdateClothingInput = {
  name?: string
  category?: string
  color?: string
  imageUrl?: string
}


// Sends GET request to our backend for the items
export async function getClothingItems(): Promise<ClothingItems[]> {
	const res = await fetch(`${BASE_URL}/api/clothing`);
	if (!res.ok) {
		throw new Error("Failed to fetch clothing items");
	}
	const json = await res.json();
	return json.data;
}



// POST functionality (required to be filled)
export type CreateClothingInput = {
	name: string;
	category: string;
	color: string;
  imageUrl: string; 
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

// Sends a PATCH request to our backend to update the item info
// waits for a response and returns the updated item
export async function updateClothingItem( id: string, input: UpdateClothingInput ) {
  const res = await fetch(`${BASE_URL}/api/clothing/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },

    // this part sends your updated data
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    throw new Error ("Failed to update clothing item")
  }
  
  // this part waits for the request to reach the backend
  // then for the backend to process it and make a response
  const json = await res.json()
  return json.data
}



