# Module, Backend, And Security

## Module Anatomy

- Keep the standard addon layout: `__manifest__.py`, `__init__.py`, imported
  Python packages, `models/`, `views/`, `security/`, `data/`, `demo/`,
  `controllers/`, `wizard/`, `report/`, `tests/`, `migrations/`, and
  `static/src/` as needed.
- The module directory must be on `addons_path`.
- OCA-style repositories should use README fragments and generated README
  output according to the repository template.
- For OCA-style 13.0 addons, manifest versions should start with `13.0.`.
- Keep data file ordering deterministic; XML and CSV files are processed in
  manifest order.
- Put long description, usage, known issues, contributors, and changelog content
  in README fragments.

## ORM

- Use `@api.model_create_multi` for `create`.
- Treat recordsets as multi-record by default.
- Do not introduce legacy decorators such as `@api.multi`, `@api.one`,
  `@api.returns`, `@api.cr`, or `@api.model_cr` in migrated code.
- Use `ensure_one()` only when singleton behavior is required.
- Computed fields must assign a value for every record. Stored computed fields
  can keep stale values when dependencies are incomplete.
- Writable computed fields need an inverse method.
- Do not perform CRUD on `@api.onchange` pseudo-records.
- Use `_sql_constraints` for simple database guarantees and
  `@api.constrains` for ORM-aware business rules.
- Odoo 13 multi-company behavior matters: use `env.company`, `force_company`,
  `company_dependent`, `_check_company_auto`, `check_company`, and
  `company_ids`-based rules deliberately.
- Avoid direct commits and raw SQL. If raw SQL is necessary, use parameters and
  handle cache invalidation.

## Security

- Define model access in `security/ir.model.access.csv`.
- Add record rules for row-level access when data isolation matters. After ACLs,
  no matching record rule means default-allow for records.
- ACLs are additive; record rules are the row-level layer.
- Menus, actions, and invisible fields do not replace ACLs, record rules, or
  field `groups`.
- Public model methods are RPC-callable unless their name starts with `_`; do
  not trust parameters or recordsets in public methods.
- Use `sudo()` only when the security and multi-company effect is intentional.
- When overriding controllers, redecorate methods with `@route`.
- Unsafe HTTP methods have CSRF enabled by default; webhook-like routes need
  alternate validation if CSRF is disabled.

