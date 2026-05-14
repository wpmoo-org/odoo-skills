---
name: odoo-frontend
description: Use when creating, editing, reviewing, or debugging Odoo web client, website, portal, QWeb, Owl, JavaScript, CSS/SCSS, and asset bundle work across Odoo versions.
---

# Odoo Frontend

Use this skill for Odoo UI work in backend web client, website, portal, reports,
QWeb, Owl components, JavaScript services, CSS/SCSS, and assets. Always pair it
with the matching version skill, for example `skills/odoo-16` or
`skills/odoo-19`, because frontend APIs and XML syntax changed across versions.

## First steps

1. Confirm the target Odoo version and whether the UI is backend, website,
   portal, report, POS, or another specialized app.
2. Inspect the addon manifest, assets, XML templates/views, controllers, and
   existing JavaScript patterns before editing.
3. Use official Odoo frontend documentation and `odoo/odoo` source for API
   behavior. Use OCA guidance for addon layout, tests, linting, and review.
4. Prefer local extension points over monkey patches.

## Version routing

- Odoo 13 and 14 use legacy JavaScript and XML bundle inheritance patterns.
- Odoo 15 and 16 commonly use manifest `assets` bundles and native
  `/** @odoo-module **/` modules.
- Odoo 17 through 19 use modern view modifier syntax and newer Owl/web client
  conventions. Check each version skill before changing XML or JS.
- For list view syntax, modifiers, assets, and JS test APIs, defer to the
  target version skill instead of guessing.

## Implementation rules

- Keep XML IDs stable and avoid replacing views wholesale when inheritance can
  target the intended node.
- Treat menus, invisible fields, and client-side checks as UX only; enforce
  security server-side with ACLs, record rules, and method validation.
- Keep components small and register them through supported registries.
- Use services, hooks, and patch utilities according to the target version.
- Keep translations available for visible strings in XML, Python, and JS.
- Avoid global CSS. Scope selectors to addon templates, classes, or components.
- Preserve accessibility basics: labels, keyboard focus, semantic buttons, and
  readable contrast.

## Testing

Use the repository's configured checks first. Common checks include:

```bash
pre-commit run -a
odoo-bin -d test_db --test-enable --stop-after-init -u addon_name
```

For frontend-specific changes, add or update the target-version JS tests
(`QUnit`, tour, HOOT, or the project standard). Manually verify affected views
in the browser when layout, assets, or interactions change.

## Done criteria

- The UI follows the target Odoo version's XML, asset, and JavaScript APIs.
- Server-side access and validation back every client-side restriction.
- Assets load once, in the right bundle, without global side effects.
- Relevant frontend and Odoo tests pass.
- Visible strings remain translatable.
