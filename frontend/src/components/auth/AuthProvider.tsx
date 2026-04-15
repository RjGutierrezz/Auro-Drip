import type { Session, User } from "@supabase/supabase-js";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { supabase } from "../../lib/supabase";

type AuthContextValue = {
	user: User | null;
	session: Session | null;
	loading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
};

// start with undefined so we can detect when someone tries to use the hook
// outside the provider
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
	children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);

	// true while we are checking if a session already exists
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		// on first app load, ask Supabase if a session already exists
		const loadSession = async () => {
			const { data, error } = await supabase.auth.getSession();

			if (error) {
				console.error("Failed to load session", error);
			}

			// guard againts setting state if the component unmounts first
			if (!isMounted) return;

			const currentSession = data.session ?? null;
			setSession(currentSession);
			setUser(currentSession?.user ?? null);
			setLoading(false);
		};
		loadSession();

		// this listener fires whenever auth changes: sign in, sign out, token
		// refresh, etc...
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, nextSession) => {
			if (!isMounted) return;

			setSession(nextSession);
			setUser(nextSession?.user ?? null);
			setLoading(false);
		});

		// cleanup when the provider unmounts
		return () => {
			isMounted = false;
			subscription.unsubscribe();
		};
	}, []);

	// simple wrapper for Supabase sign in
	const signIn = async (email: string, password: string) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			throw new Error(error.message);
		}
	};

	// simple wrapper for Supabase sign up
	const signUp = async (email: string, password: string) => {
		const { error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			throw new Error(error.message);
		}
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			throw new Error(error.message);
		}
	};

	const value = useMemo(
		() => ({
			user,
			session,
			loading,
			signIn,
			signUp,
			signOut,
		}),
		[user, session, loading],
	);

	return (
		<AuthContext.Provider value={value}> {children} </AuthContext.Provider>
	);
};

// custom hook so the rest of the app can do {user} = useAuth()
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context
}

export default AuthProvider;
