"use client";

import SpaceJourney from "@/components/india/SpaceJourney";

interface IndiaMapProps {
  onSelect?: (id: string) => void;
}

/**
 * India section: Space Journey Experience
 * 
 * Replaces the polygon map with a chronological, editorial visualization
 * of India's journey into space. This is meaningful content backed by the
 * project's spacecraft, mission, and launch vehicle data.
 */
export default function IndiaMap({ onSelect }: IndiaMapProps) {
  return <SpaceJourney />;
}
