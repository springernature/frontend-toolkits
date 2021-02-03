# History

## 4.0.0 (2021-02-03)
    * BREAKING: 
        * Remove aria-pressed attribute and update tests.
        * Replace aria-hidden with hidden attribute and update tests.

## 3.0.2 (2020-11-19)
    * Bump to get latest version package-manager with updated post install script

## 3.0.1 (2020-11-16)
    * BUG: Bump global-javascript dependency version to fix "false" data-attributes being true

## 3.0.0 (2020-10-20)
    * Changes FOCUS_EVENT to OPEN_EVENT.

## 2.1.0 (2020-09-21)
    * Use `_isOpen` state flag as the source of truth to toggle aria and class
        attributes as well as the trigger's label upon `init`/`open`/`close`
        events.

## 2.0.2 (2020-07-28)
    * Refactor when to focus back to trigger during tabbing 

## 2.0.1 (2020-07-20)
    * Replace switch with if/else if when detecting AUTOFOCUS option
    * Move AUTOFOCUS into private helper class

## 2.0.0 (2020-07-15)
    * Refactor AUTOFOCUS from boolean to string to set options
    * Update readme on refactored AUTOFOCUS option
    * Fix bug with detecting 'Space' key
    * Add tests for 'Space' key on trigger
    * Add tests for anchor link button

## 1.2.0 (2020-07-06)
    * Add aria-pressed to support non-native buttons
    
## 1.1.1 (2020-06-30)
    * Makes it clear that open and close methods are public

## 1.1.0 (2020-06-30)
    * Adds option to fire custom event just before expander focuses on target

## 1.0.0 (2020-05-13)
    * Use @springernature/global-javascript instead of deprecated global-context

## 0.3.3 (2020-03-25)
    * Changes option from CLOSE_ON_CLICKOFF to CLOSE_ON_FOCUS_OUT
    * option ensures target is closed if user clicks or tabs out of target

## 0.3.2 (2020-03-06)
    * Bug Fix: Adds keyboard button interaction with 'Space' keypress

## 0.3.1 (2020-03-06)
    * Bug Fix: this._tabbableItems is null
    * Bug Fix: Set focus back on trigger after tabbing out of the target
    * Adds tests for keyboard interactions

## 0.3.0 (2020-01-06)
    * Refactor for linting changes

## 0.2.0 (2019-12-04)
    * Add autofocus option

## 0.1.1 (2019-11-27)
    * Sets focus on first tabbable child of target when open

## 0.1.0 (2019-11-20)
    * Initial version
