# Nature Section Heading

[![NPM version][badge-npm]][info-npm]

The Nature Section heading is a type of heading used for titles of some subsections of pages on Nature.com.

It uses borders to make it stand out from other headings on the page.

## When to use this component

Use the Nature Section heading when you want to organise multiple pieces of content into a section on a landing page. For example, a group of cards linking to articles on a similar subject.

## When not to use this component

When you need to break up content on article pages into chunks, use [default heading styles](https://frontend-design-system.private.springernature.app/nature/styleguide/typography#headings-nature-journals).

## How it works

Write clear, descriptive headings using sentence case.

### Section headings with and without a top border

There are 2 styles of Section heading:

- one with a top and botton border - this is set as an `<h2>` heading level
- one with a bottom border and no top border - this is designed for sub-headings and is set at heading level `<h3>`

If you need to change the default heading level of a Section heading, you can do this using the heading level with the `aria-level` property. The level should be a string, not an integer.

To make our sites accessible, you must always [use heading levels correctly to communicate page structure](https://elements.public.springernature.app/nature/styleguide/typography#use-heading-levels-to-communicate-page-structure).

### Section headings as links

You can use a Section heading to link to another page.

If you're using the handlebars template and you add a link, the heading will render a chevron after the heading text to show users that they can click on it.

![Section heading with a right-arrow chevron after the heading text](https://user-images.githubusercontent.com/15365576/152791603-d876746c-ab7a-4a03-84c2-dc871df0d6b2.png)

If you're not using the handlebars template, you'll need to style it yourself using [the source code for the chevron svg icon](https://github.com/springernature/frontend-toolkits/blob/master/context/brand-context/default/img/icons/chevron-right.svg
).

## Installation

To use the Section heading component, enter the following command in your Terminal:

```
npm install @springernature/nature-section-heading
```

## Usage

Then import the installed component code in your `scss` file:

```scss
// settings
@import '@springernature/nature-section-heading/scss/10-settings/section-heading';
// component
@import '@springernature/nature-section-heading/scss/50-components/section-heading';
```

Once you’ve installed the `scss`, build your Section heading using the following HTML as a guide.

## Template

Find a configurable template in the [Section heading's `view` folder](https://github.com/springernature/frontend-toolkits/blob/master/toolkits/nature/packages/nature-section-heading/view/section-heading.hbs). 

See an example in the [Section heading's `demo` folder](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/nature/packages/nature-section-heading/demo).

## Help improve this page

If you’ve got a question, idea or suggestion about how to improve this component or guidance, post in the [#design-systems Slack channel](https://springernature.slack.com/archives/C75DHBTBP).

[info-npm]: https://www.npmjs.com/package/@springernature/nature-section-heading
[badge-npm]: https://img.shields.io/npm/v/@springernature/nature-section-heading.svg
