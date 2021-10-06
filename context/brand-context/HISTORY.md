# History

## 16.0.0 (2021-10-06)
    * BREAKING:
        * Update the plus icon
        * Rename minus svg icon
    * FEATURE:
        * Add default setting, mixin and utility class for xsmall & tertiary button
        * Add SN settings for xsmall & tertiary button

## 15.0.0 (2021-09-07)
    * BREAKING:
        * Icon width and height attributes removed
        * u-icon utility provided with `1em` width and height values

## 14.0.0 (2021-08-31)
    * BREAKING:
        * Switch springernature context fonts to Variable fonts
        * Swap Daytona with Merriweather Sans
        * Remove all springernature context fonts from the fonts folder
    * Add the 2 new variable fonts into springernature context fonts folder
    * Add documentation about fonts in springernature context README

## 13.2.1 (2021-08-23)
    * Add will-change: tranform reflow on focus mixin
        - reflow needed to ensure outline styles visible in Safari v13+
        - related to 13.1.2

## 13.2.0 (2021-08-12)
    * Add mixin for u-focus-outline and default $context--focus-color variable
    * Replace the focus style for links in nature to use this new mixin
    * Replace the focus style for input, button, select elements in forms for nature to use this new mixin
    * Add pseudo class focus for [tabindex="0"] and [contenteditable] attributes for nature brand

## 13.1.2 (2021-08-04)
    * Ensures Nature link focus styles cause a reflow as outline not visible in Safari v13+ without a reflow on Nature pages

## 13.1.1 (2021-07-29)
    * Includes the style 10-settings in Springer abstracts partial

## 13.1.0 (2021-07-29)
    * Adds keyline utility classnames to nature and springer
    * Refactors keyline mixin; now includes thickness and references spacing from settings
    * Sets keyline border colour in nature brand
    * Sets keyline border colour in springer brand

## 13.0.0 (2021-07-28)
    * BREAKING:
        * Removes u-separator styles

## 12.0.2 (2021-07-14)
    * Change sn link color

## 12.0.1 (2021-07-13)
    * BUG: Replace deprecated sn colors

## 12.0.0 (2021-07-09)
    * BREAKING:
        * Add new SN color palette

## 11.3.0 (2021-06-01)
    * Add base layer for Springer Nature forms

## 11.2.1 (2021-05-10)
    * Patch Springer Nature metric icons with the right contrast ones

## 11.2.0 (2021-05-05)
    * Introduce Springer Nature metric icons

## 11.1.2 (2021-04-19)
    * Reorder fallback value on mixin heading

## 11.1.1 (2021-04-15)
    * Add static value fallback for fluid typography on nature headings

## 11.1.0 (2021-04-14)
    * Add fluid typography for headings to nature brand
        * Adjust font-size, line-height and letter-spacing 

## 11.0.1 (2021-03-12)
    * Change h4 to serif in springer context 

## 11.0.0 (2021-03-12)
    * BREAKING:
        * Remove $save-data variable from typography
        * Update $context--font-family-serif-save-data: to use sans-serif fonts

## 10.1.3 (2021-03-01)
    * Removes presentational styles from container utility

## 10.1.2 (2021-03-01)
    * BUG: components reference missing default font-sizes
    * Add default font sizes 

## 10.1.1 (2021-02-24)
    * Change font family to serif for SN u-h4,u-h5

## 10.1.0 (2021-02-23)
    * Add default h5 font size
    * Add placeholders to hold the rules for u-h* mixins
    * Add new u-heading mixin to support heading style switching on global card

## 10.0.4 (2021-02-17)
    * Make svg fill in button mixin follow currentColor

## 10.0.3 (2021-02-12)
    * BUG: all brands except default were using a mixin for headings

## 10.0.2 (2021-02-12)
    * Fix button box-shadow on hover for Springernature brand

## 10.0.1 (2021-02-11)
    * Corrects font size variable in typography mixin

## 10.0.0 (2021-02-08)
    * BREAKING:
        * Add more default brand settings to buttons and container
        * Use these new default brand settings on corresponding mixins
        * Update Springernature settings for buttons, container, links, tables
        and typography
        * Update Springernature mixins for links, media-query and typography
        * Update keys and/or values into Springernature colours and breakpoints maps
        * Update Springernature base layer for layout, links
        * Add Springernature base layer for tables
        * Add Springernature link-text utilities

## 9.1.1 (2021-02-05)
    * Changes the order of abstract imports to ensure dependency settings come first
      - This fixes a bug where buttons were not using the overriden $context--colors.

## 9.1.0 (2021-02-05)
    * Adds button-contrast to default context

## 9.0.6 (2021-02-05)
    * Fix button variable name from prevous version

## 9.0.5 (2021-02-05)
    * Fix variable-exists calls for button

## 9.0.4 (2021-02-04)
    * Fix reference to old interface-link mixin

## 9.0.3 (2021-02-03)
    * Fix reference to old $page-base variable

## 9.0.2 (2021-02-03)
    * Fix reference to old $font-size-* and $font-family-secondary variables

## 9.0.1 (2021-02-01)
    * Fix reference to old $open-access-color variable in colors utility

## 9.0.0 (2021-02-01)
    * BREAKING:
        * Updates context variables to consistently use the `context--` prefix
        * Removes RFS from brand-context
        * Replaces font-size mixin with static value
        * Removes u-text-size mixin
        * Move `u-text-interface` mixin from Springer to Default
        * Move `interface-link` mixin from Springer to Default and rename `u-link-interface`

## 8.0.2 (2021-01-27)
    * Removes 'is-nature-branded' conditional for heading font sizes as the else condition is for legacy design

## 8.0.1 (2021-01-14)
    * Removes important from the hiding utility mixin as not needed anymore

## 8.0.0 (2021-01-14)
    * BREAKING: Removes important from utility classnames that hide content as not needed anymore

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
