# Springer Nature User Details

Springer nature branded 'submission details' component.

## Usage

### HTML

The template requires you have the following data available:

submission: {
    abstract: {
        html
    }
    articleType,
    authors: [{
        givenName,
        familyName
    }],
    journalTitle,
    revisionVersion,
    submissionId,
    submittedTimestamp,
    title: {
        html,
        plainText
    },
    files: {
        all: [
                {
                    downloadUrl,
                    name
                }
        ]
    }
}

The template included is handlebars, but it is not required. It also assumes you have a `defaultDateFormat` helper available to format your date as `DD Mmm YYYY`, but this need not necessarily be handled in the template.

This component requires the global expander component. It also requires the arrow mixin,  and some utilies and settings from the brand context (see below).


### CSS

Import the styles into your main stylesheet

```scss
// core.scss
@import '@springernature/springernature-submission-header/scss/50-components/core';
```


```scss
// enhanced.scss
@import '@springernature/brand-context/springernature/scss/10-settings/colors/default';
@import '@springernature/brand-context/default/scss/30-mixins/arrow.scss';
@import '@springernature/brand-context/springer/scss/30-mixins/links';
@import '@springernature/springernature-submission-header/scss/50-components/enhanced';
@import '@springernature/brand-context/default/scss/60-utilities/display';
@import '@springernature/brand-context/default/scss/60-utilities/flex';
@import '@springernature/brand-context/default/scss/60-utilities/hiding';
```


### Javascript
import the expander package, and the popup package, and initialise

```javascript
import {Expander} from '@springernature/global-expander/js/expander';
import {Popup} from '@springernature/global-popup/js/popup';

const abstractExpanderTrigger = document.querySelector('[data-component-abstract-expander]');
const abstractExpanderTarget = document.querySelector('[data-component-abstract-expander-target]');
const triggers = Array.from(document.querySelectorAll('[data-component-author-popup-trigger]'));

if (abstractExpanderTarget && abstractExpanderTrigger) {
    const abstractExpander = new Expander(abstractExpanderTrigger, abstractExpanderTarget, {});
    abstractExpander.init();
}

triggers.forEach(trigger => {
    const target = trigger.getAttribute('data-popup-target');
    new Popup(trigger, target, {});
});
```