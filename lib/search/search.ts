import { loadDataset } from "@/lib/data/loader";

/**
 * Real cross-entity global search (spec §15). Groups results by kind
 * the way the spec's CHANDRAYAAN example does — SPACECRAFT / MISSIONS /
 * LAUNCHES / LAUNCHERS / CENTRES / PEOPLE — and ranks within each
 * group by match quality, not just data order.
 */

export type SearchResultKind = "spacecraft" | "mission" | "launch" | "launcher" | "centre" | "person";

export interface SearchResult {
  kind: SearchResultKind;
  id: string;
  title: string;
  subtitle: string;
  score: number;
}

export interface GroupedSearchResults {
  query: string;
  groups: { kind: SearchResultKind; label: string; results: SearchResult[] }[];
  total: number;
}

function norm(s: string): string {
  return s.toLowerCase().trim();
}

/** Cheap relevance score: exact > startsWith > wordStart > substring. Higher is better. */
function scoreMatch(haystack: string, needle: string): number {
  const h = norm(haystack);
  const n = norm(needle);
  if (!n) return 0;
  if (h === n) return 100;
  if (h.startsWith(n)) return 80;
  if (new RegExp(`\\b${n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(h)) return 60;
  if (h.includes(n)) return 40;
  return 0;
}

const GROUP_LABELS: Record<SearchResultKind, string> = {
  spacecraft: "SPACECRAFT",
  mission: "MISSIONS",
  launch: "LAUNCHES",
  launcher: "LAUNCHERS",
  centre: "CENTRES",
  person: "PEOPLE",
};

const GROUP_ORDER: SearchResultKind[] = ["spacecraft", "mission", "launch", "launcher", "centre", "person"];

/**
 * Search across every entity kind. Each entity contributes its best
 * single score from a small set of searchable fields (name/alias,
 * year, category, launcher, destination, centre, organization —
 * spec §15).
 */
export function search(query: string, limit = 8): GroupedSearchResults {
  const q = query.trim();
  const d = loadDataset();
  const all: SearchResult[] = [];

  if (q.length > 0) {
    for (const s of d.spacecraft) {
      const score = Math.max(
        scoreMatch(s.name, q),
        scoreMatch(s.category, q) * 0.6,
        scoreMatch(s.launcher, q) * 0.7,
        scoreMatch(String(s.year), q) * 0.5,
        scoreMatch(s.orbit, q) * 0.4
      );
      if (score > 0) all.push({ kind: "spacecraft", id: s.id, title: s.name, subtitle: `${s.year} · ${s.category}`, score });
    }
    for (const m of d.missions) {
      const score = Math.max(
        scoreMatch(m.name, q),
        scoreMatch(m.destination, q) * 0.7,
        scoreMatch(m.launcher, q) * 0.6,
        scoreMatch(String(m.year), q) * 0.5
      );
      if (score > 0) all.push({ kind: "mission", id: m.id, title: m.name, subtitle: `${m.year} · ${m.destination}`, score });
    }
    for (const l of d.launches) {
      const score = Math.max(
        scoreMatch(l.vehicle, q),
        scoreMatch(l.payload, q) * 0.8,
        scoreMatch(String(l.year), q) * 0.5,
        scoreMatch(l.outcome, q) * 0.4
      );
      if (score > 0) all.push({ kind: "launch", id: l.id, title: l.vehicle, subtitle: `${l.date} · ${l.payload}`, score });
    }
    for (const lv of d.launchers) {
      const score = Math.max(scoreMatch(lv.name, q), scoreMatch(lv.role, q) * 0.5, scoreMatch(lv.era, q) * 0.4);
      if (score > 0) all.push({ kind: "launcher", id: lv.id, title: lv.name, subtitle: lv.role, score });
    }
    for (const c of d.centres) {
      const score = Math.max(scoreMatch(c.name, q), scoreMatch(c.location, q) * 0.7, scoreMatch(c.focus, q) * 0.6);
      if (score > 0) all.push({ kind: "centre", id: c.id, title: c.name, subtitle: `${c.location} · ${c.focus}`, score });
    }
    for (const p of d.people) {
      const score = Math.max(scoreMatch(p.name, q), scoreMatch(p.role, q) * 0.6);
      if (score > 0) all.push({ kind: "person", id: p.id, title: p.name, subtitle: p.role, score });
    }
  }

  const groups = GROUP_ORDER.map((kind) => ({
    kind,
    label: GROUP_LABELS[kind],
    results: all.filter((r) => r.kind === kind).sort((a, b) => b.score - a.score).slice(0, limit),
  })).filter((g) => g.results.length > 0);

  return { query: q, groups, total: all.length };
}
