# History

## 4.0.0 (2022-02-23)
    * BREAKING:
        * Delete brand settings in favour to only use the default (intentional)
        * Restructure the context.json to include `default` and `extended`
            variants
        * Rework the README file entirely
        * Change default color and spacing
        * Replace `--legal-padding-top` variable with `--legal-margin-top`
    * Add a set of links, inside a navigation, that lives above the logo
    * Add a `corporate-level` template in the `view`
    * Use `corporate-level` partial into demo's `index` template

## 3.0.1 (2021-12-07)
    * BUG: Fixes font sizes that were incorrectly calculated
## 3.0.0 (2021-12-03)
    * BREAKING:
        * Changes all typographic values to accomodate the root font size change.

## 2.1.1 (2021-11-30)
    * BUG: images not rendering in demo

## 2.1.0 (2021-09-20)
    * Demo created with consumable handlebars template

## 2.0.0 (2021-02-03)
    * Bump `brand-context` version
    * Update context variable references to use `context--` prefix

## 1.0.1 (2020-11-19)
    * Bump to get latest version package-manager with updated post install script

## 1.0.0 (2020-11-18)
    * Major version release
    * Bump `brand-context` version

## 0.2.0 (2020-11-04)
    * Remove use of rfs font-size mixin

## 0.1.2 (2020-09-03)
    * Remove duplicate font-size

## 0.1.1 (2020-09-02)
    * Use font-size mixin
    * Use pixel value for nature font-size to workaround clash of mixin

## 0.1.0 (2020-09-02)
    * Initial commit
