# Official Sources For Odoo 19.0

Use these sources before relying on memory or third-party examples.

## Odoo official documentation

- Developer root: https://www.odoo.com/documentation/19.0/developer.html
- Developer reference: https://www.odoo.com/documentation/19.0/developer/reference.html
- Module manifests: https://www.odoo.com/documentation/19.0/developer/reference/backend/module.html
- ORM API: https://www.odoo.com/documentation/19.0/developer/reference/backend/orm.html
- ORM changelog: https://www.odoo.com/documentation/19.0/developer/reference/backend/orm/changelog.html
- Data files: https://www.odoo.com/documentation/19.0/developer/reference/backend/data.html
- Security: https://www.odoo.com/documentation/19.0/developer/reference/backend/security.html
- Testing: https://www.odoo.com/documentation/19.0/developer/reference/backend/testing.html
- CLI: https://www.odoo.com/documentation/19.0/developer/reference/cli.html
- Actions: https://www.odoo.com/documentation/19.0/developer/reference/backend/actions.html
- QWeb reports: https://www.odoo.com/documentation/19.0/developer/reference/backend/reports.html
- Web controllers: https://www.odoo.com/documentation/19.0/developer/reference/backend/http.html
- View architectures: https://www.odoo.com/documentation/19.0/developer/reference/user_interface/view_architectures.html
- Frontend framework: https://www.odoo.com/documentation/19.0/developer/reference/frontend.html
- Frontend assets: https://www.odoo.com/documentation/19.0/developer/reference/frontend/assets.html
- JavaScript modules: https://www.odoo.com/documentation/19.0/developer/reference/frontend/javascript_modules.html
- JavaScript unit testing: https://www.odoo.com/documentation/19.0/developer/reference/frontend/unit_testing.html
- Upgrade custom databases: https://www.odoo.com/documentation/19.0/developer/howtos/upgrade_custom_db.html
- Upgrade scripts: https://www.odoo.com/documentation/19.0/developer/reference/upgrades/upgrade_scripts.html
- Upgrade utils: https://www.odoo.com/documentation/19.0/developer/reference/upgrades/upgrade_utils.html
- Standard modules reference: https://www.odoo.com/documentation/19.0/developer/reference/standard_modules.html

## Odoo official GitHub

- Odoo source branch: https://github.com/odoo/odoo/tree/19.0
- Documentation source branch: https://github.com/odoo/documentation/tree/19.0
- Upgrade utilities: https://github.com/odoo/upgrade-util
- Odoo 19 release metadata: https://raw.githubusercontent.com/odoo/odoo/19.0/odoo/release.py
- Odoo 19 ORM models source: https://raw.githubusercontent.com/odoo/odoo/19.0/odoo/orm/models.py
- Odoo 19 ORM fields source: https://raw.githubusercontent.com/odoo/odoo/19.0/odoo/orm/fields.py

## OCA sources

- OCA contribution guidelines: https://raw.githubusercontent.com/OCA/odoo-community.org/master/website/Contribution/CONTRIBUTING.rst
- Maintainer tools: https://github.com/OCA/maintainer-tools
- Addons repository template: https://github.com/OCA/oca-addons-repo-template
- pylint-odoo: https://github.com/OCA/pylint-odoo
- Odoo pre-commit hooks: https://github.com/OCA/odoo-pre-commit-hooks
- OCA migration to 19.0: https://github.com/OCA/maintainer-tools/wiki/Migration-to-version-19.0

## Source policy

- Use Odoo documentation for framework behavior.
- Use `odoo/odoo` source when documentation is incomplete.
- Use OCA sources for repository layout, review, README, linting, versioning,
  and contribution conventions.
- Do not copy unverified forum or blog snippets into production code.
