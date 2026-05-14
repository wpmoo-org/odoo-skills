# Porting And Upgrade Notes For 13.0

## OCA Migration Workflow

- Use the OCA migration guide for 13.0 and the target repository's open issues.
- Port the addon on a `13.0` branch.
- Use migration pull request titles such as `[13.0][MIG] module_name`.
- Set the manifest version to a `13.0.x.y.z` value.
- Keep addon migration scripts under `migrations/<target-version>/` when data
  or schema migration is required.
- Keep XML IDs stable whenever possible.

## Common Migration Checks

- Remove legacy decorators such as `@api.multi` and `@api.one` from migrated
  code.
- Replace `sudo(user)` with `with_user(user)` when following OCA 13.0 migration
  guidance.
- Replace `track_visibility` with `tracking=True`.
- Remove old window-action fields such as `view_type` and `multi`.
- Review multi-company behavior carefully; Odoo 13 changed important company
  semantics.
- Keep list views as `<tree>`.
- Preserve `attrs` and `states`; converting to Odoo 17+ direct modifier
  expressions is wrong for 13.0.
- Re-run tests and lint after every migration chunk.

## Upgrade Scripts

- Use migration scripts for data transformations that cannot be represented by
  XML updates.
- Keep scripts retry-friendly.
- Do not delete user data without an explicit migration reason and a test.
- Prefer ORM operations unless raw SQL is necessary.

