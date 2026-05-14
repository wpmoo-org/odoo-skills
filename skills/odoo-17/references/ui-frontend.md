# UI And Frontend For Odoo 17.0

## Views

- Odoo 17.0 list views use the `tree` root element.
- Action `view_mode` values still use `tree,form` for list/form windows in
  Odoo 17.0.
- Use direct modifier expressions such as `invisible`, `readonly`, and
  `required`; do not introduce `attrs` or `states`.
- Use `column_invisible="..."` when the intent is hiding a whole list/tree
  column.
- Fields referenced by Python-expression modifiers must be present in the view,
  even if invisible.
- Settings views should use the newer `app`, `block`, and `setting` tags rather
  than older `app_settings_block`, `o_settings_container`, and `o_setting_box`
  layout patterns.
- Keep inherited XPath targets narrow and stable.
- Prefer adding fields/buttons with `position="after"` or `position="inside"`
  over replacing large blocks.
- Search, form, kanban, calendar, pivot, graph, and activity views should each
  live in a file named for the model they affect.

Example list view:

```xml
<record id="my_model_view_tree" model="ir.ui.view">
    <field name="name">my.model.view.tree</field>
    <field name="model">my.model</field>
    <field name="arch" type="xml">
        <tree>
            <field name="name"/>
            <field name="state" decoration-success="state == 'done'"/>
        </tree>
    </field>
</record>
```

## Actions and menus

- Use `ir.actions.act_window` for backend model views.
- In Odoo 17.0, list/form action modes are normally `tree,form`.
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
- Use Odoo JavaScript modules and registries instead of global monkey patches.
- Native Odoo JavaScript modules need the `/** @odoo-module **/` marker in
  Odoo 17.0.
- Use Owl components for interactive web client UI.
- Use services through hooks such as `useService` in components.
- Put static source under `static/src/js`, `static/src/scss`, and
  `static/src/xml` according to existing project style.

## Website and controllers

- Website themes and website features are Odoo modules.
- Prefix website theme modules with `website_`.
- Keep public routes thin; delegate business logic to models with explicit
  security checks.
