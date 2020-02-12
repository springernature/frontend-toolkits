# History

## 13.0.0 (2020-02-12)
    * Give $context--font-size-h3 a fix size in rems to avoid it taking the base font

## 12.0.0 (2020-02-12)
    * Update the $context--font-size-base to align it with our imprints

## 11.0.0 (2020-02-12)
    * BREAKING: Renames link utility to be consistent with other utilities
    * Adds mixins and utilities for u-link-inherit and u-link-underline

## 10.0.0 (2020-01-16)
    * Renamed u-open-access-color to u-color-open-access
    
## 9.2.1 (2019-11-21)
    * Use for-of instead of for loop in makeArray 

## 9.2.0 (2019-11-20)
    * Add u-flex-row to utilities 
    
## 9.1.2 (2019-11-12)
    * Fix ampersand having precedence over ellipsis in lists 

## 9.1.1 (2019-11-08)
    * Fix single list item being prefixed by ampersand

## 9.1.0 (2019-11-07)
    * Adds utility for open-access-color

## 9.0.0 (2019-11-06)
    * Create colors folder with default and shared

## 8.0.0 (2019-11-06)
    * Rename utility file 'link' to 'links' to maintain consistency with brand level

## 7.1.0 (2019-11-05)
    * Adds mixin and utility for faux block link

## 7.0.0 (2019-11-04)
    * Updates the $font-family-sans variable to use a system fonts stack

## 6.0.1 (2019-10-31)
    * Global color styles rollback

## 5.3.0 (2019-10-24)
    * Adds comma separated and truncated lists

## 5.2.0 (2019-10-24)
    * Adds institutional-access and updates icons

## 5.1.0 (2019-10-21)
    * Create utility class for svg icons

## 5.0.1 (2019-10-16)
    * Updates reference enhanced.scss imports

## 5.0.0 (2019-10-08)
    * Removes u-flex from flex.scss as already exists as u-display-flex

## 4.1.1 (2019-09-30)
    * Replace text-decoration-skip: ink to text-decoration-skip-ink: auto, because spec had been changed

## 4.1.0 (2019-09-24)
    * Create overflow utility classes

## 4.0.1 (2019-09-13)
    * Added mixin for u-list-inline

## 4.0.0 (2019-09-13)
    * Remove margin-left rule on li in list-reset

## 3.0.0 (2019-07-31)
    * Remove u-flex-split and u-flex-unsplit

## 2.7.0 (2019-07-26)
    * Added global SVG icons to img folder

## 2.6.0 (2019-07-25)
    * Share heading sizes as variables
	* Reset the base font-size to 10px for the use of REMs

## 2.5.0 (2019-07-24)
    * Added utility classes for heading style from h1 to h4

## 2.4.0 (2019-07-22)
    * Added u-display-inline-block utility

## 2.3.0 (2019-07-04)
    * Added getDataOptions helper and test
    * Restructured tests folder to include 'unit' folder for consistency

## 2.2.0 (2019-07-03)
    * Added JavaScript helpers folder
    * Added makeArray helper and test

## 2.1.0 (2019-06-26)

    * Added utility classes for clear float, positioning, scrollbar
    * Added function for z-index layers

## 2.0.0 (2019-06-21)

    * Added utility classes for buttons reset, clearfix, font smoothing, word wrap, inline list
    * BREAKING: mixin `flex-split` replaced with `u-flex-split` in flex.scss
    * BREAKING: mixin `flex-unsplit` replaced with `u-flex-unsplit` in flex.scss
    * BREAKING: mixin `hide` replaced with `u-hide` in hiding.scss
    * BREAKING: mixin `show` replaced with `u-show` in hiding.scss
    * BREAKING: mixin `visually-hidden` replaced with `u-visually-hidden` in hiding.scss
    * BREAKING: mixin `visually-unhide` replaced with `u-visually-unhide` in hiding.scss
    * BREAKING: mixin `hide-text` replaced with `u-hide-text` in hiding.scss
    * BREAKING: mixin `list-reset` replaced with `u-list-reset` in lists.scss
    * BREAKING: mixin `shadow` replaced with `u-shadow` in style.scss
    * BREAKING: mixin `double-underline` replaced with `u-double-underline` in typography.scss
    * BREAKING: mixin `small-caps` replaced with `u-small-caps` in typography.scss

## 1.1.0 (2019-06-19)

    * Adds utility class and mixin `u-custom-list-number`

## 1.0.0 (2019-06-13)

    * BREAKING: class `u-visually-hidden` replaced with `u-hide`
    * BREAKING: new `u-visually-hidden` class now shows for screenreaders
    * BREAKING: Remame breakpoints.scss to media-query.scss in 30-mixins

## 0.0.4 (2019-05-08)

    * Added utility classes for vertical alignment in tables

## 0.0.3 (2019-04-29)

    * Add map-key-get helper function

## 0.0.2 (2019-04-29)

    * Add u-js-hide class

## 0.0.1 (2019-04-29)

    * Shared cross-brand context
    * Experimental
