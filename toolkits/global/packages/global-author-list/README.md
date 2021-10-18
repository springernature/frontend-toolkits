# Author List

A styled list of comma separated authors with the final author being preceded by an " & ".
The separation strings `, `, ` & ` and ` ... ` are set in the CSS using pseudo-elements.

The component can be enhanced, using Javascript, with a toggle button which
expands/truncates the list.

## Branding

To include `global-author-list` in your application, you need to choose **ONE** brand from those available. The `DEFAULT` brand is included in all other brands, and any settings that are not configured will fall back to default.

```scss
// Pick ONE of the brands below to include
@import '@springernature/global-author-list/scss/10-settings/default';
@import '@springernature/global-author-list/scss/10-settings/springer';
@import '@springernature/global-author-list/scss/10-settings/nature';
@import '@springernature/global-author-list/scss/10-settings/springernature';

// Include this with your other components
@import '@springernature/global-author-list/scss/50-components/author-list';
```

## Usage

### Display a styled list of authors with comma separation

```html
<ul class="c-author-list">
    <li class="c-author-list__item">Author 1</li>
    <li class="c-author-list__item">Author 2</li>
    <li class="c-author-list__item">Author 3</li>
    <li class="c-author-list__item">Author 4</li>
    <li class="c-author-list__item">Author 5</li>
</ul>
```

**Example output**
`Author 1, Author 2, Author 3, Author 4 & Author 5`

#### Modifiers

**Compact**

Sets a smaller `font-size` and `line-height` on the list.

```html
<ul class="c-author-list c-author-list--compact">...</ul>
```

**Truncated**

Overrides the default ` & ` with a `...` before the final item in the list.

```html
<ul class="c-author-list c-author-list--truncated">...</ul>
```

**Example output**
`Author 1, Author 2 ... Author 5`

### Enhance with a toggle button which expands/truncates the list

#### Markup

```html
<div data-author-list>
    <h3 data-author-list-heading>Authors</h3>
    <ul class="c-author-list">
        <li class="c-author-list__item">Author 1</li>
        <li class="c-author-list__item">Author 2</li>
        <li class="c-author-list__item">Author 3</li>
        <li class="c-author-list__item">Author 4</li>
        <li class="c-author-list__item">Author 5</li>
    </ul>
</div>
```

> **NOTE**: It is down to your application to decide whether or not to have the heading
visibily hidden (it needs to be accessible to screen readers).

#### Javascript

The `authorLists()` function is used to initialise **all** lists present in the
document. 

```javascript
import {authorLists} from '@springernature/global-author-list/js';

authorLists(/* options */);
```

For more flexibility you can target an individual author list by using the `authorList()` function directly:

```javascript
import {authorList} from '@springernature/global-author-list/js/author-list';

const myAuthorListContainer = document.querySelector('.my-author-list-container');

authorList(myAuthorListContainer/*, options*/).init();
```

#### Options

| Option              | Type   | Default value                | Description                                                              |
|---------------------|--------|------------------------------|--------------------------------------------------------------------------|
| headingSelector     | String | '[data-author-list-heading]' | Selector for the heading element                            |
| listSelector        | String | 'ul'                         | Selector for the list element                               |
| authorHideClass     | String | 'c-author-list__hide'        | CSS class to hide items from the list when it is truncated |
| truncatedClass      | String | 'c-author-list--truncated'   | CSS class to indicate truncated state           |
| listModifierClass   | String | null                         | CSS class to add on initialisation                |
| buttonClassList     | String | null                         | List of CSS classes to style the toggle button                           |
| buttonCollapsedText | String | Show all authors             | The text the button has when the list is collapsed.                      |
| buttonExpandedText  | String | Show less authors            | The text the button has when the list is expanded.                       |

The data attribute options are the same, but are lowercase and hyphenated:

- `data-author-list-heading-selector`
- `data-author-list-list-selector`
- `data-author-list-author-hide-class`
- `data-author-list-truncated-class`
- `data-author-list-list-modifier-class`
- `data-author-list-button-class-list`
- `data-author-list-button-collapsed-text`
- `data-author-list-button-expanded-text`

> **NOTE**: The data attribute options will take precedence over any options set during initialisation. Their names are not configurable and therefore should not be changed.

##### Heads up!

- **NOTE**: It is down to your application to toggle the `.js` class onto the `<html>`
element (check for more in the [frontend playbook](https://github.com/springernature/frontend-playbook/blob/main/practices/javascript-styling.md)), if you use the default `authorHideClass` value.

- **NOTE**: The JS component make use of an SVG image as icon in the toggle button that
  swaps from `+` to `-`. It is down to your application to include these `+` and
  `-` icons in its SVG sprite. You can find the svg files on the [brand-context](https://github.com/springernature/frontend-toolkits/tree/master/context/brand-context/default/img/icons) of the design system.
