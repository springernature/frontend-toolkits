# History

## 0.27.0 (2020-02-14)
	♥ BREAKING: Rename spacing.scss to spacing-nature.scss in settings
	♥ Bump global-context to 13.1.0 to bring in global-spacing

## 0.26.0 (2020-02-12)
	* Update to global-context@13.0.0

## 0.25.0 (2020-02-12)
	* Update to global-context@12.0.0
	* Remove brand override of global $context--font-size-base variable
	* Update version

## 0.24.0 (2020-02-12)
	* Update to global-context@11.0.0
	* @import links from global

## 0.23.0 (2020-02-04)
    * Correct path to colors/default in core

## 0.22.0 (2020-02-04)
    * Adds 'action-base' and 'action-light' to the colour selection

## 0.21.0 (2019-11-07)
    * Bumps global-context extends version to 9.1.0

## 0.20.0 (2019-11-06)
	* Restructures colors into folder
	* Import shared colors from global

## 0.19.0 (2019-11-05)
	* Minfies favicon ico and svg
	* Adds manifest and browserconfig documentation to readme

## 0.18.2 (2019-11-05)
	* Update to latest verison of the package manager

## 0.18.1 (2019-11-05)
	* Fix bug where package didn't extend on publication

## 0.18.0 (2019-11-05)
	* Remove $font-family-sans as we can now take this value from global
	* Update to global-context@7.0.0

## 0.17.0 (2019-11-04)
	* Add favicon images and example HTML

## 0.16.1 (2019-10-31)
	* Reverted the global color styles for nature

## 0.15.1 (2019-10-31)
	* Changes text-decoration-skip: ink to text-decoration-skip-ink: auto, as the spec changed

## 0.15.0 (2019-10-24)
	* Increase the base font size

## 0.14.5 (2019-10-22)
	* Update to global-context@5.1.0
	* Import icons mixins

## 0.14.4 (2019-10-21)
	* Update Harding fonts to add additional maths

## 0.14.3 (2019-10-18)
	* Update Harding fonts to fix text-decoration in Firefox

## 0.14.2 (2019-10-16)
	* Update Harding fonts to fix broken character

## 0.14.1 (2019-10-02)
	* Update to global-context@4.1.1
	* Add HISTORY entry change to pass validation

## 0.14.0 (2019-09-24)
	* Update to global-context@4.1.0

## 0.13.2 (2019-09-13)
	* Update to global-context@4.0.1

## 0.13.1 (2019-09-13)
	* Remove import of redundant flex mixin

## 0.13.0 (2019-09-13)
	* Update dep to global-context@4.0.0

## 0.12.0 (2019-09-03)
	* Add clearfix mixin

## 0.11.0 (2019-08-30)
	* Update sans-serif font stack for flagship nature journals

## 0.10.0 (2019-08-13)
	* Remove `letter-spacing` from the body

## 0.9.1 (2019-08-09)
	* Update Harding files with fix for text-decoration issue in Firefox

## 0.9.0 (2019-08-08)
	* Update sans-serif font stack for flagship nature journals
	* Add Harding font files

## 0.8.0 (2019-07-31)
	* Allow the primary serif font to use Harding for flagship nature journals

## 0.7.1 (2019-07-25)
	* Bug in the ordering of the scss files

## 0.7.0 (2019-07-25)
	* Rename settings/typography.scss to settings/typography-nature.scss to avoid it being overwritten by global
	* Rename base/typographic.scss to base/typography-nature.scss to avoid it being overwritten by global
	* Inherit base font size from global-context

## 0.6.0 (2019-06-19)
	* Rename mix-in from breakpoint to media-query

## 0.5.0 (2019-06-19)
	* Remove utility class and mixin that have moved to global

## 0.4.1 (2019-05-01)
	* Update nature-context core to remove 10-settings/article

## 0.4.0 (2019-05-01)
	* Update nature-context core to import global context dependancies

## 0.3.0 (2019-04-30)
	* Update to global-context@0.0.3

## 0.2.0 (2019-04-29)
	* Add custom nature utility classes
	* Reference new version of global-context

## 0.1.2 (2019-04-29)
	* Style settings were missing from enhanced entrypoint

## 0.1.1 (2019-04-29)
	* Keyframe settings were missing from enhanced entrypoint

## 0.1.0 (2019-04-29)
	* Now inherits from global-context

## 0.0.10 (2019-04-11)
	* Add js hide utility class

## 0.0.9 (2019-04-10)
	* Add text-center utility

## 0.0.8 (2019-04-08)
	* Add keyframes utility
	* Add keyframes generator mixin

## 0.0.7 (2019-03-15)
	* Added color settings & functions
	* Used new colors in package

## 0.0.6 (2019-03-14)
	* Added 14 and 28 to the spacing map

## 0.0.5 (2019-03-13)
	* Added 60-utilities directory to nature-context
	* Moved some of the utility classes from article-enchanced stylesheet

## 0.0.4 (2019-03-12)
	* Amend breakpoints to match Nature journals sites
	* Add color setting maps

## 0.0.3 (2019-01-24)
	* Remove the @font-face declarations
	* This should be handled in your application

## 0.0.2 (2019-01-21)
	* Removes any class definitions

## 0.0.1 (2018-12-12)
	* First pass at a context for the nature brand
	* Experimental
