import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./components/pages/Dashboard";
import FavoritePage from "./components/pages/FavoritePage";
import OutfitPage from "./components/pages/OutfitPage";
import WardrobePage from "./components/pages/WardrobePage";
import Sidebar from "./components/Sidebar";
import Grainient from "./Grainient";

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
						grainAmount={0.1}
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
				<main className="app-shell" style={{ position: "relative", zIndex: 1 }}>
					<Sidebar />
					<div className="content">
						<Routes>
							<Route path="/dashboard" element={<DashboardPage />} />
							<Route path="/wardrobe" element={<WardrobePage />} />
							<Route path="/outfit" element={<OutfitPage />} />
							<Route path="/favorite" element={<FavoritePage />} />
						</Routes>
					</div>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;

