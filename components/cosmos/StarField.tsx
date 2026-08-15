"use client";

import { Stars } from "@react-three/drei";

interface StarFieldProps {
  /** Reduced-motion mode disables the slow star drift (spec §26). */
  reducedMotion?: boolean;
}

/**
 * The sparse opening star field (spec §3) and the ambient backdrop
 * for every mode of the cosmos layer. Deliberately restrained —
 * this is atmosphere, not a particle-system centerpiece.
 */
export default function StarField({ reducedMotion = false }: StarFieldProps) {
  return (
    <Stars
      radius={90}
      depth={60}
      count={7000}
      factor={2.2}
      saturation={0}
      fade
      speed={reducedMotion ? 0 : 0.1}
    />
  );
}
