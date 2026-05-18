---
name: odoo-porting
description: Use when forward-porting or backporting Odoo addons between Odoo version branches, especially OCA-style branches such as 13.0 through 19.0.
---

# Odoo Addon Porting

Use this skill when moving addon changes between Odoo major-version branches.

## Branch rules

- OCA-style branches are named after Odoo versions: `13.0` through `19.0`.
- Prefer forward-porting one version at a time, for example `17.0 -> 18.0 -> 19.0`.
- Do not mix unrelated features while porting.
- Keep the source branch and target branch histories reviewable.

## Port checklist

1. Confirm source and target Odoo versions.
2. Review manifest version and dependencies.
3. Review Python API changes for the target Odoo version.
4. Review XML view syntax changes for the target Odoo version.
5. Review security CSV and record rules.
6. Install/update the addon in the target version.
7. Run available tests and pre-commit checks.

## Version routing

- Load the target version skill before changing syntax-sensitive code:
  `odoo-13`, `odoo-14`, `odoo-15`, `odoo-16`, `odoo-17`, `odoo-18`, or
  `odoo-19`.
- Odoo 13 and 14 ports often involve legacy decorators, data ordering, asset XML
  inheritance, and multi-company behavior.
- Odoo 15 and 16 ports must review manifest asset bundles while keeping
  `<tree>` list views and `attrs`/`states`.
- Odoo 17 ports must convert view modifiers to direct expressions while keeping
  `<tree>`.
- Odoo 18 and 19 ports must convert list view roots and action modes to
  `<list>` and `list,form`.
- Odoo 19 ports must review ORM/API changes such as `models.Constraint`,
  Domain usage, and JSON-RPC route naming.

## Tooling

If `oca-port` is available and the repository follows OCA conventions, prefer it
for repetitive porting mechanics. Still review the result manually.

When a repository uses WPMoo tooling, use the current command standard in
examples and instructions:

- Use `npx @wpmoo/toolkit ...` for day-to-day workspace commands.
- Use `./moo ...` inside generated Odoo development environments.
- Run `doctor` before environment-sensitive porting work.
- Use `snapshot` before porting or migration experiments and `restore-snapshot`
  when returning to a saved local state.
- Use `resetdb` for clean target-version install/update checks.
- Use `lint` for configured project checks.
- Use `pot` when the port changes translatable strings.

Do not recommend `@wpmoo/odoo` or `@wpmoo/odoo-dev` except in explicit deprecated-compatibility
documentation.

## Done criteria

- Target branch has the intended functional change only.
- Manifest version starts with the target Odoo version.
- Addon installs/updates cleanly in the target Odoo version.
- Tests and pre-commit checks pass or limitations are reported clearly.
