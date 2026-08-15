"use client";

import { Line } from "@react-three/drei";
import { trajectoryPoints, type TrajectoryId } from "@/lib/orbit/trajectories";

interface TrajectoryProps {
  id: TrajectoryId;
  color?: string;
  opacity?: number;
}

/**
 * Renders one quiet trajectory arc (spec §13 — Mission Atlas).
 * Labeled as archival/representative, not live tracking (spec §31).
 */
export default function Trajectory({ id, color = "#e6a052", opacity = 0.55 }: TrajectoryProps) {
  const points = trajectoryPoints(id);
  return (
    <Line
      points={points}
      color={color}
      transparent
      opacity={opacity}
      lineWidth={1}
      dashed={false}
    />
  );
}
