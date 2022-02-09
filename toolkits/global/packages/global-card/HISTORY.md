# History

## 8.0.0
    * BREAKING:
        * Some functionality has been removed since it only addressed a special case on springer.com
        * Parent scope usage removed. Now all settings are added to individual cards. This makes it easier to consume the templates and increases flexibility
        * `href` was not templated correctly (hard-coded)
    * Dark mode now supported in the template/data, with adjustments to color for contrast

## 7.0.1
    * wraps the aspect ratio variable declarion with Sass interpolation to work with Dart Sass
## 7.0.0 (2021-12-29)
    * BREAKING:
        * Template moved to `/view`
        * List semantics by default
        * Shared `level` (`aria-level`) value
    * Support for portrait shaped images (avatars)
    * `noShape` option to remove border, background, and box-shadow
    * Option to remove faux block link style

## 6.0.0 (2021-12-03)
    * BREAKING:
        * Changes all typographic values to accomodate the root font size change.
        * updates global-card to use Dart Sass.

## 5.0.0 (2021-11-08)
    * Springer.com settings
    * Border support

## 4.0.0 (2021-11-03)
    * BREAKING:
        * Extraneous padding removed
        * Aspect ratio for images

## 3.3.0 (2021-09-20)
    * Demo created with consumable handlebars template

## 3.2.0 (2021-04-19)
    * Update card title to use fluid typography
    * Bump brand context version

## 3.1.1 (2021-03-15)
    * Add title overrides in nature settings

## 3.1.0 (2021-03-15)
    * Change default card title settings
    * Bump brand context version
    * Update available settings in readme

## 3.0.2 (2021-02-23)
    * Fix letter spacing for SN brand

## 3.0.1 (2021-02-23)
    * Uses new brand-context
    * Switches to new u-heading mixin for card title which accepts a parameter for the type of heading to use
    * Add a default, SN value for the parameter $card--title-heading

## 3.0.0 (2021-02-12)
    * BREAKING:
        * Switch to use new `brand-context` dependency
        * Remove springer settings as it does not override anything any more
    * FEATURE:
        * Re-introduce the variable `$card--title-font-weight`
        * Add branding configurations for springer nature

## 2.0.4 (2021-01-26)
    * Uses h3 for card title to fix size inconsistency

## 2.0.3 (2020-11-19)
    * Bump to get latest version package-manager with updated post install script

## 2.0.2 (2020-11-18)
    * Bump `brand-context` version

## 2.0.1 (2020-06-08)
    * Update README

## 2.0.0 (2020-06-05)
    * BREAKING: switch to use new `brand-context` dependency
    * FEATURE: Add branding configurations for default, springer, nature

## 1.0.0 (2020-02-12)
    * Update call to global faux block mixin
    * Update global contet peer dependency version

## 0.2.1 (2019-11-29)
    * Allow image to shrink

## 0.2.0 (2019-11-27)
    * Remove color modifier on link

## 0.1.1 (2019-11-25)
    * Add global-context to peer dependencies

## 0.1.0 (2019-11-22)
    * Add cards into global toolkit
