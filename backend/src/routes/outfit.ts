import { Prisma } from "@prisma/client";
import { Router } from "express";
import OpenAI from "openai";
import { z } from "zod";
import prisma from "../lib/prisma";

const router = Router();

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

// request schema
// to filter out the data and keeps AI request predictable
const generateOutfitSchema = z.object({
	prompt: z.string().trim().min(1, "Prompt is required").max(500),
});

// AI response schema
// AI output should be machine-readable
// backend should not trust raw model output blindly
const outfitSelectionSchema = z.object({
	topId: z.string().nullable(),
	bottomId: z.string().nullable(),
	shoesId: z.string().nullable(),
	outerwearId: z.string().nullable(),
	reasoning: z.string(),
});

// helper to format wardrobe items
// and strips down to the fields the AI actually needs
const formatWardrobeForModel = (
	items: Array<{
		id: string;
		name: string;
		category: string;
		color: string;
		isFavorite: boolean;
	}>,
) => {
	return items.map((item) => ({
		id: item.id,
		name: item.name,
		category: item.category,
		color: item.color,
		isFavorite: item.isFavorite,
	}));
};

router.post("/generate", async (req, res) => {
	// validation
	const parsed = generateOutfitSchema.safeParse(req.body);

	if (!parsed.success) {
		return res.status(400).json({
			ok: false,
			error: {
				code: "VALIDATION_ERROR",
				message: "Invalid outfit prompt",
				details: parsed.error.flatten(),
			},
		});
	}

	// load the users wardobe from the database
	const items = await prisma.clothingItem.findMany({
		orderBy: { createdAt: "desc" },
	});

	if (items.length === 0) {
		return res.status(400).json({
			ok: false,
			error: {
				code: "EMPTY_WARDROBE",
				message: "Add clothing items before generating an outfit",
			},
		});
	}

	//  this is what we are sending to AI
	const inventory = formatWardrobeForModel(items);
	const userPrompt = parsed.data.prompt;

	try {
		const completion = await openai.chat.completions.create({
			model: "gpt-4.1-mini",
			messages: [
				{
					role: "system",
					content:
						"You are a wardrobe stylist. Only choose from the provided inventory. Return valid JSON only with topId, bottomId, shoesId, outerwearId, and reasoning. Use only item ids from the inventory. If no suitable outerwear exists, use null.",
				},
				{
					role: "user",
					content: `
            User request: ${userPrompt} 
            Wardrobe inventory: ${JSON.stringify(inventory, null, 2)}
          `,
				},
			],
			temperature: 0.7,
		});

		// read the AI text output
		const content = completion.choices[0]?.message?.content;

		if (!content) {
			return res.status(500).json({
				ok: false,
				error: {
					code: "AI_EMPTY_RESPONSE",
					message: "The AI did not return an outfit",
				},
			});
		}

		// now convert the returned text into JSON
		const parsedJson = JSON.parse(content);
		const parsedSelection = outfitSelectionSchema.safeParse(parsedJson);

		if (!parsedSelection.success) {
			return res.status(500).json({
				ok: false,
				error: {
					code: "AI_INVALID_RESPONSE",
					message: "The AI returned an invalid outfit format",
					details: parsedSelection.error.flatten(),
				},
			});
		}

		// mapping the selected ids back to real items
		const selection = parsedSelection.data;

		const top = items.find((item) => item.id === selection.topId) ?? null;
		const bottom = items.find((item) => item.id === selection.bottomId) ?? null;
		const shoes = items.find((item) => item.id === selection.shoesId) ?? null;
		const outerwear =
			items.find((item) => item.id === selection.outerwearId) ?? null;

    // prevent rendering broken outfit results
    if (!top || !bottom || !shoes) {
      return res.status(500).json({
        ok: false,
        error: {
          code: "AI_INVALID_SELECTION",
          message: "The AI selected items that do not exist in the wardrobe",
        },
      })
    }

    return res.json({
      ok: true,
      data: {
        reasoning: selection.reasoning,
        items: {
          top,
          bottom,
          shoes,
          outerwear,
        }
      }
    })
	} catch (error) {
    return res.status(500).json({
      ok: false,
      error: {
        code: "OUTFIT_GENERATION_FAILED",
        message: "Failed to generate outfit",
      }
    })
  }
});


export default router
