# History

## 5.1.0 (2021-12-16)
    * Add nature settings file
        * Add override on margin-bottom for description list to match design

## 5.0.0 (2021-12-03)
    * BREAKING:
        * Changes all typographic values to accomodate the root font size change.

## 4.0.0 (2021-10-21)
    * BREAKING:
        * Remove specificity and text mixin for description list links
        * Remove $global-list-description--is-interface in settings
        * Bump brand-context to 13.2.1

## 3.0.0 (2021-07-29)
    * Removes bottom margin from description list terms

## 2.1.0 (2021-05-18)
    * Adds list header component and settings

## 2.0.1 (2021-02-02)
    * BUG: add comparison on is-interface if condition
    * Include unconditionally `u-text-interface`

## 2.0.0 (2021-02-01)
    * Update `brand-context` to v9.0.0
    * Use new versions of mixins

## 1.0.1 (2021-01-29)
    * BUG: interface-link only available for Springer brand
	* Only use interface-link styling for Springer brand

## 1.0.0 (2021-01-26)
    * Initial commit
    * Moves `springer-lists` to the global toolkit
    * Add springernature theme to the global lists
    * Rename mixin `interface-link` to `u-link-interface` and move to global brand-context
