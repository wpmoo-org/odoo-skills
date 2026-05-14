# Module, Backend, And Security

## Module Anatomy

- Keep the standard addon layout: `__manifest__.py`, `__init__.py`, `models/`,
  `views/`, `security/`, `data/`, `demo/`, `controllers/`, `wizard/`,
  `report/`, `tests/`, `migrations/`, and `static/src/` as needed.
- OCA-style repositories should use README fragments and generated README
  output according to the repository template.
- For OCA-style 14.0 addons, manifest versions should start with `14.0.`.
- Declare `base` explicitly in `depends` unless the repository policy says
  otherwise.
- Keep data file ordering deterministic; XML and CSV files are processed in
  manifest order.
- Put long description, usage, known issues, contributors, and changelog content
  in README fragments.

## ORM

- Use `@api.model_create_multi` for `create`.
- Treat recordsets as multi-record by default.
- Use `ensure_one()` only when singleton behavior is required.
- Avoid field and method name collisions; the last class attribute silently
  wins in Python.
- Computed fields must assign a value for every record. Use `store=True` only
  when stored values are required and dependencies are complete.
- Writable computed fields need an inverse method.
- Do not perform CRUD on `@api.onchange` pseudo-records.
- Use `_sql_constraints` for simple database guarantees and
  `@api.constrains` for ORM-aware business rules.
- Avoid direct commits and raw SQL. If raw SQL is necessary, use parameters and
  handle cache invalidation.

## Security

- Define model access in `security/ir.model.access.csv`.
- Add record rules for row-level access when data isolation matters. After ACLs,
  no matching record rule means default-allow for records.
- ACLs are additive; record rules are the row-level layer.
- Menus, actions, and invisible fields do not replace ACLs, record rules, or
  field `groups`.
- Restrict sensitive fields with `groups` in Python declarations.
- Public model methods are RPC-callable unless their name starts with `_`; do
  not trust parameters or recordsets in public methods.
- Use `sudo()` only when the security and multi-company effect is intentional.
- When overriding controllers, redecorate methods with `@route`; otherwise the
  route can be unpublished.
- Unsafe HTTP methods have CSRF enabled by default; webhook-like routes need
  alternate validation if CSRF is disabled.

