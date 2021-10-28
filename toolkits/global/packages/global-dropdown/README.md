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
    <button class="c-dropdown__button" aria-expanded="false" data-dropdown>Dropdown
        <svg aria-hidden="true" width="10" height="10" aria-hidden="true" focusable="false">
            <use xlink:href="i-chevron-more"></use>
        </svg>
    </button>
    <ul class="c-dropdown__menu">
        <li><a href="#" class="c-dropdown__link" data-dropdown-item>Option 1</a></li>
        <li><a href="#" class="c-dropdown__link" data-dropdown-item>Option 2</a></li>
        <li><a href="#" class="c-dropdown__link" data-dropdown-item>Option 3</a></li>
    </ul>
</div>
```

### Enhanced dropdown

```
init(dropdownSelector = '[data-dropdown]', itemSelector = '[data-dropdown-item]') 
```
By default the component relies on a data-dropdown and data-dropdown-item HTML attributes. These can be overwritten in the init function.

The first argument is a CSS selector to target the dropdown button. The second argument is a CSS selector to target items inside the list.
