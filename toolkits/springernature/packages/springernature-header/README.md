# Springer Nature User Details

Springer nature branded header component, with Springer Nature Editorial logo, optional journal logo.

## Requirements

A class name of `.js` on the document root element will be required to enable enhanced visual styles. The class should be added via a micro (but blocking) script, placed as far up in the <head> of the document as possible.

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
submission {
    journalId
    journalName
}

You will need to import the [springernature context](https://github.com/springernature/frontend-toolkits/tree/master/context/brand-context/springernature).

The template assumes you are using handlebars and there is minimal use of built-in helpers - if you are using a different templating language then the tags will need to be modified.

### CSS

Import the core styles into your main stylesheet

```scss
// core
@import '@springernature/brand-context/springernature/scss/core';

@import '@springernature/springernature-header/scss/10-settings/layout';
@import '@springernature/springernature-header/scss/50-components/core';
```

Import the enhanced settings and styles into your main stylesheet

```scss
// enhanced.scss
@import '@springernature/brand-context/springernature/scss/enhanced';

@import '@springernature/springernature-header/scss/10-settings/layout';
@import '@springernature/springernature-header/scss/50-components/enhanced';
```