# Testing, Quality, And OCA Practices

## Python Tests

- Use `TransactionCase`, `SavepointCase`, `HttpCase`, or tagged tests according
  to the behavior under test.
- Keep unit-like tests narrow and integration tests realistic.
- Use deterministic dates, currencies, companies, users, and sequences.
- Mock external services. Do not rely on network access in normal test runs.
- Use `--test-tags` to run focused tests and include negative-path tests for
  permissions and constraints.

## JavaScript Tests

- Use the Odoo 16 JavaScript test framework available in the target repository.
- Keep test assets in the proper manifest bundle.
- Do not introduce Odoo 18+ HOOT-only APIs in Odoo 16 addons.

## OCA Quality Gates

- Use the repository's `.pre-commit-config.yaml`.
- Run `pylint-odoo --valid-odoo-versions=16.0` when linting standalone.
- Keep imports grouped and formatted according to OCA hooks.
- Keep generated README files in sync with fragments when the repository uses
  maintainer-tools.
- Prefer small migration commits with explicit before/after behavior.

## Review Checklist

- Manifest version starts with `16.0.`.
- ACLs exist for every persistent model.
- Record rules are intentional and tested when access differs by user/company.
- Views use `<tree>` and `attrs`/`states` where appropriate.
- Asset bundles are Odoo 16-compatible.
- Tests run under the module's expected install mode.

