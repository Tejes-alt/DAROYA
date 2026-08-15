import { loadDataset } from "@/lib/data/loader";
import type { Spacecraft, Mission, Launch, Launcher } from "@/lib/data/types";
import type { Centre } from "@/data/centres";
import type { Person } from "@/data/people";

/**
 * DAROYA's knowledge graph (spec §13). Relationships are derived at
 * read time from shared string keys already present in the source
 * data (launcher name, mission id/name, centre focus) rather than
 * duplicated foreign-key tables — this keeps the showcase dataset
 * easy to hand-edit while still giving every entity a real "Related"
 * set (spec §17).
 */

export interface RelatedEntity {
  kind: "spacecraft" | "mission" | "launch" | "launcher" | "centre" | "person";
  id: string;
  label: string;
  sublabel?: string;
}

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/** True if a launcher/vehicle string plausibly refers to the given launcher family. */
function vehicleMatchesLauncher(vehicle: string, launcherName: string): boolean {
  const v = norm(vehicle);
  const l = norm(launcherName);
  // Match on the family token (e.g. "pslv", "gslv", "lvm3", "sslv", "slv 3", "aslv").
  const familyToken = l.split(" ")[0];
  return v.includes(familyToken) && familyToken.length > 2;
}

export function relatedToSpacecraft(s: Spacecraft): RelatedEntity[] {
  const d = loadDataset();
  const related: RelatedEntity[] = [];

  const mission = d.missions.find((m) => m.id === s.id || norm(m.name) === norm(s.name));
  if (mission) related.push({ kind: "mission", id: mission.id, label: mission.name, sublabel: mission.destination });

  const launcher = d.launchers.find((l) => vehicleMatchesLauncher(s.launcher, l.name));
  if (launcher) related.push({ kind: "launcher", id: launcher.id, label: launcher.name, sublabel: launcher.role });

  const launch = d.launches.find((l) => vehicleMatchesLauncher(s.launcher, l.vehicle) && l.year === s.year)
    ?? d.launches.find((l) => norm(l.payload).includes(norm(s.name)) || norm(s.name).includes(norm(l.payload)));
  if (launch) related.push({ kind: "launch", id: launch.id, label: launch.vehicle, sublabel: launch.date });

  const siblings = d.spacecraft
    .filter((o) => o.id !== s.id && o.category === s.category && Math.abs(o.year - s.year) <= 3)
    .slice(0, 4);
  for (const sib of siblings) related.push({ kind: "spacecraft", id: sib.id, label: sib.name, sublabel: String(sib.year) });

  return related;
}

export function relatedToMission(m: Mission): RelatedEntity[] {
  const d = loadDataset();
  const related: RelatedEntity[] = [];

  const spacecraftMatch = d.spacecraft.find((s) => s.id === m.id || norm(s.name) === norm(m.name));
  if (spacecraftMatch) related.push({ kind: "spacecraft", id: spacecraftMatch.id, label: spacecraftMatch.name, sublabel: spacecraftMatch.category });

  const launcher = d.launchers.find((l) => vehicleMatchesLauncher(m.launcher, l.name));
  if (launcher) related.push({ kind: "launcher", id: launcher.id, label: launcher.name, sublabel: launcher.role });

  const launch = d.launches.find((l) => norm(l.payload).includes(norm(m.name)) || norm(l.vehicle).includes(norm(m.launcher)));
  if (launch) related.push({ kind: "launch", id: launch.id, label: launch.vehicle, sublabel: launch.date });

  const sameDestination = d.missions
    .filter((o) => o.id !== m.id && o.destination === m.destination)
    .slice(0, 4);
  for (const o of sameDestination) related.push({ kind: "mission", id: o.id, label: o.name, sublabel: String(o.year) });

  return related;
}

export function relatedToLauncher(l: Launcher): RelatedEntity[] {
  const d = loadDataset();
  const related: RelatedEntity[] = [];

  const flownLaunches = d.launches.filter((x) => vehicleMatchesLauncher(x.vehicle, l.name)).slice(0, 6);
  for (const lc of flownLaunches) related.push({ kind: "launch", id: lc.id, label: lc.vehicle, sublabel: lc.date });

  const carriedSpacecraft = d.spacecraft.filter((s) => vehicleMatchesLauncher(s.launcher, l.name)).slice(0, 6);
  for (const s of carriedSpacecraft) related.push({ kind: "spacecraft", id: s.id, label: s.name, sublabel: String(s.year) });

  return related;
}

export function relatedToCentre(c: Centre): RelatedEntity[] {
  const d = loadDataset();
  const related: RelatedEntity[] = [];
  const people = d.people.filter((p) => p.centres?.includes(c.id)).slice(0, 6);
  for (const p of people) related.push({ kind: "person", id: p.id, label: p.name, sublabel: p.role });
  return related;
}

export function relatedToPerson(p: Person): RelatedEntity[] {
  const d = loadDataset();
  const related: RelatedEntity[] = [];
  for (const cid of p.centres ?? []) {
    const centre = d.centres.find((c) => c.id === cid);
    if (centre) related.push({ kind: "centre", id: centre.id, label: centre.name, sublabel: centre.location });
  }
  for (const progName of p.programmes ?? []) {
    const mission = d.missions.find((m) => norm(m.name).includes(norm(progName)) || norm(progName).includes(norm(m.name)));
    if (mission) related.push({ kind: "mission", id: mission.id, label: mission.name, sublabel: String(mission.year) });
  }
  return related;
}

/** Generic entry point used by the global search + detail-panel UI. */
export function relatedTo(kind: RelatedEntity["kind"], id: string): RelatedEntity[] {
  const d = loadDataset();
  switch (kind) {
    case "spacecraft": {
      const s = d.spacecraft.find((x) => x.id === id);
      return s ? relatedToSpacecraft(s) : [];
    }
    case "mission": {
      const m = d.missions.find((x) => x.id === id);
      return m ? relatedToMission(m) : [];
    }
    case "launcher": {
      const l = d.launchers.find((x) => x.id === id);
      return l ? relatedToLauncher(l) : [];
    }
    case "centre": {
      const c = d.centres.find((x) => x.id === id);
      return c ? relatedToCentre(c) : [];
    }
    case "person": {
      const p = d.people.find((x) => x.id === id);
      return p ? relatedToPerson(p) : [];
    }
    default:
      return [];
  }
}
