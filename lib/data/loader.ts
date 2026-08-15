import type { Spacecraft, Mission, Launch, Launcher, TimelineEvent } from "@/lib/data/types";
import type { Centre } from "@/data/centres";
import type { Person } from "@/data/people";
import type { FutureProgramme } from "@/data/future";
import { spacecraft } from "@/data/spacecraft";
import { missions } from "@/data/missions";
import { launches } from "@/data/launches";
import { launchers } from "@/data/launchers";
import { timeline } from "@/data/timeline";
import { centres } from "@/data/centres";
import { people } from "@/data/people";
import { futureProgrammes } from "@/data/future";

/**
 * The single point of truth for "what data does DAROYA have".
 * Every mode (Archive, Timeline, Missions, Launchers, India, People)
 * reads through this loader rather than importing raw data files
 * directly, so indexing/lookup logic lives in one place (spec §12).
 */

export type EntityKind =
  | "spacecraft"
  | "mission"
  | "launch"
  | "launcher"
  | "centre"
  | "person"
  | "future"
  | "timeline";

export interface DaroyaDataset {
  spacecraft: Spacecraft[];
  missions: Mission[];
  launches: Launch[];
  launchers: Launcher[];
  centres: Centre[];
  people: Person[];
  future: FutureProgramme[];
  timeline: TimelineEvent[];
}

let dataset: DaroyaDataset | null = null;

/** Loads (and memoizes) the full DAROYA dataset. */
export function loadDataset(): DaroyaDataset {
  if (dataset) return dataset;
  dataset = { spacecraft, missions, launches, launchers, centres, people, future: futureProgrammes, timeline };
  return dataset;
}

function indexBy<T extends { id: string }>(items: T[]): Map<string, T> {
  const map = new Map<string, T>();
  for (const item of items) map.set(item.id, item);
  return map;
}

/** Lazily-built id -> record indexes, one per entity kind. */
const indexCache = new Map<EntityKind, Map<string, unknown>>();

function getIndex<T extends { id: string }>(kind: EntityKind, items: T[]): Map<string, T> {
  const cached = indexCache.get(kind) as Map<string, T> | undefined;
  if (cached) return cached;
  const built = indexBy(items);
  indexCache.set(kind, built);
  return built;
}

export function getSpacecraftById(id: string): Spacecraft | undefined {
  return getIndex("spacecraft", loadDataset().spacecraft).get(id);
}
export function getMissionById(id: string): Mission | undefined {
  return getIndex("mission", loadDataset().missions).get(id);
}
export function getLaunchById(id: string): Launch | undefined {
  return getIndex("launch", loadDataset().launches).get(id);
}
export function getLauncherById(id: string): Launcher | undefined {
  return getIndex("launcher", loadDataset().launchers).get(id);
}
export function getCentreById(id: string): Centre | undefined {
  return getIndex("centre", loadDataset().centres).get(id);
}
export function getPersonById(id: string): Person | undefined {
  return getIndex("person", loadDataset().people).get(id);
}
export function getFutureProgrammeById(id: string): FutureProgramme | undefined {
  return getIndex("future", loadDataset().future).get(id);
}

/** All spacecraft whose category matches, or all if "All" is passed. */
export function spacecraftByCategory(category: string): Spacecraft[] {
  const { spacecraft: all } = loadDataset();
  if (category === "All") return all;
  return all.filter((s) => s.category === category);
}

/** All records (of any archived kind) launched on or before the given year — the time-controller cut (spec §11). */
export function recordsAsOfYear(year: number) {
  const { spacecraft: sc, missions: ms, launches: lc } = loadDataset();
  return {
    spacecraft: sc.filter((s) => s.year <= year),
    missions: ms.filter((m) => m.year <= year),
    launches: lc.filter((l) => l.year <= year),
  };
}

