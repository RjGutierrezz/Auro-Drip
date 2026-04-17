import { supabase } from "../lib/supabase";

// small helper that attaches the current Supabase access token to every backend
// request
export async function authFetch(
	input: RequestInfo | URL,
	init: RequestInit = {},
) {
	const {
		data: { session },
		error,
	} = await supabase.auth.getSession();

	if (error) {
		throw new Error("Failed to read auth session");
	}

	if (!session?.access_token) {
		throw new Error("You must be signed in");
	}

	const headers = new Headers(init.headers);

	headers.set("Authorization", `Bearer ${session.access_token}`);

	return fetch(input, {
		...init,
		headers,
	});
}
