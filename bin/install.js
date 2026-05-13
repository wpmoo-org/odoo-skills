#!/usr/bin/env node
import { cp, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

function valueAfter(argv, flag) {
  const index = argv.indexOf(flag);
  if (index === -1) return undefined;
  return argv[index + 1];
}

const argv = process.argv.slice(2);
const target = resolve(valueAfter(argv, '--target') ?? valueAfter(argv, '-t') ?? process.cwd());
const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(packageRoot, 'skills');
const destination = join(target, '.agents/skills');

await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true, force: true });

console.log(`Installed WPMoo Odoo Skills into ${destination}`);
