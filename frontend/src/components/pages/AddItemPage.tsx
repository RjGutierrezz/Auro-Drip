import AddClothingItem from "../AddClothingItem"
import { createClothingItems, type CreateClothingInput } from "../../api/clothing";
import { useNavigate } from "react-router-dom";
import AddClothingImage from "../AddClothingImage";
import { useState } from "react"

// The goal of this page is to submit an item and then redirect to wardrobe
const AddItemPage = () => {

  const navigate = useNavigate()

  const [imageUrl, setImageUrl] = useState("")

  const handleCreate = async (input: {name: string; category: string; color:
                              string}) => {
    
    if (!imageUrl) {
      alert("Please select an iamge first")
      return
    }

    // sends POST to backend
    await createClothingItems({...input, imageUrl,})
    
    // redirect to wardrobe page
    navigate("/wardrobe")
  }


  return (
    <div className="add-item-page">
      <AddClothingImage onImageSelected={setImageUrl} imageUrl={imageUrl} />
      <AddClothingItem onSubmit={handleCreate} />
    </div>
  )
}

export default AddItemPage
