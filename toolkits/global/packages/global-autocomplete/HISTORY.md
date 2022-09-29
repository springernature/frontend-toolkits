# History

## 6.1.0 (2022-07-28)
    * Upgrade to brand-context v25.0.0
    
## 6.0.0 (2022-03-31)
    * BREAKING: Bump brand-context from version 4.2.2 to 20.1.1 (Moved from node sass to dart sass)
    * Option to select list item with tab
    * Add aria-expanded on initialisation
    * Updated demo
        * Regenerated to demo latest changes
        * Add the selected item to text input when selectOnSuggestionBrowsing is false to show something is selected

## 5.1.4 (2022-02-25)
    * BUG: unable to move focus to select autocomplete items when using NVDA with Firefox (Windows) 
        * add role="listbox" to parent container of autocomplete items
        * add role="option" to each autocomplete item  
    * Change tabIndex value from string to integer

## 5.1.3 (2022-02-18)
    * Remove post install step that was causing issues with CI

## 5.1.2 (2021-01-17)
    * Return focus to input when removing suggestion box, conditionally

## 5.1.1 (2021-11-18)
    * Tab keypress should trigger default behaviour, i.e. move to next action on page rather than nav through suggestions

## 5.1.0 (2021-06-21)
    * Ensures aria-expanded is set correctly when search results are generated and removed

## 5.0.4 (2021-06-18)
    * explorer fixes: event key for Escape, and use .removeChild() instead of .remove()

## 5.0.3 (2021-03-01)
    * Dont focus input when removing suggestion box

## 5.0.2 (2020-11-19)
    * Bump to get latest version package-manager with updated post install script

## 5.0.1 (2020-10-12)
    * BUG: unescaped HTML in README

## 5.0.0 (2020-10-06)
    * BREAKING: Use ESM exports
	* BREAKING: Update major version of brand-context

## 4.0.1 (2020-06-08)
    * Update README

## 4.0.0 (2020-06-04)
    * BREAKING: switch to use new `brand-context` dependency
	* BREAKING: rename `scss` variables

## 3.1.1 (2020-04-23)
    * Allow for Explorer's non standard keypress identifiers

## 3.1.0 (2020-03-20)
    * Add `selectOnSuggestionBrowsing` setting to disable input text update as user browses the suggestions.
    * Remove expectation from user to provide `data-index` on each suggestion element.

## 3.0.1 (2020-02-25)
    * Add `main` property to package.json to make `import @springernature/global-autocomplete` statement work

## 3.0.0 (2020-02-25)
    * Add support for other http methods than GET
    * Enable consumption of non array data. Data massage is now fully delegated to `resultsCallback`
    * BREAKING: Handling 'No results' is now delegated to resultsCallBack

## 2.0.0 (2020-01-06)
    * Refactor based on new linting rules

## 1.0.3 (2020-01-06)
    * Update demo with config options

## 1.0.2 (2019-11-28)
    * Fix typo

## 1.0.1 (2019-10-16)
    * Adds demo/ folder to configure a demo for the Elements site

## 1.0.0 (2018-06-28)
    * Update to allow consumer to pass in data object rather than have it retrieved from an endpoint
    * BREAKING: component now expects 'endpoint' rather than 'endPoint' in args, and no longer expects the results and results container selectors to be classes

## 0.1.0 (2018-06-28)
    * Initial commit
