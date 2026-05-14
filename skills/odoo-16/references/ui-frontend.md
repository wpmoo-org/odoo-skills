# UI And Frontend

## Views

- Use `<tree>` for list views in Odoo 16.
- Use `view_mode="tree,form"` on actions.
- Use `attrs` and `states` for dynamic modifiers. This is the correct Odoo 16
  pattern.
- Use static modifiers such as `invisible="1"` only for unconditional behavior.
- Include fields referenced by `attrs`, domains, or contexts in the view when
  the client needs them.
- Use `column_invisible` when a whole tree column should be hidden.
- Keep inherited views narrow: stable XPath targets, one clear intent, and no
  broad replacement of unrelated nodes.
- Keep XML IDs stable across migrations.

## Actions, Menus, Reports

- Keep `ir.actions.act_window` records explicit: `name`, `res_model`,
  `view_mode`, `domain`, `context`, and help text when useful.
- Menus should reference actions and groups, but security still belongs in ACLs,
  record rules, and fields.
- QWeb reports are `ir.actions.report` records with report templates and paper
  formats when needed.

## Frontend Assets

- Use the manifest `assets` key for Odoo 16 bundles.
- Use `/** @odoo-module **/` in native JavaScript modules.
- Put backend UI code in `web.assets_backend`, frontend website code in the
  relevant website bundle, and tests in the test bundle used by the repository.
- In Odoo 16, XML templates belong in regular asset bundles; do not use old
  `web.assets_qweb` patterns unless the target repository proves it is needed.
- Keep Owl components small and use `setup()` for initialization.
- Avoid importing private web internals when a public service, hook, registry,
  or component extension point exists.

