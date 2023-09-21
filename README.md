[!WARNING] This is a warning about newer version of Elements

# Frontend Toolkits

[![Build Status][badge-build]][info-build]
[![MIT licensed][badge-license]][info-license]
[![Node version][badge-node]][info-node]
[![SASS version][badge-sass]][info-sass]

> Frontend Component Toolkits for the Elements Design System

* [Installation](#installation)
	* [Using the correct `node` & `npm` versions](#using-the-correct-node--npm-versions)
	* [Using the correct `sass` version](#using-the-correct-sass-version)
	* [Installing dependencies](#installing-dependencies)
* [What is a toolkit?](#what-is-a-toolkit)
* [Writing a package](#writing-a-package)
	* [Frontend Package Manager](#frontend-package-manager)
	* [Package structure](#package-structure)
	* [Naming](#naming)
		* [`package.json`](#packagejson)
	* [SASS](#sass)
	* [Javascript](#javascript)
* [NPM Scripts](#npm-scripts)
	* [Comparing component versions](#comparing-component-versions)
* [Testing](#testing)
* [Linting](#linting)
* [Continuous integration](#continuous-integration)
	* [Publishing](#publishing)
* [License](#license)

## Installation

The toolkits repository functions as a [monorepo](https://medium.com/@maoberlehner/monorepos-in-the-wild-33c6eb246cb9), and uses [Lerna](https://lernajs.io/) to manage dependencies within it's packages.

To try and ensure that installs are consistent, we all use the same version of `node` & `npm` when working in the repo.

### Using the correct `node` & `npm` versions

Ensure you have [`nvm` installed](https://github.com/creationix/nvm/blob/master/README.md), then in the root of the repo run `nvm use`. This will read the version of `node` (and therefore `npm`) to use from the `.nvmrc` and ensure you are using the correct versions.

### Using the correct `sass` version

The components found within the toolkits are validated using the [`sass` package on NPM](https://www.npmjs.com/package/sass). You should use the same version within your application (currently `1.47.0`) build process.

### Get bootstrapped for local development

Lerna needs a little help beyond the usual `npm` install - run `npm run bootstrap:local` before you try anything else.

### Installing dependencies

To install dependencies:

```
$ npm ci
```

We install from the `package-lock.json` file to ensure that all tests, linting, and validation are run under the same conditions.

## What is a toolkit?

Toolkits are collections of front-end packages for use across the Springer Nature ecosystem. We provide toolkits for each of our major brands within Springer Nature, as well as a `global` toolkit containing packages for use across the whole of Springer Nature.

Packages are bundles of front-end assets (HTML, CSS, JS, images, tests etc...) that are published via NPM and allow us to share robust, tested, user-validated solutions to front-end problems across the business. This helps us to reduce the duplication of effort, provide a platform for starting up greenfield projects, and standardise the presentation of our brands online.

## Writing a package

All packages are validated on our CI server (Travis) to ensure they conform to certain naming conventions, file/folder structure, and that certain required files are present.

The validation is configurable in the `package-manager.json` files that can be found in the [repository root](package-manager.json) (this config is shared across all toolkits), and in the root folder for each toolkit.

You can validate all the packages by running `npm run validate` from within the project on the command line.

### `frontend-package-manager`

The creation, validation and publication of packages is controlled via the [Frontend Package Manager](https://github.com/springernature/frontend-package-manager).

The `README` for that repository provides information on the package creation wizard, which can be run with `npm run create`, as well as detailing additional options for package validation, as well how packages are [automatically published via Travis](#publishing).

### Package structure

```
name-of-toolkit
  └── packages
    ├── prefix-name-of-package
      └── scss
        └── **/*.{scss,css,md}
      └── js
        └── **/*.{js,json,md}
      └── view
        └── **/*.{html,dust,md}
      └── img
        └── **/*.{jpg,gif,png,svg,md}
      └── fonts
        └── **/*.{woff,woff2,eot,svg,ttf,json}
      └── __tests__
        └── **/*.{js,json}
      └── HISTORY.md
      └── package.json
      └── README.md
```

The files and folders detailed here are subject to the following validation rules:

- `README.md`, `HISTORY.md`, `package.json` are the only files allowed at the top level, they are all _required_
- The folders `scss`, `js`, `view`, `img`, `fonts`, `__tests__` are the only folders that are allowed at the top level, they are _optional_
- Within these folders you can have any number of `sub-folders`, but there are restrictions on the file types allowed

### Naming

Packages should use the prefix defined within the individual toolkit configuration. The package folder should use the convention `<prefix>-name-of-package`, where `name-of-package` uses only lowercase alphanumeric characters and hyphens.

#### `package.json`

Packages in `frontend-toolkits` are [scoped](https://docs.npmjs.com/misc/scope) to the `springernature` organisation. Packages are exported using the naming convention `@springernature/<prefix>-name-of-package`. For example:

```json
{
  "name": "@springernature/global-name-of-package",
}
```

### SASS

When writing CSS you should follow the guidelines in the [Springer Nature Frontend Playbook](https://github.com/springernature/frontend-playbook/blob/master/css/), and in addition all SASS mixins/functions/variables should:

- Take the form `name-of-package--variable-name` for variables
- Take the form `name-of-package` for single mixins/functions
- Take the form `name-of-package--some-name` when there are multiple mixins/functions
- Use only lowercase alphanumeric characters and hyphens

```scss
// variables
$name-of-package--variable-name
$name-of-package--other-name

// mixins
@mixin name-of-package () {}
@mixin name-of-package--some-name () {}

// functions
@function name-of-package () {}
@function name-of-package--some-name () {}
```

### Javascript

When writing Javascript you should follow the guidelines in the [Springer Nature Frontend Playbook](https://github.com/springernature/frontend-playbook/blob/master/javascript/)

## NPM Scripts

The following script commands are available:

* `npm run bootstrap:local`

   Bootstrap all package dependencies for running tests and using components locally. This is run automatically on CI.

* `npm run build`

   Run the `lint`, `test`, and `validate` scripts before pushing.

* `npm run build:ci`

   As above, but run on CI. Do not use locally.

* `npm run context`

   This is run as part of the boostrap commands and installs the correct version of `brand-context` in each package's dependencies, for testing and validation. You can also run this with the `-n` flag to specify a package name. This will install the `brand-context` for that package only e.g. `npm run context -- -n name-of-package`

* `npm run create`

   Run the `create` script from the [frontend package manager](https://github.com/springernature/frontend-package-manager#package-creation).

* `npm run demo -- -p name-of-package`

   Create a static example file from a `demo` folder. Part of [frontend package manager](https://github.com/springernature/frontend-package-manager#create-styleguide-demo). For example `npm run demo -- -p global-autocomplete`.

* `npm run lint`

   Run code linting for `Javascript` and `SASS`.

* `npm run lint:sass`

   Run code linting for `SASS`.

* `npm run lint:js`

   Run code linting for `Javascript`.

* `npm run publish`

   Run the `publish` script from the [frontend package manager](https://github.com/springernature/frontend-package-manager#package-publication).

* `npm run test`

   Run unit tests via `Jest`.

* `npm run test:ci`

   Run unit tests on CI. Do not use locally.

* `npm run validate`

   Run the `validate` script from the [frontend package manager](https://github.com/springernature/frontend-package-manager#package-validation).

* `npm run validate:global`

   Run the validate script, filtered by the global toolkit.

* `npm run validate:nature`

   Run the validate script, filtered by the nature toolkit.

* `npm run validate:springer`

   Run the validate script, filtered by the springer toolkit.

* `npm run validate:springernature`

   Run the validate script, filtered by the springernature toolkit.

### Comparing component versions

In addition to the scripts above you can also use the [util-package-diff](https://github.com/springernature/frontend-toolkit-utilities/tree/main/packages/util-package-diff) tool to compare two versions of the same component (one from NPM, and the current local version). This is run via `npx` from the repository root, as in the example below

```
$ npx @springernature/util-package-diff -p global-corporate-footer@4.0.0
```

## Testing

Tests for your package should be written in your `packages/<prefix>-name-of-package/__tests_` folder. For example, unit tests for `global-name-of-package` should live in `packages/global-name-of-package/__tests__/unit/*.js`.

* To run all the tests use `npm run test`
* To run all the tests for a particular package use `npm test <name-of-package>`
* To run an individual test use `npm test <name-of-test-file>`

> **NOTE**: Make sure that you bootstrap all package dependencies before running tests using `npm run bootstrap:local`.

## Linting

Javascript linting is enforced using the [Springer Nature Eslint config](https://www.npmjs.com/package/@springernature/eslint-config) across all packages. Run the linter using `npm run lint` from within the project on the command line.

## Continuous integration

This repository uses [Travis CI](https://travis-ci.com/) and builds are run on all Pull Requests. On each build Travis will boostrap all of the package dependencies using `Lerna Boostrap`, before running linting and all tests.

### Publishing

To publish a new package please follow the [contributing guidelines](CONTRIBUTING.md). Publishing to NPM is done automatically on Travis, which detects a new version in a packages `package.json` file, and a corresponding entry in the `HISTORY.md` file.

## License

The frontend-toolkits repository is licensed under the [MIT License][info-license].
All packages within this repository are licensed under the [MIT License][info-license].
Copyright &copy; 2020, Springer Nature

[info-license]: LICENCE
[badge-license]: https://img.shields.io/badge/license-MIT-blue.svg
[info-build]: https://travis-ci.com/springernature/frontend-toolkits
[badge-build]: https://badgen.net/travis/springernature/frontend-toolkits?icon=travis
[info-node]: .nvmrc
[badge-node]: https://img.shields.io/badge/node--lts-%3E%3D%2014.19.1-brightgreen
[info-sass]: #using-the-correct-sass-version
[badge-sass]: https://img.shields.io/badge/SASS-1.47.0-green.svg
