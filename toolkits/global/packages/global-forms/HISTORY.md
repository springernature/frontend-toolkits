# History

## 5.0.0 (2022-09-29)
    * BREAKING:
        * Fields required by default; required removed with `optional` set to `true`
    * `requiredSuffix` for marking required field explicitly
    * Ability to visually hide labels
    * Inline fields (sets of fields laid out horizontally)
    
## 5.0.0-rc.10 (2022-09-30)
    * Removes margin-top from form labels used on pictographic radios when in horizontal layout
    * Fixes layout issue with display of error information for pictographic radio groups
    * Supports `disabled` on `<option>` elements for `<select>`

## 5.0.0-rc.9 (2022-09-28)
    * Increases thickness of pictographic radio icon borders to 2px
    * Bumps Brand Context to v28.1.0
    * Re-generates component's demo and it's scss settings file from design tokens

## 5.0.0-rc.8 (2022-09-16)
    * BREAKING:
        * Creation of field partial (`globalFormField.hbs)` to allow for iterating over fields without fieldsets
        * Fields with no labels no longer hidden; `hidden: true` supported instead, for any field
    * Adds support for pictographic radio elements
    * Bumps Brand Context to v28.0.1

## 5.0.0-rc.7 (2022-09-09)
    * Adds support for pattern attribute
    * Adds support for minlength attribute
    * Fixes issue where `<legend>` elements were not being announced by assistive tech because `role="presentation"` was being rendered incorrectly
    * Bumps Brand Context to v26.0.0
    * `line-height` tightened

## 5.0.0-rc.6 (2022-08-31)
    * `display: none` for inputs without labels (hidden inputs)
    * Larger checkboxes and radios
    * Correct grey for checkbox and radio borders
    * Bright blue focus style
    * `tabindex="-1"` for programmatic focus compatibility on error summary
    * Optionally exclude discrete errors in error summary

## 5.0.0-rc.5 (2022-07-29)
    * `password` input type added
    * fixed long labels squishing checkboxes and radios
    * removed `role="presentation"`
    * supplementary fields for checkboxes

## 5.0.0-rc.4 (2022-07-27)
    * `hidden` input type added
    * `pointer-events: none` to make select clickable through chevron

## 5.0.0-rc.3 (2022-07-25)
    * BREAKING
        * Removed and replaced utility classes
        * Include spacing utilities

## 5.0.0-rc.2 (2022-07-11)
    * BREAKING:
        * Arbitrary attributes now restricted to data attributes
        * All templates now namespaced so partials can be more safely registered
    * Documenting the need for importing button utilities
    * Now aligned with brand-context `25.0.0`

## 5.0.0-rc.1 (2022-07-01)
    * BREAKING:
        * Form fields now available as a suite of templates/partials
        * Major changes to styling and styling API
        * Design tokens support

## 4.0.1 (2022-02-18)
    * Remove post install step that was causing issues with CI

## 4.0.0 (2021-12-03)
    * BREAKING
        * updates global-form SCSS to use Dart Sass.
        * Changes all typographic values to accomodate the root font size change.

## 3.0.3 (2020-11-19)
    * Bump to get latest version package-manager with updated post install script

## 3.0.2 (2020-11-18)
    * Bump `brand-context` version

## 3.0.1 (2020-10-19)
    * Refer to mixin name in component file correctly

## 3.0.0 (2020-06-08)
    * BREAKING: Rename mixin and component files
    * Update README

## 2.0.0 (2020-06-04)
    * BREAKING: switch to use new `brand-context` dependency

## 1.0.0 (2020-21-05)
    * Allows for configuration of label font and margin

## 0.0.3 (2020-03-04)
    * BUG: allow row items to shrink as well as grow

## 0.0.2 (2019-07-11)
    * a reminder about secure markup

## 0.0.1 (2019-01-30)
    * simple layout for input groups
