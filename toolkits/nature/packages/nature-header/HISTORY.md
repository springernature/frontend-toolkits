# History

## 10.1.0 (2023-01-12)
    * Upgrade to brand-context v31.0.1

## 10.0.0 (2022-09-26)
    * BREAKING:
        * Update brand-context v28.0.1

    * UPDATE:
        * Move subscribe link into menu list and remove redundant div container in template
        * Remove margin right on menu to inline menu items sooner as viewport gets wider

## 9.0.0 (2022-09-01)
    * BREAKING:
        * Removes header-expander.scss and move styles as part of header.scss
        * Removes c-search from Oscar and add replacement within header.scss
        * Refactors keyline style in menu groups
        * Removes utility classes, except for hiding.scss/u-js-hide which is used included from expander

    * UPDATE:
      * Updates template to move dropdown content out of header. These get tethered to the button with js
      * Updates brand-context v26.0.0
      * Updates readme

## 8.1.0 (2022-07-28)
    * UPDATE: brand-context v25.0.0

## 8.0.0 (2022-04-08)
    * UPDATE: brand-context v20.1.1
        * global-javascript and global-expander now come from brand-context

## 7.1.4 (2022-03-23)
    * BUG: fix broken links to view and demo folders in docs

## 7.1.3 (2022-03-10)
    * Remove post install step that was causing issues with CI

## 7.1.2 (2022-02-23)
    * Remove screenshots from README

## 7.1.1 (2022-02-09)
    * Update images in README

## 7.1.0 (2022-02-02)
    * FEATURE: add view template and demo

## 7.0.2 (2022-01-13)
    * Broken links in README fixed.

## 7.0.1 (2022-01-13)
    * Update documentation with usage guidance and research and testing information.

## 7.0.0 (2022-01-06)
    BREAKING
      * Renames JavaScript simply 'header' as 'enhanced-header' can cause confusion for users.

## 6.0.1 (2021-12-10)
    * Fix font-size value to reflect updated root font-size

## 6.0.0 (2021-12-07)
    BREAKING
      * Fixes some typographic values to accomodate the root font size change.

## 5.2.3 (2021-04-19)
    * Attempted fix for error captured in sentry around `hasAttribute` check

## 5.2.2 (2021-04-16)
    * Bump `brand-context` version

## 5.2.1 (2021-04-15)
    * Bump `global-expander` to 4.0.2
    * Bump `global-javascript` to 3.0.2

## 5.2.0 (2021-03-22)
    * Add autofocus option to first tabbable element
    * Bump `brand-context` version

## 5.1.3 (2021-03-17)
    * Refactor to generate smaller bundle size

## 5.1.2 (2021-03-01)
    * Capitalize first letter instead all words in link
    * Update readme

## 5.1.1 (2021-02-15)
    * Bump global-expander to 4.0.1
    * Bump global-javascript to 3.0.1

## 5.1.0 (2021-02-03)
    * Remove aria-pressed
    * Remove aria-expanded and u-js-hide. These are handled in global-expander.
    * Bump global-expander to 4.0.0

## 5.0.0 (2021-02-03)
    * Bump `brand-context` version
    * Update context variable references to use `context--` prefix

## 4.1.1 (2021-01-26)
    * Capilatize first letter in links

## 4.1.0 (2021-01-21)
    * Expander full width at narrow viewports
    * Aligned last expander in list of dropdown to right of screen to prevent horizontal scroll
    * Reduced font-size and space between chevrons on journal menu items to get all on one line for 320px/'xs' breakpoint and above

## 4.0.1 (2021-01-20)
    * Zeros the line-height on logo to cater for use with <h1>

## 4.0.0 (2021-01-13)
    BREAKING
      * Refactored to update nature header in narrow viewport
    * Updated README with updated example
    * Add back keyline for expander (used in search dropdown)

## 3.2.0 (2021-01-07)
    * Add font weight to c-header__menu--secondary

## 3.1.0 (2020-12-16)
    * Adds modifier to add keyline to first list element only

## 3.0.2 (2020-12-11)
    * Improve spacing on expander
    * Remove redundant keyline class

## 3.0.1 (2020-12-11)
    * Use flex instead of inline block for non js version
    * Improve spacing

## 3.0.0 (2020-12-11)
    BREAKING
      * Removes settings files as component is not configurable
      * Renames classes to allow more shared styles

## 2.0.1 (2020-11-19)
    * Bump to get latest version package-manager with updated post install script

## 2.0.0 (2020-11-16)
    BREAKING
      * Bump to latest brand context, global-javascript and global-expander

## 1.0.1 (2020-10-08)
    * Maintain logo alignment when scaling SVG
    * Bump global-expander to 2.1.0

## 1.0.0 (2020-09-24)
    * Remove .c-header__layout--right
    * Promote new layer in `.c-header__logo` for mobile safari to avoid mangled logo during log in/my account layout repaint
    * Add last-child selector to remove right padding
    * Remove last-chidl selector on `.c-header-expander__item`

## 0.1.0 (2020-09-22)
	* Add nature header

