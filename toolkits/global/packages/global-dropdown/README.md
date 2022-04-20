# Global Dropdown

Global branded dropdown

## CSS

Include the SCSS in your application

```scss
// Pick ONE of the brands below to include
@import '@springernature/global-dropdown/scss/10-settings/default';
@import '@springernature/global-dropdown/scss/10-settings/nature';

// Include this with your other components
@import '@springernature/global-dropdown/scss/50-components/dropdown';
```

## Example usage

The core experience will show a label and a list of items underneath. JavaScript and more advanced CSS options are available by using the class `.js` on the document root element.

```html
<div class="c-dropdown">
    <span class="c-dropdown__label">dropdown</span>
    <button class="c-dropdown__button" aria-expanded="false" data-dropdown data-dropdown-target="#dropdown">Dropdown
        <svg aria-hidden="true" width="10" height="10" aria-hidden="true" focusable="false">
            <use xlink:href="i-chevron-more"></use>
        </svg>
    </button>
    <ul class="c-dropdown__menu" id="#dropdown">
        <li><a href="#" class="c-dropdown__link" data-dropdown-item>Option 1</a></li>
        <li><a href="#" class="c-dropdown__link" data-dropdown-item>Option 2</a></li>
        <li><a href="#" class="c-dropdown__link" data-dropdown-item>Option 3</a></li>
    </ul>
</div>
```

### Enhanced dropdown

```javascript
import {dropdown} from 'global-dropdown/js';

dropdown();
```

The component uses the Expander from the `brand-context` package to handle the events. 

You can get a quick implementation by adding these two attributes `data-dropdown` and `data-dropdown-target` in your HTML as shown at the example above.

If you need more flexibility, use the expander component directly following its [documentation](https://github.com/springernature/frontend-toolkits/blob/master/context/brand-context/default/js/README.md#expander).

