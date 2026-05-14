# Module Anatomy For Odoo 17.0

## Addon tree

Use this OCA-compatible tree as the default shape. Keep only directories that
the addon actually needs.

```text
addon_name/
├── __init__.py
├── __manifest__.py
├── controllers/
├── data/
├── demo/
├── i18n/
├── migrations/
│   └── 17.0.1.0.1/
│       ├── pre-migration.py
│       └── post-migration.py
├── models/
├── readme/
│   ├── DESCRIPTION.md
│   ├── USAGE.md
│   └── CONTRIBUTORS.md
├── reports/
├── security/
│   ├── ir.model.access.csv
│   └── security.xml
├── static/
│   └── src/
├── tests/
├── views/
└── wizards/
```

## Manifest baseline

```python
{
    "name": "Addon Name",
    "summary": "Short functional summary",
    "version": "17.0.1.0.0",
    "category": "Productivity",
    "author": "Your Organization, Odoo Community Association (OCA)",
    "website": "https://github.com/OCA/repository-name",
    "license": "LGPL-3",
    "depends": ["base"],
    "data": [
        "security/security.xml",
        "security/ir.model.access.csv",
        "views/res_partner_views.xml",
    ],
    "demo": [
        "demo/res_partner_demo.xml",
    ],
    "installable": True,
    "application": False,
}
```

## Manifest rules

- Version starts with `17.0.` and follows `17.0.x.y.z`.
- Keep `depends` minimal and explicit.
- Load security groups before `ir.model.access.csv`.
- Load views after models and security records they reference.
- Use `demo` only for optional demo data.
- Put external Python and binary requirements in `external_dependencies`.
- Add manifest `images` entries when the repository policy expects published
  images/screenshots; do not add empty keys as filler.
- Avoid empty manifest keys.
- Community modules must not depend on private/pro modules.

## Naming rules

- Module names use lowercase ASCII letters, digits, and underscores.
- Extension modules should usually start with the base Odoo module name, such as
  `sale_margin_policy`.
- Model files are grouped by model, for example `models/sale_order.py`.
- XML files use suffixes: `views/res_partner_views.xml`,
  `data/res_partner_data.xml`, `demo/res_partner_demo.xml`.
- Controller file can be `controllers/main.py` when the addon has one small
  controller surface.
