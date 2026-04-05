import { useState } from "react";
import { itemColorPalette } from "../constants";

type AddClothingItemInput = {
  name: string
  category: string
  color: string
}


type Props = {
	onSubmit: (input: AddClothingItemInput) => Promise<void>;
};

export default function AddClothingItem({ onSubmit }: Props) {
	const [name, setName] = useState("");
	const [category, setCategory] = useState("Tops");
	const [color, setColor] = useState(itemColorPalette[0]);
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			await onSubmit({ name, category, color });
			setName("");
			setCategory("Tops");
			setColor(itemColorPalette[0]);
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
			<select className="form-content" value={category} onChange={(e) => setCategory(e.target.value)}>
				<option>Tops</option>
				<option>Bottoms</option>
				<option>Shoes</option>
				<option>Outerwear</option>
			</select>


      {/* added color pallete for better color visualization */}
      <h3>Item Color</h3>
      <div className="color-palette" role="radiogroup" aria-label="Item color">
        {itemColorPalette.map((swatch) => (
          <button
            key={swatch}
            type="button"
            className={color === swatch ? "color-swatch active" : "color-swatch"}
            style={{ backgroundColor: swatch }}
            onClick={() => setColor(swatch)}
            aria-label={`Select color ${swatch}`}
          />
        ))}
      </div>
      <div className="add-item-button-container">
      <button className="add-item-button glass-panel" type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add"}
      </button>
      </div>
		</form>
	);
}
