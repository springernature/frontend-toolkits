# History

## 19.0.0 (2020-03-24)
    * Deletes duplicated icons

## 18.7.0 (2020-03-23)
    * Bump global-context to 15.2.0

## 18.6.0 (2020-03-19)
    * Bump global-context to 15.1.0

## 18.5.1 (2020-03-04)
    * Bump global-context to 14.2.1ß
    
## 18.5.0 (2020-03-04)
    * Adds icons

## 18.4.2 (2020-02-28)
    * Change html font-family to sans-serif

## 18.4.1 (2020-02-27)
    * Change import order of settings

## 18.4.0 (2020-02-27)
    * Bump global-context to 14.2.0

## 18.3.0 (2020-02-26)
    * Add info color to color map and utility class 
    
## 18.2.4 (2020-02-20)
    * Remove redundant margin.scss utility file

## 18.2.3 (2020-02-19)
    * Remove imports to deleted files

## 18.2.2 (2020-02-19)
    * Fix import order in enhanced.scss
    * Remove redundant container and spacing files

## 18.2.1 (2020-02-19)
    * Fix typo in import of container

## 18.2.0 (2020-02-19)
    * Imports container from global instead of brand

## 18.1.0 (2020-02-19)
    * Bump global-context to 14.1.0

## 18.0.0 (2020-02-18)
    * Bump global-context to 14.0.0

## 17.0.3 (2020-02-14)
    ♥ Container settings to use spacing instead of get-spacing
    ♥ Tables to use spacing instead of get-spacing

## 17.0.2 (2020-02-14)
    ♥ Bump global-context to 13.1.1

## 17.0.1 (2020-02-14)
    ♥ Import spacing functions into enhanced

## 17.0.0 (2020-02-14)
    ♥ BREAKING: Rename spacing.scss to spacing-springer.scss in settings and functions
    ♥ Bump global-context to 13.1.0 to bring in global-spacing

## 16.0.0 (2020-02-13)
    * Update to global-context@13.0.0
    * Remove $context--font-size-base from settings as in now coming from global

## 15.0.1 (2020-02-12)
    * Remove reference to old interface mixin

## 15.0.0 (2020-02-12)
    * Update to global-context@11.0.0
    * Remove inherited link mixin as comes @from global

## 14.0.3 (2020-02-12)
    * Makes all label elements sans-serif font to fix those on springer branded pages that incorrectly had serif

## 14.0.2 (2020-02-11)
    * BUG: Set base context font size up to 1.8em

## 14.0.1 (2020-02-10)
    * BUG: Remove usage of webfont in headings
    
## 14.0.0 (2020-02-10)
    * BREAKING: Remove usage of webfont
    * BREAKING: Rename global to typography
    * Adds springer-typography so global typography can be used    

## 13.1.0 (2020-01-31)
    * Changed colour for links

## 13.0.1 (2020-01-16)
    * Bumps global-context extends version to 10.0.0

## 13.0.0 (2020-01-16)
    * Removed springer-floats
    * Rename color to springer-color to avoid clashing with global version 
    * Bumps global-context extends version to 9.2.1

## 12.5.0 (2020-01-14)
    * Added favicons

## 12.4.0 (2020-01-06)
    * Added colors utility 
    
## 12.3.0 (2019-11-20)
    * Bumps global-context extends version to 9.2.0

## 12.2.2 (2019-11-12)
    * Bumps global-context extends version to 9.1.2
    * Bumps version of springer-context package

## 12.2.1 (2019-11-08)
    * Bumps global-context extends version to 9.1.1

## 12.2.0 (2019-11-07)
    * Bumps global-context extends version to 9.1.0

## 12.1.0 (2019-11-06)
    * Restructures colors into folder
    * Import shared colors from global

## 12.0.0 (2019-11-06)
    * Rename links to springer-links
    * Bumps global-context extends version to 8.0.0

## 11.1.0 (2019-11-05)
    * Bumps global-context extends version to 7.1.0
    * Update font-size in settings for listings and meta components

## 11.0.0 (2019-11-04)
    * BREAKING: Removes author-list from the context as it should be a package using extends

## 10.3.0 (2019-10-29)
    * Bumps global-context extends version to 5.3.0

## 10.3.0 (2019-10-29)
    * Bumps global-context extends version to 5.3.0

## 10.2.0 (2019-10-29)
    * Bumps global-context extends version to 5.2.0

