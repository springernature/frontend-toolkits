# Nature Header

[![NPM version][badge-npm]][info-npm]

The Nature Header component includes:

- the journal’s logo - which appears in the top left
- a list of common actions, like view all journals, search and login - which appear in the top right
- a vertical list of dropdown menu  links - which appear underneath the logo

## When to use this component

Use the Nature Header for any product or service in the Nature Portfolio.

## How it works

### Navigation menu

The dropdown menu labels describe the main categories for the navigation menu sub-items. Research showed that users found what they needed more quickly and easily with the main categories listed out - rather than hidden behind a single “menu” button.

Do user research to learn the best way to categorise and label navigation menu items for the journal you’re working on. 

Use sentence case, not title case, for the text of each menu label.

### Separating menu items with keylines

In some cases, you may want to use a keyline to visually separate navigation menu items. For example, to separate social media links from the other navigation links, like this:

![A dropdown menu titled "Publish with us". The menu has 3 items. The last item has a keyline which visually separates it from the 2 items above it.](https://user-images.githubusercontent.com/15365576/153220305-8f08f2dc-d040-4471-bb0b-bd2425ed4c29.png)

## Installation

To use the Header component, enter the following command in your Terminal:

```
npm install @springernature/nature-header
```

## Usage

Import the installed component code in your `scss` file:

```scss
@import '@springernature/nature-header/scss/50-components/header';

@import '@springernature/brand-context/default/scss/60-utilities/hiding.scss';
```

Then import the JavaScript as follows: 

```
import {header} from '@springernature/nature-header/js/header';

header();
```

Once you’ve installed the `scss` and JavaScript, build your Header using the `Handlebars` template below as a guide.

### Template

You can find a configurable template in the [Header's `view` folder](https://github.com/springernature/frontend-toolkits/blob/master/toolkits/nature/packages/nature-header/view/header.hbs).

See an example in the [Header's `demo` folder](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/nature/packages/nature-header/demo)

The loops and conditional statements show which parts of the component contain dynamic content.

### Header

In the oscar-sites-nature application, the color of the border on each journal’s header is defined from Pubserv. It will override the Header’s default black border.

### Header logo

In the oscar-sites-nature application, some journals will have a compact variant of their logo shown at narrower viewports and swapped with another variant at wider viewports. An example of this is observable in [Nature Cardiovascular Research](https://www.nature.com/natcardiovascres/) journal's header.

### Header expander

The Header’s JavaScript file uses the following from `brand-context`: 

- [`Expander`](https://github.com/springernature/frontend-toolkits/blob/master/context/brand-context/default/js/README.md#expander)
- [`makeArray`](https://github.com/springernature/frontend-toolkits/blob/master/context/brand-context/default/js/README.md##makearray)

When a user selects the trigger, the Global expander component opens and closes the specified target. You’ll need to put matching values into the `href` of the trigger and the `id` attribute on the target element to make this work.

### Adding keylines above menu items

There are 2 ways to apply keylines to menu items.

If your menu is static - meaning it can’t be changed from another source, like a CMS - use the `c-header__item--keyline`  classname to apply a keyline above a menu item. For example:

```html
<li class="c-header__item c-header__item--keyline">
    <a href="some url">Some text</a>
</li>
```

If there is more than one group in a menu, a keyline is applied above the first menu item for all groups after the first group. For example, you may want to keep social media links grouped together, and visually separated from the other menu items:

```html
<ul class="c-header__list">
    <li class="c-header__item"><a href="#">Site link</a></li>
</ul>
<ul class="c-header__list">
    <li class="c-header__item"><a href="#">Social network 1</a></li>
    <li class="c-header__item"><a href="#">Social network 2</a></li>
</ul>
```

## Research on this component

The Pandora team originally created this component whilst [redesigning the information architecture of the Nature journal websites](https://hive.springernature.com/home/designing-a-new-information-architecture-for-the-nature-journal-websites).

The team designed the header to help users find what they needed more easily than with the previous version, which placed all navigation items behind a single “Menu” button.

A/B testing showed that exposing top-level navigation links in the menu increased the number of people visiting certain pages. For example, information for authors.

[Read a blog post on the Nature header and navigation redesign](https://hive.springernature.com/home/ls/community/content-consumption/post/4537888966049792)

## Help improve this page

If you’ve got a question, idea or suggestion about how to improve this component or guidance, post in the [#design-systems Slack channel](https://springernature.slack.com/archives/C75DHBTBP).

[info-npm]: https://www.npmjs.com/package/@springernature/nature-header
[badge-npm]: https://img.shields.io/npm/v/@springernature/nature-header.svg
