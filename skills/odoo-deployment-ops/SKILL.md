---
name: odoo-deployment-ops
description: Use when planning, reviewing, or troubleshooting Odoo deployment and operations work, including configuration, workers, PostgreSQL, reverse proxies, cron, queues, backups, upgrades, monitoring, and release runbooks.
---

# Odoo Deployment And Operations

Use this skill for Odoo deployment, release runbooks, worker sizing,
configuration, PostgreSQL, reverse proxies, cron, queues, backups, monitoring,
and operational troubleshooting. Pair it with the target `skills/odoo-13`
through `skills/odoo-19` skill for version-specific CLI and addon behavior.

## First steps

1. Confirm environment, Odoo version, edition, deployment topology, database
   host, filestore path, reverse proxy, worker count, and release process.
2. Identify whether the task is local dev, staging, production, or disaster
   recovery. Do not run deploy or migration actions without explicit approval.
3. Check the project's existing runbook before proposing new commands.
4. Back up database and filestore before upgrades, migrations, or risky
   operational changes.

## Configuration rules

- Keep secrets in approved secret stores or environment variables, not in Git.
- Set `proxy_mode` only behind a correctly configured reverse proxy.
- Size workers, cron workers, memory limits, and timeouts from workload and
  available resources, not defaults alone.
- Keep addons paths explicit and ordered.
- Separate custom addons, OCA addons, Enterprise addons, and generated/local
  environment files.
- Keep long-running jobs in cron, queue workers, or external workers according
  to the project architecture.

## Operational checklist

- Backups include database, filestore, config needed to restore, and tested
  restore steps.
- Monitoring covers HTTP health, worker restarts, cron lag, mail queue, disk,
  database connections, slow queries, and error logs.
- PostgreSQL maintenance covers vacuum/analyze health, extensions, backups,
  restore drills, and query diagnostics.
- Reverse proxy config preserves scheme, host, longpolling/websocket routes,
  upload limits, and timeout expectations.
- Release plans include addon update order, downtime expectations, rollback
  path, and post-release validation.

## Troubleshooting flow

1. Capture exact symptoms, timestamps, logs, affected users, and recent changes.
2. Check Odoo logs, PostgreSQL logs, reverse proxy logs, and worker process
   state before changing configuration.
3. Reproduce in staging when possible.
4. Change one variable at a time and record the effect.
5. Roll back if the change does not address the measured failure.

## WPMoo tooling

When WPMoo tooling is present:

```bash
npx @wpmoo/odoo doctor
./moo lint
./moo resetdb
./moo snapshot
./moo restore-snapshot
```

Use these only in the intended local/generated environment. Production deploys,
database migrations, and destructive operations require explicit user approval.

## Done criteria

- The runbook is explicit about environment, commands, backups, rollback, and
  validation.
- Secrets remain out of committed files and logs.
- Operational changes are tied to observed symptoms or release requirements.
- Post-change checks confirm Odoo, cron, queues, proxy routes, and database
  health.
