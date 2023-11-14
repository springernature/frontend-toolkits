# History

## 1.1.0 (2024-11-10)
    * Appends "userJourneys" and "additionalInfo" parameters to the generated survey URL if not empty.

## 1.0.3 (2023-09-18)
    * Fixes issue with visually hidden elements causing an overflow due to absolute positioning.

## 1.0.2 (2023-08-24)
    * Fixes issue with SVG not rendering correctly in Firefox. Ids used in HTML have been refactored and properly namespaced.
    * Fixes issue with aria-described-by value related to error messaging not corresponding to the error html ID

## 1.0.1 (2023-08-14)
    * Removes aria-required and aria-invalid as were redundant. This will fix accessibility test warnings/errors about the same.

## 1.0.0 (2023-07-26)
    * BREAKING
        * Brings component up to date with v32.0.0 of Brand Context
            * Note: Please ensure your application also uses v32.0.0 of Brand Context
        * Removes dependency on Global Forms component.
            * Note: Please uninstall Global Forms if you do not use elsewhere in your application.
            * Note: The data model needed for this component has been greatly simplified. Please consider updating your application view model where needed.
        * Introduces new data field: id.
            * Note: Please refer to docs for more info. Please consider updating your application view model if needed.
        * Removes CSAT component design tokens.
            * Note: Please update your import path from "00-tokens/default.tokens.scss" to "10-settings/default.scss"
        * Major refactor of component's HTML and Sass.
            * Note: If you do not consume the HTML directly from the installed package please update the HTML in your application.
        * New functionality: now appends responseRating URL param to survey question link href. Refer to the docs for more info.

## 0.0.3 (2023-03-28)
    * Fixes issue with js error when not including questionUrl in data

## 0.0.2 (2023-03-01)
    * Updates example Survey Monkey survey used in demo to be less confusing and more representative of what would be used on production

## 0.0.1 (2022-12-01)
    * Adds component
