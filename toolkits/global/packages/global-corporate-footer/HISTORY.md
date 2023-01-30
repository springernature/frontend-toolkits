# History

## 6.0.0 (2023-01-18)
    * BREAKING: Upgrade to brand-context v31.0.1

## 5.2.1 (2022-09-05)
    * Use `this.url` for better compatibility

## 5.2.0 (2022-07-28)
    * Upgrade to brand-context v25.0.0

## 5.1.0 (2022-05-19)
    * FEATURE: provided compiled component CSS in the `dist/css` folder

## 5.0.1 (2022-04-26)
    * White border to go with new colour scheme

## 5.0.0 (2022-04-13)
    * Update to latest brand-context v20.1.1

## 4.0.4 (2022-03-22)
    * Small update to footer guidance following subject matter expert review

## 4.0.3 (2022-03-22)
    * Update footer guidance with information about standard footer links and information about who to contact with questions
    
## 4.0.2 (2022-03-03)
    * BUG: Fix mistakes in template around `buttonProperties`
        * Patch buttonProps to buttonProperties
        * Add extra wrapping curlies to avoid conversion to HTML entities

## 4.0.1 (2022-03-02)
    * Explicitly set extra styling for footer items that are buttons to avoid
        any inherited styling(from `button`)
        * Set padding to 0
        * Set same font family, hover style and focus style as the other footer
            items
    * Explicitly set yellow focus color for footer interactive elements
    * Assign `.c-corporate-footer__link` class to logo link in the template
    * Explicitly set vertical alignment for the logo

## 4.0.0 (2022-02-23)
    * BREAKING:
        * Delete brand settings in favour to only use the default (intentional)
        * Restructure the context.json to include `default` and `extended`
            variants
        * Rework the README file entirely
        * Change default color and spacing
        * Replace `--legal-padding-top` variable with `--legal-margin-top`
        * Replace `u-container` div in favour to `c-corporate-footer__container`
            to avoid point of failure
    * Add a set of links, inside a navigation, that lives above the logo
    * Add a `corporate-footer` template in the `view`
    * Use `corporate-footer` partial into demo's `index` template

## 3.0.2 (2022-02-18)
    * Remove post install step that was causing issues with CI

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
