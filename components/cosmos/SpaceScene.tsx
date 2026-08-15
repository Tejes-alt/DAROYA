"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import type { Spacecraft } from "@/lib/data/types";
import { spacecraft as defaultSpacecraft } from "@/data/spacecraft";
import StarField from "./StarField";
import Earth from "./Earth";
import Moon from "./Moon";
import SolarSystem from "./SolarSystem";
import SatelliteField from "./SatelliteField";
import Trajectory from "./Trajectory";
import type { TrajectoryId } from "@/lib/orbit/trajectories";

export interface SpaceSceneProps {
  /** Defaults to the full archive if not provided — callers can pass a filtered set. */
  data?: Spacecraft[];
  activeYear?: number;
  selectedId?: string | null;
  onSelect?: (s: Spacecraft) => void;
  reducedMotion?: boolean;
  /** Follow-trajectory overlay for the currently selected mission (spec §9, §13). */
  trajectory?: TrajectoryId | null;
  /** Disables camera autorotate/interaction — used for background/decorative placements. */
  interactive?: boolean;
}

/**
 * The persistent cosmic canvas (spec §2, §4). This is the single
 * composition point for the whole 3D layer — every mode of DAROYA
 * reuses this scene rather than swapping in a separate visualization.
 */
export default function SpaceScene({
  data = defaultSpacecraft,
  activeYear = 2026,
  selectedId = null,
  onSelect,
  reducedMotion = false,
  trajectory = null,
  interactive = true,
}: SpaceSceneProps) {
  return (
    <Canvas
      camera={{ position: [0.3, 1.8, 15], fov: 44 }}
      dpr={[1, 1.45]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.16} />
        <StarField reducedMotion={reducedMotion} />
        <SolarSystem reducedMotion={reducedMotion} />
        <Earth reducedMotion={reducedMotion} />
        <Moon reducedMotion={reducedMotion} />
        <SatelliteField
          data={data}
          activeYear={activeYear}
          selectedId={selectedId}
          onSelect={onSelect}
          reducedMotion={reducedMotion}
        />
        {trajectory && <Trajectory id={trajectory} />}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={interactive}
          autoRotate={interactive}
          autoRotateSpeed={reducedMotion ? 0 : 0.12}
          enableDamping
          dampingFactor={0.03}
        />
      </Suspense>
    </Canvas>
  );
}
