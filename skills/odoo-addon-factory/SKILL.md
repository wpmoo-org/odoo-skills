---
name: odoo-addon-factory
description: Use when creating or reshaping Odoo addons from a functional request, especially when choosing module boundaries, manifests, model files, security data, views, tests, and OCA-compatible structure.
---

# Odoo Addon Factory

Use this skill to turn a functional request into a clean Odoo addon plan and
implementation. Pair it with the target version skill (`odoo-13` through
`odoo-19`) for version-specific APIs, XML syntax, commands, and validators.

## First decisions

1. Confirm the target Odoo major version and repository branch.
2. Identify whether the addon is community, pro/private, or customer-specific.
3. Choose the smallest useful addon boundary. Split unrelated features.
4. Inspect existing addons for naming, dependency, security, and test patterns.
5. Load the matching version skill before using version-sensitive syntax.

## Addon shape

Default to an OCA-compatible layout and omit directories that are not needed:

```text
addon_name/
|-- __init__.py
|-- __manifest__.py
|-- models/
|-- security/
|-- views/
|-- data/
|-- demo/
|-- tests/
|-- readme/
`-- static/
```

Use lowercase ASCII module names with underscores. Put each model in a clear
file under `models/`, import files from `models/__init__.py`, and import
subpackages from the addon root `__init__.py`.

## Manifest baseline

- `version` starts with the target branch, for example `18.0.1.0.0`.
- `depends` is minimal, explicit, and never reaches from community into private
  or pro addons.
- Load security groups before `security/ir.model.access.csv`.
- Load views after the records, groups, and actions they reference.
- Use `LGPL-3`, `AGPL-3`, `OPL-1`, or project policy deliberately.
- Leave `installable` as `False` until the addon installs cleanly.

## Build order

1. Manifest and Python package imports.
2. Models, fields, constraints, and computed-field dependencies.
3. Security groups, ACLs, and record rules.
4. Views, actions, menus, reports, assets, and demo data.
5. Tests for core behavior, security, install/update, and regression cases.
6. README fragments or documentation required by the repository.

## Safety rules

- Menus and view invisibility do not secure data; add model ACLs and record
  rules.
- Public model methods can be called through RPC; validate records, arguments,
  access rights, and states before side effects.
- Avoid raw SQL unless the ORM cannot express the operation safely.
- Do not add cron jobs, external calls, or automated mail without tests and
  explicit user approval.

## Verification

Run the repository checks first. Common order:

```bash
pre-commit run -a
odoo-bin -d test_db --addons-path=/path/to/addons -i addon_name --test-enable --stop-after-init
odoo-bin -d test_db --addons-path=/path/to/addons -u addon_name --test-enable --stop-after-init
```

When WPMoo tooling is present, prefer `npx @wpmoo/toolkit doctor`, `./moo lint`,
`./moo resetdb`, and `./moo pot` where applicable.

## Done criteria

- Addon boundary and dependencies are reviewable.
- Manifest, imports, security, views, data order, and tests match the target
  Odoo version.
- Install and update paths pass or limitations are reported clearly.
