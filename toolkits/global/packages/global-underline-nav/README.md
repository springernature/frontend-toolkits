# Global Underline Nav

[![NPM version][badge-npm]][info-npm]

The Underline Nav is a navigation made out of a bunch of links into which the
selected state (e.g the link representing the current page or view) and the
hovered state are denoted by a line underlining the link.  
To be more precise, the line is nothing more than a bottom border.

It is worth noting, that although the Underline Nav has the look and feel of a tabbed interface, it is not one.

## When to use this component

Use this component as a one-level navigation to switch between pages of an
application or between views of a particular portion of a page.  
In the latter use case, make sure to maintain the selected state into the page
URL through query parameters.

## Installation

To use the Underline Nav component, enter the following command in your
Terminal:

```
npm install @springernature/global-underline-nav
```

Import the installed component code in your `scss` file:

```scss
// Pick ONE of the brands below to include or contribute yours if it's missing
@import '@springernature/global-underline-nav/scss/10-settings/default';
@import '@springernature/global-underline-nav/scss/10-settings/springernature';

// Include this with your other mixins
@import '@springernature/brand-context/default/scss/30-mixins/lists';

// Include this with your other components
@import '@springernature/global-underline-nav/scss/50-components/underline-nav';
```

### Using the Underline Nav with a `<nav>`

The Underline Nav component doesn't include a `<nav>` landmark.  
The consumer of the component should decide whether or not their use case
qualifies to wrap the component in a `<nav>` element.

## Template

Find a configurable template in the [`view`
folder](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-underline-view/view). 

You can see an example in the [`demo`
folder](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-underline-nav/demo).


## Help improve this page

If you’ve got a question, idea or suggestion about how to improve this component or guidance, post in the [#design-systems Slack channel](https://springernature.slack.com/archives/C75DHBTBP).

[info-npm]: https://www.npmjs.com/package/@springernature/global-underline-nav
[badge-npm]: https://img.shields.io/npm/v/@springernature/global-underline-nav.svg

