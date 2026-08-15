import { sources } from "@/data/sources";
import type { SourceRef } from "@/lib/data/types";

/**
 * The 2047 horizon layer (spec §27). Every entry is categorized by
 * how firm its status is — the spec is explicit that an announced
 * aspiration must never be presented as completed. Categories run
 * from most to least certain:
 *
 *   Approved            — funded and formally sanctioned by government
 *   Under development    — hardware/software actively being built and tested
 *   Planned              — a public target date exists, work has not fully started
 *   Conceptual           — a stated long-term goal, not yet a funded programme
 *
 * "Current" and "Historical" programmes belong in data/missions.ts and
 * data/timeline.ts respectively — this file is only the forward-looking
 * horizon, so nothing here duplicates an already-launched mission.
 */
export type FutureStatus = "Approved" | "Under development" | "Planned" | "Conceptual";

export interface FutureProgramme {
  id: string;
  name: string;
  status: FutureStatus;
  targetYear: string;
  summary: string;
  source: SourceRef;
}

export const futureProgrammes: FutureProgramme[] = [
  {
    id: "gaganyaan-crewed",
    name: "Gaganyaan — first crewed flight",
    status: "Under development",
    targetYear: "Q1 2027 (target)",
    summary: "India's first human spaceflight. The human-rated launch vehicle (HLVM3), crew escape system and crew/service modules have completed development and testing; an uncrewed test flight was targeted for late 2026 ahead of the crewed mission.",
    source: sources.spacecraft,
  },
  {
    id: "bharatiya-antariksh-station",
    name: "Bharatiya Antariksh Station (BAS)",
    status: "Approved",
    targetYear: "2035 (target for full station)",
    summary: "India's planned space station. The government has approved development and launch of the first module, BAS-01, with the full five-module station targeted for operational status by 2035.",
    source: sources.spacecraft,
  },
  {
    id: "chandrayaan-4",
    name: "Chandrayaan-4 — lunar sample return",
    status: "Approved",
    targetYear: "2028 (target)",
    summary: "A government-approved, two-launch (LVM3) sample-return mission designed to collect roughly 2–3 kg of lunar surface material near the south pole and return it to Earth — India's first sample-return attempt.",
    source: sources.spacecraft,
  },
  {
    id: "lupex",
    name: "Chandrayaan-5 / LUPEX",
    status: "Approved",
    targetYear: "~2028–29 (target)",
    summary: "A joint ISRO–JAXA Lunar Polar Exploration mission: an ISRO-built lander carrying a Japanese rover to search for water ice at the lunar south pole, launching on Japan's H3 rocket.",
    source: sources.spacecraft,
  },
  {
    id: "venus-orbiter",
    name: "Venus Orbiter Mission (Shukrayaan)",
    status: "Approved",
    targetYear: "Not yet scheduled",
    summary: "An approved orbiter mission to study Venus's atmosphere and surface — India's first dedicated interplanetary mission beyond Mars.",
    source: sources.spacecraft,
  },
  {
    id: "crewed-lunar-landing",
    name: "Indian crewed Moon landing",
    status: "Conceptual",
    targetYear: "2040 (stated goal)",
    summary: "A government-stated long-term goal for an Indian-crewed lunar landing and return, to follow the Gaganyaan and Bharatiya Antariksh Station programmes. Not yet a funded, scoped mission.",
    source: sources.spacecraft,
  },
];
