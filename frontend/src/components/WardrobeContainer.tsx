import WardrobeCategories from "./WardrobeCategories";
import WardrobeClothes from "./WardrobeClothes";

type WardrobeContainerProps = {
	mode?: "compact" | "full";
};

const WardrobeContainer = ({ mode = "compact" }: WardrobeContainerProps) => {
	return (
		<div
			className={`wardrobe-container wardrobe-container--${mode} `}
		>
			<div className="wardrobe-header">
				{/* Title and Sort option here */}
				<h3>My Wardrobe</h3>
				<select className="sort-wardrobe glass-panel" name="sort" id="sort">
					<option value="default">Sort</option>
					<option value="name-asc">(A-Z)</option>
					<option value="name-dec">(Z-A)</option>
				</select>
			</div>
			<div className="wardrobe-categories">
				{/* clothes categories here */}
				<WardrobeCategories />
			</div>
			<div className="wardrobe-main-content">
				{/* clothes preview */}
				<WardrobeClothes />
			</div>
		</div>
	);
};

export default WardrobeContainer;
