---
name: odoo-16
description: Use when creating, reviewing, migrating, or debugging Odoo 16.0 addons, especially OCA-style addons that need 16.0 ORM, view, asset, security, testing, or migration guidance.
---

# Odoo 16 Development Skill

Use this skill when creating, reviewing, migrating, or debugging Odoo 16.0
addons, especially OCA-style addons.

## First Steps

1. Confirm the target branch, dependency policy, and whether the addon belongs
   to an OCA repository or a private repository following OCA rules.
2. Read `references/official-sources.md` for the official Odoo 16 and OCA
   source map.
3. Pick the focused reference files for the task:
   - `references/module-backend-security.md`
   - `references/ui-frontend.md`
   - `references/testing-quality-oca.md`
   - `references/porting-upgrade.md`
4. Prefer local repository conventions over generic examples when they are
   stricter and still compatible with Odoo 16.0.

## Version Rules

- Target branch names and manifest versions must use `16.0`.
- XML list views use `<tree>`, not `<list>`.
- Action `view_mode` values use `tree,form`, not `list,form`.
- `attrs` and `states` are valid Odoo 16 view modifier mechanisms.
- Use manifest `assets` bundles for frontend assets.
- Do not add Odoo 17+ view modifier syntax, Odoo 18+ HOOT patterns, or Odoo 19
  ORM-only APIs unless the target repository already provides a compatibility
  layer.
- Follow OCA metadata, linting, README fragment, migration, and test
  conventions when the addon is OCA-style.

## Development Checklist

- Keep manifests explicit: `name`, `version`, `depends`, `license`, `author`,
  `website`, `data`, `demo`, and `assets` only when needed.
- Use `models.Model`, `models.TransientModel`, or `models.AbstractModel`
  according to persistence and API needs.
- Keep business constraints in Python unless an SQL constraint is the simpler
  durable guarantee.
- Use access CSV files and record rules for security. Menus and views are not
  security boundaries.
- Keep XML IDs stable and migration-friendly.
- Keep frontend code in Odoo 16 asset bundles and use `/** @odoo-module **/`
  for native JavaScript modules.
- Write focused tests and tag install-time or post-install tests deliberately.

## Validation

Run the bundled lightweight validator on an addon path before final review:

```bash
node skills/odoo-16/scripts/validate-addon.mjs /path/to/addon
```

Then run the repository's normal OCA checks, typically pre-commit hooks,
`pylint-odoo --valid-odoo-versions=16.0`, and Odoo tests with the right
database and `--test-tags`.
