# Porting And Upgrade For Odoo 19.0

## Branch policy

- Keep Odoo 19.0 code on a `19.0` branch.
- Forward-port one major version at a time: `17.0 -> 18.0 -> 19.0`.
- Do not mix functional changes with mechanical porting unless the user asks.
- Preserve reviewable commits.

## Upgrade scripts

Odoo upgrade scripts use:

```text
addon_name/migrations/19.0.1.0.1/pre-migration.py
addon_name/migrations/19.0.1.0.1/post-migration.py
addon_name/migrations/19.0.1.0.1/end-migration.py
```

Each script exposes:

```python
def migrate(cr, version):
    ...
```

Use upgrade utils for model, field, XML ID, and module operations when
available. Keep cursor operations parameterized.

## 18.0 to 19.0 compatibility checks

- Keep list view roots as `list`.
- Keep direct XML modifiers and do not reintroduce `attrs` or `states`.
- Prefer `models.Constraint`, `models.Index`, and `models.UniqueIndex` for new
  19.0 SQL constraint/index code.
- Check XML group/search/list attributes against 19.0 view architecture docs.
- Review OCA 19 renamed technical fields such as `groups_id` to `group_ids` and
  `res.groups.category_id` to `privilege_id`.
- Confirm manifest dependencies still exist and are installable in 19.0.
- Re-check frontend imports, services, registries, and asset bundles against
  19.0 documentation and source.

## Odoo 19 CLI notes

- Use `odoo-bin module install <modules>` for direct installs.
- Use `odoo-bin module upgrade <modules>` for direct upgrades.
- Use `odoo-bin module upgrade all --outdated` when the goal is to upgrade only
  installed modules whose manifest version on disk is newer than the database
  version.
- Use `odoo-bin upgrade_code --from 18.0 --to 19.0 --dry-run` only as a helper;
  review all rewrites manually.
- During OCA migrations, remove previous-version migration directories, run
  pre-commit auto-fixes separately, and avoid changing copyright years only
  because of a migration.
