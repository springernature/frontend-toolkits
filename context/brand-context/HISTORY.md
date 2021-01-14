# History

## 8.0.0 (2021-01-14)
    * BREAKING: Removes important from utilities that hide content as not needed anymore

## 7.0.0 (2021-01-04)
    * BREAKING: font-weight utilities moved from SPRINGER to DEFAULT context

## 6.3.0 (2020-12-11)
    * Adds !important to utlities that hide content to prevent selector specificity trumping hide utlity classnames 

## 6.2.0 (2020-12-11)
    * Adds media-query hiding utilities

## 6.1.0 (2020-11-26)
    * Adds light-blue color to Nature brand context settings

## 6.0.1 (2020-11-19)
    * Bump to get latest version package-manager with updated post install script

## 6.0.0 (2020-11-16)
    * BREAKING: Switch springer to `u-` for heading utilities and mixins

## 5.0.2 (2020-11-11)
    * Makes typography variable names more consistent

## 5.0.1 (2020-11-10)
    * Make non nature branded headings bold

## 5.0.0 (2020-11-10)
    * BREAKING: Tidies up typography definitions
        * Remove $is-sans
        * Rename $is-flagship-journal to $is-nature-branded
        * Rename $primary-font to $font-primary and set as font stack depending on $is-flagship
        * Add $font-secondary
        * Replace $font-family-serif-save-data with $save-data conditional

## 4.3.2 (2020-10-16)
    * Add `$font-size-zzz` and `$font-weight-zzz` variables for nature context

## 4.3.1 (2020-14-10)
    * Remove css prop and change import

## 4.3.0 (2020-12-10)
    * Add `arrow` mixin and `url-encode` function

## 4.2.2 (2020-09-08)
    * BUG: `.u-visually-hidden-focus` reset margin and position override

## 4.2.1 (2020-09-08)
    * Fix references to defunct `global-spacing` in SpringerNature context.

## 4.2.0 (2020-07-22)
    * Add default variable $font-family-serif-save-data and uae within nature

## 4.1.0 (2020-07-20)
    * Update SpringerNature button styles
    * FEATURE: Add secondary button styles for SpringerNature

## 4.0.0 (2020-07-16)
    * BREAKING: RFS now part of context, no need to include in apps

## 3.2.4 (2020-07-07)
    * Setup for A/B test to make all fonts on some nature journals use sans-serif

## 3.2.3 (2020-07-03)
    * Prevent hover from removing focus outline on springernature and nature context

## 3.2.2 (2020-06-26)
    * Refactors search.svg to remove excess artbox

## 3.2.1 (2020-06-18)
    * Add a woff2 version of npg-stix-regular font

## 3.2.0 (2020-06-18)
    * FEATURE: Add springernature button styles

## 3.1.0 (2020-06-09)
    * Add filter icon

## 3.0.0 (2020-06-03)
	* FEATURE: include branded button styles from `global-button` so they can be used in components
	* BREAKING: Move `u-button-reset` mixin/utility to avoid confusion
	    * From `60-utilities/buttons` to `60-utilities/style`

## 2.2.1 (2020-06-03)
    * BUG: unquote use of native css min/max variables to fix scss compilation error

## 2.2.0 (2020-06-03)
    * FEATURE: Change heading typography to improve page hierarchy
        * All headings to use $line-height-tight
        * All headings to have 1em margin bottom
        * All headings to stop using rfs mixin
        * h1: 28px => 32px
        * h2: 26px => 28px
        * h4: serif => sans-serif

## 2.1.1 (2020-05-22)
    * BUG: missing dependency `rfs`, used for `font-size()` in Springer brand

## 2.1.0 (2020-05-14)
    * Adds springer nature heading typography and utilities

## 2.0.0 (2020-05-12)
	* FEATURE: add `.u-hide-print` utility class
	* BREAKING: rename old style utility files
		* typography-nature.scss => typography.scss
		* springer-colors.scss => colors.scss
		* springer-hiding.scss => hiding.scss
		* springer-links.scss => links.scss
		* springer-lists.scss => lists.scss

## 1.0.1 (2020-05-06)
	* BUG: 30-mixins/links.scss missing from abstracts.scss in default

## 1.0.0 (2020-05-04)
    * Combines configurations from previous brand specific context packages
        - global-context
        - nature-context
        - springer-context
        - springer-nature-context
	* Refactor configurations
	* Rename 'global' package to 'default' brand
	* All brand configurations now include default
