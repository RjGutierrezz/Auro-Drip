import ContentHeader from "../ContentHeader";
import FavoritesContainer from "../FavoritesContainer";

const Dashboard = () => {
	return (
		<>
			{/* not reall using dashboard-page here */}
			<div className="dashboard-page">
				<ContentHeader />

				<div className="display-page-body">
					<FavoritesContainer mode="full" />
				</div>
			</div>
		</>
	);
};

export default Dashboard;

