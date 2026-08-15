"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SUN_POSITION, MARS_POSITION } from "@/lib/orbit/orbital";
import OrbitRing from "./OrbitRing";

interface SolarSystemProps {
  reducedMotion?: boolean;
  /** Highlighted when the Planetary/Mars chapter is active. */
  emphasizeMars?: boolean;
  emphasizeSun?: boolean;
}

/**
 * The outer solar-system layer: Sun, Mars, and the illustrative
 * orbit rings that give the scene scale (spec §4). Earth and the
 * Moon have their own components since they're the primary anchors
 * of most modes — this component is the "beyond Earth" backdrop.
 */
export default function SolarSystem({ reducedMotion = false, emphasizeMars = false, emphasizeSun = false }: SolarSystemProps) {
  const sunRef = useRef<THREE.Mesh>(null);
  const marsRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!reducedMotion) {
      if (sunRef.current) sunRef.current.rotation.y += delta * 0.025;
      if (marsRef.current) marsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group name="solar-system">
      {/* Sun */}
      <group position={SUN_POSITION}>
        <mesh ref={sunRef}>
          <sphereGeometry args={[1.75, 64, 64]} />
          <meshBasicMaterial color={emphasizeSun ? "#ffd98f" : "#dca85e"} />
        </mesh>
        <mesh scale={1.12}>
          <sphereGeometry args={[1.75, 48, 48]} />
          <meshBasicMaterial color="#f0c477" transparent opacity={emphasizeSun ? 0.18 : 0.1} side={THREE.BackSide} />
        </mesh>
        <pointLight intensity={140} distance={45} />
      </group>

      {/* Mars */}
      <mesh ref={marsRef} position={MARS_POSITION}>
        <sphereGeometry args={[0.62, 48, 48]} />
        <meshStandardMaterial
          color={emphasizeMars ? "#e8794f" : "#b25a3a"}
          roughness={1}
          emissive={emphasizeMars ? "#ffb877" : "#000000"}
          emissiveIntensity={emphasizeMars ? 0.12 : 0}
        />
      </mesh>

      {/* Illustrative scale rings — not to astronomical scale (spec §31). */}
      <OrbitRing radius={3.2} color="#e6a052" opacity={0.15} />
      <OrbitRing radius={5.1} color="#ffffff" opacity={0.045} />
      <OrbitRing radius={6.1} color="#ffffff" opacity={0.045} />
      <OrbitRing radius={7.5} color="#ffffff" opacity={0.045} />
    </group>
  );
}
