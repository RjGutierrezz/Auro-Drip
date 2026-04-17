// this component is your feature shell for your wardrobe controls

import { useRef, useState } from "react";
import MagnifierIcon from "../components/icons/magnifier-icon";

import type { AnimatedIconHandle } from "../components/icons/types";
import WardrobeCategories from "./WardrobeCategories";
import WardrobeClothes from "./WardrobeClothes";

type WardrobeContainerProps = {
	mode?: "compact" | "full";
};

const WardrobeContainer = ({ mode = "compact" }: WardrobeContainerProps) => {
	// current selected category "All"
	const [activeCategory, setActiveCategory] = useState("All");

	//  search typed by the user
	const [searchTerm, setSearchTerm] = useState("");

	// sort direction, either a-z or z-a
	const [sortOrder, setSortOrder] = useState<"name-asc" | "name-dec">(
		"name-asc",
	);

	const searchIconRef = useRef<AnimatedIconHandle | null>(null);

	return (
		<div
			className={`wardrobe-container wardrobe-container--${mode} `}
			onMouseEnter={() => searchIconRef.current?.startAnimation()}
			onMouseLeave={() => searchIconRef.current?.stopAnimation()}
		>
			<div className="wardrobe-header">
				{/* Title and Sort option here */}
				<h3 className="header-page-title">My Wardrobe</h3>

				{/* bound sort state */}
				<select
					className="sort-wardrobe glass-panel"
					value={sortOrder}
					onChange={(e) =>
						setSortOrder(e.target.value as "name-asc" | "name-dec")
					}
				>
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
				{/* connects click event to parent state */}
				<WardrobeCategories
					activeCategory={activeCategory}
					onSelectCategory={setActiveCategory}
				/>
			</div>
			<div className="wardrobe-main-content">
				{/* passing activeCategory into WardrobeClothes so the clothes component */}
				{/*     know the current filter */}
				<WardrobeClothes
					activeCategory={activeCategory}
					searchTerm={searchTerm}
					sortOrder={sortOrder}
				/>
			</div>
		</div>
	);
};

export default WardrobeContainer;
