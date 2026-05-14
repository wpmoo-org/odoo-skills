# UI And Frontend For Odoo 19.0

## Views

- Odoo 19.0 list views use the `list` root element. `tree` was the previous
  name and should not be introduced in new 19.0 code.
- Action `view_mode` values should use `list,form`, not `tree,form`.
- Use direct modifier expressions such as `invisible`, `readonly`, and
  `required`; do not introduce `attrs` or `states`.
- Use `column_invisible="..."` when the intent is hiding a whole list column.
- Fields referenced by Python-expression modifiers must be present in the view,
  even if invisible.
- OCA 19 migration notes rename several technical model fields from
  `groups_id` to `group_ids` for views, menus, actions, reports, users, and
  website page properties. Confirm against the target model before editing.
- `res.groups.category_id` is replaced by `privilege_id`; verify group XML when
  porting security categories to 19.0.
- Keep inherited XPath targets narrow and stable.
- Prefer adding fields/buttons with `position="after"` or `position="inside"`
  over replacing large blocks.
- Search, form, kanban, calendar, pivot, graph, and activity views should each
  live in a file named for the model they affect.

Example list view:

```xml
<record id="my_model_view_list" model="ir.ui.view">
    <field name="name">my.model.view.list</field>
    <field name="model">my.model</field>
    <field name="arch" type="xml">
        <list>
            <field name="name"/>
            <field name="state" decoration-success="state == 'done'"/>
        </list>
    </field>
</record>
```

## Actions and menus

- Use `ir.actions.act_window` for backend model views.
- In Odoo 19.0, list/form action modes should be `list,form`.
- Keep action domains and contexts readable and deterministic.
- Put menus after actions they reference.
- Restrict menus with `groups` when the underlying workflow is group-specific.

## Reports

- Put report actions and QWeb report templates in `reports/` or `views/`
  according to repository convention.
- Keep business calculations in Python models, not in QWeb templates.
- Escape user content and avoid raw HTML unless it is sanitized.

## Frontend and assets

- Declare assets in the manifest `assets` key.
- Use manifest asset bundle operations such as `include`, `before`, `after`,
  `remove`, and `replace` when order matters.
- Use Odoo JavaScript modules and registries instead of global monkey patches.
- Use Owl components for interactive web client UI.
- Use services through hooks such as `useService` in components.
- Put static source under `static/src/js`, `static/src/scss`, and
  `static/src/xml` according to existing project style.
- Prefer documented Odoo services, registries, hooks, and patching APIs over
  private web client internals.

## Website and controllers

- Website themes and website features are Odoo modules.
- Prefix website theme modules with `website_`.
- Keep public routes thin; delegate business logic to models with explicit
  security checks.
- Use `@route(type="jsonrpc")` for JSON-RPC controllers. Do not generate new
  Odoo 19.0 code with the older `type="json"` spelling.
- When overriding a controller route, re-decorate the overriding method with
  `@route()` or the route is unpublished.
