import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from "react-router-dom";
import { useAuth } from "./components/auth/AuthProvider";
import AddItemPage from "./components/pages/AddItemPage";
import DashboardPage from "./components/pages/Dashboard";
import FavoritePage from "./components/pages/FavoritePage";
import LoginPage from "./components/pages/LoginPage";
import OutfitPage from "./components/pages/OutfitPage";
import UserPage from "./components/pages/UserPage";
import WardrobePage from "./components/pages/WardrobePage";
import Sidebar from "./components/Sidebar";
import Grainient from "./Grainient";

// if no user exists, it redirects to /login
// if user exist, it renders the app shell with the sidebar
function ProtectedLayout() {
	const { user, loading } = useAuth();

	if (loading) {
		return <div>Loading your session...</div>;
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return (
		<main className="app-shell" style={{ position: "relative", zIndex: 1 }}>
			<Sidebar />
			<div className="content">
				<Outlet />
			</div>
		</main>
	);
}

function PublicOnlyRoute() {
	const { user, loading } = useAuth();

	if (loading) {
		return <div>Loading your session ...</div>;
	}

	if (user) {
		return <Navigate to="/dashboard" replace />;
	}

	return <LoginPage />;
}

function App() {
	return (
		<BrowserRouter>
			<div style={{ minHeight: "100vh", position: "relative" }}>
				<div
					style={{
						position: "fixed",
						inset: 0,
						zIndex: 0,
						pointerEvents: "none",
					}}
				>
					<Grainient
						color1="#ac6f82"
						color2="#cfa093"
						color3="#f3d0a4"
						timeSpeed={0.25}
						colorBalance={0}
						warpStrength={1}
						warpFrequency={5}
						warpSpeed={2}
						warpAmplitude={50}
						blendAngle={0}
						blendSoftness={0.05}
						rotationAmount={500}
						noiseScale={2}
						grainAmount={0}
						grainScale={2}
						grainAnimated={false}
						contrast={1.5}
						gamma={1}
						saturation={1}
						centerX={0}
						centerY={0}
						zoom={0.9}
					/>
				</div>
				<Routes>
					{/* routes the user directly to the dashboard */}
					{/* public auth route */}
					<Route path="/login" element={<PublicOnlyRoute />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

					<Route element={<ProtectedLayout />}>

						{/* protected app routes */}
						<Route path="/dashboard" element={<DashboardPage />} />
						<Route path="/wardrobe" element={<WardrobePage />} />
						<Route path="/outfit" element={<OutfitPage />} />
						<Route path="/favorite" element={<FavoritePage />} />
						<Route path="/addItem" element={<AddItemPage />} />
						<Route path="/profile" element={<UserPage />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
