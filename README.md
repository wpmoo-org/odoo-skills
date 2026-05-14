# WPMoo Odoo Skills

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

`@wpmoo/odoo-dev` can also copy this package/repository into generated Odoo
development environments when `--agent-skills-template` is enabled.


## Support

If this project helps you, you can support the work here:

[![Buy Me a Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/cangir)