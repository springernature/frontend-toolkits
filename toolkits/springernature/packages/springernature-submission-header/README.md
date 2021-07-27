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
    }
}

The template included is handlebars, but it is not required. It also assumes you have a `defaultDateFormat` helper available to format your date to `DD Mmm YYYY` format, but this need not necessarily be handled in the template.
This component requires the global expander component. It also requires the arrow mixin and the template colours from the brand context.


### CSS

Import the styles into your main stylesheet

// core
@import '@springernature/brand-context/springernature/scss/core';
@import '@springernature/brand-context/springernature/scss/10-settings/colors/default';
@import '@springernature/brand-context/default/scss/30-mixins/arrow.scss';

@import '@springernature/springernature-submission-header/scss/50-components/core';

// enhanced
@import '@springernature/springernature-submission-header/scss/50-components/enhanced';


### Javascript
import the expander package

import {Expander} from '@springernature/global-expander/js/expander';

Initialise expander
```   
const abstractExpanderTrigger = document.querySelector('[data-component-abstract-expander]');
const abstractExpanderTarget = document.querySelector('[data-component-abstract-expander-target]');

if (abstractExpanderTarget && abstractExpanderTrigger) {
    const abstractExpander = new Expander(abstractExpanderTrigger, abstractExpanderTarget, {});
    abstractExpander.init();
}
```