# Nature Header

[![NPM version][badge-npm]][info-npm]

The Nature Header component includes:

- the journal’s logo - which appears in the top left
- a list of common actions, like view all journals, search and login - which appear in the top right
- a vertical list of dropdown menu  links - which appear underneath the logo

![The Nature Header from the Nature.com homepage. It shows the Nature logo, dropdown links, and options to view all journals, search, and login.](https://user-images.githubusercontent.com/27411864/149321441-0042c5f5-9c1d-4b24-8998-41ae52574a23.png)

## When to use this component

Use the Nature Header for any product or service in the Nature Portfolio.

## How it works

### Navigation menu

The dropdown menu labels describe the main categories for the navigation menu sub-items. Research showed that users found what they needed more quickly and easily with the main categories listed out - rather than hidden behind a single “menu” button.

Do user research to learn the best way to categorise and label navigation menu items for the journal you’re working on. 

Use sentence case, not title case, for the text of each menu label.

### Separating menu items with keylines

In some cases, you may want to use a keyline to visually separate navigation menu items. For example, to separate social media links from the other navigation links, like this:

![A dropdown menu titled "Publish with us". The menu has 3 items. The last item has a keyline which visually separates it from the 2 items above it.](https://user-images.githubusercontent.com/27411864/149321067-6a0b513a-2ce0-4427-ac75-9229383310bd.png)

## Installation

To use the Header component, enter the following command in your Terminal:

```
npm install @springernature/nature-header
```

## Usage

Import the installed component code in your `scss` file:

```scss
@import '@springernature/nature-header/scss/50-components/header';
@import '@springernature/nature-header/scss/50-components/header-expander';

@import '@springernature/brand-context/default/scss/60-utilities/buttons.scss';
@import '@springernature/brand-context/default/scss/60-utilities/display.scss';
@import '@springernature/brand-context/default/scss/60-utilities/hiding.scss';
@import '@springernature/brand-context/default/scss/60-utilities/lists.scss';
@import '@springernature/brand-context/default/scss/60-utilities/spacing.scss';
```

> **NOTE** The component require the use of the utility classes shown above

Then import the JavaScript as follows: 

```
import {header} from '@springernature/nature-header/js/header';

header();
```

Once you’ve installed the `scss` and JavaScript, build your Header using the Handlebars template below as a guide.

### Header

In the oscar-sites-nature application, the color of the border on each journal’s header is defined from Pubserv. It will override the Header’s default black border.

For ease of maintenance, the `scss` for this component is separated into 2 classnames and contained in 2 separate files:

- `c-header-expander` - for all interactive Header parts that users can open and close, like dropdown menus and pop-out modals
- `c-header` - for all other parts of the Header

You can find the HTML in the [included handlebars template](./view/header.hbs).

The loops and conditional statements show which parts of the component contain dynamic content.

### Header expander

The Header’s JavaScript file uses: 

- [the Global expander component](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-expander)
- `makeArray` in [the Global JavaScript component](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-javascript)

When a user selects the trigger, the Global expander component opens and closes the specified target. You’ll need to put matching values into the `href` of the trigger and the `id` attribute on the target element to make this work.

### Adding keylines above menu items

There are 2 ways to apply keylines to menu items.

If your menu is static - meaning it can’t be changed from another source, like a CMS - use the `c-header-expander__item–keyline`  classname to apply a keyline above a menu item. For example:

```html
<li class="c-header-expander__item c-header-expander__item--keyline">
    <a href="some url">Some text</a>
</li>
```

If the items in your menu are dynamic, you can use the `c-header-expander__item–keyline-first-item-only` classname to apply a keyline above the first menu item in a group.

For example, you may want to keep social media links grouped together, visually separated from the other menu items.

In these instances, you can apply `c-header-expander__item–keyline-first-item-only` to a group of list items, so the first item in that group always has a keyline above it.

You can see an example of this in the `view` template.

## Research on this component

The Pandora team originally created this component whilst [redesigning the information architecture of the Nature journal websites](https://hive.springernature.com/home/designing-a-new-information-architecture-for-the-nature-journal-websites).

The team designed the header to help users find what they needed more easily than with the previous version, which placed all navigation items behind a single “Menu” button.

A/B testing showed that exposing top-level navigation links in the menu increased the number of people visiting certain pages. For example, information for authors.

[Read a blog post on the Nature header and navigation redesign](https://hive.springernature.com/home/ls/community/content-consumption/post/4537888966049792)

## Help improve this page

If you’ve got a question, idea or suggestion about how to improve this component or guidance, post in the [#design-systems Slack channel](https://springernature.slack.com/archives/C75DHBTBP).

[info-npm]: https://www.npmjs.com/package/@springernature/nature-header
[badge-npm]: https://img.shields.io/npm/v/@springernature/nature-header.svg
