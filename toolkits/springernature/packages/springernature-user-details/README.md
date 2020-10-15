# Springer Nature User Details

Display current signed in user; click to expand to reveal more details

## Requirements

A class name of `.js` on the document root element will be required to enable visual styles for the user info drop down. The class should be added via a micro (but blocking) script, placed as far up in the <head> of the document as possible.

```javascript
<script>
    // JS Detection Script
    (function(e){var t=e.documentElement,n=e.implementation;t.className='js';})(document)
</script>
```

## Usage

### HTML

The component assumes you have the following data available to your template:

user-details {
    first_name
    last_name
    email_address
}
logoutUri

```html
<section class="c-user-details">
    <button data-component-user-details-open class="c-user-details__open link-like u-ml10 u-position-right" data-expander data-expander-target="#user">
        <span data-component-user-first-name>{{first_name}}</span>
        <span class="u-pr10" data-component-user-last-name>{{last_name}}</span>
    </button>
    <div id="user" class="c-user-details__content" data-component-user-details>
        <span class="c-user-details__content-item u-font-12 u-color-darker-grey">Signed in as</span>
        <div class="c-user-details__content-item c-user-details__email u-mb10 u-font-12" data-component-user-email>{{email_address}}</div>
        <ul class="c-user-details__links">
            <li class="c-user-details__link u-cursor-pointer">
                {{#if logoutUri}}
                    <a class="c-user__logout logout-link u-block u-font-12" href="{{logoutUri}}"
                    data-component-logout>Log out</a>
                {{/if}}
            </li>
        </ul>
    </div>
</section>
```

### Javascript

```javascript
import userDetails from '@springernature/user-details/js';

userDetails();
```

### CSS

Import the core styles into your main stylesheet

```scss
// core.scss
@import '@springernature/user-details/scss/50-components/core';
```

Import the enhanced settings and styles into your main stylesheet

```scss
// enhanced.scss
@import '@springernature/user-details/scss/50-components/enhanced';
```