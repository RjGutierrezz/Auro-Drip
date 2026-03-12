import Dashboard from "../components/icons/layout-dashboard-icon"
import Wardrobe from "../components/icons/library-icon"
import Flame from "../components/icons/flame-icon"
import Favorite from "../components/icons/heart-icon"
import Sparkles from "../components/icons/sparkles-icon"


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
    href: "",
    icon: Sparkles,
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
}

export const inspitationItemsPlaceholder: InspirationItem[] = [
  {id: "1", name:"Neutral Layering", vibe: "minimal"},
  {id: "2", name:"Street Wear", vibe: "minimal"},
  {id: "3", name:"Old Money", vibe: "minimal"},
  {id: "4", name:"Business Core", vibe: "minimal"},
  {id: "5", name:"Classy", vibe: "minimal"},
  // {id: "6", name:"Casual", vibe: "minimal"},
]

