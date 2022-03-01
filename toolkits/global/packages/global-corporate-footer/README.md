# Global corporate footer

[![NPM version][badge-npm]][info-npm]

The Corporate footer gives copyright, licensing and other information about your service and department.

## When to use this component

Use this footer on all Springer, Nature Portfolio and Springer Nature products and services.

## How it works

There are 2 ways to configure the Corporate footer component.

The default footer option includes footer items that must be used everywhere

Or you can use the extended footer option. This includes the same footer items, as well as some extra links that only some services need.

### Default footer

#### Default footer items

Always include these items in your footer:

- Manage cookies / Do not sell my data
- Accessibility statement
- Privacy policy

You must use this exact wording for the footer links so that they're the same across our products.

#### Manage cookies / Do not sell my data

This item uses `JavaScript` to open a diaglog window when a user clicks it. The window shows the user how to manage their cookie preferences.

For that reason, the component uses a `<button>` element rather than an `<a>` element for the manage cookies action.

You'll need to integrate the third party script of a cookie consent banner into your application.

We use 2 main cookie consent banner providers at Springer Nature:

1. Springer Nature's custom [Consent Management Platform (CMP)](https://cookie-consent.public.springernature.app/docs/introduction/) (Recommended)
2. Third party One Trust cookie consent (this is being phased out in favour of the above)

For CMP, read how to implement the button in the [Preference Dialog Trigger section of the cookie consent
documentation](https://cookie-consent.public.springernature.app/docs/getting-started/installation/#preference-dialog-trigger).  

See an example implementation in the [`demo` folder](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-corporate-footer/demo).

For One Trust, the generated HTML of the Manage cookies / Do not sell data interactive element looks like this:

```html
<button onclick="Optanon.ToggleInfoDisplay()" class="c-corporate-footer__link">Manage cookies / Do not sell my data</button>
```

### Accessibility statement and privacy policy

The accessibility statement link must match the url in the [component demo's `context.json` file](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-corporate-footer/demo/context.json).

The privacy policy you need to use to depends on the legal entity for the product you're working on. Talk to your Product Owner or Manager to find out which privacy policy to link to.

### Extended footer

The extended footer contains the same links as the default footer, with the option to include:

- California privacy statement
- Terms and conditions
- Help and support

#### California privacy statement and Help and support links

Some products need to include one or both of the following:

- California privacy statement
- Help and support

If you need to include a California Privacy Statement link, you must use the url in the [component demo's `context.json` file](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-corporate-footer/demo/context.json).

Help and support should link to the relevant contact options your service offers.

#### Terms and conditions

The text you should use for this link depends on what it covers for your product or service. 

The most common options are:

- Terms and conditions
- Terms of use
- Impressum
- Imprint

## Installation

To use the Corporate footer component, enter the following command in
your Terminal:

```
npm install @springernature/global-corporate-footer
```
The Corporate footer component is designed to be the same across all brands. Because of this, it doesn't include any brand settings like some of the other components.

Import the installed component code in your `scss` file:

```scss
@import '@springernature/global-corporate-footer/scss/10-settings/default';

// Include this with your other components
@import '@springernature/global-corporate-footer/scss/50-components/corporate-footer';
```

## Template

Find a configurable template in the [`view` folder](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-corporate-footer/view). 

You can see an example in the [`demo` folder](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-corporate-footer/demo).

### Template configuration

#### Using the Corporate footer with an existing footer

The Corporate footer component doesn't include a `<footer>` region/landmark. This means you can use it together with - for example - `springer-nature-publisher` inside a common `<footer>`.

#### Configuring the default or extended footer option

The `demo`'s `context.json` file shows both the `default` and `extended` versions of the footer. 

We use wrappers around each version to sandbox them in the demo - but you won't need these wrappers when you're using the component in your application.

The actual configuration of the `corporate-footer` should look something like this example:

```json
{
  "navigation": {
  "links": [
    {
      "text": "Example link",
      "url": "/url/to/example/link"
    },
    {
      "text": "Example button",
      "buttonProperties": "onlick=\"doSomething()\""
    }
  ]
  },
  "image": {
    "src": "path/to/springer/nature/logo",
    "alt": "Springer Nature",
    "link": "https://www.springernature.com/"
  },
  "currentYear": 2022
}
```

## Help improve this page

If you’ve got a question, idea or suggestion about how to improve this component or guidance, post in the [#design-systems Slack channel](https://springernature.slack.com/archives/C75DHBTBP).

[info-npm]: https://www.npmjs.com/package/@springernature/global-corporate-footer
[badge-npm]: https://img.shields.io/npm/v/@springernature/global-corporate-footer.svg
