import AddClothingItem from "../AddClothingItem"
import { createClothingItems, getClothingItems, type ClothingItem, type CreateClothingInput } from "../../api/clothing";
import { useNavigate } from "react-router-dom";
import AddClothingImage from "../AddClothingImage";


// The goal of this page is to submit an item and then redirect to wardrobe
const AddItemPage = () => {

  const navigate = useNavigate()

  const handleCreate = async (input: CreateClothingInput) => {
    
    // sends POST to backend
    await createClothingItems(input)
    
    // redirect to wardrobe page
    navigate("/wardrobe")
  }


  return (
    <div className="add-item-page">
      <AddClothingImage />
      <AddClothingItem onSubmit={handleCreate} />
    </div>
  )
}

export default AddItemPage