## 10.1.0 (2019-10-29)
    * Adds brand settings for global-author-list component

## 10.0.0 (2019-10-23)
    * BREAKING: Turns out the flex mixin should be removed afterall :facepalm:

## 9.1.0 (2019-10-23)
    * Adds flex mixin back in to global context
    
## 9.0.0 (2019-10-22)
    * BREAKING: Removed `Source Sans Pro`font

## 8.0.0 (2019-10-11)
    * BREAKING: Use system fonts in `u-text-sans-serif`, `u-text-furniture` and `u-text-interface`

## 7.0.0 (2019-10-08)
    * BREAKING: Removes springer-flex as flex utilities are provided by frontend-global-toolkit

## 6.0.0 (2019-09-09)
    * Removes blockquote reset as it's a specific requirement on a per product basis rather than shared

## 5.0.2 (2019-09-04)
    * Use global clearfix mixin instead of local one

## 5.0.1 (2019-08-01)
    * Add font size medium utility class as was missing

## 5.0.0 (2019-07-31)
    * BREAKING: Remove unused mixin u-flex-split and u-flex-unsplit
    * Increase font size of $font-size-furniture
    
## 4.0.2 (2019-07-30)
    * Fix a publishing issue in the previous version

## 4.0.1 (2019-07-29)
    * Remove buttons utility file that is duplicating global

## 4.0.0 (2019-07-25)
    * Remove 30-mixins/buttons as it exists in global
    * BREAKING: mixin `button-reset` becomes `u-button-reset`

## 3.0.3 (2019-07-24)
    * Change breakpoints to use pixels instead of em

## 3.0.2 (2019-07-22)
    * Update list-inline to use u-list-reset instead of list-reset

## 3.0.1 (2019-07-22)
    * Update use of the flex utilities to be prefixed with `u-`

## 3.0.0 (2019-07-22)
    * BREAKING: Updated global-context extends version
    * BREAKING: Removed utilities that duplicate functionality that is in global utilities

## 2.1.0 (2019-07-22)
    * Adds missing imports from global-toolkit into enhanced
    * Fixes previous HISTORY entry data

## 2.0.0 (2019-07-22)
    * BREAKING: Remove utilities entry point 

## 1.0.1 (2019-07-17)
    * Update `xxxl` spacing value for margin 
    
## 1.0.0 (2019-07-05)
    * BREAKING: Removed JS helpers that have been promoted to the global-context
    * getComponentDataOptions is now getDataOptions in global-context

## 0.0.19 (2019-06-25)
    * Adds 50% flex basis utility class to Springer Context

## 0.0.18 (2019-06-20)
    * Set base font to serif
    * Remove redundant CSS custom properties
    * Add `height:auto` back in as stretching errors should be handled in products

## 0.0.17 (2019-06-20)
    * Remove `height:auto` from `img`

## 0.0.16 (2019-06-20)
    * Remove heading styles from layout

## 0.0.15 (2019-06-19)
    * Adds u-webfont mixin and uses mixin for all font-family declarations

## 0.0.14 (2019-06-18)
    * Add margin-bottom to h1

## 0.0.13 (2019-06-18)
    * Replace calls to gray() with greyscale()

## 0.0.12 (2019-06-17)
    * Add lists to utilities entry point

## 0.0.11 (2019-06-17)
    * Fix form elements showing outline when not focused

## 0.0.10 (2019-06-17)
    * Update reset-list mixin reference to use list-reset

## 0.0.9 (2019-06-17)
    * Fix incorrect gray-min variable

## 0.0.8 (2019-06-13)
    * Change variable names gray to greyscale

## 0.0.7 (2019-06-13)
    * Fix color reference for action
    * Add corporate-light color
    * Use scale-color instead of lighten

## 0.0.6 (2019-06-13)
    * Update global-context version in extendsPackage 
    * Remove breakpoints import and add media-query import now it has been renamed in global

## 0.0.5 (2019-06-13)
    * Remove media-query import and add breakpoints import 

## 0.0.4 (2019-06-12)
    * Change colors passed into color function
    * Import media-query mixin (from global)

## 0.0.3 (2019-06-12)
    * Change color settings to use a single $colors map

## 0.0.2 (2019-06-11)
    * Remove underscores from file names
    * Make RFS a peer dependency - the import order should be handled in your application

## 0.0.1 (2019-06-07)
    * First pass at a context for the springer brand
