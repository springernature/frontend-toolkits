# History

## 5.1.0 (2022-07-28)
    * UPDATE: brand-context v25.0.0

## 5.0.0 (2022-04-08)
    * UPDATE: brand-context v20.1.1
        * global-javascript and global-expander now come from brand-context

## 4.5.1 (2022-02-18)
    * Remove post install step that was causing issues with CI

## 4.5.0 (2021-09-20)
    * Demo created with consumable handlebars template

## 4.4.0 (2021-03-24)
    * Adds default variable $popup--font-family
    * Add override to default for nature
    
## 4.3.0 (2021-03-03)
    * Adds an open method to allow lazily creating a popup when the trigger is clicked

## 4.2.0 (2021-02-17)
    * Fixes bug so that popup/arrow is positioned above trigger
    * Ensure popup stays within screen width

## 4.1.1 (2021-02-15)
    * Bump global-expander to 4.0.1
    * Bump global-javascript to 3.0.1 

## 4.1.0 (2021-02-03)
    * Bump global-expander to 4.0.0

## 4.0.0 (2021-02-03)
    * Bump `brand-context` version
    * Update context variable references to use `context--` prefix

## 3.0.2 (2020-11-19)
    * Fix references to old variable name

## 3.0.1 (2020-11-19)
    * Bump to get latest version package-manager with updated post install script

## 3.0.0 (2020-11-18)
    * BREAKING: 
        * Switch to use brand-context
        * Bump global-javascript and global-expander dependencies
        * Rename files and variables in line with other packages

## 2.0.0 (2020-10-19)
    * Removes use Global Expander AUTOFOCUS, FOCUS_EVENT and CLOSE_EVENT options
    * Uses Global Expander's new OPEN_EVENT option
    * Global Popup now waits until the next tick using rAF before positioning the popup to allow the popup to finish rendering before calculating it's height 
    * Global Popup now focuses on the popup once Global Expander has finished opening it
    
## 1.1.3 (2020-08-14)
    * A better fix for an issue with border colours not being found

## 1.1.2 (2020-08-13)
    * Fixes bug with popup border colour not being found on non-Springer products

## 1.1.1 (2020-08-10)
    * Makes box shadow and border colour consisten with box component
    * Refactors above and below arrow elements to be css only

## 1.1.0 (2020-08-06)
    * Removes hook option
    * Popups are now always direct children of <body> to fix mobile layout issues

## 1.0.1 (2020-08-05)
    * Fixes issue with position calculation
    * Makes styles js only
    
## 1.0.0 (2020-07-31)
    * Removes min-width and max-width from css and sets in js as option.
    * Adds width: auto to css.
    * Adds logic and option for hook which inserts popup in to parent of trigger unless specified in option.

## 0.4.2 (2020-07-29)
    * Bump global-expander to 2.0.2
    * Bump global-javascript to 2.3.0
    * Set AUTOFOCUS: target to retain behaviour from previous version (1.2.0)
    * Close button changes
        * Fix unable to reach close button
        * Fix keyboard space key not closing popup and update test
        * Replace <a> with <button> on close button  

## 0.4.1 (2020-07-20)
    * Updates close icon to global icon set

## 0.4.0 (2020-07-16)
    * Adds border radius to popup

## 0.3.0 (2020-07-14)
    * Adds styling to Global Popup
    
## 0.2.0 (2020-07-14)
    * Imports Global Expander from published npm version

## 0.1.0 (2020-07-01)
    * Initial version. Adds javascript only.
