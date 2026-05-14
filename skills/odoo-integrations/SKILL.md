---
name: odoo-integrations
description: Use when designing, implementing, reviewing, or debugging Odoo integrations with external APIs, webhooks, payment/shipping/accounting systems, queues, connectors, imports, exports, and RPC endpoints.
---

# Odoo Integrations

Use this skill for external API connectors, webhooks, payment providers,
shipping carriers, accounting integrations, imports, exports, queues, and Odoo
RPC endpoints. Pair it with the target `skills/odoo-13` through
`skills/odoo-19` skill for version-specific ORM, controller, and test APIs.

## First steps

1. Identify data ownership, direction, frequency, retry behavior, and whether
   Odoo or the external system is the source of truth.
2. Confirm authentication, rate limits, idempotency keys, pagination, webhook
   signature validation, and error semantics from official provider docs.
3. Map external identifiers to stable Odoo fields or binding models.
4. Define failure handling before implementation: retry, quarantine, manual
   review, rollback, or compensating action.

## Odoo design rules

- Keep credentials in Odoo configuration, settings models, or deployment
  secrets according to project policy. Never hard-code secrets.
- Use binding models for durable external IDs when records can be synced more
  than once.
- Make imports idempotent. Replaying the same payload should update or skip, not
  duplicate business records.
- Validate access, state, company, and record rules for public RPC methods and
  controllers.
- Use queues or cron jobs for slow or unreliable external calls.
- Keep external I/O out of transactions where retry behavior could duplicate
  side effects.
- Log enough context to debug without storing secrets or personal data
  unnecessarily.

## Data mapping checklist

- Partners, addresses, companies, currencies, taxes, fiscal positions, units of
  measure, products, lots, stock locations, journals, and payment terms.
- Time zones, dates, rounding, precision, and currency conversion.
- Multi-company ownership and allowed-company context.
- Attachments and binary payload size limits.
- Deletions, cancellations, refunds, and conflict resolution.

## Testing

- Unit-test mapping and idempotency with fixture payloads.
- Mock network calls; do not depend on live external services in regular tests.
- Add integration smoke tests only when credentials and sandbox endpoints are
  intentionally configured.
- Test webhook authentication failures, duplicate events, stale events, and
  out-of-order delivery.

## Done criteria

- Data ownership, retry semantics, and idempotency are explicit.
- Credentials and webhook secrets are handled by approved configuration paths.
- External failures do not corrupt Odoo transactions or create duplicates.
- Logs are useful and do not leak secrets.
- Mapping, security, and replay tests pass.
