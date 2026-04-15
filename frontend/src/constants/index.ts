import Dashboard from "../components/icons/layout-dashboard-icon"
import Wardrobe from "../components/icons/library-icon"
import Flame from "../components/icons/flame-icon"
import Favorite from "../components/icons/heart-icon"
import Sparkles from "../components/icons/sparkles-icon"
import User from "../components/icons/user-icon"

import type { ComponentType } from "react";

export type SidebarLinkType = {
  name: string
  href: string
  icon: ComponentType<{ size?: number; className?: string}>
}



export const sidebarLinks: SidebarLinkType[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Dashboard,
  },
  {
    name: "Wardrobe",
    href: "/wardrobe",
    icon: Wardrobe,
  },
  {
    name: "Outfit",
    href: "/outfit",
    icon: Flame,
  },
  {
    name: "Favorite",
    href: "/favorite",
    icon: Favorite,
  },
  {
    name: "Add Item",
    href: "/addItem",
    icon: Sparkles,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },

]

export type Category = {
  id: string
  name: string
}

export const wardrobeCategories: Category[] = [
  {id: "All", name : "All"},
  {id: "Tops", name : "Tops"},
  {id: "Bottoms", name : "Bottoms"},
  {id: "Shoes", name : "Shoes"},
  {id: "Outerwear", name : "Outerwear"},
]

export const itemColorPalette: string[] = [
  "#1f1f1f",
  "#ffffff",
  "#f3f1ec",
  "#e8e2d9",
  "#d1b79f",
  "#b89b84",
  "#8f5f4a",
  "#6f4b3e",
  "#4a2f2a",
  "#6f7d8c",
  "#3f4d5d",
  "#233247",
  "#9bb0c7",
  "#8c9b77",
  "#6d7f5d",
  "#455c3f",
  "#c47a6d",
  "#ad5d50",
  "#8f3f3a",
  "#7e5f82",
  "#5f4668",
  "#b9a2c9",
  "#d6c5af",
  "#b58d64",
  "#8b6a49",
  "#a7a9ac",
  "#7a7c80",
]

export const favoriteCategories: Category[] = [
  {id: "All", name : "All"},
  {id: "Tops", name : "Tops"},
  {id: "Bottoms", name : "Bottoms"},
  {id: "Shoes", name : "Shoes"},
  {id: "Outerwear", name : "Outerwear"},
  {id: "Casual", name : "Casual"},
  {id: "Business", name : "Business"},
  {id: "Formal", name : "Formal"},
  {id: "Casual", name : "Casual"},
]


export type ClothingItems = {
  id: string
  name: string
  category: string
  color: string
}

export const wardrobeClothesPlaceholder: ClothingItems[] = [
  {id: "1", name: "Cream Tee", category: "Tops", color: "Beige"},
  {id: "2", name: "Wide Trousers", category: "Bottoms", color: "Sand"},
  {id: "3", name: "Leather Boots", category: "Shoes", color: "Brown"},
  {id: "4", name: "Wool Coat", category: "Outerwear", color: "Camel"},

  {id: "1", name: "Cream Tee", category: "Tops", color: "Beige"},
  {id: "2", name: "Wide Trousers", category: "Bottoms", color: "Sand"},
  {id: "3", name: "Leather Boots", category: "Shoes", color: "Brown"},
  {id: "4", name: "Wool Coat", category: "Outerwear", color: "Camel"},

  {id: "1", name: "Cream Tee", category: "Tops", color: "Beige"},
  {id: "2", name: "Wide Trousers", category: "Bottoms", color: "Sand"},
  {id: "3", name: "Leather Boots", category: "Shoes", color: "Brown"},
  {id: "4", name: "Wool Coat", category: "Outerwear", color: "Camel"},

  {id: "1", name: "Cream Tee", category: "Tops", color: "Beige"},
  {id: "2", name: "Wide Trousers", category: "Bottoms", color: "Sand"},
  {id: "3", name: "Leather Boots", category: "Shoes", color: "Brown"},
  {id: "4", name: "Wool Coat", category: "Outerwear", color: "Camel"},

]

export type FavoriteOutfit = {
  id: string
  category: string
}

const baseItems = [
  { category: "Casual" },
  { category: "Business" },
  { category: "Formal" },

];


export const favoriteClothesPlaceholder: FavoriteOutfit[] = Array.from(
  { length: 16 },
  (_, i) => {
    const item = baseItems[i % baseItems.length];

    return {
      id: String(i + 1), 
      ...item,
    };
  }
);



// TODO: not sure if I want to add images for the placeholder for now
export type InspirationItem = {
  id: string
  name: string
  vibe: string
  imageUrl: string
}

export const inspitationItemsPlaceholder: InspirationItem[] = [
  {id: "1", name:"Neutral Layering", vibe: "minimal", imageUrl:
    "/images/simple.jpg"},
  {id: "2", name:"Street Wear", vibe: "minimal", imageUrl:
    "/images/streetwear.jpg"},
  {id: "3", name:"Old Money", vibe: "minimal", imageUrl: "/images/old.jpg"},
  {id: "4", name:"Business Core", vibe: "minimal", imageUrl:
    "/images/streetwea.jpg"},
  {id: "5", name:"Classy", vibe: "minimal", imageUrl: "/images/polo.jpg"},
  // {id: "6", name:"Casual", vibe: "minimal"},
]
