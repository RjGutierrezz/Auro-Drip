import WardrobeCategories from "./WardrobeCategories";
import WardrobeClothes from "./WardrobeClothes";
import type { AnimatedIconHandle } from "../components/icons/types";
import { useRef, useState } from "react";
import MagnifierIcon from "../components/icons/magnifier-icon";

type FavoritesContainerProps = {
	mode?: "compact" | "full";
};

const FavoritesContainer = ({ mode = "compact" }: FavoritesContainerProps) => {
	const [activeCategory, setActiveCategory] = useState("All")

	//  search typed by the user
	const [searchTerm, setSearchTerm] = useState("");

	// sort direction, either a-z or z-a
	const [sortOrder, setSortOrder] = useState<"name-asc" | "name-dec">(
		"name-asc",
	);

	const searchIconRef = useRef<AnimatedIconHandle | null>(null);
  return (
		<div
			className={`favorites-container display-container--${mode} `}
			onMouseEnter={() => searchIconRef.current?.startAnimation()}
			onMouseLeave={() => searchIconRef.current?.stopAnimation()}
		>
			<div className="favorites-header">
				{/* Title and Sort option here */}
				<h3>Favorites</h3>
				<select className="sort-wardrobe glass-panel" name="sort" id="sort">
					<option value="default">Sort</option>
					<option value="name-asc">(A-Z)</option>
					<option value="name-dec">(Z-A)</option>
				</select>
			</div>

      {/* search by item name */}
			<div className="search-container">
				<MagnifierIcon ref={searchIconRef} size={14} className="search-icon" />
				<input
					className="search"
					type="text"
					placeholder="Search your wardrobe.."
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			<div className="wardrobe-categories">
				{/* clothes categories here */}
				<WardrobeCategories 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory}
        />
			</div>
			<div className="wardrobe-main-content">
				{/* clothes preview */}
				<WardrobeClothes 
          activeCategory={activeCategory}
					searchTerm={searchTerm}
					sortOrder={sortOrder}
          favoritesOnly
        />
			</div>
		</div>
	);
};

export default FavoritesContainer;
