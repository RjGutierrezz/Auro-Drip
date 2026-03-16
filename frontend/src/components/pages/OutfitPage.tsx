import { useState } from "react";
import HeartIcon from "../icons/heart-icon";
import OutfitsContainer from "../OutfitsContainer";
import ProfileHeader from "../ProfileHeader";
import ShinyText from "../ShinyText";

const Dashboard = () => {
	const [favorited, setFavorited] = useState(false);

	return (
		<>
			{/* not reall using dashboard-page here */}
			<div className="dashboard-page">
				<ProfileHeader />

				<div className="display-page-body">
					{/* FULL container */}
					<OutfitsContainer mode="full">
						{/* HALF container inside for the outfit image */}

						<div className="outfit-layout">
							<div className="prompt">
								<h1>
									<ShinyText
										text="How can I help you today?"
										speed={3.5}
										delay={1.5}
										color="#2f2e32"
										shineColor="#ffffff"
										spread={120}
										direction="left"
										yoyo={false}
										pauseOnHover={false}
										disabled={false}
									/>
								</h1>

								<input
									className="input-bar"
									type="text"
									placeholder="Ex: Give me a warm formal outfit for today"
								/>

								<button className="outfit-button glass-panel">
									Generate Outfit
								</button>
							</div>
						</div>

						{/* Insert images of the item here */}
						<OutfitsContainer mode="half">
							<div className="outfit-layout-seperator">
								<button
									type="button"
									className="outfit-favorite-btn"
									onClick={(e) => {
										e.stopPropagation();
										setFavorited(!favorited);
									}}
								>
									<HeartIcon size={20} fill={favorited ? "#ff4d6d" : "none"} />
								</button>
								<h2>Tops</h2>
							</div>

							<hr className="section-divider" />
							<div className="outfit-layout-seperator">
								<h2>Bottoms</h2>
							</div>
							<hr className="section-divider" />
							<div className="outfit-layout-seperator">
								<h2>Shoes</h2>
							</div>
						</OutfitsContainer>
					</OutfitsContainer>
				</div>
			</div>
		</>
	);
};

export default Dashboard;

