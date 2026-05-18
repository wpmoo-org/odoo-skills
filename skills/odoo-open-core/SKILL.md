---
name: odoo-open-core
description: Use when developing open-core Odoo addons with public community modules and private/pro paid modules, enforcing dependency direction, manifests, licenses, testing, and release packaging.
---

# Odoo Open-Core Community/Pro Development

Use this skill when a product has a public/community addon set plus private/pro
paid addons. The goal is to keep the community layer useful and independently
installable while allowing pro addons to extend it safely.

## Repository roles

- Community/public repo: contains free/open-source addons.
- Pro/private repo: contains paid or proprietary addons, commonly named with a `_pro`, `_enterprise`, `_paid`, or `_commercial` suffix.
- Customer/private repo: contains customer-specific customization and must not leak into reusable community addons.
- Dependency/OCA repo: third-party addon source used as an upstream dependency.

When repo role metadata is unavailable, infer role conservatively from the repo
name and existing manifests. Ask before moving code across role boundaries.

## Dependency boundaries

- Community addons must remain installable without any pro/private addon.
- Community addons must not import from, inherit models from, or declare `depends` on pro/private addons.
- Pro addons may depend on community addons.
- Customer-specific addons may depend on community and pro addons only when the deployment contract allows it.
- Shared APIs needed by both layers belong in the community addon or a small shared community addon.

## License defaults

- Community addon default: `LGPL-3` unless the repository policy requires `AGPL-3`.
- Pro addon default: `OPL-1` or the project commercial license.
- Do not copy AGPL code into proprietary addons.
- If license compatibility is unclear, stop and ask for a decision.

## Manifest patterns

Community addon:

```python
{
    "name": "My Product",
    "version": "19.0.1.0.0",
    "depends": ["base"],
    "license": "LGPL-3",
    "installable": True,
}
```

Pro addon extending a community addon:

```python
{
    "name": "My Product Pro",
    "version": "19.0.1.0.0",
    "depends": ["my_product"],
    "license": "OPL-1",
    "installable": True,
}
```

## Pro feature placement

Place these in pro/private addons unless explicitly approved for community:

- Paid dashboards, reports, automation, connectors, and advanced workflows.
- Proprietary algorithms or service integrations.
- Odoo Apps paid-package metadata and commercial screenshots.
- License checks or customer entitlement integrations.

Place these in community addons when they are required for a useful free core:

- Base models and fields that define the public domain model.
- Stable extension hooks used by pro addons.
- Generic security groups and access rules for the free features.
- Tests that guarantee the free core installs and works independently.

## Odoo Apps release checklist for paid addons

- Manifest has `name`, `summary`, `version`, `depends`, `license`, `price`, `currency`, and `support` when publishing requires them.
- `static/description/icon.png` exists.
- `static/description/index.html` exists.
- Screenshots are under `static/description/`.
- The pro addon installs in a clean database with only its declared dependencies.
- The matching community dependency version is tagged or pinned for the same Odoo major version.

## WPMoo command standard

When a repository uses WPMoo tooling, keep command examples on the current
standard:

- Use `npx @wpmoo/toolkit ...` for day-to-day workspace commands.
- Use `./moo ...` inside generated Odoo development environments.
- Prefer `doctor` before environment-sensitive work.
- Use `snapshot` and `restore-snapshot` around risky local changes.
- Use `resetdb` for clean install/update checks.
- Use `lint` for configured quality checks.
- Use `pot` when translation templates need regeneration.

Do not recommend `@wpmoo/odoo` or `@wpmoo/odoo-dev` except in explicit deprecated-compatibility
documentation.

## Done criteria

- Community/pro dependency direction is correct.
- Community layer installs and tests without pro repositories enabled.
- Pro layer installs and tests with community repositories enabled.
- License choices match repository role.
- Release metadata is updated for paid addons when user-facing behavior changes.
