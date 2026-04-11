import { Router } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";

const router = Router();

// request schema
// to filter out the data and keeps AI request predictable
const generateOutfitSchema = z.object({
	prompt: z.string().trim().min(1, "Prompt is required").max(500),
});



// this takes the user prompt text and detect useful styling preferences
const extractPromptPreferences = (prompt: string) => {
	const normalized = prompt.toLowerCase();

	const colorKeywords = [
		"black",
		"white",
		"brown",
		"blue",
		"navy",
		"gray",
		"grey",
		"beige",
		"red",
		"green",
		"yellow",
	];

	const preferredColors = colorKeywords.filter((color) =>
		normalized.includes(color),
	);

	return {
		wantsFormal: normalized.includes("formal"),
		wantsCasual: normalized.includes("casual"),
		wantsBusiness: normalized.includes("business"),
		wantsStreetwear: normalized.includes("streetwear"),
		wantsWarm: normalized.includes("warm"),
		wantsCold: normalized.includes("cold"),
		wantsRain: normalized.includes("rain") || normalized.includes("rainy"),
		preferFavorites: normalized.includes("favorite") || normalized.includes("favorites"),
		preferredColors,
	};
};

// this helper job is to make the recommendation smarter and it does it by
// looking at one clothing item then looks at the users extracted preferences
// and then return a number, the higher the number the better the match
const scoreItem = (
	item: {
		name: string;
		category: string;
		color: string;
		isFavorite: boolean;
	},
	preferences: {
		wantsFormal: boolean;
		wantsCasual: boolean;
		wantsBusiness: boolean;
		wantsStreetwear: boolean;
		wantsWarm: boolean;
		wantsCold: boolean;
		wantsRain: boolean;
		preferredColors: string[];
    preferFavorites: boolean;
	},
) => {
	let score = 0;
	const itemName = item.name.toLowerCase();
	const itemColor = item.color.toLowerCase();

	if (item.isFavorite) {
		score += 1;
	}
	if (item.isFavorite && preferences.preferFavorites) {
		score += 3;
	}
	if (preferences.preferredColors.includes(itemColor)) {
		score += 2;
	}

	if (preferences.wantsFormal) {
		if (
			itemName.includes("blazers") ||
			itemName.includes("trousers") ||
			itemName.includes("loafer") ||
			itemName.includes("dress shirt") ||
			itemName.includes("coat")
		) {
      score += 3
		}
	}

	if (preferences.wantsCasual) {
		if (
			itemName.includes("tee") ||
			itemName.includes("t-shirt") ||
			itemName.includes("tshirt") ||
			itemName.includes("jeans") ||
			itemName.includes("sneaker") ||
			itemName.includes("hoodie")
		) {
      score += 3
		}
	}

	if (preferences.wantsBusiness) {
		if (
			itemName.includes("shirt") ||
			itemName.includes("button-up") ||
			itemName.includes("trousers") ||
			itemName.includes("loafer") ||
			itemName.includes("blazers")
		) {
      score += 3
		}
	}

	if (preferences.wantsStreetwear) {
		if (
			itemName.includes("cargo") ||
			itemName.includes("hoodie") ||
			itemName.includes("oversized") ||
			itemName.includes("sneaker") ||
			itemName.includes("jogger")
		) {
      score += 3
		}
	}

	if (preferences.wantsWarm || preferences.wantsCold) {
		if (
			itemName.includes("coat") ||
			itemName.includes("jacket") ||
			itemName.includes("wool") ||
			itemName.includes("boots") ||
			itemName.includes("sweater")
		) {
      score += 2
		}
	}

	if (preferences.wantsRain) {
		if (
			itemName.includes("jacket") ||
			itemName.includes("coat") ||
			itemName.includes("boots")
		) {
      score += 2
		}
	}

	return score;
};


// helper to pick the best item from a category
const pickBestItem = (items, preferences) => {
  if (items.length === 0) {
    return null 
  }

  let bestItem = items[0]
  let bestScore = scoreItem(items[0], preferences)

  for (const item of items.slice(1)) {
    const currentScore = scoreItem(item, preferences)

    if (currentScore > bestScore) {
      bestItem = item
      bestScore = currentScore
    }
  }

  return bestItem
}



