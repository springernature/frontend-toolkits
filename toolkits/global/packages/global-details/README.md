# Global Details

The `global-details` component is for collapsing sections of content and making them expandable. SOme call this a "disclosure pattern". It uses `<details>` and `<summary>` and, as such, is JavaScript independent. In older browsers, the sections are expanded by default.

## Usage

First, import the `global-details` styles—selecting the brand settings you require.

```scss
@import '../node_modules/@springernature/global-details/scss/10-settings/default';
@import '../node_modules/@springernature/global-details/scss/50-components/details';
```

Then compile the template located in the `./view` folder whenever the component is needed. See the `./demo/context.json` to see an example of the expected data.

### Variants

#### `open`

You can make a details instance open/expanded by default (on page load) by applying `open: true` to the data used to compile its template. This adds the `open` attribute to its `<details>` element.

#### `headingLevel`

By including a `headingLevel` property with a number (of type `String`) you can add heading semantics to the summary’s title. This is recommended in most cases, since these components typically represent collapsed sections of the page.

With `headingLevel: '2'`, the markup for the header becomes:

```html
<div class="c-details__header" role="heading" aria-level="2">
    ...
</div>
```

#### `listItem`

If you set `listItem: true`, the outer `class="c-details"` element becomes an `<li>`. Where heading semantics are not provided (see `headingLevel`), list semantics are recommended. In general, use heading semantics where a set of successive details instances represent large sections of content. Use list semantics where each instance discloses only a sentence or two. 

Be careful to wrap the set of `<li>` instances in a `<ul>`.
