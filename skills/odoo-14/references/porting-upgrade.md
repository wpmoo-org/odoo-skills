# Porting And Upgrade Notes For 14.0

## OCA Migration Workflow

- Use the OCA migration guide for 14.0 and the target repository's open issues.
- Port the addon on a `14.0` branch.
- Use migration pull request titles such as `[14.0][MIG] module_name`.
- Set the manifest version to a `14.0.x.y.z` value.
- Keep custom/OCA addon migration scripts under the addon's
  `migrations/<target-version>/` directory when needed.
- OpenUpgrade 14.0+ core migration scripts are under
  `openupgrade_scripts/scripts/`; do not confuse that with custom addon
  migration script locations.

## Common Migration Checks

- Review 14.0 XML changes, including explicit action/report records and view
  modifier syntax.
- Keep list views as `<tree>`.
- Preserve `attrs` and `states`; converting to Odoo 17+ direct modifier
  expressions is wrong for 14.0.
- Review renamed fields, models, actions, menus, and views in dependencies.
- Re-run tests and lint after every migration chunk.

## Upgrade Scripts

- Use migration scripts for data transformations that cannot be represented by
  XML updates.
- Keep scripts retry-friendly.
- Do not delete user data without an explicit migration reason and a test.
- Prefer ORM operations unless raw SQL is necessary.

