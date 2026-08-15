import * as THREE from "three";
import { EARTH_POSITION, MOON_OFFSET, MARS_POSITION, SUN_POSITION } from "./orbital";

/**
 * Quiet trajectory curves for the Mission Atlas (spec §13).
 * These are illustrative arcs between bodies, not physically
 * simulated transfer orbits — DAROYA labels them as archival
 * visualization, not live tracking (spec §31).
 */

export type TrajectoryId = "earth-moon" | "earth-mars" | "earth-sun-l1" | "earth-orbit-rendezvous";

function point(x: number, y: number, z: number): THREE.Vector3 {
  return new THREE.Vector3(x, y, z);
}

const moon = point(
  EARTH_POSITION[0] + MOON_OFFSET[0],
  EARTH_POSITION[1] + MOON_OFFSET[1],
  EARTH_POSITION[2] + MOON_OFFSET[2]
);
const earth = point(...EARTH_POSITION);
const mars = point(...MARS_POSITION);
const sun = point(...SUN_POSITION);

// A point roughly a fifth of the way from Earth toward the Sun — a stand-in
// for the Sun–Earth L1 region used by Aditya-L1 (illustrative, not to scale).
const l1 = earth.clone().lerp(sun, 0.22);

function arcThrough(a: THREE.Vector3, b: THREE.Vector3, liftFactor = 0.28): THREE.CatmullRomCurve3 {
  const mid = a.clone().lerp(b, 0.5);
  mid.y += a.distanceTo(b) * liftFactor;
  return new THREE.CatmullRomCurve3([a, mid, b]);
}

const CURVES: Record<TrajectoryId, THREE.CatmullRomCurve3> = {
  "earth-moon": arcThrough(earth, moon, 0.35),
  "earth-mars": arcThrough(earth, mars, 0.18),
  "earth-sun-l1": arcThrough(earth, l1, 0.12),
  "earth-orbit-rendezvous": arcThrough(
    earth.clone().add(point(0.6, 0.15, 0.6)),
    earth.clone().add(point(-0.6, 0.15, -0.6)),
    0.4
  ),
};

/** Sampled points for drawing a trajectory line in the cosmos scene. */
export function trajectoryPoints(id: TrajectoryId, segments = 64): [number, number, number][] {
  return CURVES[id]
    .getPoints(segments)
    .map((p) => [p.x, p.y, p.z] as [number, number, number]);
}

/** Maps a mission destination string (as used in data/missions.ts) to a trajectory, if any. */
export function trajectoryForDestination(destination: string): TrajectoryId | null {
  const d = destination.toLowerCase();
  if (d.includes("moon") || d.includes("lunar")) return "earth-moon";
  if (d.includes("mars")) return "earth-mars";
  if (d.includes("sun") || d.includes("l1")) return "earth-sun-l1";
  if (d.includes("rendezvous") || d.includes("docking") || d.includes("orbit")) return "earth-orbit-rendezvous";
  return null;
}
