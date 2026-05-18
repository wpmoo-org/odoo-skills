---
name: odoo-migration-openupgrade
description: Use when planning, implementing, reviewing, or validating Odoo major-version migrations with OCA OpenUpgrade, upgrade scripts, data migration, and addon compatibility checks.
---

# Odoo OpenUpgrade Migration

Use this skill for Odoo major-version migrations, especially OCA-style
OpenUpgrade work. For normal source porting without database migration, also use
`skills/odoo-porting`. For target-version syntax, load the matching
`skills/odoo-13` through `skills/odoo-19` skill.

## First steps

1. Confirm source version, target version, edition, addon list, and whether the
   target is OCA/OpenUpgrade, official upgrade scripts, or a hybrid.
2. Identify custom addons, third-party addons, Enterprise dependencies, and any
   modules removed, renamed, split, or merged in the target version.
3. Back up the database and filestore before every migration run.
4. Review the OpenUpgrade analysis files and target Odoo release notes before
   writing migration code.
5. Work one major version at a time unless the repository already has a proven
   multi-hop migration pipeline.

## Source policy

- Use Odoo official documentation/source for framework behavior and upgrade
  script APIs.
- Use OCA OpenUpgrade and OCA maintainer guidance for migration conventions,
  analysis files, module coverage, and review expectations.
- Use project-specific migration logs and dry-run output over memory.
- Do not copy forum or blog snippets into migration scripts without verifying
  them against the target Odoo source.

## Migration script rules

- Keep scripts idempotent enough for repeated failed dry runs.
- Prefer OpenUpgrade helpers for renamed models, fields, XML IDs, modules,
  constraints, and many2many tables when available.
- Preserve external IDs and business identifiers unless the migration plan
  explicitly replaces them.
- Avoid ORM calls before registry state is safe for the migration phase.
- Avoid broad SQL updates without a reversible explanation and row-count checks.
- Separate pre-migration, post-migration, and end-migration responsibilities.
- Keep manual cleanup steps explicit in the migration runbook.

## Compatibility checklist

- Manifest versions and branch names match the target version.
- Python APIs, XML views, assets, tests, and security rules match the target
  Odoo version.
- Stored computed fields, constraints, indexes, mail followers, activities,
  attachments, properties, and company-dependent fields are handled deliberately.
- Translations and website views are preserved or intentionally regenerated.
- Accounting, stock, and localization modules get focused validation because
  they carry high-risk data semantics.

## Validation

Run checks in this order when possible:

```bash
pre-commit run -a
openupgrade --database migrated_db --update all --stop-after-init
odoo-bin -d migrated_db --update custom_addon --stop-after-init
```

Then validate functional flows with business users or fixtures, including
logins, menus, reports, scheduled actions, email templates, accounting periods,
inventory valuation, and critical custom workflows.

When WPMoo tooling is present, start with `npx @wpmoo/toolkit doctor`; use `./moo`
commands inside generated environments.

## Done criteria

- Migration scripts are scoped, reviewable, and tied to target-version behavior.
- Dry-run logs have no unexplained errors or warning clusters.
- The migrated database starts cleanly on the target Odoo version.
- Critical business data reconciles against source totals.
- Install/update tests and configured linters pass, or limitations are reported.
