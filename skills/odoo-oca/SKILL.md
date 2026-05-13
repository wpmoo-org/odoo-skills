---
name: odoo-oca
description: Use when developing Odoo addons that should follow OCA-compatible repository layout, Odoo-version branches, manifests, linting, tests, porting, and review conventions.
---

# Odoo OCA-Compatible Addon Development

Use this skill when creating, editing, reviewing, testing, or porting Odoo addons
that should stay compatible with OCA conventions.

## Repository rules

- Use one Git branch per Odoo major version: `16.0`, `17.0`, `18.0`, `19.0`.
- Keep each branch compatible with exactly one Odoo major version.
- Keep environment, deployment, and generated DevOps files outside addon source repositories.
- Keep each addon in its own top-level directory inside the addon repository.
- Prefer small, composable addons over large modules with unrelated features.
- Do not commit local databases, filestores, cache directories, logs, or secrets.

## Manifest rules

- Every addon must have `__manifest__.py` and `__init__.py`.
- Manifest version must start with the Odoo branch version, for example `18.0.1.0.0` or `19.0.1.0.0`.
- Community addons should use `LGPL-3` or `AGPL-3` according to the repository policy.
- The `depends` list must be minimal and explicit.
- Community addons must not depend on private/pro addons.
- Keep `installable` set to `True` only when the addon is ready to install for this Odoo version.

Example manifest skeleton:

```python
{
    "name": "My Addon",
    "version": "19.0.1.0.0",
    "category": "Productivity",
    "summary": "Short functional summary",
    "depends": ["base"],
    "data": [
        "security/ir.model.access.csv",
    ],
    "installable": True,
    "license": "LGPL-3",
}
```

## Odoo 19 compatibility reminders

- Use list views with `<list>`, not `<tree>`.
- Prefer direct view expressions such as `invisible="..."` instead of `attrs`.
- Use `models.Constraint` instead of `_sql_constraints` for new Odoo 19 code.
- Use `@api.ondelete(at_uninstall=False)` for business delete validation.
- Avoid `default_*` field names in `res.config.settings`.

## Testing and quality checks

Before reporting completion, run the checks that are available in the current
project. Prefer this order when configured:

```bash
pre-commit run -a
```

Then install or update the touched addon in the matching Odoo version and run its
tests. Use the project's runner, for example:

```bash
./scripts/test.sh addon_name
```

or the equivalent Odoo command with `--test-enable` and `--stop-after-init`.

## Porting rules

- Port changes forward one Odoo branch at a time unless instructed otherwise.
- Update manifest versions when porting to a new Odoo major version.
- Review Odoo API, XML view, security, and dependency changes for the target version.
- Keep migration compatibility notes in the PR or changelog when behavior changes.

## Done criteria

- Addon source is in the correct Odoo-version branch.
- Manifest version, license, dependencies, and installable status are valid.
- Community addons do not depend on private/pro addons.
- Relevant install/update tests pass for the target Odoo version.
- Generated documentation or README files are updated when module behavior changes.
