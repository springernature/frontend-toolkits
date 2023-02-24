# Nature Hero

[![NPM version][badge-npm]][info-npm]

Nature Hero lets you create an area at the top of the page to introduce a journal or featured content.

## When to use this component

Use the Nature hero to highlight the main featured story on Nature journal sites or the Nature homepage.

Only use this component once on a page. Place it below the [Nature Header](https://elements.springernature.com/nature/components/nature-header).  

## How it works

### Installation

To use the Nature Hero component, enter the following command in your Terminal:

```
npm install @springernature/nature-hero
```

Then, import the installed component code in your `scss` file:

```scss
@import '@springernature/nature-hero/scss/10-settings/hero';
@import '@springernature/nature-hero/scss/50-components/hero';

@import '@springernature/brand-context/default/scss/60-utilities/links.scss';
@import '@springernature/brand-context/default/scss/60-utilities/positioning.scss';
@import '@springernature/brand-context/default/scss/60-utilities/spacing.scss';
```

### Title

The title is a `h2` heading. Always follow our [guidelines on headings](https://elements.springernature.com/nature/styleguide/typography#headings).

The full text of the title will be a link to the article page. 

Keep the title to no more than 90 characters in length. This will make it easier for people to scan and read.
    
### Summary

The summary sits below the title. 

Use it to tell people what the article is about. Try to keep this to 1 or 2 short sentences. This will make it quicker for people to decide if they want to read the full article or not.
    
### Image

Images in the Nature Hero should have an aspect ratio of 16:9.

The image must have an alternative text description. [Go to our guidelines on alternative text](https://elements.springernature.com/nature/styleguide/accessibility#use-alternative-alt-text-on-images).

## Template

Find a configurable template in the [Hero's `view` folder](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/nature/packages/nature-hero/view). 

You can see an example in the [Hero's `demo` folder](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/nature/packages/nature-hero/demo).

## Help improve this page

If you’ve got a question, idea or suggestion about how to improve this component or guidance, post in the [#ask-elements Slack channel](https://springernature.slack.com/archives/CNBTFLBLP).

[info-npm]: https://www.npmjs.com/package/@springernature/nature-header
[badge-npm]: https://img.shields.io/npm/v/@springernature/nature-header.svg


[info-npm]: https://www.npmjs.com/package/@springernature/nature-hero
[badge-npm]: https://img.shields.io/npm/v/@springernature/nature-hero.svg
