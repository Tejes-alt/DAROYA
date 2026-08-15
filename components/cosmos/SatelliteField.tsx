"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Spacecraft } from "@/lib/data/types";
import { spacecraftPosition, isActiveInYear } from "@/lib/orbit/orbital";
import { categoryColor, categoryMarkerSize } from "@/lib/cosmos/categoryStyle";

interface SatelliteFieldProps {
  data: Spacecraft[];
  /** Only spacecraft launched by this year are shown — spec §34 temporal growth. */
  activeYear?: number;
  selectedId?: string | null;
  onSelect?: (s: Spacecraft) => void;
  reducedMotion?: boolean;
}

function Marker({
  s,
  selected,
  reducedMotion,
  onSelect,
}: {
  s: Spacecraft;
  selected: boolean;
  reducedMotion: boolean;
  onSelect?: (s: Spacecraft) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const position = useMemo(() => spacecraftPosition(s), [s]);
  const baseSize = categoryMarkerSize(s.category);
  const color = categoryColor(s.category);

  useFrame((state) => {
    if (!ref.current) return;
    const pulse = selected && !reducedMotion ? 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.18 : 1;
    const targetScale = (selected ? 1.9 : hovered ? 1.4 : 1) * pulse;
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x || 1, targetScale, reducedMotion ? 1 : 0.18));
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(s);
      }}
    >
      <sphereGeometry args={[baseSize, 8, 8]} />
      <meshBasicMaterial color={selected || hovered ? "#ffffff" : color} />
    </mesh>
  );
}

/**
 * The archive rendered as spatial markers, not bespoke 3D models
 * (spec §5 — the single most important concept in the cosmos layer).
 * Each marker is data-driven: position from a deterministic layout,
 * color from category, prominence from selection state.
 */
export default function SatelliteField({
  data,
  activeYear = 2026,
  selectedId = null,
  onSelect,
  reducedMotion = false,
}: SatelliteFieldProps) {
  const visible = useMemo(
    () => data.filter((s) => isActiveInYear(s.year, activeYear)),
    [data, activeYear]
  );

  return (
    <group name="satellite-field">
      {visible.map((s) => (
        <Marker key={s.id} s={s} selected={s.id === selectedId} reducedMotion={reducedMotion} onSelect={onSelect} />
      ))}
    </group>
  );
}
