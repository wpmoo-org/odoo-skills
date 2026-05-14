# UI And Frontend

## Views

- Use `<tree>` for list views in Odoo 14.
- Use `view_mode="tree,form"` on actions.
- Use `attrs` and `states` for dynamic modifiers. This is the correct Odoo 14
  pattern.
- Migration to 14.0 often moves dynamic `invisible` or `readonly` expressions
  into `attrs`.
- Include fields referenced by `attrs`, domains, or contexts in the view when
  the client needs them.
- Use `column_invisible` when a whole tree column should be hidden.
- Do not use removed shortcut tags such as `<act_window>` or `<report>` in
  OCA-style 14.0 migrations; use explicit records.
- Keep inherited views narrow and stable.
- Keep XML IDs stable across migrations.

## Data And Noupdate

- XML records are processed sequentially.
- Use external IDs consistently; they are the migration anchor.
- `noupdate="1"` changes update behavior. Updates that must alter noupdate
  records need explicit migration handling.
- Use CSV for access rights unless the repository has a reason to use XML.

## Frontend Assets

- Use Odoo 14 legacy asset patterns: XML bundle inheritance and `static/src/`
  files referenced by those bundles.
- Use `odoo.define` JavaScript modules and the legacy registries, services, and
  widgets available in Odoo 14.
- Do not use Odoo 15+ manifest `assets` bundles as the default for new 14.0
  code.
- Do not use Odoo 16+ Owl-first examples or Odoo 18+ HOOT-only test APIs.

