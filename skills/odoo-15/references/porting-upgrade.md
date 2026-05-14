# Porting And Upgrade Notes For 15.0

## OCA Migration Workflow

- Use the OCA migration guide for 15.0 and the target repository's open issues.
- Port the addon on a `15.0` branch.
- Use migration pull request titles such as `[15.0][MIG] module_name`.
- Set the manifest version to a `15.0.x.y.z` value.
- Keep migration scripts under `migrations/<target-version>/` when data or
  schema migration is required.
- Keep XML IDs stable whenever possible.

## Common Migration Checks

- Odoo 15 uses manifest asset bundles; review old `qweb` and asset XML patterns
  during migration.
- Keep list views as `<tree>`.
- Preserve `attrs` and `states`; converting to Odoo 17+ direct modifier
  expressions is wrong for 15.0.
- Review renamed fields, models, actions, menus, and views in dependencies.
- Re-run tests and lint after every migration chunk.

## Upgrade Scripts

- Use migration scripts for data transformations that cannot be represented by
  XML updates.
- Keep scripts retry-friendly.
- Do not delete user data without an explicit migration reason and a test.
- Prefer ORM operations unless raw SQL is necessary.

