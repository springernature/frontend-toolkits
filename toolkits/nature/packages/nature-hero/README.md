# Nature Hero

[![NPM version][badge-npm]][info-npm]

The Nature Hero component appears at the top of the page on all Nature journal sites.

It consists of:
- an `<h2>` article title which links to the full article
- a summary of the article, which appears underneath the title
- an image

Nature editors decide on the content and image that goes in the Hero component on each journal site. They can add and update this content in a tool called PubServ. 

## When to use this component

Use the Nature Hero component for the main featured story on Nature journal sites.

## Installation

To use the Hero component, enter the following command in your Terminal:

```
npm install @springernature/nature-hero
```

Import the installed component code in your `scss` file:

```scss
@import '@springernature/nature-hero/scss/10-settings/hero';
@import '@springernature/nature-hero/scss/50-components/hero';

@import '@springernature/brand-context/default/scss/60-utilities/links.scss';
@import '@springernature/brand-context/default/scss/60-utilities/positioning.scss';
@import '@springernature/brand-context/default/scss/60-utilities/spacing.scss';
```

## Template

Find a configurable template in the [Hero's `view` folder](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/nature/packages/nature-hero/view). 

You can see an example in the [Hero's `demo` folder](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/nature/packages/nature-hero/demo).

## Help improve this page

If you’ve got a question, idea or suggestion about how to improve this component or guidance, post in the [#design-systems Slack channel](https://springernature.slack.com/archives/C75DHBTBP).

[info-npm]: https://www.npmjs.com/package/@springernature/nature-header
[badge-npm]: https://img.shields.io/npm/v/@springernature/nature-header.svg


[info-npm]: https://www.npmjs.com/package/@springernature/nature-hero
[badge-npm]: https://img.shields.io/npm/v/@springernature/nature-hero.svg
