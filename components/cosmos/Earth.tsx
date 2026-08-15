"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EARTH_POSITION } from "@/lib/orbit/orbital";

interface EarthProps {
  reducedMotion?: boolean;
}

/**
 * Earth is the anchor of the Cosmos and India modes (spec §2, §15).
 * A quiet rim-light shell stands in for atmosphere without reaching
 * for a full shader/texture pipeline.
 */
export default function Earth({ reducedMotion = false }: EarthProps) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) ref.current.rotation.y += delta * 0.08;
  });
  return (
    <group position={EARTH_POSITION} name="earth">
      <mesh ref={ref}>
        <sphereGeometry args={[1.12, 64, 64]} />
        <meshStandardMaterial color="#264f86" roughness={0.95} metalness={0} />
      </mesh>
      <mesh scale={1.08}>
        <sphereGeometry args={[1.12, 48, 48]} />
        <meshBasicMaterial color="#6d9ad8" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
