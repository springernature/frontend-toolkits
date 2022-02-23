# Global corporate footer

[![NPM version][badge-npm]][info-npm]

The Global corporate footer component aims to deliver a consistent footer
experience across our services and therefore aid navigation for our users.

It consists of:
- a set of standard links
- our corporate logo (Springer Nature)
- a copyright line which includes the current year followed by "Springer Nature".

## When to use this component

Use the Global corporate footer component as soon as your product or service
needs a footer with a set of standardized links.

## Installation

To use the Global corporate footer component, enter the following command in
your Terminal:

```
npm install @springernature/global-corporate-footer
```

Import the Sass:

**Note**: The Global footer does not include settings overrides per brand as
other components usually do. This is intentional and in order to have it
consistent across brands.

```scss
@import '@springernature/global-corporate-footer/scss/10-settings/default';

// Include this with your other mixins
@import '@springernature/brand-context/default/scss/30-mixins/lists';

// Include this with your other components
@import '@springernature/global-corporate-footer/scss/50-components/corporate-footer';

// Include this with your other utilities
@import '@springernature/brand-context/default/scss/60-utilities/container';
```

## Default footer

Links that should **always** be present:
- Privacy policy
- Manage cookies / Do not sell my data
- Accessibility statement

**Important**: These are standard labels and should be used as is.  
However the destination of the link may differ on a product basis for _Privacy
policy_ and _Manage cookies / Do not sell my data_ whereas the link for
_Accessibility statement_ should be fixed to the one to be found in the [data
source of the Demo](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-corporate-footer/demo/context.json).

### Manage cookies interaction

_Manage cookies / Do not sell my data_ is a purely Javascript driven interaction
as it is entended, upon click, to launch a dialog window presenting the user
with an interface to manage their cookies preferences.  
For that reason you **should not use an anchor (`<a>`) element**, but rather
a button element. That is an acceptable behaviour as long as non-essential
cookies require Javascript.

**Note**: This interaction requires that you have integrated, into you
application, the third party script of your Cookie consent banner of choice.

There are **two main cookie consent banner providers** at Springer Nature:
1. Springer Nature's custom [Consent Management Plateform
  (CMP)](https://cookie-consent.public.springernature.app/docs/introduction/)
  (Recommended)
2. Third party One Trust cookie consent

For **the first one**, please refer to the [Preference Dialog Trigger section of the
Cookie consent
documentation](https://cookie-consent.public.springernature.app/docs/getting-started/installation/#preference-dialog-trigger)
to get the implementation details for the button.  
An example implementation is to be found in the [`demo` folder](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-corporate-footer/demo).

For **the second one**, the generated HTML of the _Manage cookies / Do not sell data_
interactive element should be:

```html
<button onclick="Optanon.ToggleInfoDisplay()" class="c-corporate-footer__link">Manage cookies / Do not sell my data</button>
```

## Footer with extended links

Links that **can be present** depending on the product needs:
- Terms
- California Privacy Statement
- Help & Support

**Important**: The label for the _Terms_ link is not yet standardized, as
opposed to the two other ones. Hence _Terms_ may consist of more than 1 item.  
The destination of the link may differ on a product basis for _Terms_ and _Help
& Support_.  
However the destination of the link for _California Privacy Statement_ should be
fixed to the one to be found in the  [data source of the
Demo](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-corporate-footer/demo/context.json).

**Note**: _California Privacy Statement_ and _Help & Support_ may be omitted on
a per project basis.

## Template

Find a configurable template in the [`view` folder](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-corporate-footer/view). 

You can see an example in the [`demo` folder](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-corporate-footer/demo).

## Help improve this page

If you’ve got a question, idea or suggestion about how to improve this component
or guidance, post in the [#design-systems Slack channel](https://springernature.slack.com/archives/C75DHBTBP).

[info-npm]: https://www.npmjs.com/package/@springernature/global-corporate-footer
[badge-npm]: https://img.shields.io/npm/v/@springernature/global-corporate-footer.svg
