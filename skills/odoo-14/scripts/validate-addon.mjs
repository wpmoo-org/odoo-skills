#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const VERSION = "14.0";
const addonPath = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const errors = [];
const warnings = [];

function readIfExists(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const manifestPath = path.join(addonPath, "__manifest__.py");
const manifest = readIfExists(manifestPath);
if (!manifest) {
  errors.push("Missing __manifest__.py");
} else {
  if (!new RegExp(`['"]version['"]\\s*:\\s*['"]${VERSION}\\.`).test(manifest)) {
    errors.push(`Manifest version must start with ${VERSION}.`);
  }
  for (const key of ["license", "depends"]) {
    if (!new RegExp(`['"]${key}['"]\\s*:`).test(manifest)) {
      warnings.push(`Manifest should declare ${key}.`);
    }
  }
  if (/['"]assets['"]\s*:/.test(manifest)) {
    warnings.push("Odoo 14 normally uses legacy XML asset bundle inheritance, not manifest assets.");
  }
}

for (const file of walk(addonPath).filter((name) => name.endsWith(".xml"))) {
  const xml = readIfExists(file);
  if (/<list[\s>]/.test(xml)) {
    errors.push(`${path.relative(addonPath, file)} uses <list>; Odoo ${VERSION} list views use <tree>.`);
  }
  if (/<field[^>]+name=["']view_mode["'][^>]*>[^<]*\blist\b[^<]*<\/field>/m.test(xml)) {
    errors.push(`${path.relative(addonPath, file)} appears to use list view_mode; use tree for Odoo ${VERSION}.`);
  }
}

if (errors.length) {
  console.error(`Odoo ${VERSION} validation failed for ${addonPath}`);
  for (const error of errors) console.error(`ERROR: ${error}`);
  for (const warning of warnings) console.error(`WARN: ${warning}`);
  process.exit(1);
}

console.log(`Odoo ${VERSION} validation passed for ${addonPath}`);
for (const warning of warnings) console.log(`WARN: ${warning}`);
