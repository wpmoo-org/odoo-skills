# UI And Frontend

## Views

- Use `<tree>` for list views in Odoo 13.
- Use `view_mode="tree,form"` on actions.
- Use `attrs` and `states` for dynamic modifiers. This is the correct Odoo 13
  pattern.
- Include fields referenced by `attrs`, domains, or contexts in the view when
  the client needs them.
- Use `column_invisible` when a whole tree column should be hidden.
- Keep inherited views narrow and stable.
- Keep XML IDs stable across migrations.

## Data And Noupdate

- XML records are processed sequentially.
- Use external IDs consistently; they are the migration anchor.
- `noupdate="1"` is install-only for normal module updates. Updates that must
  alter noupdate records need explicit migration handling.
- Use CSV for access rights unless the repository has a reason to use XML.

## Frontend Assets

- Do not use manifest `assets` in Odoo 13 addons.
- Add backend assets through XML bundle inheritance, then list the XML asset
  file in the manifest `data`.
- Use `odoo.define` JavaScript modules and the legacy registries, services, and
  widgets available in Odoo 13.
- Keep QWeb template files in the legacy frontend pattern used by the target
  repository.
- Do not use Odoo 15+ native module examples, Odoo 16+ Owl-first examples, or
  Odoo 18+ HOOT-only test APIs.

