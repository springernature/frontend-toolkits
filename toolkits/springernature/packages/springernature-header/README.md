# Springer Nature User Details

Springer nature branded header component, with SN journal logo, optional journal specific logo, and the user-details component.

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

It requires the springernature-user-details component. You will need to import the global context and the user details components.

### Javascript

```javascript
import userDetails from '@springernature/user-details/js';

userDetails();
```

### CSS

Import the core styles into your main stylesheet

```scss
// core
@import '@springernature/springernature-user-details/scss/10-settings/typography';
@import '@springernature/brand-context/default/scss/30-mixins/media-query';
@import '@springernature/springernature-user-details/scss/50-components/core';
@import '@springernature/springernature-header/scss/50-components/core';
```

Import the enhanced settings and styles into your main stylesheet

```scss
// enhanced.scss
@import '@springernature/brand-context/default/scss/10-settings/breakpints';
@import '@springernature/springernature-user-details/scss/10-settings/colours';
@import '@springernature/springernature-header/scss/10-settings/colours';
@import '@springernature/springernature-header/scss/10-settings/fonts';
@import '@springernature/springernature-header/scss/10-settings/layout';
@import '@springernature/springernature-user-details/scss/50-components/enhanced';
@import '@springernature/springernature-header/scss/50-components/enhanced';
```