/** The nearest timeline chapter to a given year — powers the master timeline reader. */
export function nearestTimelineEvent(year: number): TimelineEvent {
  const { timeline: events } = loadDataset();
  return events.reduce((closest, e) =>
    Math.abs(e.year - year) < Math.abs(closest.year - year) ? e : closest, events[0]);
}

export interface DetailPanelFacts {
  kind: EntityKind;
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  facts: [string, string][];
  source?: { title: string; url: string };
}

/**
 * Builds the shared detail-panel shape (spec §17) for any entity kind.
 * This is what lets one DetailPanel component serve spacecraft,
 * missions, launches, launchers, centres and people alike.
 */
export function getDetailFacts(kind: EntityKind, id: string): DetailPanelFacts | null {
  switch (kind) {
    case "spacecraft": {
      const s = getSpacecraftById(id);
      if (!s) return null;
      return {
        kind, id,
        eyebrow: `${s.year} · ${s.category}`,
        title: s.name,
        body: s.note,
        facts: [["Launcher", s.launcher], ["Orbit", s.orbit], ["Status", s.status], ["Year", String(s.year)]],
        source: s.source,
      };
    }
    case "mission": {
      const m = getMissionById(id);
      if (!m) return null;
      return {
        kind, id,
        eyebrow: `${m.year} · ${m.destination}`,
        title: m.name,
        body: m.summary,
        facts: [["Launcher", m.launcher], ["Status", m.status], ["Destination", m.destination], ["Year", String(m.year)]],
        source: m.source,
      };
    }
    case "launch": {
      const l = getLaunchById(id);
      if (!l) return null;
      return {
        kind, id,
        eyebrow: l.date,
        title: l.vehicle,
        body: l.note ?? "",
        facts: [["Payload", l.payload], ["Outcome", l.outcome], ["Date", l.date], ["Year", String(l.year)]],
        source: l.source,
      };
    }
    case "launcher": {
      const l = getLauncherById(id);
      if (!l) return null;
      return {
        kind, id,
        eyebrow: l.era,
        title: l.name,
        body: l.note,
        facts: [["Role", l.role], ["Status", l.status], ["First flight", l.firstFlight], ["Stages", String(l.stages)]],
        source: l.source,
      };
    }
    case "centre": {
      const c = getCentreById(id);
      if (!c) return null;
      return {
        kind, id,
        eyebrow: c.location,
        title: c.name,
        body: c.note,
        facts: [["Location", c.location], ["Focus", c.focus]],
        source: c.source,
      };
    }
    case "person": {
      const p = getPersonById(id);
      if (!p) return null;
      return {
        kind, id,
        eyebrow: `${p.years} · ${p.category}`,
        title: p.name,
        body: p.note,
        facts: [["Role", p.role], ["Category", p.category]],
        source: p.source,
      };
    }
    case "future": {
      const f = getFutureProgrammeById(id);
      if (!f) return null;
      return {
        kind, id,
        eyebrow: `${f.status.toUpperCase()} · ${f.targetYear}`,
        title: f.name,
        body: f.summary,
        facts: [["Status", f.status], ["Target", f.targetYear]],
        source: f.source,
      };
    }
    default:
      return null;
  }
}

/** Simple aggregate counters for the Numbers layer (spec §26). */
export function datasetStats() {
  const d = loadDataset();
  const successfulLaunches = d.launches.filter((l) => l.outcome === "Success").length;
  const unsuccessfulLaunches = d.launches.filter((l) => l.outcome === "Unsuccessful").length;
  const byCategory = new Map<string, number>();
  for (const s of d.spacecraft) byCategory.set(s.category, (byCategory.get(s.category) ?? 0) + 1);
  return {
    spacecraftCount: d.spacecraft.length,
    missionCount: d.missions.length,
    launchCount: d.launches.length,
    launcherCount: d.launchers.length,
    centreCount: d.centres.length,
    successfulLaunches,
    unsuccessfulLaunches,
    spacecraftByCategory: Object.fromEntries(byCategory),
  };
}
