# Nature Sort By

A sort by dropdown for use on Nature product pages that contain a sortable list of content such as search results pages.

## Usage
```html
<div class="c-sort-by">
    <a href="#sort-by" class="c-sort-by__button" data-sort-by-trigger role="button" aria-expanded="false">
        <span>Sort by {{#each facets.sortOrder as |order|}}{{#if order.isChecked}}{{{order.label}}}{{/if}}{{/each}}</span>
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
