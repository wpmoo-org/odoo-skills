---
name: odoo-testing
description: Use when adding, fixing, or running tests for Odoo addons, including Python tests, JS tests, security assertions, install/update checks, regressions, and OCA-compatible verification.
---

# Odoo Testing

Use this skill for Odoo addon test work. Load the target `odoo-13` through
`odoo-19` skill before using version-specific test APIs, frontend test syntax,
or command options.

## Test selection

Choose the smallest test that proves the behavior:

- Business logic: Python tests under `tests/`.
- Access control: users, groups, ACLs, record rules, and forbidden operations.
- Views/data: install and update checks.
- Controllers: authentication, authorization, CSRF, ownership, and input
  validation.
- JavaScript: Odoo frontend unit, tour, or HOOT tests according to version.
- Migration or porting: install old state, update module, verify target state.

## Python test rules

- Put tests in `tests/test_*.py` and import them from `tests/__init__.py`.
- Use `TransactionCase` for most addon behavior.
- Use savepoint-style classes only when compatible with the target version and
  existing repository style.
- Build records through the ORM, not raw SQL.
- Use tagged tests when the repository separates at-install, post-install, slow,
  or external-service tests.
- Mock external services, mail delivery, time, and network calls.
- For bug fixes, add a regression test that fails without the fix when practical.

## Security tests

Always test both allowed and forbidden paths when access behavior changes:

- User without the group cannot read/write/create/unlink restricted records.
- User with the group can perform the intended workflow.
- Record rules enforce ownership, company, website, portal, or team boundaries.
- Public controllers reject records outside the current user's scope.

## Running tests

Prefer repository wrappers. Common raw commands:

```bash
odoo-bin -d test_db --addons-path=/path/to/addons -i addon_name --test-enable --stop-after-init
odoo-bin -d test_db --addons-path=/path/to/addons -u addon_name --test-enable --stop-after-init
```

When WPMoo tooling is present:

```bash
npx @wpmoo/toolkit doctor
./moo resetdb
./moo lint
```

Use a clean database for install/update verification. Do not treat a running
developer database as proof that a module installs cleanly.

## Troubleshooting

- Import errors usually mean missing `__init__.py` imports or undeclared
  manifest dependencies.
- Missing external IDs usually mean data load order is wrong.
- Access errors during install often mean groups or ACLs load too late.
- Flaky UI tests usually need deterministic waits for visible Odoo state, not
  arbitrary sleeps.

## Done criteria

- Relevant tests are added or updated.
- Install and update paths were checked when manifests, data, migrations, or
  views changed.
- Test commands and any skipped verification are reported clearly.
