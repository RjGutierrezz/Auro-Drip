import type { NextFunction, Request, Response } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";

const supabaseUrl = process.env.SUPABASE_URL;

if (!supabaseUrl) {
	throw new Error("SUPABASE_URL is missing");
}

const jwks = createRemoteJWKSet(
	new URL(`${supabaseUrl}/auth/v1/.well-known/jwks.json`),
);

export async function requireAuth(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const authHeader = req.header("Authorization");

	if (!authHeader?.startsWith("Bearer")) {
		return res.status(401).json({
			ok: false,
			error: {
				code: "UNAUTHORIZED",
				message: "Missing or invalid authorization header",
			},
		});
	}

	const token = authHeader.slice("Bearer ".length);

	try {
		// verify the JWT signatire and decode claims
		const { payload } = await jwtVerify(token, jwks);

		if (typeof payload.sub !== "string") {
			return res.status(401).json({
				ok: false,
				error: {
					code: "UNAUTHORIZED",
					message: "Invalid token payload",
				},
			});
		}

		req.user = {
			id: payload.sub,
			email: typeof payload.email === "string" ? payload.email : undefined,
		};
		next();
	} catch (error) {
		return res.status(401).json({
			ok: false,
			error: {
				code: "UNAUTHORIZED",
				message: "Invalid or expired token",
			},
		});
	}
}
