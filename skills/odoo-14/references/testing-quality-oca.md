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

- Use Odoo 14's legacy JavaScript test tooling and asset setup.
- Keep test code under the repository's established `static/tests` or
  `static/src` convention.
- Do not introduce Owl-era or HOOT-only APIs.

## OCA Quality Gates

- Run the repository pre-commit hooks.
- Use `pylint-odoo --valid-odoo-versions=14.0` when linting standalone.
- Keep README fragments and generated README output in sync.
- Use `oca_dependencies.txt` when the repository uses OCA dependency tooling.
- Keep migration pull requests small and explicit.

## Review Checklist

- Manifest version starts with `14.0.`.
- ACLs exist for every persistent model.
- Record rules are intentional and tested when access differs by user/company.
- Views use `<tree>` and `attrs`/`states`.
- Assets use legacy Odoo 14 bundle inheritance.
- Tests run under the module's expected install mode.

