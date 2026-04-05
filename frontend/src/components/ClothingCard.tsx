import HeartIcon from "./icons/heart-icon";
import PenIcon from "./icons/pen-icon";
import TrashIcon from "./icons/trash-icon";

type ClothingCardProps = {
	// do we need the id here?
	name: string;
	category: string;
	color: string;
	isFavorite: boolean;
  imageUrl: string;
	onToggleFavorite: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const ClothingCard = ({
	name,
	category,
	color,
	isFavorite,
  imageUrl,
	onToggleFavorite,
  onDelete,
  onEdit,
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
						<HeartIcon size={20} fill={isFavorite ? "#ff4d6d" : "none"} />
					</button>
          <button
            className="edit-btn"
            onClick={onEdit}
          >
            <PenIcon />
          </button>

          <img className="clothing-image" src={imageUrl} alt={name} />
				</div>
				<div className="clothing-body">
					{/* name needs to be here */}
					<h4>{name}</h4>
					{/* <p>{category}</p> */}
					<span className="item-color-preview">
						<span className="item-color-dot" style={{ backgroundColor: color }} />
					</span>
				</div>
			</article>
		</div>
	);
};

export default ClothingCard;
