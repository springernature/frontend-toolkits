# Nature Sort By

A sort by dropdown for use on Nature product pages that contain a sortable list of content such as search results pages.

## Usage

To configure the component the following html attributes will need to be set:

| Data Attribute          | Description                                                                                 | 
|-------------------------|---------------------------------------------------------------------------------------------|
| data-sort-by-trigger    | This should be set on the html element that is clicked in order to open the dropdown menu   |
| data-sort-by-target     | This should be set on the containing html element of the sort by dropdown menu              |
| data-sort-by-radio      | This should be set on each list item within the sort by dropdown menu                       |
| <input value=""         | The value attribute for each radio input should be set with the corresponding url parameter value for page content sorting. For example `value="date_desc"` generates the following url parameter upon page reload: `?ORDER=date_desc`  |

This component uses Global Expander. This means you should be aware of the following:
1. Global Expander will replace the href of the trigger with `javascript:;`. This allows you to put a hash link in for progressive enhancements purposes.
2. You can add the classname `u-js-hide` to the target on page render. Global Expander will remove this when the menu is opened. 
3. Global Expander will add the classname `is-open` to the trigger and `has-tethered` to the target when the menu has been opened. The component's styling utilises these.

Example handlebars template
```handlebars
<div class="c-sort-by">
    <a href="#sort-by" class="c-sort-by__button" data-sort-by-trigger role="button" aria-expanded="false">
        <span>Sort by {{#each facets.sortOrder as |order|}}{{#if order.isChecked}}{{{order.label}}}{{/if}}{{/each}}</span>
        <svg role="img" aria-hidden="true" focusable="false" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m5.58578644 3-3.29289322-3.29289322c-.39052429-.39052429-.39052429-1.02368927 0-1.41421356s1.02368927-.39052429 1.41421356 0l4 4c.39052429.39052429.39052429 1.02368927 0 1.41421356l-4 4c-.39052429.39052429-1.02368927.39052429-1.41421356 0s-.39052429-1.02368927 0-1.41421356z" transform="matrix(0 1 -1 0 11 3)"></path></svg>
    </a>
    <div id="sort-by" data-sort-by-target class="c-sort-by__menu u-js-hide">
        <ul class="c-sort-by__list">
            {{#each facets.sortOrder as |listElement|}}
                <li class="c-sort-by__list-item" data-sort-by-radio>
                    <input name="order" id="order{{listElement.value}}" value="{{listElement.value}}" type="radio"
                           {{#if listElement.isChecked}}checked="checked"{{/if}}/>
                    <label for="order-{{listElement.value}}">
                        <span>{{{listElement.label}}}</span>
                    </label>
                </li>
            {{/each}}
        </ul>
    </div>
</div>
```

Example html
```html
<div class="c-sort-by">
    <a href="#sort-by" class="c-sort-by__button is-open" data-sort-by-trigger="" aria-expanded="false" role="button">
        <span>Sort by Relevance</span>
        <svg role="img" aria-hidden="true" focusable="false" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m5.58578644 3-3.29289322-3.29289322c-.39052429-.39052429-.39052429-1.02368927 0-1.41421356s1.02368927-.39052429 1.41421356 0l4 4c.39052429.39052429.39052429 1.02368927 0 1.41421356l-4 4c-.39052429.39052429-1.02368927.39052429-1.41421356 0s-.39052429-1.02368927 0-1.41421356z" transform="matrix(0 1 -1 0 11 3)"></path></svg>
    </a>
    <div id="sort-by" data-sort-by-target="" class="c-sort-by__menu u-js-hide">
        <ul class="c-sort-by__list">
            <li class="c-sort-by__list-item" data-sort-by-radio="">
                <input name="order" id="orderrelevance" value="relevance" type="radio" checked="checked">
                <label for="order-relevance">
                    <span>Relevance</span>
                </label>
            </li>
            <li class="c-sort-by__list-item" data-sort-by-radio="">
                <input name="order" id="orderdate_desc" value="date_desc" type="radio">
                <label for="order-date_desc">
                    <span>Date — most recent</span>
                </label>
            </li>
            <li class="c-sort-by__list-item" data-sort-by-radio="">
                <input name="order" id="orderdate_asc" value="date_asc" type="radio">
                <label for="order-date_asc">
                    <span>Date — oldest first</span>
                </label>
            </li>
        </ul>
    </div>
</div>
```
