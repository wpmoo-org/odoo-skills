# WPMoo Odoo Skills

[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&style=flat-square)](https://github.com/wpmoo-org/odoo-skills) [![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE) [![Buy Me a Coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?logo=buymeacoffee&logoColor=000000&style=flat-square)](https://www.buymeacoffee.com/cangir)

Generic Agent Skills for Odoo/OCA-compatible addon development, Odoo addon
porting, and open-core community/pro products.

These skills are intentionally not project-specific. Project or module-specific
agent guidance should live in that project/module's own `AGENTS.md` or custom
skill files.

## Skills

```text
skills/
├── odoo-oca/
│   └── SKILL.md
├── odoo-open-core/
│   └── SKILL.md
└── odoo-porting/
    └── SKILL.md
```

## Pi package usage

```bash
pi install npm:@wpmoo/odoo-skills
```

Project-local install with Pi:

```bash
pi install -l npm:@wpmoo/odoo-skills
```

## npx project-local install

```bash
npx @wpmoo/odoo-skills install
```

or:

```bash
npx @wpmoo/odoo-skills --target /path/to/project
```

This copies the skills into:

```text
.agents/skills/
```

## WPMoo CLI usage

The current WPMoo Odoo CLI package is `@wpmoo/odoo`.

For day-to-day workspace commands, use `npx @wpmoo/odoo ...` from the workspace
or controlling repository:

```bash
npx @wpmoo/odoo doctor
npx @wpmoo/odoo snapshot
npx @wpmoo/odoo restore-snapshot
```

Generated Odoo development environments provide a local wrapper. From inside
one of those generated environments, use `./moo ...`:

```bash
./moo doctor
./moo resetdb
./moo lint
./moo pot
```

Useful current commands include:

- `doctor` to inspect environment health.
- `snapshot` before risky local changes.
- `restore-snapshot` to return to a saved local state.
- `resetdb` for clean install/update checks.
- `lint` for configured project quality checks.
- `pot` when translation templates need regeneration.

The old `@wpmoo/odoo-dev` package name should only appear in deprecated
compatibility notes. New documentation and examples should use `@wpmoo/odoo`.

## Support

If this project helps you, you can support the work here:

<a href="https://www.buymeacoffee.com/cangir">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" width="250">
</a>
