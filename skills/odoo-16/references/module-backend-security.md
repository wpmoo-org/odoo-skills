# Module, Backend, And Security

## Module Anatomy

- Keep the standard addon layout: `__manifest__.py`, `__init__.py`, `models/`,
  `views/`, `security/`, `data/`, `demo/`, `wizard/`, `report/`, `tests/`, and
  `static/` as needed.
- OCA-style repositories should use README fragments and generated README
  output according to the repository template.
- For OCA-style 16.0 addons, manifest versions should start with `16.0.`.
- Prefer explicit manifest keys. Remove empty `data`, `demo`, `assets`, or
  dependency sections when the repository policy does not require them.
- Put long descriptions, usage notes, known issues, contributors, and changelog
  content in README fragments instead of overloading the manifest.

## ORM

- Use `@api.model_create_multi` for `create`.
- Treat recordsets as multi-record by default. Do not assume `self` is a
  singleton unless `ensure_one()` is intentional.
- Prefer computed fields with complete `@api.depends` declarations.
- Use inverse and search methods only when the behavior is actually needed.
- Use `_sql_constraints` for simple database guarantees and
  `@api.constrains` for business rules that need ORM context.
- Use Odoo command helpers or command tuples according to the existing codebase
  style. Keep many2many/one2many commands explicit and readable.
- Avoid direct commits, environment mutation, and raw SQL unless the ORM cannot
  express the operation safely.
- When raw SQL is necessary, use parameters and invalidate or recompute caches
  according to the ORM reference.

## Security

- Define model access in `security/ir.model.access.csv`.
- Add record rules for row-level access. If no applicable rule exists, Odoo's
  default behavior is permissive for records after model access passes.
- Menus, actions, and invisible fields are usability controls; they do not
  replace model access, record rules, or field `groups`.
- Restrict sensitive fields with `groups` in Python field declarations when
  field-level access matters.
- Public controller methods and model methods callable through RPC must validate
  inputs and access rights explicitly.
- When overriding controllers, redecorate methods with `@route`; otherwise the
  route can be unpublished.

