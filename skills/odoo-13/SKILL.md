# Odoo 13 Development Skill

Use this skill when creating, reviewing, migrating, or debugging Odoo 13.0
addons, especially OCA-style addons.

## First Steps

1. Confirm the target branch, dependency policy, and whether the addon follows
   OCA rules.
2. Read `references/official-sources.md` for official Odoo 13 and OCA sources.
3. Pick the focused reference files for the task:
   - `references/module-backend-security.md`
   - `references/ui-frontend.md`
   - `references/testing-quality-oca.md`
   - `references/porting-upgrade.md`
4. Check local repository conventions before adding new patterns.

## Version Rules

- Target branch names and manifest versions must use `13.0`.
- XML list views use `<tree>`, not `<list>`.
- Action `view_mode` values use `tree,form`, not `list,form`.
- `attrs` and `states` are valid Odoo 13 view modifier mechanisms.
- Use Odoo 13 legacy JavaScript and asset patterns. Do not use manifest
  `assets` bundles.
- Do not add Odoo 15+ manifest asset syntax, Odoo 17+ view modifier syntax,
  Odoo 18+ HOOT patterns, or Odoo 19 ORM-only APIs unless a compatibility layer
  exists.
- Follow OCA metadata, linting, README fragment, migration, and test
  conventions for OCA-style addons.

## Development Checklist

- Keep manifests explicit and versioned as `13.0.x.y.z`.
- Use `@api.model_create_multi` for create overrides.
- Treat recordsets as multi-record; legacy `@api.multi` and `@api.one` should
  not be introduced.
- Use ACLs, record rules, and field `groups` for security.
- Keep XML data ordered because XML operations are sequential.
- Use XML bundle inheritance and `odoo.define` JavaScript patterns.
- Write focused tests and tag install-time or post-install tests deliberately.

## Validation

Run the bundled lightweight validator on an addon path before final review:

```bash
node skills/odoo-13/scripts/validate-addon.mjs /path/to/addon
```

Then run the repository's normal OCA checks, typically pre-commit hooks,
`pylint-odoo --valid-odoo-versions=13.0`, and Odoo tests with the right
database and `--test-tags`.

