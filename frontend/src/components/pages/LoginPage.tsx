import { useState } from "react";

const LoginPage = () => {
	const [mode, setMode] = useState<"signin" | "signup">("signin");
	const isSignIn = mode === "signin";

	return (
		<div className="login-page" style={{ position: "relative", zIndex: 1 }}>
			<div className="left-login-panel">
				<h1>Aura Drip</h1>

				<div className="login-text-block">
					<span className="login-main-text">Your Wardrobe,</span>
					<h3 className="login-sub-text">curated by us</h3>
				</div>

				<p className="login-text">
					Your personal wardrobe space where you can organize your pieces,
					discover new outfit ideas, and plan what to wear with confidence every
					single day.{" "}
				</p>

				<div className="prompt-tip-chips">
					<span>Outfit generation from your own clothes</span>
					<span>Weather-aware styling suggestions</span>
					<span>Organize by category, color, and vibe</span>
				</div>
			</div>
			<div className="right-login-panel">
				<div
					className={
						mode === "signin" ? "auth-toggle auth-toggle-signin" : "auth-toggle auth-toggle-signup"
					}
				>
					<span className="auth-toggle-thumb" aria-hidden="true" />
					<button
						type="button"
						className={
							mode === "signin" ? "auth-toggle-btn active" : "auth-toggle-btn"
						}
						aria-pressed={mode === "signin"}
						onClick={() => setMode("signin")}
					>
						Sign In
					</button>
					<button
						type="button"
						className={
							mode === "signup" ? "auth-toggle-btn active" : "auth-toggle-btn"
						}
						aria-pressed={mode === "signup"}
						onClick={() => setMode("signup")}
					>
						Create Account
					</button>
				</div>
				<div className="auth-form-header">
					<h3>{isSignIn ? "Welcome back" : "Create your account"}</h3>
					<p>
						{isSignIn
							? "Sign in to access your wardrobe and outfit suggestions."
							: "Start building your digital wardrobe and save your personal style."}
					</p>
				</div>
				<form className="auth-form">
					{!isSignIn ? (
						<>
							<label className="auth-field-label" htmlFor="full-name">
								Full name
							</label>
							<input id="full-name" className="auth-input" type="text" placeholder="Enter your name" />
						</>
					) : null}

					<label className="auth-field-label" htmlFor="email">
						Email
					</label>
					<input id="email" className="auth-input" type="email" placeholder="you@example.com" />

					<label className="auth-field-label" htmlFor="password">
						Password
					</label>
					<input id="password" className="auth-input" type="password" placeholder="Enter your password" />

					{!isSignIn ? (
						<>
							<label className="auth-field-label" htmlFor="confirm-password">
								Confirm password
							</label>
							<input
								id="confirm-password"
								className="auth-input"
								type="password"
								placeholder="Confirm your password"
							/>
						</>
					) : null}

					<button type="submit" className="auth-submit-btn outfit-button glass-panel">
						{isSignIn ? "Sign In" : "Create Account"}
					</button>

					<p className="auth-form-note">
						{isSignIn
							? "Use the email and password connected to your wardrobe."
							: "Your account will keep your wardrobe, favorites, and outfit ideas in one place."}
					</p>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
