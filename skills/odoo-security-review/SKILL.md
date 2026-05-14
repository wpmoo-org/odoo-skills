---
name: odoo-security-review
description: Use when reviewing Odoo addons for security risks in ACLs, record rules, public methods, controllers, sudo usage, raw SQL, data exposure, portal/public flows, and multi-company boundaries.
---

# Odoo Security Review

Use this skill for security-focused review of Odoo addon code. Pair it with the
target `odoo-13` through `odoo-19` skill for version-specific security and API
details.

## Review surfaces

Inspect all entry points and data boundaries:

- `security/ir.model.access.csv`, groups, record rules, and field `groups`.
- Public model methods, buttons, server actions, automated actions, and crons.
- Controllers, JSON routes, website, portal, and payment or webhook endpoints.
- `sudo()`, `with_user()`, `with_context()`, raw SQL, and direct commits.
- Attachments, binary fields, reports, exports, mail templates, and QWeb output.
- Multi-company, website, portal, ownership, and team isolation rules.

## Core rules

- Menus, view modifiers, and hidden fields are not security controls.
- Record rules are default-allow when no rule applies; test forbidden cases.
- Multiple global record rules intersect and can unexpectedly deny access.
- Group record rules unify inside global-rule boundaries.
- Field `groups` protects metadata and views for that field; use it for
  sensitive fields, but still validate server-side behavior.
- Public model methods are RPC-callable; validate records, arguments, state,
  permissions, and company before side effects.
- Use `sudo()` only around the smallest necessary operation and re-check
  ownership or access before returning data.
- Public and portal controllers must validate authentication, authorization,
  ownership, CSRF expectations, and input types.

## Finding patterns

Look for these risk signals:

- Broad ACLs such as full write/unlink for ordinary users.
- Record rules that filter reads but leave write/unlink paths broader.
- `sudo().search()` followed by returning records to the requester.
- Controller routes with `auth="public"` or `auth="none"` and record IDs from
  request parameters.
- Raw SQL built with string interpolation.
- HTML, QWeb, or mail content that includes unescaped user-provided text.
- Cross-company searches missing company constraints or `check_company`.
- Portal links that expose predictable IDs without token or ownership checks.

## Verification

Prefer tests that prove exploit prevention:

- Denied read/write/create/unlink for an unauthorized user.
- Allowed workflow for the intended user or group.
- Controller requests for another user's record fail.
- Multi-company users cannot cross company boundaries unless explicitly allowed.
- Sudo paths do not return records or fields the user cannot normally access.

Run project checks and targeted Odoo tests:

```bash
pre-commit run -a
odoo-bin -d test_db --addons-path=/path/to/addons -i addon_name --test-enable --stop-after-init
odoo-bin -d test_db --addons-path=/path/to/addons -u addon_name --test-enable --stop-after-init
```

## Reporting

Lead with exploitable issues. For each finding include the entry point, affected
record or model, attacker capability, impact, and a minimal fix. Mark style-only
or defense-in-depth notes separately.
