"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EARTH_POSITION, MOON_OFFSET } from "@/lib/orbit/orbital";

interface MoonProps {
  reducedMotion?: boolean;
  /** Highlighted when the Lunar chapter/mode is active. */
  emphasized?: boolean;
}

export default function Moon({ reducedMotion = false, emphasized = false }: MoonProps) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) ref.current.rotation.y += delta * 0.03;
  });
  const position: [number, number, number] = [
    EARTH_POSITION[0] + MOON_OFFSET[0],
    EARTH_POSITION[1] + MOON_OFFSET[1],
    EARTH_POSITION[2] + MOON_OFFSET[2],
  ];
  return (
    <mesh ref={ref} position={position} name="moon">
      <sphereGeometry args={[0.33, 32, 32]} />
      <meshStandardMaterial
        color={emphasized ? "#c9c6bc" : "#8f8d88"}
        roughness={1}
        emissive={emphasized ? "#ffcf7a" : "#000000"}
        emissiveIntensity={emphasized ? 0.15 : 0}
      />
    </mesh>
  );
}
