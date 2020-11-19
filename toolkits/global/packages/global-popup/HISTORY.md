# History

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
