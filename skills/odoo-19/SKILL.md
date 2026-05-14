---
name: odoo-19
description: Use when creating, editing, reviewing, testing, or porting Odoo 19.0 addons with official Odoo 19 developer APIs and OCA-compatible conventions.
---

# Odoo 19.0 Addon Development

Use this skill for Odoo 19.0 work. Keep the target branch, manifest version,
runtime commands, and source links pinned to 19.0 unless the user explicitly
asks for a cross-version port.

## First steps

1. Confirm the addon repository branch is `19.0` or that the task explicitly
   targets Odoo 19.0.
2. Inspect the addon manifest and touched files before editing.
3. Prefer official Odoo 19.0 documentation and the `odoo/odoo` `19.0` branch
   for API behavior. Use OCA sources only for OCA conventions.
4. If the work is a migration, port, or compatibility fix, read
   `references/porting-upgrade.md` before changing code.

## Load references as needed

- `references/official-sources.md`: source map for official Odoo and OCA URLs.
- `references/module-anatomy.md`: addon structure, manifests, data ordering.
- `references/backend-orm.md`: models, fields, computed fields, constraints,
  CRUD overrides, command tuples, ORM safety.
- `references/security-data.md`: ACLs, record rules, groups, XML/CSV data,
  external IDs, noupdate records, controller security.
- `references/ui-frontend.md`: views, actions, menus, reports, assets,
  JavaScript, Owl, QWeb, website and controllers.
- `references/testing-quality-oca.md`: Odoo tests, JS tests, OCA linting,
  README fragments, review checklist.
- `references/porting-upgrade.md`: upgrade scripts, upgrade utils, forward-port
  rules, 19.0-specific compatibility checks.

## Odoo 19.0 defaults

- Manifest versions must start with `19.0`, for example `19.0.1.0.0`.
- List views use the `list` root element; `tree` is the previous name.
- Do not introduce legacy `attrs` or `states` XML modifiers. Use direct view
  expressions such as `invisible`, `readonly`, and `required`.
- Prefer `models.Constraint`, `models.Index`, and `models.UniqueIndex` for new
  SQL constraints and indexes.
- Keep public model methods defensive: public methods can be called through RPC,
  so validate records, arguments, access rights, and state before side effects.
- Use the 19.0 CLI `module upgrade --outdated` behavior when the task is about
  updating only modules with newer manifest versions on disk.

## OCA-compatible development rules

- Keep one Odoo major version per branch.
- Keep every addon in a top-level addon directory.
- Use small, composable addons with minimal explicit dependencies.
- Community addons must not depend on private/pro/customer addons.
- Use `LGPL-3` or `AGPL-3` according to repository policy.
- Follow OCA manifest versioning: `19.0.x.y.z`.
- Keep generated `README.rst` output separate from source fragments when a repo
  uses OCA README tooling.

## Local helper

Run the bundled quick check against an addon or addon repository:

```bash
node skills/odoo-19/scripts/validate-addon.mjs /path/to/addons-or-addon
```

This is a fast heuristic check only. It does not replace installing/updating the
addon in an Odoo 19.0 database.

## Verification

Use the repository's configured checks first. Common OCA-compatible order:

```bash
pre-commit run -a
odoo-bin -d test_db --addons-path=/path/to/addons -i addon_name --test-enable --stop-after-init
odoo-bin -d test_db --addons-path=/path/to/addons -u addon_name --test-enable --stop-after-init
```

When WPMoo tooling is present, use the current command standard:

```bash
npx @wpmoo/odoo doctor
./moo lint
./moo resetdb
./moo pot
```

## Done criteria

- Manifest version, license, dependencies, data order, and installability match
  Odoo 19.0.
- Security files grant the minimum required access and record rules are tested.
- Views use Odoo 19.0 syntax and avoid legacy modifiers.
- Python, XML, JS, and translation changes pass configured linters.
- The addon installs or updates cleanly in a 19.0 database with relevant tests.
