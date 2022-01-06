# Nature Section Heading

[GitHub](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/nature/packages/nature-section-heading) | [NPM](https://www.npmjs.com/package/@springernature/nature-section-heading)

The Nature Section heading is a type of heading used for titles of some subsections of pages on Nature.com.

It uses borders above and below the heading text to make it stand out from other headings on the page.

![Example](img/example-with-chevron.png)

## When to use this component

Use the Nature Section heading when you want to organise multiple pieces of content into a section on a landing page. For example, a group of cards linking to articles on a similar subject.

## When not to use this component


When you need to break up content on article pages into chunks, use [default heading styles](https://frontend-design-system.private.springernature.app/nature/styleguide/typography#headings-nature-journals).

## How it works

Write clear, descriptive headings using sentence case.


### Section headings as links

You may want a Section heading to link to another page.

In these cases, include a chevron after the heading text to help users understand that they can click on it.

![Example with chevron](img/example.png)
The source code for the chevron in the above example can be found [here](https://github.com/springernature/frontend-toolkits/blob/master/context/brand-context/default/img/icons/chevron-right.svg).

## Installation

To use the Section heading component, enter the following command in your Terminal:

```
npm install @springernature/nature-section-heading
```

Then import the installed component code in your `scss` file:

```scss
// settings
@import '@springernature/nature-section-heading/scss/10-settings/section-heading';
// component
@import '@springernature/nature-section-heading/scss/50-components/section-heading';
```

Once you’ve installed the SCSS, build your Section Heading using the following HTML as a guide.

### Section heading

```html
<h2 class="c-section-heading">Heading Text</h2>
```

### Section heading as link

```html
<div class="c-section-heading">
    <h2>
        <a href="/nature/collections" class="c-section-heading__link">
            Heading Text
            <svg class="c-section-heading__icon" aria-hidden="true" focusable="false" height="20" width="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m4.08573416 5.70052374 2.48162731-2.4816273c.39282216-.39282216 1.02197315-.40056173 1.40306523-.01946965.39113012.39113012.3914806 1.02492687-.00014045 1.41654791l-4.17620791 4.17620792c-.39120769.39120768-1.02508144.39160691-1.41671995-.0000316l-4.17639421-4.1763942c-.39122513-.39122514-.39767006-1.01908149-.01657797-1.40017357.39113012-.39113012 1.02337105-.3930364 1.41951348.00310603l2.48183447 2.48183446.99770587 1.01367533z" transform="matrix(0 -1 1 0 2.081146 11.085734)"></path></svg>
        </a>
    </h2>
</div>
```

## Help improve this page

If you’ve got a question, idea or suggestion about how to improve this component or guidance, post in the [#design-systems Slack channel](https://springernature.slack.com/archives/C75DHBTBP).
