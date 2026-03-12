import AddClothingItem from "../AddClothingItem";
import { createClothingItems, getClothingItems, type ClothingItem } from "../../api/clothing";
import ContentHeader from "../ContentHeader";
import WardrobeContainer from "../WardrobeContainer";
import { useEffect, useState } from "react"



export default function WaredrobePage() {
  const [ items, setItems] = useState<ClothingItem[]>(
    []
  )

  useEffect(() => {
    getClothingItems().then(setItems)
  }, [])

	const handleCreate = async (input: {
		name: string;
		category: string;
		color: string;
	}) => {
		const created = await createClothingItems(input);
		setItems((prev) => [created, ...prev]);
	};

	return (
		<>
			<div className="wardrobe-page">
				<ContentHeader />
				<div className="wardrobe-page-body">
					<WardrobeContainer mode="full" items={items} />
				</div>
        <AddClothingItem onSubmit={handleCreate} />

			</div>
		</>
	);
}
