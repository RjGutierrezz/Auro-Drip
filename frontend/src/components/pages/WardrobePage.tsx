import ContentHeader from "../ContentHeader";
import WardrobeContainer from "../WardrobeContainer";

export default function WaredrobePage() {
	return (
		<>
			<div className="wardrobe-page">
				<ContentHeader />
				<div className="wardrobe-page-body">
					<WardrobeContainer mode="full" />
				</div>
			</div>
		</>
	);
}
