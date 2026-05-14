---
name: odoo-performance
description: Use when diagnosing, optimizing, or reviewing Odoo performance for ORM queries, computed fields, cron jobs, imports, reports, controllers, PostgreSQL, and worker/runtime behavior.
---

# Odoo Performance

Use this skill for slow Odoo flows, heavy imports, reports, cron jobs,
controllers, computed fields, ORM query volume, PostgreSQL tuning, and worker
runtime behavior. Pair it with the matching `skills/odoo-13` through
`skills/odoo-19` skill for version-specific APIs.

## First steps

1. Define the slow operation, target version, database size, module list, and
   expected performance budget.
2. Reproduce with realistic data and capture timing before changing code.
3. Identify whether the bottleneck is ORM query count, SQL plan, Python compute
   cost, cache invalidation, report rendering, external I/O, or worker limits.
4. Prefer measurement over intuition. Keep before/after numbers in the final
   report.

## Measurement tools

- Use Odoo logs with SQL/debug options when available.
- Use PostgreSQL `EXPLAIN (ANALYZE, BUFFERS)` for slow SQL.
- Use `pg_stat_statements` when installed to find repeated expensive queries.
- Use Odoo profiler or collector tools supported by the target version.
- Use browser devtools only for frontend latency; do not infer backend costs
  from UI timing alone.

## Optimization rules

- Fix N+1 patterns with batching, prefetch-aware recordset operations, and
  grouped reads.
- Avoid per-record `search`, `write`, `create`, `sudo`, and external API calls
  in loops.
- Use `read_group` or SQL only when it is clearer and materially faster than ORM
  record iteration.
- Add indexes only for proven query plans and high-selectivity predicates.
- Keep stored computed fields deliberate; every dependency can become a write
  amplification path.
- Use chunking and commits only where the operation is explicitly batch/queue
  oriented and failure semantics are understood.
- Do not bypass access rules, recomputation, or business constraints for speed
  unless the migration or maintenance runbook explicitly owns the risk.

## Review hotspots

- Computed fields with broad `depends`.
- Constraints and onchange methods that search large models.
- Cron jobs without batching or locking.
- Reports that render large recordsets in QWeb loops.
- Controllers that build large payloads or skip pagination.
- Imports that repeatedly resolve external IDs, partners, products, taxes, or
  units of measure.

## Verification

Run the normal addon checks plus a focused performance comparison. Record:

- Dataset shape and record counts.
- Baseline time and query count.
- Optimized time and query count.
- Any new index, cache behavior, or operational requirement.

## Done criteria

- The bottleneck is measured and the fix targets the measured cause.
- Correctness, security, and multi-company behavior are preserved.
- Tests cover the behavior changed by the optimization.
- Before/after numbers show material improvement or the remaining bottleneck is
  clearly documented.
