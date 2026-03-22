import HeartIcon from "./icons/heart-icon";
import TrashIcon from "./icons/trash-icon";

type ClothingCardProps = {
	// do we need the id here?
	name: string;
	category: string;
	color: string;
	isFavorited: boolean;
	onToggleFavorite: () => void;
  onDelete: () => void;
};

const ClothingCard = ({
	name,
	category,
	color,
	isFavorited,
	onToggleFavorite,
  onDelete,
}: ClothingCardProps) => {
	return (
		<div>
			<article className="clothing-card">
				<div className="clothing-image-container">
					<button
            className="trash-btn"
            // call the function that will delete the item
            onClick={onDelete}
          >
            <TrashIcon />
          </button>
          <button
						type="button"
						className="favorite-btn"
						onClick={(e) => {
							e.stopPropagation();
							onToggleFavorite();
						}}
					>
						<HeartIcon size={20} fill={isFavorited ? "#ff4d6d" : "none"} />
					</button>
				</div>
				<div className="clothing-body">
					{/* name needs to be here */}
					<h4>{name}</h4>
					{/* <p>{category}</p> */}
					{/* <span>{color}</span> */}
				</div>
			</article>
		</div>
	);
};

export default ClothingCard;
