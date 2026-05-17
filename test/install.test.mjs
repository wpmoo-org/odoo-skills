import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';

const repoRoot = new URL('..', import.meta.url);
const installBin = fileURLToPath(new URL('../bin/install.js', import.meta.url));

function runInstall(args, options = {}) {
  return spawnSync(process.execPath, [installBin, ...args], {
    cwd: options.cwd,
    encoding: 'utf8',
  });
}

test('--help prints usage without installing into cwd', async () => {
  const target = await mkdtemp(join(tmpdir(), 'odoo-skills-help-'));
  const result = runInstall(['--help'], { cwd: target });

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage: odoo-skills/);
  assert.doesNotMatch(result.stderr, /ENOENT|EACCES|EPERM/);

  const agentsDir = join(target, '.agents');
  const exists = spawnSync('test', ['-e', agentsDir]);
  assert.notEqual(exists.status, 0);
});

test('--target installs bundled skills into the requested project', async () => {
  const target = await mkdtemp(join(tmpdir(), 'odoo-skills-install-'));
  const result = runInstall(['--target', target], { cwd: repoRoot });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, new RegExp(`Installed WPMoo Skills for Odoo into ${target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/\\.agents/skills`));

  const installedSkill = await readFile(join(target, '.agents/skills/odoo-19/SKILL.md'), 'utf8');
  assert.match(installedSkill, /Odoo 19/);
});
