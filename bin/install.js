#!/usr/bin/env node
import { cp, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

function usage() {
  return [
    'Usage: odoo-skills [install] [--target <path>]',
    '',
    'Options:',
    '  -t, --target <path>  Project directory to receive .agents/skills',
    '  -h, --help           Show this help message',
  ].join('\n');
}

function parseArgs(argv) {
  const parsed = { help: false, target: undefined };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === 'install') {
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      parsed.help = true;
      continue;
    }

    if (arg === '--target' || arg === '-t') {
      const value = argv[index + 1];
      if (!value || value.startsWith('-')) {
        throw new Error(`Missing value for ${arg}.`);
      }
      parsed.target = value;
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return parsed;
}

const argv = process.argv.slice(2);
let parsed;
try {
  parsed = parseArgs(argv);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  console.error('');
  console.error(usage());
  process.exit(1);
}

if (parsed.help) {
  console.log(usage());
  process.exit(0);
}

const target = resolve(parsed.target ?? process.cwd());
const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(packageRoot, 'skills');
const destination = join(target, '.agents/skills');

await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true, force: true });

console.log(`Installed WPMoo Skills for Odoo into ${destination}`);
