import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

const LoginPage = () => {
	const { signIn, signUp } = useAuth();

	const [mode, setMode] = useState<"signin" | "signup">("signin");
	const isSignIn = mode === "signin";

	// shared from fields
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// UI state for submitting flow
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	// when the user switches mode, the fields will be cleared so the form starts
	// clean
	const switchMode = (nextMode: "signin" | "signup") => {
		setMode(nextMode);
		setError(null);
		setMessage(null);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setError(null);
		setMessage(null);

		if (!email.trim() || !password.trim()) {
			setError("Email and password are required");
			return;
		}

		if (!isSignIn) {
			if (!fullName.trim()) {
				setError("Full name is required");
				return;
			}

			if (password.length < 6) {
				setError("Password should be at least 6 characters.");
				return;
			}

			if (password !== confirmPassword) {
				setError("Password do not match.");
				return;
			}
		}

		try {
			setIsSubmitting(true);

			if (isSignIn) {
				// existing user flow
				await signIn(email, password);
			} else {
				// new user flow
				await signUp({
					email,
					password,
					fullName,
				});

				// add a email confirmation here if you wanted to add this feature
        setMessage("Account created. Please check your email to confirm your account before signing in.", );
			
        // immediately
        setMode("signin")

        // making sure that the sensitives fields are clear
        setPassword("")
        setConfirmPassword("");
        setFullName("")
      }
		} catch (error) {
			if (error instanceof Error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          setError(error.message);
        } else {
          setError(error.message)
        }
			} else {
				setError("Something went wrong. Please try again.");
			}
		} finally {
			setIsSubmitting(false);
		}
	};

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
						isSignIn
							? "auth-toggle auth-toggle-signin"
							: "auth-toggle auth-toggle-signup"
					}
				>
					<span className="auth-toggle-thumb" aria-hidden="true" />
					<button
						type="button"
						className={isSignIn ? "auth-toggle-btn active" : "auth-toggle-btn"}
						aria-pressed={isSignIn}
						onClick={() => switchMode("signin")}
					>
						Sign In
					</button>
					<button
						type="button"
						className={!isSignIn ? "auth-toggle-btn active" : "auth-toggle-btn"}
						aria-pressed={isSignIn}
						onClick={() => switchMode("signup")}
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
				<form className="auth-form" onSubmit={handleSubmit}>
					{!isSignIn ? (
						<>
							<label className="auth-field-label" htmlFor="full-name">
								Full name
							</label>
							<input
								id="full-name"
								className="auth-input"
								type="text"
								placeholder="Enter your name"
								value={fullName}
								onChange={(event) => setFullName(event.target.value)}
							/>
						</>
					) : null}

					<label className="auth-field-label" htmlFor="email">
						Email
					</label>
					<input
						id="email"
						className="auth-input"
						type="email"
						placeholder="you@example.com"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>

					<label className="auth-field-label" htmlFor="password">
						Password
					</label>
					<input
						id="password"
						className="auth-input"
						type="password"
						placeholder="Enter your password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>

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
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
							/>
						</>
					) : null}

					{/* show error message if something went wrong */}
					{error ? <p className="auth-error">{error}</p> : null}

					{/* show success message */}
					{message ? <p className="auth-success">{message}</p> : null}

					<button
						type="submit"
						className="auth-submit-btn outfit-button glass-panel"
						disabled={isSubmitting}
					>
						{/* to make sure that the user dont press submit again while its */}
						{/*   processing */}
						{isSubmitting
							? isSignIn
								? "Signing In..."
								: "Creating account..."
							: isSignIn
								? "Sign In"
								: "Create Account"}
					</button>

					<p className="auth-form-note">
						{isSignIn
							? "Use the email and password connected to your wardrobe."
							: "We'll send a confirmation link to your email before your account can be used."}
					</p>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
