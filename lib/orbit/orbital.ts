import type { Spacecraft, Category } from "@/lib/data/types";

/**
 * DAROYA does not integrate live orbital telemetry (spec §31).
 * These helpers produce a stable, deterministic, representative
 * spatial layout for archive objects — same input always yields
 * the same position, so selection/highlighting stays consistent
 * across renders and reloads.
 */

// Fixed reference points for the solar-system layer, in scene units.
export const SUN_POSITION: [number, number, number] = [-9.5, 0, -6];
export const EARTH_POSITION: [number, number, number] = [4.2, 0, 0];
export const MOON_OFFSET: [number, number, number] = [4.5, 0.9, -0.6]; // relative to Earth
export const MARS_POSITION: [number, number, number] = [12.4, 0.4, 3.2];

/** Simple deterministic string hash to [0,1). */
function seededUnit(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100000) / 100000;
}

/**
 * Which body a spacecraft's marker should be placed relative to,
 * based on its category — keeps lunar/planetary/solar objects
 * visually near the body they concern rather than in the generic
 * Earth-orbit shell.
 */
function anchorFor(category: Category): [number, number, number] {
  switch (category) {
    case "Lunar":
      return [
        EARTH_POSITION[0] + MOON_OFFSET[0],
        EARTH_POSITION[1] + MOON_OFFSET[1],
        EARTH_POSITION[2] + MOON_OFFSET[2],
      ];
    case "Planetary":
      return MARS_POSITION;
    case "Solar":
      return SUN_POSITION;
    default:
      return EARTH_POSITION;
  }
}

/**
 * Deterministic position for one spacecraft marker.
 * Earth-orbit categories are distributed across a small set of
 * shell radii (an approximation of LEO/MEO/GEO bands) so the field
 * reads as layered rather than a single flat ring.
 */
export function spacecraftPosition(s: Pick<Spacecraft, "id" | "category" | "year">): [number, number, number] {
  const u1 = seededUnit(s.id);
  const u2 = seededUnit(s.id + ":r");
  const angle = u1 * Math.PI * 2;

  if (s.category === "Lunar" || s.category === "Planetary" || s.category === "Solar") {
    const [ax, ay, az] = anchorFor(s.category);
    const r = 0.55 + u2 * 0.85;
    return [ax + Math.cos(angle) * r, ay + (u2 - 0.5) * 0.5, az + Math.sin(angle) * r];
  }

  // Earth-orbit shell: band by a hash of the id so it's stable, not by array index.
  const bands = [3.35, 3.7, 4.05, 4.5, 5.0];
  const band = bands[Math.floor(u2 * bands.length) % bands.length];
  const [ex, , ez] = EARTH_POSITION;
  const incline = (seededUnit(s.id + ":i") - 0.5) * 0.6;
  return [ex + Math.cos(angle) * band, Math.sin(angle) * band * incline, ez + Math.sin(angle) * band];
}

/** Whether a spacecraft should be visible for a given active year (spec §34: temporal growth). */
export function isActiveInYear(year: number, activeYear: number): boolean {
  return year <= activeYear;
}
