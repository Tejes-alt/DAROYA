import type { Category } from "@/lib/data/types";

/**
 * Visual signature per spacecraft category.
 * Deliberately restrained — clarity over decoration (spec §5, §21).
 */
export const CATEGORY_COLOR: Record<Category, string> = {
  Communication: "#eef1f6", // soft white
  "Earth Observation": "#5b9bd5", // cool blue
  Navigation: "#9fd8b0", // pale green
  Science: "#e6a052", // warm amber
  Lunar: "#ffcf7a", // brighter accent
  Planetary: "#ffb877", // brighter accent
  Solar: "#ffd98f", // brighter accent
  Technology: "#b39ddb", // restrained violet
  Foundations: "#c9cdd6", // neutral — pre-satellite era markers
  "Human Spaceflight": "#e58ea0", // distinct, still muted
};

export function categoryColor(category: Category): string {
  return CATEGORY_COLOR[category] ?? "#dfe7ff";
}

/** Marker radius by category — lunar/planetary/solar read as slightly more significant. */
export function categoryMarkerSize(category: Category): number {
  switch (category) {
    case "Lunar":
    case "Planetary":
    case "Solar":
    case "Human Spaceflight":
      return 0.055;
    default:
      return 0.032;
  }
}
