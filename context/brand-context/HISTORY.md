# History

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
