/**
 * Generates a static search index JSON from the dataset (spec §12, §15).
 * This is the same data the in-app search reads live, exported so it can
 * be inspected, diffed in code review, or consumed by an external tool.
 * Run with: npm run generate-index
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { loadDataset } from "../lib/data/loader";

interface IndexEntry {
  kind: string;
  id: string;
  title: string;
  subtitle: string;
  year?: number;
}

function main() {
  const d = loadDataset();
  const entries: IndexEntry[] = [
    ...d.spacecraft.map((s) => ({ kind: "spacecraft", id: s.id, title: s.name, subtitle: `${s.category} · ${s.launcher}`, year: s.year })),
    ...d.missions.map((m) => ({ kind: "mission", id: m.id, title: m.name, subtitle: m.destination, year: m.year })),
    ...d.launches.map((l) => ({ kind: "launch", id: l.id, title: l.vehicle, subtitle: l.payload, year: l.year })),
    ...d.launchers.map((l) => ({ kind: "launcher", id: l.id, title: l.name, subtitle: l.role })),
    ...d.centres.map((c) => ({ kind: "centre", id: c.id, title: c.name, subtitle: c.location })),
    ...d.people.map((p) => ({ kind: "person", id: p.id, title: p.name, subtitle: p.role })),
  ];

  const outDir = join(__dirname, "..", "public", "generated");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "search-index.json");
  writeFileSync(outPath, JSON.stringify({ generatedAt: new Date().toISOString(), count: entries.length, entries }, null, 2));

  console.log(`Wrote ${entries.length} entries to ${outPath}`);
}

main();
