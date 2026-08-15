/**
 * Data-integrity check for the DAROYA dataset (spec §12, §38, §42).
 * Run with: npm run validate-data
 * Exits non-zero if any validation issue is found, so it can gate CI.
 */
import { loadDataset } from "../lib/data/loader";
import { validateDataset } from "../lib/validation/schemas";

function main() {
  const d = loadDataset();
  const report = validateDataset(d);

  console.log(`DAROYA data validation`);
  console.log(`  spacecraft: ${d.spacecraft.length}`);
  console.log(`  missions:   ${d.missions.length}`);
  console.log(`  launches:   ${d.launches.length}`);
  console.log(`  launchers:  ${d.launchers.length}`);
  console.log(`  centres:    ${d.centres.length}`);
  console.log(`  people:     ${d.people.length}`);
  console.log("");

  if (report.ok) {
    console.log("OK — no validation issues found.");
    return;
  }

  console.log(`Found ${report.errorCount} issue(s):\n`);
  for (const issue of report.issues) {
    console.log(`  [${issue.entity}:${issue.id}] ${issue.message}`);
  }
  process.exitCode = 1;
}

main();
