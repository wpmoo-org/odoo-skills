# Module, Backend, And Security

## Module Anatomy

- Keep the standard addon layout: `__manifest__.py`, `__init__.py`, `models/`,
  `views/`, `security/`, `data/`, `demo/`, `wizard/`, `report/`, `tests/`, and
  `static/` as needed.
- OCA-style repositories should use README fragments and generated README
  output according to the repository template.
- For OCA-style 15.0 addons, manifest versions should start with `15.0.`.
- Prefer explicit manifest keys and remove empty sections unless the repository
  policy requires them.
- Put long description, usage, known issues, contributors, and changelog content
  in README fragments.

## ORM

- Use `@api.model_create_multi` for `create`.
- Treat recordsets as multi-record by default.
- Prefer computed fields with complete `@api.depends` declarations.
- Use `_sql_constraints` for simple database guarantees and
  `@api.constrains` for ORM-aware business rules.
- Use Odoo command helpers where the target codebase already uses them;
  otherwise keep many2many/one2many command tuples explicit.
- Avoid direct commits and raw SQL. If raw SQL is necessary, use parameters and
  handle cache invalidation according to the ORM reference.

## Security

- Define model access in `security/ir.model.access.csv`.
- Add record rules for row-level access and test the important combinations.
- Menus, actions, and invisible fields do not replace ACLs, record rules, or
  field `groups`.
- Restrict sensitive fields with `groups` in Python declarations.
- Public controller methods and RPC-callable model methods must validate inputs
  and access rights.
- When overriding controllers, redecorate methods with `@route`.

