import { useEffect, useMemo, useState } from "react";
import { getClothingItems } from "../../api/clothing";
import { useAuth } from "../auth/AuthProvider";

type PendingAction = "signout" | "delete" | null;

const UserPage = () => {
	const { user } = useAuth();
	const [itemCount, setItemCount] = useState(0);
	const [favoriteCount, setFavoriteCount] = useState(0);
	const [loadingCounts, setLoadingCounts] = useState(true);
	const [pendingAction, setPendingAction] = useState<PendingAction>(null);

	useEffect(() => {
		const loadCounts = async () => {
			try {
				const items = await getClothingItems();
				setItemCount(items.length);
				setFavoriteCount(items.filter((item) => item.isFavorite).length);
			} catch (error) {
				console.error("Failed to load profile counts", error);
			} finally {
				setLoadingCounts(false);
			}
		};

		loadCounts();
	}, []);

	const fullName =
		typeof user?.user_metadata?.full_name === "string" &&
		user.user_metadata.full_name.trim().length > 0
			? user.user_metadata.full_name.trim()
			: "John Doe";

	const email = user?.email ?? "johndoe@email.com";

	const { firstName, lastName } = useMemo(() => {
		const [first = "John", ...rest] = fullName.split(" ");
		return {
			firstName: first,
			lastName: rest.join(" ") || "Doe",
		};
	}, [fullName]);

	const initials = useMemo(() => {
		const firstInitial = firstName.charAt(0).toUpperCase();
		const lastInitial = lastName.charAt(0).toUpperCase();
		return `${firstInitial}${lastInitial}`;
	}, [firstName, lastName]);

	const stats = [
		{ label: "ITEMS", value: loadingCounts ? "--" : itemCount },
		{ label: "OUTFITS", value: 0 },
		{ label: "FAVORITES", value: loadingCounts ? "--" : favoriteCount },
	];

	const confirmationCopy =
		pendingAction === "signout"
			? {
				title: "Sign out of Aura Drip?",
				body: "You'll need to sign in again to access your wardrobe, profile, and outfit suggestions.",
				confirmLabel: "Yes, Sign Out",
			}
			: {
				title: "Delete this account?",
				body: "Are you sure you want to delete your account? If you do so, you would need to create a new one and start a new wardrobe when you go back.",
				confirmLabel: "Yes, Delete Account",
			};

	return (
		<>
			<div className="profile-page">
				<div className="profile-page-header">
					<div>
						<p className="profile-page-eyebrow">My Profile</p>
						<h1 className="profile-page-title">Your personal wardrobe hub</h1>
						{/* <p className="profile-page-subtitle"> */}
						{/* </p> */}
					</div>

					<div className="count-container profile-stats-row">
						{stats.map((stat) => (
							<div key={stat.label} className="count-card glass-panel profile-count-card">
								<h3>{stat.value}</h3>
								<p>{stat.label}</p>
							</div>
						))}
					</div>
				</div>

				<div className="profile-grid">
					<section className="glass-panel profile-hero-card">
						<div className="profile-avatar-stack">
							<div className="profile-avatar profile-avatar-large">{initials}</div>
							<button type="button" className="profile-photo-edit-btn">
								Edit photo later
							</button>
						</div>

						<div className="profile-hero-copy">
							<p className="profile-card-label">Profile Overview</p>
							<h2>{fullName}</h2>
							<p className="profile-hero-email">{email}</p>
							{/* <p className="profile-hero-text"> */}
							{/* </p> */}
						</div>
					</section>

					<section className="glass-panel profile-details-card">
						<div className="profile-section-heading">
							<div>
								<p className="profile-card-label">Personal Information</p>
								<h2>Contact and identity</h2>
							</div>
							{/* <p className="profile-section-note"> */}
							{/* </p> */}
						</div>

						<div className="profile-info-grid">
							<div className="profile-info-field">
								<label htmlFor="profile-first-name">First name</label>
								<div className="profile-readonly-input" id="profile-first-name">
									<span>{firstName}</span>
									<button type="button" className="profile-field-action" disabled>
										Edit later
									</button>
								</div>
							</div>

							<div className="profile-info-field">
								<label htmlFor="profile-last-name">Last name</label>
								<div className="profile-readonly-input" id="profile-last-name">
									<span>{lastName}</span>
									<button type="button" className="profile-field-action" disabled>
										Edit later
									</button>
								</div>
							</div>

							<div className="profile-info-field profile-info-field-full">
								<label htmlFor="profile-email">Email address</label>
								<div className="profile-readonly-input" id="profile-email">
									<span>{email}</span>
								</div>
							</div>
						</div>
					</section>

					<section className="glass-panel profile-actions-card">
						<div className="profile-section-heading">
							<div>
								<p className="profile-card-label">Account Actions</p>
								<h2>Access and safety</h2>
							</div>
							{/* <p className="profile-section-note"> */}
							{/* </p> */}
						</div>

						<div className="profile-action-list">
							<div className="profile-action-item">
								<div>
									<h3>Sign out</h3>
									<p>End the current session on this device.</p>
								</div>
								<button
									type="button"
									className="profile-action-btn"
									onClick={() => setPendingAction("signout")}
								>
									Sign Out
								</button>
							</div>

							<div className="profile-action-item profile-action-item-danger">
								<div>
									<h3>Delete account</h3>
									<p>
										Remove access permanently once backend deletion is ready.
									</p>
								</div>
								<button
									type="button"
									className="profile-action-btn profile-action-btn-danger"
									onClick={() => setPendingAction("delete")}
								>
									Delete Account
								</button>
							</div>
						</div>
					</section>
				</div>
			</div>

			{pendingAction ? (
				<div className="profile-confirm-backdrop">
					<button
						type="button"
						className="profile-confirm-overlay"
						onClick={() => setPendingAction(null)}
						aria-label="Close confirmation dialog"
					/>
					<div className="profile-confirm-card">
						<p className="profile-card-label">Please Confirm</p>
						<h2>{confirmationCopy.title}</h2>
						<p>{confirmationCopy.body}</p>
						<div className="profile-confirm-actions">
							<button
								type="button"
								className="profile-confirm-btn profile-confirm-btn-secondary"
								onClick={() => setPendingAction(null)}
							>
								Cancel
							</button>
							<button
								type="button"
								className="profile-confirm-btn profile-confirm-btn-primary"
								onClick={() => setPendingAction(null)}
							>
								{confirmationCopy.confirmLabel}
							</button>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default UserPage;
