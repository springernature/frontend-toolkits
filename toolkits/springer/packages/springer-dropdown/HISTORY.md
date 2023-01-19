# History

## 8.0.0 (2023-01-18)
    * BREAKING: Upgrade to brand-context v31.0.1

## 7.1.0 (2022-07-28)
    * UPDATE: brand-context v25.0.0

## 7.0.0 (2022-04-08)
    * UPDATE: brand-context v20.1.1
        * global-javascript and global-expander now come from brand-context

## 6.1.1 (2022-02-18)
    * Remove post install step that was causing issues with CI

## 6.1.0 (2021-09-10)
    * Demo, including consumable handlebars template

## 6.0.0 (2021-02-04)
    * Bump `brand-context` version
    * Fix reference to old interface-link mixin

## 5.0.1 (2020-11-19)
    * Bump `brand-context` version

## 5.0.0 (2020-11-16)
    * BREAKING: bump to latest brand context and global-javascript

## 4.0.3 (2020-06-08)
    * Bump to latest brand-context

## 4.0.2 (2020-05-22)
    * Bump `brand-context` dependency

## 4.0.1 (2020-05-14)
    * BUG: npx command fails on install via artifactory
        * Possible fix: Explicitly state version in npx command

## 4.0.0 (2020-05-13)
    * BREAKING: switch to use new `brand-context` dependency
    * BREAKING: switch to use new `global-javascript` dependency
    * BREAKING: change the name of the SASS endpoints

## 3.0.3 (2020-04-04)
    * Sets colour on links

## 3.0.2 (2020-03-12)
    * Uses className element property instead of classList method to add classnames to dropdown

## 3.0.1 (2020-02-18)
	* Use appendChild instead of append for IE support

## 3.0.0 (2020-02-14)
	* BREAKING: Bump springer-context dependency to 17.0.3
	* Use spacing instead of get-spacing
	* Add brand peerDependency

## 2.0.0 (2020-02-12)
    * BREAKING: Bumnp global-context dependency
    * Correct link inherit mixin call

## 1.2.2 (2019-08-27)
    * Fixes incorrect assignment that prevented being able to tab into the dropdown
    * Closes menu when tab out of the dropdown
    * Sets focus on the button if you press escape

## 1.2.1 (2019-08-05)
    * Sets dropdown button caret color to currentColor

## 1.2.0 (2019-07-25)
    * Adds menu position to the dropdown options
    * Create dropdown now passes an options object

## 1.1.1 (2019-07-22)
    * Update use of the list-reset mixin to be prefixed with `u-`

## 1.1.0 (2019-07-19)
    * Adds option to set additional classes on the dropdown element

## 1.0.0 (2019-07-16)
	* BREAKING: Splits functions into multiple files
	* Adds createDropdown function

## 0.0.1 (2019-07-10)
	* Adds dropdown component
