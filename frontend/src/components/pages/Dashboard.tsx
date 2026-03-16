// TODO: weather API functionality

import ContentHeader from "../ContentHeader";
import DripInspiration from "../DripInspiration";
import ShinyText from "../ShinyText";
import SuggestionContent from "../SuggestionContent";
import WardrobeContainer from "../WardrobeContainer";

const Dashboard = () => {
	return (
		<>
			{/* not reall using dashboard-page here */}
			<div className="dashboard-page">
				<ContentHeader />

				<div className="dashboard-greetings">
					{/* add getting / current weather / button to generate git */}
					<div className="greeting">
						{/* TODO: the greeting should change the name of who is signed in */}
						<h1 className="greeting-title">
							<ShinyText
								text="Good day, John"
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
						<p className="greeting-text">
							Let's create the perfect fit for the day!
						</p>
					</div>

					<div className="essential">
						<div className="weather-api">
							<p>Weather API</p>
						</div>
						<button className="outfit-button glass-card">
							Generate Outfit
						</button>
					</div>
				</div>

				<div className="dashboard-main-content">
					{/* add wardrobe quick preview / todays suggestion */}
					<div className="glass-panel">
						<WardrobeContainer />
					</div>

					<div className="suggestion-container glass-panel">
						<h3>Today's suggestion</h3>
						<SuggestionContent />
					</div>
				</div>

				<div className="dashboard-footer">
					{/* pinterest fit inspo / style metric to show how much clothes they have */}
					{/* that are casual, formal, business */}
					<div className="drip-container glass-panel">
						<h3>Drip Inspiration</h3>
						<DripInspiration />
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
