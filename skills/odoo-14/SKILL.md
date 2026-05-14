# Odoo 14 Development Skill

Use this skill when creating, reviewing, migrating, or debugging Odoo 14.0
addons, especially OCA-style addons.

## First Steps

1. Confirm the target branch, dependency policy, and whether the addon follows
   OCA rules.
2. Read `references/official-sources.md` for official Odoo 14 and OCA sources.
3. Pick the focused reference files for the task:
   - `references/module-backend-security.md`
   - `references/ui-frontend.md`
   - `references/testing-quality-oca.md`
   - `references/porting-upgrade.md`
4. Check local repository conventions before adding new patterns.

## Version Rules

- Target branch names and manifest versions must use `14.0`.
- XML list views use `<tree>`, not `<list>`.
- Action `view_mode` values use `tree,form`, not `list,form`.
- `attrs` and `states` are valid Odoo 14 view modifier mechanisms.
- Use Odoo 14 legacy JavaScript and asset patterns. Do not use Odoo 15+
  manifest `assets` bundles as the default.
- Do not add Odoo 17+ view modifier syntax, Odoo 18+ HOOT patterns, or Odoo 19
  ORM-only APIs unless a compatibility layer exists.
- Follow OCA metadata, linting, README fragment, migration, and test
  conventions for OCA-style addons.

## Development Checklist

- Keep manifests explicit and versioned as `14.0.x.y.z`.
- Declare `base` explicitly in `depends` unless the repository has a stricter
  convention.
- Use `@api.model_create_multi` for create overrides.
- Treat recordsets as multi-record unless `ensure_one()` is intentional.
- Use ACLs, record rules, and field `groups` for security.
- Keep XML data ordered because XML operations are sequential.
- Use legacy web bundle inheritance and `odoo.define` JavaScript patterns.
- Write focused tests and tag install-time or post-install tests deliberately.

## Validation

Run the bundled lightweight validator on an addon path before final review:

```bash
node skills/odoo-14/scripts/validate-addon.mjs /path/to/addon
```

Then run the repository's normal OCA checks, typically pre-commit hooks,
`pylint-odoo --valid-odoo-versions=14.0`, and Odoo tests with the right
database and `--test-tags`.

