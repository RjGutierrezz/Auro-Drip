import ClothingCard from "./ClothingCard"

// dont need this anymore
// import { wardrobeClothesPlaceholder } from "../constants"

import { getClothingItems, deleteClothingItem, type ClothingItems } from "../api/clothing"
import { useEffect, useState } from "react"


type WardrobeClothesProps = {
  activeCategory: string
}


const WardrobeClothes = ({
  activeCategory
}: WardrobeClothesProps) => {
  const [favoritedById, setFavoritedById] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavoritedById((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // starts an empty array
  const [ items, setItems ] = useState<ClothingItems[]>([])

  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState<string | null>(null)

  useEffect(() => {

    // To use async inside useEffect you have to do the ff
    const run = async () => {
      try {
        // check to see if the data is there
        const data = await getClothingItems()
        
        // re-render the array to add the data to the array
        setItems(data)
      } catch (err){
        setError("Could not load the wardrobe items.")
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [])


  // checking error cases
  if (loading) {
    return <p>Loading wardobe...</p>
  } else if (error) {
    return <p>{error}</p>
  } else if (items.length === 0) {
    return <p>There are no clothes yet 😓. Start uploading!</p>
  }

  const filteredItems = activeCategory === "All" 
    ? items : items.filter((item) => item.category === activeCategory)
  
  // delete handler
  const handleDelete = async (id: string) => {
    try {
      await deleteClothingItem(id)

      // leave the id's that we are not trying to delete
      setItems((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      setError("Could not delete the item.")
    }
  }

  return (
    <section className="clothing-grid">
      
      {/* to loop through each (filtered) items and re-render each card */}
      {filteredItems.map((clothes) => (
        <ClothingCard 
          key={clothes.id}
          name={clothes.name}
          category={clothes.category}
          color={clothes.color}
          isFavorited={!!favoritedById[clothes.id]}
          onToggleFavorite={() => toggleFavorite(clothes.id)}
          onDelete={() => handleDelete(clothes.id)}
        />
      ))}
    </section>
  )
}

export default WardrobeClothes
