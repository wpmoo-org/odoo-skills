# Testing, Quality, And OCA Practices

## Python Tests

- Use the appropriate Odoo test case class for the behavior under test.
- Keep tests deterministic: fixed dates, companies, users, currencies, and
  sequences.
- Mock external services and avoid network access in normal test runs.
- Use `--test-tags` for focused runs.
- Test access errors, constraints, onchange behavior, computed fields, and
  migration-sensitive data when relevant.

## JavaScript Tests

- Use the Odoo 15 JavaScript test framework present in the repository.
- Keep test assets in the proper manifest bundle.
- Do not introduce Odoo 18+ HOOT-only APIs.

## OCA Quality Gates

- Run the repository pre-commit hooks.
- Use `pylint-odoo --valid-odoo-versions=15.0` when linting standalone.
- Keep README fragments and generated README output in sync.
- Keep migration pull requests small and explicit.

## Review Checklist

- Manifest version starts with `15.0.`.
- ACLs exist for every persistent model.
- Record rules are intentional and tested when access differs by user/company.
- Views use `<tree>` and `attrs`/`states`.
- Asset bundles are Odoo 15-compatible.
- Tests run under the module's expected install mode.

