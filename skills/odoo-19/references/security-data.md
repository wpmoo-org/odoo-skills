# Security And Data For Odoo 19.0

## Access control

- Define groups in XML before using them in access CSV or record rules.
- Define model access in `security/ir.model.access.csv`.
- Menus do not secure models; model security requires ACLs and, where needed,
  record rules.
- Grant the least access that makes the workflow usable.
- Record rules are evaluated after access rights and are default-allow when no
  rule applies, so test both allowed and forbidden cases.
- Multiple global record rules intersect and can lock users out. Group rules
  unify within global-rule bounds.
- Field-level `groups` removes restricted fields from views and field metadata;
  do not rely only on UI hiding for sensitive data.

## Data files

- Use stable external IDs.
- Do not prefix XML IDs with the module name inside the same module.
- Use `noupdate="1"` only for records that must not be overwritten on module
  update, such as sequences or user-edited defaults.
- Treat `--reinit`/init-mode reloads of `noupdate` records as development or
  debugging operations, not production update strategy.
- Keep demo records in `demo/`; never depend on demo data in normal operation.
- Group XML records by model where possible.

## XML conventions

```xml
<odoo>
    <record id="my_model_group_user" model="res.groups">
        <field name="name">User</field>
        <field name="category_id" ref="base.module_category_hidden"/>
    </record>
</odoo>
```

- Put `id` before `model` on `record`.
- Put `name` first on `field`.
- Use four spaces for XML indentation.
- Avoid `position="replace"` in inherited views unless there is no safer
  target; add a comment explaining why if it is unavoidable.

## Controller security

- Explicitly choose `auth="user"`, `auth="public"`, or `auth="none"`.
- Public routes must validate input, ownership, and access rights.
- Use `request.env.user` and ORM checks for user-specific records.
- Use CSRF protection for unsafe HTTP methods unless there is a documented API
  reason not to.
- Escape user-provided text in HTML and QWeb contexts.
