import { useState } from "react";
import { type GeneratedOutfit, generateOutfit } from "../../api/outfit";
import HeartIcon from "../icons/heart-icon";
import OutfitsContainer from "../OutfitsContainer";
import ProfileHeader from "../ProfileHeader";
import ShinyText from "../ShinyText";

const Dashboard = () => {
	const [favorited, setFavorited] = useState(false);
	const [prompt, setPrompt] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [generatedOutfit, setGeneratedOutfit] =
		useState<GeneratedOutfit | null>(null);

	const handleGenerate = async () => {
		if (!prompt.trim()) {
			setError("Please enter a prompt first.");
			return;
		}

		setIsGenerating(true);
		setError(null);

		try {
			const outfit = await generateOutfit({ prompt });
			setGeneratedOutfit(outfit);
		} catch (error) {
			setError("Couldn't generate an outfit right now.");
		} finally {
			setIsGenerating(false);
		}
	};

	const renderOutfitSlot = (
		title: string,
		item: GeneratedOutfit["items"]["top"],
		emptyLabel: string,
	) => (
		<div className="outfit-layout-seperator">
			<div className="outfit-result-row">
				<div className="outfit-result-image">
					{item ? (
						<img src={item.imageUrl} alt={item.name} />
					) : (
						<div className="skeleton-block outfit-result-image-placeholder" />
					)}
				</div>

				<div className="outfit-result-text">
					<h2>{title}</h2>
					{item ? (
						<>
							<p className="outfit-result-name">{item.name}</p>
							<div className="item-color-preview outfit-result-color-preview">
								<span
									className="item-color-dot"
									style={{ backgroundColor: item.color }}
									aria-hidden="true"
								/>
								<span className="outfit-result-color-label">Color</span>
							</div>
						</>
					) : (
						<>
							<div className="skeleton-line skeleton-line-title" />
							<div className="skeleton-line skeleton-line-meta" />
							<p className="outfit-empty-state">{emptyLabel}</p>
						</>
					)}
				</div>
			</div>
		</div>
	);

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
								<h1 className="profile-page-title">
									<ShinyText
										text="How can I help you today?"
										speed={3.5}
										delay={1.5}
										color="#2f2e32"
										shineColor="#f3d0a4"
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
									value={prompt}
									onChange={(e) => setPrompt(e.target.value)}
								/>

								<button
									type="button"
									className="outfit-button glass-panel"
									onClick={handleGenerate}
									disabled={isGenerating}
								>
									{isGenerating ? "Generatting..." : "Generate Outfit"}
								</button>
								<div className="prompt-tips glass-panel">
									<p className="prompt-tips-title">TIPS FOR BETTER RESULTS</p>
									{/* <p>Try combining occasion, weather, and color.</p> */}
									<div className="prompt-tip-chips">
										<span>Mention the occasion (work, date, brunch)</span>
										<span>Include the weather or season</span>
										<span>Add a color preference if you have one</span>
									</div>
								</div>
								{error ? <p>{error}</p> : null}
							</div>
						</div>

						{/* Insert images of the item here */}
						<OutfitsContainer mode="half">
							<div className="outfit-results-panel">
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
								{renderOutfitSlot(
									"Tops",
									generatedOutfit?.items.top ?? null,
									"No top selected yet",
								)}
								{renderOutfitSlot(
									"Bottoms",
									generatedOutfit?.items.bottom ?? null,
									"No bottom selected yet",
								)}
								{renderOutfitSlot(
									"Shoes",
									generatedOutfit?.items.shoes ?? null,
									"No shoes selected yet",
								)}
								{renderOutfitSlot(
									"Outerwear",
									generatedOutfit?.items.outerwear ?? null,
									"No outerwear selected yet",
								)}

								{generatedOutfit ? (
									<p className="outfit-reasoning">
										{generatedOutfit.reasoning}
									</p>
								) : null}
							</div>
						</OutfitsContainer>
					</OutfitsContainer>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
