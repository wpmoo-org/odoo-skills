---
name: odoo-portal-design-system
description: Use when improving the look-and-feel of an Odoo website/portal or when "Bootstrap is hard / pages look generic" — establishing a scoped SCSS theme over existing markup, CSS-variable design tokens, reusable QWeb components, web-font injection, and live visual verification. Pair with odoo-portal (features) and odoo-frontend (asset mechanics).
---

# Odoo Portal Design System

The struggle with Bootstrap is usually a *missing layer*, not bad markup:
no asset/theme layer and no reusable components, so every page re-hand-codes
utilities. Fix it once; don't restyle page by page.

## Core principle — theme the markup you already have
- Put the design system in a **scoped SCSS theme layer**, not in template
  rewrites. Style the *existing* semantic Bootstrap markup → all pages improve
  with zero template churn and zero test breakage.
- **Never restructure markup that tests pin.** Tests assert exact classes
  (`card h-100 shadow-sm`, `badge text-bg-secondary`) — you can restyle a class
  via CSS while keeping it present. Do spacing/visual tweaks in SCSS, not by
  editing pinned utilities (e.g. changing `row g-3`→`g-4` on a tested page fails it).

## Theme layer
- Register one SCSS in `web.assets_frontend` (manifest `assets` key). The head
  bundle target is confirmed in `web.layout` (`t-call-assets="web.assets_frontend"`).
- **Scope every rule** under a portal page-root hook so nothing leaks to other
  website pages — e.g. `.oe_structure[class*="o_<project>_"]` when each page wraps
  in `<div id="wrap" class="oe_structure o_<project>_<page>">`.
- Define **design tokens as CSS custom properties** (`:root{ --x-primary: … }`)
  so an approved mockup maps 1:1 to SCSS. Override Bootstrap 5 component variables
  (`--bs-btn-bg`, `--bs-table-hover-bg`) instead of fighting Bootstrap.

## Reusable QWeb components (for NEW pages)
- A `views/*_components.xml` data file of `t-call`-able partials with slots:
  page header, section card, empty state, stat tile, status badge (state→tone
  map), hero. Pass data via `<t t-set="title">…</t>`; pass body via `t-out="0"`.
- Use them on new pages; leave test-pinned pages structurally intact (the theme
  still upgrades them for free).

## Web fonts (reliably)
- Inject `<link>` into the frontend `<head>` by inheriting `website.layout` with
  `<xpath expr="//head" position="inside">` (core's `custom_code_layout` does
  exactly this). **Do not** use SCSS `@import url(...)` inside a bundle — it ends
  up non-leading in the concatenated CSS and browsers ignore it. Self-host fonts
  only if CSP/offline requires it.

## Live visual verification (prove it, don't assume)
- Install the addon into a *served* DB, then **restart** so the routing map and
  assets rebuild (installs run in a one-off process; the live server won't see
  new routes/assets until restart).
- If many DBs exist on the instance, anonymous website routes can't pick one →
  set `dbfilter = ^<db>$` in `odoo.conf` and restart (reversible).
- Confirm the theme actually shipped: fetch the compiled
  `web.assets_frontend.min.css` and **grep it for your token/class names**
  (`--x-primary`, `o_<project>_hero`, the scope selector). Markers in the bundle
  = proof, not just "the page opened".

## Examples
- ✅ A portal whose page roots already carried `o_<project>_*` hooks but were
  unstyled: one scoped SCSS (tokens from an approved mockup) restyled every page
  while the pinned-markup tests stayed green; components were added for new pages.
- ✅ Picked a direction from 2–3 standalone HTML mockups (CSS-var tokens) before
  writing any addon SCSS, so the chosen look mapped straight into the theme.
- ❌ Failure: bumped `row g-3`→`g-4` on a page whose test pinned `row g-3` → red.
  Lesson: cosmetic spacing belongs in SCSS, never in markup a test pins.

## Self-rewrite hook
When a new theming footgun appears (bundle ordering, CSP, a pinned class, a
dbfilter/restart gotcha), add it above as one line. Keep this file under 100 lines.
