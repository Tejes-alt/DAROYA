import { test } from "node:test";
import assert from "node:assert/strict";
import { search } from "../lib/search/search";

test("empty query returns no groups", () => {
  const result = search("");
  assert.equal(result.groups.length, 0);
  assert.equal(result.total, 0);
});

test("searching a mission family groups results by kind (spec §15 example)", () => {
  const result = search("chandrayaan");
  const kinds = result.groups.map((g) => g.kind);
  assert.ok(kinds.includes("spacecraft"));
  assert.ok(kinds.includes("mission"));
  assert.ok(kinds.includes("launch"));

  const spacecraftGroup = result.groups.find((g) => g.kind === "spacecraft")!;
  assert.ok(spacecraftGroup.results.some((r) => r.title === "Chandrayaan-1"));
  assert.ok(spacecraftGroup.results.some((r) => r.title === "Chandrayaan-3" || r.title === "Chandrayaan-2"));
});

test("exact-name match ranks above a substring match", () => {
  const result = search("pslv");
  const launcherGroup = result.groups.find((g) => g.kind === "launcher");
  assert.ok(launcherGroup);
  assert.equal(launcherGroup!.results[0].title, "PSLV");
});

test("searching a year surfaces records from that year", () => {
  const result = search("1980");
  const spacecraftGroup = result.groups.find((g) => g.kind === "spacecraft");
  assert.ok(spacecraftGroup);
  assert.ok(spacecraftGroup!.results.some((r) => r.subtitle.startsWith("1980")));
});

test("gibberish query returns no results", () => {
  const result = search("zzzqxnotarealterm");
  assert.equal(result.total, 0);
});
