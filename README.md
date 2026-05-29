# WPMoo Skills for Odoo

[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&style=flat-square)](https://github.com/wpmoo-org/odoo-skills) [![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE) [![Buy Me a Coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?logo=buymeacoffee&logoColor=000000&style=flat-square)](https://www.buymeacoffee.com/cangir)

Generic Agent Skills for Odoo/OCA-compatible addon development, Odoo addon
porting, open-core community/pro products, version-specific Odoo 13 through 19
development, and common Odoo engineering workflows.

WPMoo Skills for Odoo is an independent project and is not affiliated with,
endorsed by, or sponsored by Odoo S.A. Odoo is a trademark of Odoo S.A.

These skills are intentionally not project-specific. Project or module-specific
agent guidance should live in that project/module's own `AGENTS.md` or custom
skill files.

## Skills

```text
skills/
├── odoo-13/
│   ├── SKILL.md
│   ├── references/
│   └── scripts/
├── odoo-14/
│   ├── SKILL.md
│   ├── references/
│   └── scripts/
├── odoo-15/
│   ├── SKILL.md
│   ├── references/
│   └── scripts/
├── odoo-16/
│   ├── SKILL.md
│   ├── references/
│   └── scripts/
├── odoo-17/
│   ├── SKILL.md
│   ├── references/
│   └── scripts/
├── odoo-18/
│   ├── SKILL.md
│   ├── references/
│   └── scripts/
├── odoo-19/
│   ├── SKILL.md
│   ├── references/
│   └── scripts/
├── odoo-addon-factory/
│   └── SKILL.md
├── odoo-deployment-ops/
│   └── SKILL.md
├── odoo-frontend/
│   └── SKILL.md
├── odoo-i18n-l10n/
│   └── SKILL.md
├── odoo-integrations/
│   └── SKILL.md
├── odoo-migration-openupgrade/
│   └── SKILL.md
├── odoo-oca/
│   └── SKILL.md
├── odoo-oca-quality/
│   └── SKILL.md
├── odoo-open-core/
│   └── SKILL.md
├── odoo-performance/
│   └── SKILL.md
├── odoo-portal/
│   └── SKILL.md
├── odoo-portal-design-system/
│   └── SKILL.md
├── odoo-porting/
│   └── SKILL.md
├── odoo-security-review/
│   └── SKILL.md
└── odoo-testing/
    └── SKILL.md
```

## Version-specific Odoo skills

The version skills are intentionally self-contained:

- `odoo-13` covers Odoo 13.0 addon development, including legacy XML asset
  bundle inheritance, `tree` list-view roots, multi-company migration cautions,
  OCA migration notes, official source links, and a quick heuristic validator.
- `odoo-14` covers Odoo 14.0 addon development, including legacy JavaScript and
  assets, `tree` list-view roots, explicit action/report record guidance, OCA
  migration notes, official source links, and a quick heuristic validator.
- `odoo-15` covers Odoo 15.0 addon development, including manifest asset
  bundles, `tree` list-view roots, `attrs`/`states` modifiers, OCA migration
  notes, official source links, and a quick heuristic validator.
- `odoo-16` covers Odoo 16.0 addon development, including manifest asset
  bundles, `tree` list-view roots, Owl/frontend notes, OCA migration notes,
  official source links, and a quick heuristic validator.
- `odoo-17` covers Odoo 17.0 addon development, including the 17.0 `tree`
  list-view root, direct XML modifiers, OCA migration notes, official source
  links, and a quick heuristic validator.
- `odoo-18` covers Odoo 18.0 addon development, including the `list` view root,
  `list,form` action modes, HOOT/frontend testing notes, official source links,
  and a quick heuristic validator.
- `odoo-19` covers Odoo 19.0 addon development, including `models.Constraint`
  and index declarations, 19.0 CLI/module update notes, JSON-RPC controller
  naming, OCA 19 migration notes, official source links, and a quick heuristic
  validator.

Each version directory includes:

- `SKILL.md` for the workflow and trigger guidance.
- `references/` for official Odoo/OCA source maps and detailed backend,
  frontend, security, testing, OCA, and migration guidance.
- `scripts/validate-addon.mjs` for fast local checks of manifest version,
  list-view root syntax, action mode syntax, and version-specific UI/API
  compatibility issues.

Example:

```bash
node .agents/skills/odoo-19/scripts/validate-addon.mjs addons/my_addon
```

## Domain workflow skills

The domain skills cover recurring Odoo engineering workflows that are shared
across versions:

- `odoo-addon-factory` for creating new addons with OCA-compatible structure,
  manifests, security, views, tests, and documentation.
- `odoo-oca-quality` for OCA repository hygiene, pre-commit, linting, README,
  versioning, and review readiness.
- `odoo-testing` for Python, HTTP, frontend, tour, and install/update tests.
- `odoo-security-review` for ACLs, record rules, field groups, controller
  security, `sudo()` usage, RPC exposure, and multi-company access.
- `odoo-migration-openupgrade` for OCA/OpenUpgrade migration planning, scripts,
  noupdate handling, XML ID stability, and migration PR flow.
- `odoo-frontend` for legacy JS, manifest assets, Owl, registries, templates,
  QUnit/tour/HOOT differences, and version-specific frontend checks.
- `odoo-performance` for ORM batching, query reduction, computed field cost,
  indexes, profiling, and safe SQL usage.
- `odoo-integrations` for controllers, webhooks, cron, queues, retries,
  idempotency, credentials, and external API boundaries.
- `odoo-i18n-l10n` for translations, `.pot`/`.po` updates, multi-language
  behavior, localization addons, and l10n-sensitive tests.
- `odoo-deployment-ops` for Odoo config, workers, cron workers, addons path,
  filestore, backups, Docker, upgrades, and operational checks.

## Pi package usage

```bash
pi install npm:@wpmoo/odoo-skills
```

Project-local install with Pi:

```bash
pi install -l npm:@wpmoo/odoo-skills
```

## npx project-local install

```bash
npx @wpmoo/odoo-skills install
```

or:

```bash
npx @wpmoo/odoo-skills --target /path/to/project
```

This copies the skills into:

```text
.agents/skills/
```

## CLI usage

The current CLI package for this skill set is `@wpmoo/toolkit`.

For day-to-day workspace commands, use `npx @wpmoo/toolkit ...` from the workspace
or controlling repository:

```bash
npx @wpmoo/toolkit doctor
npx @wpmoo/toolkit snapshot
npx @wpmoo/toolkit restore-snapshot
```

Generated Odoo development environments provide a local wrapper. From inside
one of those generated environments, use `./moo ...`:

```bash
./moo doctor
./moo resetdb
./moo lint
./moo pot
```

Useful current commands include:

- `doctor` to inspect environment health.
- `snapshot` before risky local changes.
- `restore-snapshot` to return to a saved local state.
- `resetdb` for clean install/update checks.
- `lint` for configured project quality checks.
- `pot` when translation templates need regeneration.

The old `@wpmoo/odoo` and `@wpmoo/odoo-dev` package names should only appear in
deprecated compatibility notes. New documentation and examples should use
`@wpmoo/toolkit`.

## Support

If this project helps you, you can support the work here:

<a href="https://www.buymeacoffee.com/cangir">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" width="250">
</a>
