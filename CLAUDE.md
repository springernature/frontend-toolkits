# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frontend Toolkits is a Lerna monorepo containing component libraries for the Elements Design System by Springer Nature. Packages provide reusable HTML, CSS/SCSS, and JavaScript components shared across multiple brands (Default, Nature, Springer, SpringerNature).

## Common Commands

```bash
# Setup
nvm use                              # Node 18.x (lts/Hydrogen)
npm ci                               # Install dependencies
npm run bootstrap:local              # Local dev setup (Lerna bootstrap)
npm run context                      # Install brand-context to all packages
npm run context -- -n <package>      # Install brand-context for one package

# Build & Validate
npm run build                        # Full build: lint + test + validate
npm run lint                         # Lint JS + SCSS
npm run lint:js                      # JavaScript only
npm run lint:sass                    # SCSS only
npm test                             # Jest with coverage
npm test <package-or-file>           # Run tests for a specific package/file
npm run validate                     # Validate all package structures
npm run validate:global              # Validate only global toolkit

# Package Management
npm run create                       # Interactive wizard to create a new package
npm run demo -- -p <name>            # Generate static demo/styleguide
```

## Architecture

### Monorepo Layout

- **`context/`** — Shared foundations
  - `brand-context/` — Brand theming (SCSS variables, mixins per brand)
  - `design-tokens/` — Style Dictionary-based token generation
- **`toolkits/`** — Component packages organized by brand
  - `global/packages/` — Cross-brand components (`global-*`)
  - `nature/packages/`, `springer/packages/`, `springernature/packages/` — Brand-specific components
- **`toolkits/package-manager.json`** — Package structure validation schema (allowed folders, file types, CSS directory structure)

### Multi-Brand System

All toolkit packages depend on `brand-context` (version specified via `brandContext` field in each package.json). Components use `@use` to import brand-specific SCSS settings. Brand-specific SCSS files live in `scss/10-settings/` and are named after their brand.

### Package Structure Convention

Each package follows a strict validated structure:
```
<prefix>-<name>/
├── package.json          # Required (scoped @springernature/)
├── README.md             # Required
├── HISTORY.md            # Required (changelog)
├── scss/                 # Layered: 00-tokens/ → 10-settings/ → 20-functions/ → 30-mixins/ → 50-components/
├── js/                   # JavaScript source
├── view/                 # HTML/Handlebars/Dust templates
├── __tests__/            # Jest tests
└── demo/                 # Demo files
```

Packages are independently versioned (SemVer). The `sn-package-validate` tool enforces structure, naming, and required files.

### SCSS Naming Conventions

- Variables: `$<package-name>--<variable-name>`
- Single mixin/function: `@mixin <package-name>()`
- Multiple mixins/functions: `@mixin <package-name>--<variant>()`

## Code Style

- **Indentation:** Tabs (4-space width) for most files; spaces (2) for `package.json`, markdown, and YAML
- **Line endings:** LF
- **JavaScript:** ESLint with `@springernature/eslint-config`, ES2018+
- **SCSS:** sass-lint with `@springernature/sasslint-config`
- **Sass `@use`/`@forward`:** The codebase is migrating from `@import` to `@use`/`@forward` (see current branch)

## Testing

- **Framework:** Jest (v26)
- **Test location:** `__tests__/` directories within packages
- **Test pattern:** `__tests__/**/*.js`
- **Mocks restore automatically** (`restoreMocks: true` in config)

## Publishing

Publication is automatic via GitHub Actions when PRs are merged to `main`. To publish a package: update `version` in its `package.json` and document changes in `HISTORY.md` before merging.
