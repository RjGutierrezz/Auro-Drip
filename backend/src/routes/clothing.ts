// added helper for backend validation hardening
import { Prisma } from "@prisma/client";
// TypeSCript complaining about res type so im using this
import type { Response } from "express";
import { Router } from "express";
// defines valid input shape for POST to prevent unwanted data from entering
// our backend
import { z } from "zod";
import prisma from "../lib/prisma";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

// every clothing route requires a signed-in user
router.use(requireAuth);

// ** replaced temporary array with real database

// type ClothingItem = {
//   id: string
//   name: string
//   category: string
//   color: string
// }

// temporary fake database
// const clothingItems: ClothingItem[] = [
//   { id: "1", name: "Cream Tee", category: "Tops", color: "Beige" },
//   { id: "2", name: "Wide Trousers", category: "Bottoms", color: "Sand" },
// ]

// for consistent error response shape, this is what the frontend can expect
type ApiError = {
	code: string;
	message: string;
	details?: unknown;
};

const sendError = (res: Response, status: number, error: ApiError) => {
	return res.status(status).json({ ok: false, error });
};

const categoryEnum = z.enum(["Tops", "Bottoms", "Shoes", "Outerwear"]);
const styleEnum = z.enum([
	"Casual",
	"Formal",
	"Business",
	"Streetwear",
	"Minimal",
]);
const occasionEnum = z.enum(["Work", "Weekend", "Date", "Travel", "Event"]);
const warmthEnum = z.enum(["Light", "Medium", "Heavy"]);

// this is using Zod to prevent bad data entering the database
// it expects JSON objects
//
// UPDATED to require imageUrl
const createClothingSchema = z.object({
	name: z.string().min(1, "Name is required").max(100, "Name is too long"),
	category: categoryEnum,
	color: z.string().min(1, "Color is required").max(30, "Color is too long"),
	style: styleEnum,
	occasion: occasionEnum,
	warmth: warmthEnum,

	// must be a valid string
	// if front end sends an invalid string or URL, request will fail with 400
	imageUrl: z.string().trim().url("Valid image URL is required"),
});

// params schema
const clothingIdParamsSchema = z.object({
	id: z.string().trim().min(1, "Missing id"),
});

// patch schema
// UPDATE: added optional imageUrl
const updateClothingSchema = z
	.object({
		name: z.string().min(1).max(100).optional(),
		category: categoryEnum.optional(),
		color: z.string().min(1).max(30).optional(),

		imageUrl: z.string().trim().url("Valid image URL is required").optional(),

		style: styleEnum.optional(),
		occasion: occasionEnum.optional(),
		warmth: warmthEnum.optional(),

		// allow favorite status toggling from frontend
		isFavorite: z.boolean().optional(),
	})
	// enforce that at least one field is provided
	.refine((val) => Object.keys(val).length > 0, {
		message: "At least one field is required to update",
	});

// returns current clothing list
router.get("/", async (req, res) => {
	const favorited = req.query.favorited === "true";
	const items = await prisma.clothingItem.findMany({
		where: {
			userId: req.user!.id,
			...(req.query.favorited ? { isFavorite: favorited } : {}),
		},
		orderBy: { createdAt: "desc" },
	});
	res.json({ ok: true, data: items });
});

// adds a new item
router.post("/", async (req, res) => {
	const parsed = createClothingSchema.safeParse(req.body);

	if (!parsed.success) {
		// return res.status(400).json({ok: false, error: parsed.error.flatten() })

		// updating error validation
		return sendError(res, 400, {
			code: "VALIDATION_ERRROR",
			message: "Invalid clothing payload",
			details: parsed.error.flatten(),
		});
	}

	const newItem = await prisma.clothingItem.create({
		data: {
			...parsed.data,
			// never trust the frontend to send ownership.
			// the backend assigns the item to the authenticated user.
			userId: req.user!.id,
		},
	});
	return res.status(201).json({ ok: true, data: newItem });
});

// editing the item inside the database
router.patch("/:id", async (req, res) => {
	// gets the id from URL (old and unsafe version)
	// const { id } = req.params

	// new and safe version to get the id from the URL
	const parsedParams = clothingIdParamsSchema.safeParse(req.params);
	if (!parsedParams.success) {
		return sendError(res, 400, {
			code: "VALIDATION_ERRROR",
			message: "Invalid route params",
			details: parsedParams.error.flatten(),
		});
	}

	// validate the input making sure that the data follows the schema
	const parsedBody = updateClothingSchema.safeParse(req.body);

	// error handling and to validate update body
	if (!parsedBody.success) {
		return sendError(res, 400, {
			code: "VALIDATION_ERROR",
			message: "Invalid update payload",
			details: parsedBody.error.flatten(),
		});
	}

	try {
		const existingItem = await prisma.clothingItem.findFirst({
			where: {
				id: parsedParams.data.id,
				userId: req.user!.id,
			},
		});

		if (!existingItem) {
			return sendError(res, 404, {
				code: "NOT_FOUND",
				message: "Clothing item not found",
			});
		}

		// operation that uses prisma where ID finds the item and the data will be
		// the update to the database
		const updated = await prisma.clothingItem.update({
			where: { id: existingItem.id },
			data: parsedBody.data,
		});

		// now we passed the data to our backend
		return res.json({ ok: true, data: updated });
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2025"
		) {
			return sendError(res, 404, {
				code: "NOT_FOUND",
				message: "Clothing item not found",
			});
		}
		return sendError(res, 500, {
			code: "INTERNAL_ERROR",
			message: "Failed to update clothing item",
		});
	}
});

// applying the same patterns from post and patch to delete
router.delete("/:id", async (req, res) => {
	const parsedParams = clothingIdParamsSchema.safeParse(req.params);

	// error handling
	if (!parsedParams.success) {
		return sendError(res, 400, {
			code: "VALIDATION_ERROR",
			message: "Invalid route params",
			details: parsedParams.error.flatten(),
		});
	}

	try {
		const existingItem = await prisma.clothingItem.findFirst({
			where: {
				id: parsedParams.data.id,
				userId: req.user!.id,
			},
		});

		if (!existingItem) {
			return sendError(res, 404, {
				code: "NOT_FOUND",
				message: "Clothing item not found",
			});
		}

		// deletes matching row in database
		await prisma.clothingItem.delete({
			where: { id: existingItem.id },
		});
		return res.json({ ok: true, data: { id: existingItem.id } });
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2025"
		) {
			return sendError(res, 404, {
				code: "NOT_FOUND",
				message: "Clothing item not found",
			});
		}
		return sendError(res, 500, {
			code: "INTERNAL_ERROR",
			message: "Failed to delete clothing item",
		});
	}
});

export default router;
