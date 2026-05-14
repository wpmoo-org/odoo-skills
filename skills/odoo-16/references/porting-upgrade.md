# Porting And Upgrade Notes For 16.0

## OCA Migration Workflow

- Use the OCA migration guide for 16.0 and the target repository's open issues.
- Port the addon on a `16.0` branch.
- Use migration pull request titles such as `[16.0][MIG] module_name`.
- Set the manifest version to a `16.0.x.y.z` value.
- Keep migration scripts under `migrations/<target-version>/` when data or
  schema migration is required.
- Keep XML IDs stable whenever possible.

## Common Migration Checks

- Replace deprecated or removed APIs only after checking the 16.0 source branch.
- Review renamed fields, models, actions, menus, and views in dependencies.
- Review frontend assets: Odoo 16 uses manifest `assets`; XML templates should
  be in regular bundles.
- Keep list views as `<tree>`.
- Preserve `attrs` and `states`; converting to Odoo 17+ direct modifier
  expressions is wrong for 16.0.
- Re-run tests and lint after every migration chunk.

## Upgrade Scripts

- Use migration scripts for data transformations that cannot be represented by
  XML updates.
- Keep scripts idempotent enough for upgrade retries.
- Do not delete user data without an explicit migration reason and a test.
- Prefer ORM operations unless raw SQL is necessary for performance or schema
  operations.

