import { useState } from "react";
import type { CreateClothingInput } from "../api/clothing";

type Props = {
	onSubmit: (input: CreateClothingInput) => Promise<void>;
};

export default function AddClothingItem({ onSubmit }: Props) {
	const [name, setName] = useState("");
	const [category, setCategory] = useState("Tops");
	const [color, setColor] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			await onSubmit({ name, category, color });
			setName("");
			setCategory("Tops");
			setColor("");
		} finally {
			setSubmitting(false);
		}
	};
	

  // TODO: Needs success notification if the POST went through
  // TODO: Needs an image insertion placeholder
  return (
		<form onSubmit={handleSubmit} className="add-clothing-form glass-panel">
      <h3>Item Name</h3>
			<input
        className="form-content"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Navy Blue Polo"
				required
			/>

      <h3>Category</h3>
			<select className="form-content" placeholder="Navy Blue Polo" value={category} onChange={(e) => setCategory(e.target.value)}>
				<option>Tops</option>
				<option>Bottoms</option>
				<option>Shoes</option>
				<option>Outerwear</option>
			</select>


      <h3>Item Color</h3>
			<input
        className="form-content" 
				value={color}
				onChange={(e) => setColor(e.target.value)}
				placeholder="Blue"
				required
			/>
      <div className="add-item-button-container">
      <button className="add-item-button glass-panel" type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add"}
      </button>
      </div>
		</form>
	);
}
