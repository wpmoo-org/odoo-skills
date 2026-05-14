# UI And Frontend

## Views

- Use `<tree>` for list views in Odoo 15.
- Use `view_mode="tree,form"` on actions.
- Use `attrs` and `states` for dynamic modifiers. This is the correct Odoo 15
  pattern.
- Include fields referenced by `attrs`, domains, or contexts in the view when
  the client needs them.
- Use `column_invisible` when a whole tree column should be hidden.
- Keep inherited views narrow and stable.
- Keep XML IDs stable across migrations.

## Actions, Menus, Reports

- Keep `ir.actions.act_window` records explicit.
- Menus can be grouped for usability, but model access and record rules still
  enforce security.
- QWeb reports are `ir.actions.report` records with templates and paper formats
  when needed.

## Frontend Assets

- Use the manifest `assets` key for Odoo 15 bundles.
- Use `/** @odoo-module **/` when writing native JavaScript modules.
- Put backend UI code in `web.assets_backend`, frontend website code in the
  relevant website bundle, and tests in the repository's Odoo 15 test bundle.
- Odoo 15 projects can still contain older web patterns during migration; follow
  local conventions unless creating new code.
- Avoid Odoo 18+ HOOT-only test APIs.

