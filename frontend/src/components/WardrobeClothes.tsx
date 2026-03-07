import ClothingCard from "./ClothingCard"

// dont need this anymore
// import { wardrobeClothesPlaceholder } from "../constants"

import { getClothingItems, type ClothingItems } from "../api/clothing"
import { useEffect, useState } from "react"

const WardrobeClothes = () => {

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
        
        console.log("call test")
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

  return (
    <section className="clothing-grid">
      {/* to loop through each items and re-render each card */}
      {items.map((clothes) => (
        <ClothingCard 
          key={clothes.id}
          name={clothes.name}
          category={clothes.category}
          color={clothes.color}
        />
      ))}
    </section>
  )
}

export default WardrobeClothes
