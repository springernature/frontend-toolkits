# History

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
