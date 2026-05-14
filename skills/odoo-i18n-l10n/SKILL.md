---
name: odoo-i18n-l10n
description: Use when creating, reviewing, or debugging Odoo internationalization, translations, localization modules, chart templates, taxes, fiscal positions, reports, currencies, and country-specific compliance behavior.
---

# Odoo Internationalization And Localization

Use this skill for translations, `.pot`/`.po` files, localizations, accounting
charts, taxes, fiscal positions, reports, currencies, language behavior, and
country-specific compliance logic. Pair it with the target `skills/odoo-13`
through `skills/odoo-19` skill for version-specific APIs.

## First steps

1. Confirm target Odoo version, country, language, edition, company setup, and
   whether the addon follows OCA localization conventions.
2. Identify whether the work is translation-only, localization data, accounting
   behavior, report output, or compliance workflow.
3. Use official Odoo docs/source for framework behavior and OCA localization
   repositories for community conventions.
4. For accounting localization, verify with local statutory requirements or a
   domain owner; do not infer legal behavior from generic examples.

## Translation rules

- Keep visible strings translatable in Python, XML, QWeb, reports, email
  templates, and JavaScript.
- Regenerate `.pot` when source strings change and update `.po` files only for
  languages in scope.
- Preserve translation comments, contexts, plural forms, and stable source
  strings when possible.
- Avoid changing source strings just to improve wording unless the translation
  update is part of the task.
- Do not translate technical XML IDs, model names, field names, or code values.

## Localization rules

- Keep localization data stable and migration-friendly: XML IDs matter.
- Treat taxes, accounts, fiscal positions, journals, sequences, currencies, and
  report tags as high-risk data.
- Avoid changing installed localization records without a migration plan.
- Respect `noupdate` behavior and use explicit migration scripts when installed
  records need controlled updates.
- Validate multi-company and multi-currency behavior.
- Keep country-specific reports and exports covered by fixtures or clear manual
  validation steps.

## Version routing

- Use the version skill for manifest, XML, view, assets, and upgrade syntax.
- For OCA-style localization modules, also use `skills/odoo-oca`.
- For database upgrades affecting localization data, also use
  `skills/odoo-migration-openupgrade`.

## Verification

Common checks:

```bash
pre-commit run -a
odoo-bin -d test_db --stop-after-init -u addon_name --test-enable
```

When WPMoo tooling is present, run `./moo pot` if translatable strings changed.
Manually verify rendered reports, invoices, taxes, fiscal positions, exports,
and language-specific UI paths that the task touched.

## Done criteria

- Source strings and translation files are consistent.
- Localization data keeps stable XML IDs and respects installed-data semantics.
- Accounting and compliance behavior is verified against country-specific
  expectations.
- Tests or documented manual checks cover reports, taxes, and fiscal positions
  changed by the task.
