# Springer Dropdown

Display a contextual list of links over the top of content, controlled by a toggle.

## Usage

```html
<div class="c-dropdown">
    <button class="c-dropdown__button" aria-expanded="false" data-dropdown>Toggle the list of links</button>
    <ul class="c-dropdown__menu">
        <li class="c-dropdown__item">
            <a class="c-dropdown__link" href="a/path">Item 1</a>
        </li>
        <li class="c-dropdown__item">
            <a class="c-dropdown__link" href="a/path">Item 2</a>
        </li>
        <li class="c-dropdown__item">
            <a class="c-dropdown__link" href="a/path">Item 3</a>
        </li>
    </ul>
</div>
```

```javascript
import {dropdown} from '@springernature/springer-dropdown';

dropdown();
```

### Options

| Option | Type | Description | Default |
|---|---|---|---|
| `DROPDOWN_CLASS` | String  | Class name(s) that are added to the dropdown | `''` |
| `HIDE_CLASS`     | String  | Class name that is toggled on the dropdown menu | `'u-hidden'` |
| `HIDE_INITIALLY` | Boolean | Adds the HIDE_CLASS to the menu when initialised. If false, it is assumed that the product is controlling the initial hiding of the menu | `true` |
| `CLICK_OUTSIDE`  | Boolean | Controls whether clicking outside of the dropdown should close it | `true` |

Options can be set during the module initialisation or via data attributes.
If set during initialisation, those defaults will become the defaults for all dropdowns.
Data attributes can then be used to change the options for a specific instance.

#### Initialisation

```javascript
import {dropdown} from '@springernature/springer-dropdown';

dropdown({
    DROPDOWN_CLASS: 'additional-dropdown-class',
    HIDE_CLASS: 'hide-me',
    HIDE_INITIALLY: false,
    CLICK_OUTSIDE: false
});
```

#### Data Attributes

```html
<div class="c-dropdown">
    <button class="c-dropdown__button" 
            aria-expanded="false" 
            data-dropdown 
            data-dropdown-hide-class="hide-me"
            data-dropdown-hide-initially="false"
            data-dropdown-click-outside="false">
        Toggle the list of links
    </button>
    <ul class="c-dropdown__menu">
        <li class="c-dropdown__item">
            <a class="c-dropdown__link" href="a/path">Item 1</a>
        </li>
        <li class="c-dropdown__item">
            <a class="c-dropdown__link" href="a/path">Item 2</a>
        </li>
        <li class="c-dropdown__item">
            <a class="c-dropdown__link" href="a/path">Item 3</a>
        </li>
    </ul>
</div>
```

#### SASS

Add styling for the Dropdown by incorporating the settings and component into your application `scss` endpoint, for example:

```scss
// enhanced.scss

// 10-settings
@import '@springernature/springer-dropdown/scss/10-settings/dropdown';

// 50-components
@import '@springernature/springer-dropdown/scss/50-components/enhanced';
```

## Create Dropdown

Some situations require the dropdown to be built using JavaScript.  This can be done with the `createDropdown` method.
It takes two mandatory arguments, button text and an array of links, and an optional options object as the third argument.

```javascript
// Create some links
const links = [];
for (let i = 0; i < 5; i++) {
    const link = document.createElement('a');
    links.push(link);
}

const newDropdown = createDropdown('Menu text', links, {HIDE_CLASS: 'hide-me'});
document.body.appendChild(newDropdown);
```

## Polyfills

This module uses `Element.closest()` and `Object.assign()`.

