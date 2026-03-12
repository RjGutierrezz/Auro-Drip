import WardrobeCategories from "./WardrobeCategories";
import WardrobeClothes from "./WardrobeClothes";


type FavoritesContainerProps = {
	mode?: "compact" | "full";
};

const FavoritesContainer = ({ mode = "compact" }: FavoritesContainerProps) => {
	return (
		<div
			className={`favorites-container display-container--${mode} glass-panel`}
		>
			<div className="favorites-header">
				{/* Title and Sort option here */}
				
				{/* Title and Sort option here */}
				<h3>Favorites</h3>
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
				<WardrobeClothes 
 />
			</div>
		</div>
	);
};

export default FavoritesContainer;
