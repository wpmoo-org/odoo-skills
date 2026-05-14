# Porting And Upgrade For Odoo 18.0

## Branch policy

- Keep Odoo 18.0 code on an `18.0` branch.
- Forward-port one major version at a time: `17.0 -> 18.0 -> 19.0`.
- Do not mix functional changes with mechanical porting unless the user asks.
- Preserve reviewable commits.

## Upgrade scripts

Odoo upgrade scripts use:

```text
addon_name/migrations/18.0.1.0.1/pre-migration.py
addon_name/migrations/18.0.1.0.1/post-migration.py
addon_name/migrations/18.0.1.0.1/end-migration.py
```

Each script exposes:

```python
def migrate(cr, version):
    ...
```

Use upgrade utils for model, field, XML ID, and module operations when
available. Keep cursor operations parameterized.

## 17.0 to 18.0 compatibility checks

- Convert list view roots from `tree` to `list`.
- Convert action/view mode references from `tree` to `list`.
- Re-test XPath inheritance because root element changes can break inherited
  views.
- Keep direct XML modifiers and do not reintroduce `attrs` or `states`.
- Confirm manifest dependencies still exist and are installable in 18.0.
- Keep official Odoo upgrade scripts and OCA/OpenUpgrade analysis separate:
  Odoo docs describe framework upgrade utilities; OCA/OpenUpgrade tracks
  community migration status and coverage.

## Porting to 19.0

- Change manifest version prefix to `19.0`.
- Keep `list` view roots.
- Prefer `models.Constraint`, `models.Index`, and `models.UniqueIndex` for new
  Odoo 19.0 constraint/index code.
- Re-check frontend imports, services, registries, and asset bundles against
  19.0 documentation and source.
