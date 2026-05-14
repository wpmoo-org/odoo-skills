---
name: odoo-oca-quality
description: Use when reviewing or improving Odoo addons for OCA-compatible quality, including manifests, repository layout, linting, README fragments, dependency hygiene, data files, and review readiness.
---

# Odoo OCA Quality

Use this skill for OCA-style quality passes on existing Odoo addons. Pair it
with `odoo-oca` for broad conventions and the target `odoo-13` through
`odoo-19` skill for version-specific checks.

## Review scope

Inspect the addon, not only the changed lines:

- `__manifest__.py`, `__init__.py`, and package imports.
- `models/`, `security/`, `views/`, `data/`, `demo/`, `tests/`, and `readme/`.
- Generated files, caches, logs, local databases, and secrets that must not be
  committed.
- Existing repository tooling: `.pre-commit-config.yaml`, pylint config,
  README generation, test scripts, and CI commands.

## Quality checklist

- Branch and manifest version target one Odoo major version.
- Manifest has a short `summary`, explicit `depends`, correct `license`, and no
  empty filler keys.
- Community addons do not depend on pro/private/customer addons.
- XML IDs are stable and not unnecessarily prefixed with the module name inside
  the same module.
- Data files load in dependency order: groups, ACLs, rules, data, views, menus.
- Views avoid brittle XPaths and avoid `position="replace"` unless justified.
- User-facing strings are translatable.
- README fragments are source of truth when OCA README tooling is used; do not
  hand-edit generated `README.rst`.
- Tests cover business logic, security, and regressions for changed behavior.

## Lint and formatting

Prefer project-configured commands over generic guesses. Common OCA checks:

```bash
pre-commit run -a
pylint-odoo --valid-odoo-versions=<major>.0 addon_name
```

When WPMoo tooling is present, use:

```bash
npx @wpmoo/odoo doctor
./moo lint
./moo pot
```

Run `pot` only when translatable strings changed or repository policy requires
translation template refresh.

## Review posture

- Report concrete findings with file paths and line numbers.
- Separate blocking install/security issues from style cleanup.
- Prefer minimal fixes that match existing repository style.
- Do not rewrite working addon structure for aesthetics.
- Do not introduce new tools or config unless the repository already uses them
  or the user asks.

## Done criteria

- The addon is installable for the intended Odoo version.
- OCA-style manifest, dependency, license, README, lint, and test expectations
  are satisfied.
- Remaining risks are explicit, especially skipped tests or unavailable local
  Odoo services.
