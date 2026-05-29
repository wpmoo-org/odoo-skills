---
name: odoo-portal
description: Use when building or changing Odoo website/portal features — public pages, user dashboards (e.g. mentor/jury/customer), portal forms, QR/token flows — covering controller→service→QWeb architecture, portal route security, and the portal testing reality. Pair with odoo-frontend (assets/QWeb mechanics) and the target odoo-<version> skill.
---

# Odoo Portal

Use for frontend-facing portal/website *features*. For pure styling/asset
mechanics use `odoo-frontend`; for the look-and-feel system use
`odoo-portal-design-system`; for version APIs load the target `odoo-<version>`.

## Architecture: thin controller → service → QWeb
- Controllers (`controllers/*.py`) only route and call a service; keep business
  logic out of them (a test may assert the controller is a skeleton).
- Put logic in an `AbstractModel` service (`_name = "<x>.portal.<area>.service"`)
  — testable, no table, **needs no ACL row**. Inheriting models (`_inherit`)
  also need no new ACL row; only brand-new persistent models do.
- Templates receive **plain dicts / projected fields** (public-safe DTOs), never
  raw sensitive records. Never let private fields (passport, health, notes) reach
  a public or cross-user page.

## Route security (where portal bugs live)
- Public pages: `auth="public"`, **GET only**. No public mutations.
- User actions: `auth="user"`; POST keeps Odoo's default CSRF on — templates
  carry `<input name="csrf_token" t-att-value="request.csrf_token()"/>`.
- **Every `sudo()` browse-by-id MUST be followed by an explicit ownership check**
  (e.g. `rec.partner_id == self._portal_partner()`), else raise `AccessError`.
  This is the #1 IDOR source — one missed check leaks another user's records.
- Enforce server-side; menus/`invisible`/client checks are UX only. Prefer
  record rules for backend row isolation when non-admin staff get backend access.

## Stability + testing reality
- Keep route URLs and template `id`s stable; portal HttpCase tests pin them.
- **Tests pin exact markup fragments and strings** (`list-group list-group-flush`,
  `card h-100 shadow-sm`, `badge text-bg-secondary`, button labels). Restructuring
  a tested page breaks it — restyle via CSS, or update tests in lockstep.
- A stale shared test DB can be missing a model's table (cascading 500s). Rule
  out env-vs-code by running on a **fresh DB in init mode** (a one-off install)
  rather than reusing a possibly-stale shared test DB.
- Keep/add tests for: ownership isolation (another user can't see/edit), absence
  of sensitive fields on public/portal output, CSRF required on POST.

## Examples
- ✅ Dashboard service: `rec = env["..project"].sudo().browse(pid).exists()`
  then `if not rec or rec.owner_partner_id != self._portal_partner(): raise AccessError(...)`.
- ✅ Public listing page renders projected dicts of *published* records only; no
  draft/internal records, no private fields.
- ✅ New page composes `odoo-portal-design-system` components instead of
  hand-writing Bootstrap; existing tested pages are left structurally intact.
- ❌ Failure: `env["..project"].sudo().browse(pid)` rendered without an owner check
  → any logged-in user reads another user's record by guessing the id (IDOR).
  Lesson: pair every sudo lookup with an ownership assertion + a test that proves it.

## Self-rewrite hook
After portal work that surfaced a new footgun (a missed ownership check, a test
that pinned markup, a stale-DB false failure), add it above as a one-line rule.
Keep this file under 100 lines.
