# Backend ORM For Odoo 18.0

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
- Non-stored computed fields that must be searchable need a `search` method.
- Related fields that participate in reporting or domains usually need
  `store=True`.
- Odoo 18.0 stores `company_dependent` values as JSONB on the model table with
  company-id keys and `ir.default` fallback. Check actual storage before writing
  migrations that assume old-style `ir.property` rows.
- Avoid adding `precompute=True` reflexively; it can be counterproductive when
  records are created in batches.

## Constraints

Odoo 18.0 documents `_sql_constraints` for database constraints:

```python
_sql_constraints = [
    (
        "code_company_uniq",
        "unique(code, company_id)",
        "The code must be unique per company.",
    ),
]
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

## CRUD overrides

- Always call `super()` exactly once unless there is a documented reason.
- Support multi-record `create` with `@api.model_create_multi`.
- Keep `write` and `unlink` valid for multi-recordsets.
- Use `@api.ondelete(at_uninstall=False)` for business unlink checks where it
  is available in the target codebase.
- Never call `cr.commit()` in business logic.

## ORM safety

- Prefer ORM methods over raw SQL.
- If SQL is required, parameterize every value. Never concatenate user input.
- Recordsets are ordered collections and may contain duplicates; do not assume
  Python set semantics.
- Public model methods can be invoked through RPC. Validate access, record
  state, and arguments before side effects.
- Avoid `sudo()` unless the escalation is required and scoped to the exact
  operation.
- Use recordsets, `filtered`, `mapped`, and `sorted` for readable ORM code.
