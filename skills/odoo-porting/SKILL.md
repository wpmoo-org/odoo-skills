---
name: odoo-porting
description: Use when forward-porting or backporting Odoo addons between Odoo version branches, especially OCA-style branches such as 17.0, 18.0, and 19.0.
---

# Odoo Addon Porting

Use this skill when moving addon changes between Odoo major-version branches.

## Branch rules

- OCA-style branches are named after Odoo versions: `16.0`, `17.0`, `18.0`, `19.0`.
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

## Odoo 19 reminders

- Replace old tree view declarations with `<list>` where needed.
- Replace `attrs`/`states` patterns with direct expressions where applicable.
- Prefer `models.Constraint` for new constraints.
- Use `@api.ondelete(at_uninstall=False)` for business delete validation.

## Tooling

If `oca-port` is available and the repository follows OCA conventions, prefer it
for repetitive porting mechanics. Still review the result manually.

## Done criteria

- Target branch has the intended functional change only.
- Manifest version starts with the target Odoo version.
- Addon installs/updates cleanly in the target Odoo version.
- Tests and pre-commit checks pass or limitations are reported clearly.
