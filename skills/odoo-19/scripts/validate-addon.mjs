#!/usr/bin/env node
import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const VERSION = "19.0";

async function walk(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "__pycache__") continue;
    const fullPath = join(path, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function report(level, file, message) {
  console.log(`${level}: ${file}: ${message}`);
}

async function main() {
  const target = process.argv[2] ?? ".";
  const targetStat = await stat(target);
  const files = targetStat.isDirectory() ? await walk(target) : [target];
  let failures = 0;

  for (const file of files) {
    const text = await readFile(file, "utf8");
    if (file.endsWith("__manifest__.py")) {
      if (!text.includes(`"version": "${VERSION}.`) && !text.includes(`'version': '${VERSION}.`)) {
        report("ERROR", file, `manifest version must start with ${VERSION}.`);
        failures += 1;
      }
      if (!text.includes("\"license\"") && !text.includes("'license'")) {
        report("ERROR", file, "manifest must declare a license.");
        failures += 1;
      }
      if (!text.includes("\"depends\"") && !text.includes("'depends'")) {
        report("ERROR", file, "manifest must declare explicit dependencies.");
        failures += 1;
      }
    }

    if (file.endsWith(".xml")) {
      if (/<tree(\s|>)/.test(text)) {
        report("ERROR", file, "Odoo 19.0 list views use <list>, not <tree>.");
        failures += 1;
      }
      if (/\sattrs=/.test(text) || /\sstates=/.test(text)) {
        report("ERROR", file, "use direct invisible/readonly/required expressions instead of attrs/states.");
        failures += 1;
      }
    }

    if (file.endsWith(".py") && text.includes("_sql_constraints")) {
      report("WARN", file, "new Odoo 19.0 code should prefer models.Constraint/models.UniqueIndex; do not rewrite existing constraints without migration coverage.");
    }
  }

  if (failures) {
    process.exitCode = 1;
  } else {
    console.log(`OK: no Odoo ${VERSION} heuristic issues found.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
