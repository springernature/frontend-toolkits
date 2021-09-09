# Global Facet

Global branded facet buttons.

## CSS

Include the SCSS in your application

```scss
// Pick ONE of the brands below to include
@import '@springernature/global-facet/scss/10-settings/default';
@import '@springernature/global-facet/scss/10-settings/nature';

// Include this with your other components
@import '@springernature/global-facet/scss/50-components/facet';
@import '@springernature/global-facet/scss/50-components/facet-expander';
```

## Example usage

```html
<div class="c-facet" data-facet>
    <!-- example of checkbox input -->
    <div class="c-facet__container">
        <fieldset class="c-facet__item">
            <legend>
                <span class="c-facet__label">Subject</span>
                <span class="u-hide u-js-show">
                    <button type="button" class="c-facet__button c-facet__button--border" data-facet-expander data-facet-target="#subject-target">
                        <svg class="c-facet__icon" role="img" aria-hidden="true" focusable="false" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">...</svg>
                    </button>
                </span>
            </legend>

            <div id="subject-target" data-test="subject-target" class="c-facet-expander u-js-hide">
                <ul class="c-facet-expander__list">
                    <li class="c-facet-expander__list-item">
                        <input type="checkbox" name="subject" id="subject-1" value="1"/>
                        <label class="c-facet-expander__link" for="subject-1">
                            <span>Subject 1</span>
                        </label>
                    </li>
                </ul>
            </div>
        </fieldset>

        <!-- example of radio input -->
        <fieldset class="c-facet__item">
            <legend>
                <span class="c-facet__label">Date</span>
                <span class="u-hide u-js-show">
                <button type="button" class="c-facet__button c-facet__button--border" data-facet-expander data-facet-target="#date-target">
                    <svg class="c-facet__icon" role="img" aria-hidden="true" focusable="false" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">...</svg>
                </button>
            </span>
            </legend>

            <div id="date-target" class="c-facet-expander u-js-hide">
                <ul class="c-facet-expander__list">
                    <li class="c-facet-expander__list-item">
                        <input name="date_range" id="date-range-1" value="1" type="radio"/>
                        <label class="c-facet-expander__link" for="date-range-1">
                            <span>Date 1</span>
                        </label>
                    </li>
                </ul>
            </div>
        </fieldset>
    </div>
</div>
```

### Enhanced facet

Enhanced facet makes use of [global-expander](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-expander) 
and [makeArray](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-javascript#makearray) in global-javascript.

`id` in expander container should match `href` in trigger for enhanced-facet to find and append to facet item.

Updates button text to indicate what is selected or how many items are selected after form submit.

Adds additional form controls to apply and clear selections in the expander.

## Polyfills

This module uses `Element.closest()`.
