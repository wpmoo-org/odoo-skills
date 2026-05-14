# Porting And Upgrade For Odoo 17.0

## Branch policy

- Keep Odoo 17.0 code on a `17.0` branch.
- Forward-port one major version at a time: `17.0 -> 18.0 -> 19.0`.
- Do not mix functional changes with mechanical porting unless the user asks.
- Preserve reviewable commits.

## Upgrade scripts

Odoo upgrade scripts use:

```text
addon_name/migrations/17.0.1.0.1/pre-migration.py
addon_name/migrations/17.0.1.0.1/post-migration.py
addon_name/migrations/17.0.1.0.1/end-migration.py
```

Each script exposes:

```python
def migrate(cr, version):
    ...
```

Use upgrade utils for model, field, XML ID, and module operations when
available. Keep cursor operations parameterized.

## 17.0 compatibility checks

- List view root is `tree` in 17.0.
- New code should avoid legacy `attrs` and `states` modifiers.
- `_sql_constraints` is the documented SQL constraint mechanism in 17.0.
- Review frontend code against 17.0 Owl and web client APIs, not latest/master.

## Porting to 18.0

- Change manifest version prefix to `18.0`.
- Convert list view roots from `tree` to `list`.
- Convert action/view mode references from `tree` to `list`.
- Re-test XPath inheritance because renamed roots can break inherited views.
- Re-run install and update tests in an 18.0 database.

## Porting to 19.0

- Change manifest version prefix to `19.0`.
- Use `list` view roots.
- Prefer `models.Constraint`, `models.Index`, and `models.UniqueIndex` for new
  Odoo 19.0 constraint/index code.
- Re-check frontend imports, services, registries, and asset bundles against
  19.0 documentation and source.
