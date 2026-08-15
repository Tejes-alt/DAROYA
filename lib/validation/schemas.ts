import type { Spacecraft, Mission, Launch, Launcher } from "@/lib/data/types";
import type { Centre } from "@/data/centres";
import type { Person } from "@/data/people";
import type { FutureProgramme } from "@/data/future";

/**
 * Lightweight runtime validation for the DAROYA dataset (spec §12, §42).
 * No external schema library is used — the dataset is small and
 * hand-authored, so plain structural checks with clear, actionable
 * error messages are enough, and they run in both Node scripts and
 * the browser without adding a dependency.
 */

export interface ValidationIssue {
  entity: string;
  id: string;
  message: string;
}

const CURRENT_YEAR = new Date().getFullYear();
const EARLIEST_YEAR = 1947;

function pushIf(issues: ValidationIssue[], condition: boolean, entity: string, id: string, message: string) {
  if (condition) issues.push({ entity, id, message });
}

export function validateSpacecraft(items: Spacecraft[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seen = new Set<string>();
  for (const s of items) {
    pushIf(issues, seen.has(s.id), "spacecraft", s.id, "duplicate id");
    seen.add(s.id);
    pushIf(issues, !s.name?.trim(), "spacecraft", s.id, "missing name");
    pushIf(issues, s.year < EARLIEST_YEAR || s.year > CURRENT_YEAR + 1, "spacecraft", s.id, `year ${s.year} out of expected range`);
    pushIf(issues, !s.source, "spacecraft", s.id, "missing source reference");
  }
  return issues;
}

export function validateMissions(items: Mission[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seen = new Set<string>();
  for (const m of items) {
    pushIf(issues, seen.has(m.id), "mission", m.id, "duplicate id");
    seen.add(m.id);
    pushIf(issues, m.year < EARLIEST_YEAR || m.year > CURRENT_YEAR + 1, "mission", m.id, `year ${m.year} out of expected range`);
    pushIf(issues, !m.destination?.trim(), "mission", m.id, "missing destination");
  }
  return issues;
}

export function validateLaunches(items: Launch[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seen = new Set<string>();
  for (const l of items) {
    pushIf(issues, seen.has(l.id), "launch", l.id, "duplicate id");
    seen.add(l.id);
    pushIf(issues, !/^\d{4}-\d{2}-\d{2}$/.test(l.date), "launch", l.id, `date "${l.date}" is not ISO yyyy-mm-dd`);
    pushIf(issues, new Date(l.date).getFullYear() !== l.year, "launch", l.id, "year field does not match date field");
  }
  return issues;
}

export function validateLaunchers(items: Launcher[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seen = new Set<string>();
  for (const l of items) {
    pushIf(issues, seen.has(l.id), "launcher", l.id, "duplicate id");
    seen.add(l.id);
    pushIf(issues, l.stages < 0, "launcher", l.id, "negative stage count");
  }
  return issues;
}

export function validateCentres(items: Centre[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seen = new Set<string>();
  for (const c of items) {
    pushIf(issues, seen.has(c.id), "centre", c.id, "duplicate id");
    seen.add(c.id);
    pushIf(issues, !c.location?.trim(), "centre", c.id, "missing location");
  }
  return issues;
}

export function validatePeople(items: Person[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seen = new Set<string>();
  for (const p of items) {
    pushIf(issues, seen.has(p.id), "person", p.id, "duplicate id");
    seen.add(p.id);
    pushIf(issues, !p.role?.trim(), "person", p.id, "missing role");
  }
  return issues;
}

export function validateFutureProgrammes(items: FutureProgramme[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seen = new Set<string>();
  for (const f of items) {
    pushIf(issues, seen.has(f.id), "future", f.id, "duplicate id");
    seen.add(f.id);
    pushIf(issues, !f.source, "future", f.id, "missing source reference — never present an unsourced aspiration as fact");
    pushIf(issues, !f.targetYear?.trim(), "future", f.id, "missing target year");
  }
  return issues;
}

/** Cross-entity checks that a single-table validator can't catch. */
// Foreign launch vehicles are expected in the record — India relied on
// international launchers before PSLV/GSLV matured, and still buys
// commercial rides abroad occasionally. These are not data errors.
const KNOWN_FOREIGN_VEHICLES = ["ariane", "vostok", "space shuttle", "falcon", "intercosmos", "c-1"];

export function validateCrossReferences(
  spacecraft: Spacecraft[],
  launchers: Launcher[]
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const launcherFamilies = launchers.map((l) => l.name.toLowerCase().split(" ")[0]);
  for (const s of spacecraft) {
    const vehicle = s.launcher.toLowerCase();
    const isForeign = KNOWN_FOREIGN_VEHICLES.some((f) => vehicle.includes(f));
    if (isForeign) continue;
    const matches = launcherFamilies.some((f) => f.length > 2 && vehicle.includes(f));
    pushIf(issues, !matches, "spacecraft", s.id, `launcher "${s.launcher}" does not match any known launcher family`);
  }
  return issues;
}

export interface FullValidationReport {
  issues: ValidationIssue[];
  errorCount: number;
  ok: boolean;
}

export function validateDataset(d: {
  spacecraft: Spacecraft[];
  missions: Mission[];
  launches: Launch[];
  launchers: Launcher[];
  centres: Centre[];
  people: Person[];
  future: FutureProgramme[];
}): FullValidationReport {
  const issues = [
    ...validateSpacecraft(d.spacecraft),
    ...validateMissions(d.missions),
    ...validateLaunches(d.launches),
    ...validateLaunchers(d.launchers),
    ...validateCentres(d.centres),
    ...validatePeople(d.people),
    ...validateFutureProgrammes(d.future),
    ...validateCrossReferences(d.spacecraft, d.launchers),
  ];
  return { issues, errorCount: issues.length, ok: issues.length === 0 };
}
