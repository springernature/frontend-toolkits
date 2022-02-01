# Nature Section Heading

[![NPM version][badge-npm]][info-npm]

The Nature Section heading is a type of heading used for titles of some subsections of pages on Nature.com.

It uses borders above and below the heading text to make it stand out from other headings on the page.

![An example Section heading that reads "Heading text" with a thick black border above the heading text and a thinner black border below](https://user-images.githubusercontent.com/27411864/148927871-9c8735d0-50df-4e12-8dde-43f36f3e7ad5.png)

## When to use this component

Use the Nature Section heading when you want to organise multiple pieces of content into a section on a landing page. For example, a group of cards linking to articles on a similar subject.

## When not to use this component

When you need to break up content on article pages into chunks, use [default heading styles](https://frontend-design-system.private.springernature.app/nature/styleguide/typography#headings-nature-journals).

## How it works

Write clear, descriptive headings using sentence case.

### Section headings as links

You may want a Section heading to link to another page.

In these cases, include a chevron after the heading text to help users understand that they can click on it.

![Section heading with a right-arrow chevron after the heading text](https://user-images.githubusercontent.com/27411864/148927772-b39ee02c-b8de-4348-9962-52e045acb39c.png)

[Get the source code for the chevron icon](https://github.com/springernature/frontend-toolkits/blob/master/context/brand-context/default/img/icons/chevron-right.svg
)

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

A configurable template can found in the [`view` folder](./view/section-heading.hbs). Example usage can be found in the `demo` folder.

## Help improve this page

If you’ve got a question, idea or suggestion about how to improve this component or guidance, post in the [#design-systems Slack channel](https://springernature.slack.com/archives/C75DHBTBP).

[info-npm]: https://www.npmjs.com/package/@springernature/nature-section-heading
[badge-npm]: https://img.shields.io/npm/v/@springernature/nature-section-heading.svg