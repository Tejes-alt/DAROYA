import { test } from "node:test";
import assert from "node:assert/strict";
import { loadDataset, getSpacecraftById, datasetStats, recordsAsOfYear, nearestTimelineEvent } from "../lib/data/loader";
import { validateDataset } from "../lib/validation/schemas";
import { relatedToSpacecraft } from "../lib/data/relationships";

test("loadDataset returns every entity kind non-empty", () => {
  const d = loadDataset();
  assert.ok(d.spacecraft.length > 0);
  assert.ok(d.missions.length > 0);
  assert.ok(d.launches.length > 0);
  assert.ok(d.launchers.length > 0);
  assert.ok(d.centres.length > 0);
  assert.ok(d.people.length > 0);
  assert.ok(d.timeline.length > 0);
});

test("getSpacecraftById finds a known record", () => {
  const s = getSpacecraftById("chandrayaan-1");
  assert.ok(s);
  assert.equal(s?.name, "Chandrayaan-1");
});

test("getSpacecraftById returns undefined for unknown id", () => {
  assert.equal(getSpacecraftById("does-not-exist"), undefined);
});

test("recordsAsOfYear only includes records launched on or before the cut year", () => {
  const asOf1980 = recordsAsOfYear(1980);
  assert.ok(asOf1980.spacecraft.every((s) => s.year <= 1980));
  assert.ok(asOf1980.spacecraft.some((s) => s.id === "aryabhata"));
  assert.ok(!asOf1980.spacecraft.some((s) => s.id === "chandrayaan-1"));
});

test("nearestTimelineEvent finds the closest chapter", () => {
  const event = nearestTimelineEvent(2009);
  assert.equal(event.year, 2008);
});

test("datasetStats produces consistent counts", () => {
  const stats = datasetStats();
  const d = loadDataset();
  assert.equal(stats.spacecraftCount, d.spacecraft.length);
  assert.equal(stats.successfulLaunches + stats.unsuccessfulLaunches <= stats.launchCount, true);
});

test("dataset passes validation with no critical issues", () => {
  const d = loadDataset();
  const report = validateDataset(d);
  // Report every issue if the test fails, to make failures actionable.
  if (!report.ok) {
    for (const issue of report.issues) {
      console.error(`  [${issue.entity}:${issue.id}] ${issue.message}`);
    }
  }
  assert.equal(report.ok, true, `${report.errorCount} validation issue(s) found — see above`);
});

test("relatedToSpacecraft returns at least one related entity for a well-connected record", () => {
  const s = getSpacecraftById("chandrayaan-1");
  assert.ok(s);
  const related = relatedToSpacecraft(s!);
  assert.ok(related.length > 0);
});

test("future programmes are all sourced and have a target year (spec §27 honesty)", () => {
  const d = loadDataset();
  assert.ok(d.future.length > 0);
  for (const f of d.future) {
    assert.ok(f.source, `${f.id} is missing a source`);
    assert.ok(f.targetYear.trim().length > 0, `${f.id} is missing a target year`);
  }
});

test("trajectoryForDestination maps mission destinations to a known trajectory", async () => {
  const { trajectoryForDestination } = await import("../lib/orbit/trajectories");
  assert.equal(trajectoryForDestination("Moon"), "earth-moon");
  assert.equal(trajectoryForDestination("Mars"), "earth-mars");
  assert.equal(trajectoryForDestination("Sun–Earth L1"), "earth-sun-l1");
  assert.equal(trajectoryForDestination("Geostationary"), null);
});
