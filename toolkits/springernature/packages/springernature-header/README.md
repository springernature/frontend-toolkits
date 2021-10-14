# Springer Nature User Details

Springer nature branded header component, with Springer Nature Editorial logo, optional journal logo, and the user-details component.

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

logoutUri
showJournalLogo - boolean to indicate whether or not there is a journal logo
backUrl - the href for the anchor wrapping the header logos (usually to the home page)
user-details {
    first_name
    last_name
    email_address
}
submission {
    journalId
    journalName
}

The springernature header optionally includes the user-details component [springernature-user-details component](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/springernature/packages/springernature-user-details). You will also need to import the [springernature context](https://github.com/springernature/frontend-toolkits/tree/master/context/brand-context/springernature).

The template assumes you are using handlebars and there is minimal use of built-in helpers - if you are using a different templating language then the tags will need to be modified.

### Javascript

```javascript
import userDetails from '@springernature/user-details/js';
userDetails();
```

### CSS

Import the core styles into your main stylesheet

```scss
// core
@import '@springernature/brand-context/springernature/scss/core';

@import '@springernature/springernature-header/scss/10-settings/layout';
@import '@springernature/springernature-user-details/scss/10-settings/typography'; // if including user-details data
@import '@springernature/springernature-user-details/scss/50-components/core'; // if including user-details data
@import '@springernature/brand-context/springernature/scss/10-settings/typography';
@import '@springernature/springernature-header/scss/50-components/core';
```

Import the enhanced settings and styles into your main stylesheet

```scss
// enhanced.scss
@import '@springernature/brand-context/springernature/scss/enhanced';

@import '@springernature/springernature-user-details/scss/10-settings/colours'; // if including user-details data
@import '@springernature/springernature-user-details/scss/50-components/enhanced'; // if including user-details data
@import '@springernature/brand-context/default/scss/10-settings/breakpoints';
@import '@springernature/brand-context/default/scss/30-mixins/media-query';
@import '@springernature/springernature-header/scss/50-components/enhanced';
```