"use client";

import * as THREE from "three";

interface OrbitRingProps {
  /** Ring radius, in scene units. */
  radius: number;
  /** Center of the ring — defaults to the origin (used for Earth-orbit shells). */
  center?: [number, number, number];
  color?: string;
  opacity?: number;
}

/**
 * A single reusable orbital-shell ring. Used both for the solar-system
 * planetary orbits and the Earth-orbit shell bands behind the satellite
 * field (spec §4, §5) — thin lines, not solid geometry, to keep the
 * scene reading as an atlas rather than a diagram.
 */
export default function OrbitRing({ radius, center = [0, 0, 0], color = "#ffffff", opacity = 0.045 }: OrbitRingProps) {
  return (
    <mesh position={center} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.008, 256]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
}