// helped to return a short explanation why the item was picked and verify
// that it exist
const buildReasoning = (preferences) => {

  const reasons: string[] = []

  if (preferences.wantsFormal) {
    reasons.push("Build a more polished outfit to match your formal request.");
  }

  if (preferences.wantsCasual) {
    reasons.push("Picked more relaxed pieces for a casual look.")
  }

  if (preferences.preferFavorites) {
    reasons.push("Prioritized favorited items where they matched well.")
  }

  if (preferences.wantsRain || preferences.wantsCold || preferences.wantsWarm) {
    reasons.push("Included pieces that better fit the weather-related request.")
  }

  if (reasons.length === 0) {
    return "Picked a balanced outfit from your wardrobe based on your prompt"
  }

  // to merge all the reasons depending on what the user wanted to wear
  return reasons.join(" ")

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

	// load the users wardrobe from the database
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

	// this is what we are sending to AI
	// const inventory = formatWardrobeForModel(items);
	const userPrompt = parsed.data.prompt;
  const preferences = extractPromptPreferences(userPrompt)

  // now take all wardrobe items from Prisma and separate them into category
  // arrays
  const tops = items.filter((item) => item.category === "Tops")
  const bottoms = items.filter((item) => item.category === "Bottoms")
  const shoes = items.filter((item) => item.category === "Shoes")
  const outerwearItems = items.filter((item) => item.category === "Outerwear")

  // outerwear should not always be selected and only be required for certain
  // weather
  const shouldIncludeOuterwear = preferences.wantsCold || preferences.wantsWarm
    || preferences.wantsRain

  // pick the best item for each required category
  const top = pickBestItem(tops, preferences)
  const bottom = pickBestItem(bottoms, preferences)
  const shoesItem = pickBestItem(shoes, preferences)
  const outerwear = shouldIncludeOuterwear ? pickBestItem(outerwearItems,
                                                          preferences) : null



  if (!top || !bottom || !shoesItem) {
    return res.status(400).json({
      ok: false,
      error: {
        code: "INCOMPLETE_WARDROBE",
        message: "You need at least one top, bottom, and pair of shoes in order to generate an outfit."
      }
    })
  }

  const reasoning = buildReasoning(preferences, {
    top,
    bottom,
    shoes: shoesItem,
    outerwear
  })

  return res.json({
    ok: true,
    data: {
      reasoning,
      items:{
        top,
        bottom,
        shoes: shoesItem,
        outerwear,
      } 
    }
  })

	// try {
	// 	const completion = await openai.chat.completions.create({
	// 		model: "gpt-4.1-mini",
	// 		messages: [
	// 			{
	// 				role: "system",
	// 				content:
	// 					"You are a wardrobe stylist. Only choose from the provided inventory. Return valid JSON only with topId, bottomId, shoesId, outerwearId, and reasoning. Use only item ids from the inventory. If no suitable outerwear exists, use null.",
	// 			},
	// 			{
	// 				role: "user",
	// 				content: `
	//            User request: ${userPrompt}
	//            Wardrobe inventory: ${JSON.stringify(inventory, null, 2)}
	//          `,
	// 			},
	// 		],
	// 		temperature: 0.7,
	// 	});
	//
	// 	// read the AI text output
	// 	const content = completion.choices[0]?.message?.content;
	//
	// 	if (!content) {
	// 		return res.status(500).json({
	// 			ok: false,
	// 			error: {
	// 				code: "AI_EMPTY_RESPONSE",
	// 				message: "The AI did not return an outfit",
	// 			},
	// 		});
	// 	}
	//
	// 	// now convert the returned text into JSON
	// 	const parsedJson = JSON.parse(content);
	// 	const parsedSelection = outfitSelectionSchema.safeParse(parsedJson);
	//
	// 	if (!parsedSelection.success) {
	// 		return res.status(500).json({
	// 			ok: false,
	// 			error: {
	// 				code: "AI_INVALID_RESPONSE",
	// 				message: "The AI returned an invalid outfit format",
	// 				details: parsedSelection.error.flatten(),
	// 			},
	// 		});
	// 	}
	//
	// 	// mapping the selected ids back to real items
	// 	const selection = parsedSelection.data;
	//
	// 	const top = items.find((item) => item.id === selection.topId) ?? null;
	// 	const bottom = items.find((item) => item.id === selection.bottomId) ?? null;
	// 	const shoes = items.find((item) => item.id === selection.shoesId) ?? null;
	// 	const outerwear =
	// 		items.find((item) => item.id === selection.outerwearId) ?? null;
	//
	//    // prevent rendering broken outfit results
	//    if (!top || !bottom || !shoes) {
	//      return res.status(500).json({
	//        ok: false,
	//        error: {
	//          code: "AI_INVALID_SELECTION",
	//          message: "The AI selected items that do not exist in the wardrobe",
	//        },
	//      })
	//    }
	//
	//    return res.json({
	//      ok: true,
	//      data: {
	//        reasoning: selection.reasoning,
	//        items: {
	//          top,
	//          bottom,
	//          shoes,
	//          outerwear,
	//        }
	//      }
	//    })
	// } catch (error) {
	//    return res.status(500).json({
	//      ok: false,
	//      error: {
	//        code: "OUTFIT_GENERATION_FAILED",
	//        message: "Failed to generate outfit",
	//      }
	//    })
	//  }
});

export default router;
