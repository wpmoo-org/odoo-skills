# Backend ORM For Odoo 19.0

## Model classes

- Use `models.Model` for persistent business records.
- Use `models.TransientModel` for wizards and short-lived records.
- Use `models.AbstractModel` for shared behavior without its own table.
- Set `_description` on new models.
- Use `_inherit` without `_name` to extend an existing model in place.
- Use `_inherit` with `_name` only when creating a new delegated/derived model
  intentionally.

## Fields

- Define fields as class attributes and do not define methods with the same
  name.
- Use explicit `string`, `help`, `required`, `readonly`, `index`,
  `tracking`, and `copy` where behavior matters.
- Use `check_company=True` for company-dependent relational fields.
- Stored computed fields need complete `@api.depends` declarations.
- Non-stored computed fields that must be searchable need a `search` method. In
  new 19.0 code, search methods should return a `Domain` where the target code
  already uses Odoo domain objects.
- Related fields that participate in reporting or domains usually need
  `store=True`.
- Prefer `odoo.fields.Domain` / `odoo.Domain` style domain objects where the
  codebase has adopted them. Do not mix styles inside a small change without a
  reason.

## Constraints and indexes

Odoo 19.0 documents first-class constraint and index declarations:

```python
from odoo import models


class MyModel(models.Model):
    _name = "my.model"
    _description = "My Model"

    _code_company_uniq = models.UniqueIndex(
        "(code, company_id)",
        "The code must be unique per company.",
    )
    _positive_amount_check = models.Constraint(
        "CHECK (amount >= 0)",
        "The amount must be positive.",
    )
```

Use Python constraints for business rules that cannot be expressed safely in
SQL:

```python
from odoo import api, models
from odoo.exceptions import ValidationError


class MyModel(models.Model):
    _name = "my.model"

    @api.constrains("date_start", "date_end")
    def _check_dates(self):
        for record in self:
            if record.date_end and record.date_start > record.date_end:
                raise ValidationError("The end date must be after the start date.")
```

Existing modules may still contain older `_sql_constraints`. Do not rewrite them
mechanically unless the task is specifically a 19.0 modernization and tests cover
the migration path.

## 19.0 migration cautions

- Public addon imports should remain `from odoo import api, fields, models`.
  Treat `odoo/orm/*` as source-layout detail unless a migration explicitly
  requires deeper inspection.
- Replace `odoo.osv.expression` usage with Domain objects where practical.
- Use `record.env.cr`, `record.env.uid`, and `record.env.context` instead of
  deprecated `record._cr`, `record._uid`, and `record._context`.
- Prefer `_read_group` for backend aggregation. Use `formatted_read_group` where
  formatted/public API behavior is intended.
- Replace `auto_join` with `bypass_search_access` when following the OCA 19
  migration guidance and the target field semantics match.
- Replace `toggle_active` calls with explicit `action_archive` or
  `action_unarchive`.
- Import `SUPERUSER_ID` from `odoo.api` where a 19.0 migration requires it.
- Replace `@ormcache_context` with `@ormcache` and explicit context parameters
  when porting cached methods.
- Update `name_search(args=...)` overrides to the newer `domain` parameter name
  where required by the target method signature.

## CRUD overrides

- Always call `super()` exactly once unless there is a documented reason.
- Support multi-record `create` with `@api.model_create_multi`.
- Keep `write` and `unlink` valid for multi-recordsets.
- Use `@api.ondelete(at_uninstall=False)` for business unlink checks.
- Never call `cr.commit()` in business logic.

## ORM safety

- Prefer ORM methods over raw SQL.
- If SQL is required, parameterize every value. Never concatenate user input.
- Prefer Odoo's SQL wrapper/composition helpers for complex SQL.
- Public model methods can be invoked through RPC. Validate access, record
  state, and arguments before side effects.
- Use `@api.private` for non-underscore methods that must not be externally
  callable.
- Avoid `sudo()` unless the escalation is required and scoped to the exact
  operation.
- Use recordsets, `filtered`, `mapped`, and `sorted` for readable ORM code.
