# Testing, Quality, And OCA Review For Odoo 17.0

## Python tests

- Put tests under `tests/` and import them from `tests/__init__.py`.
- Use `TransactionCase` for most business logic tests.
- Use `SavepointCase` only when compatible with the target Odoo test behavior
  and existing project style.
- Use tagged tests to select slow, post-install, or at-install tests.
- Test both install and update paths when data files or migrations change.

Typical command:

```bash
odoo-bin -d test_db --addons-path=/path/to/addons -i addon_name --test-enable --stop-after-init
odoo-bin -d test_db --addons-path=/path/to/addons -u addon_name --test-enable --stop-after-init
```

## JavaScript tests

- Use Odoo's frontend test tooling for JS units, tours, and web helpers.
- Keep tour tests stable by waiting for visible UI states, not arbitrary sleeps.
- Keep JS patches small and covered by tests when they alter standard behavior.

## OCA quality checks

- Run `pre-commit run -a` when configured.
- Use `pylint-odoo --valid-odoo-versions=17.0` where the project exposes a
  direct pylint command.
- Use OCA pre-commit hooks through the repository's `.pre-commit-config.yaml`.
- For OCA-style repositories on modern branches, source README content from
  Markdown fragments under `readme/`, with `DESCRIPTION.md` mandatory and
  optional `INSTALL.md`, `CONFIGURE.md`, `USAGE.md`, `ROADMAP.md`,
  `CONTRIBUTORS.md`, `CREDITS.md`, and `HISTORY.md`.
- Do not hand-edit generated `README.rst` in OCA-style repositories unless the
  repository explicitly does not use README generation.

## Review checklist

- Manifest version starts with `17.0.`.
- License matches repository policy.
- Dependencies are explicit and minimal.
- Security access and record rules are tested.
- Views install without XPath warnings.
- Translatable user-facing strings are wrapped for translation.
- Bug fixes include regression tests where practical.
- External services are mocked in tests.
- No local databases, logs, caches, filestores, credentials, or generated assets
  are committed.
