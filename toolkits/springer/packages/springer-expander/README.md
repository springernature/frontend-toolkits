# Springer Expander

The springer expander is for collapsing sections of content and making them expandable. It uses `<details>` and `<summary>` and, as such, is JavaScript independent. In older browsers, the sections are expanded by default.

## Usage

First, import the `springer-expander` styles:

```scss
@import '../node_modules/@springernature/springer-hero/scss/50-components/springer-expander';
```

Then compile the template located in the `./view` folder whenever the component is needed. See the `./demo/context.json` to see an example of the expected data.

### Variants

#### `open`

You can make an expander _expanded_ by default (on page load) by applying `open: true` to the data used to compile its template. This adds the `open` attribute to its `<details>` element.

#### `headingLevel`

By including a `headingLevel` property with a number (of type `String`) you can add heading semantics to the expander’s title. This is recommended in most cases, since expanders represent collapsed sections of the page.

With `headingLevel: '2'`, the markup for the header becomes:

```html
<div class="c-expander__header" role="heading" aria-level="2">
    ...
</div>
```

#### `listItem`

If you set `listItem: true`, the outer `class="c-expander"` element becomes an `<li>`. Where heading semantics are not provided (see `headingLevel`), list semantics are recommended. In general, use heading semantics where a set of successive expanders represent large sections of content. Use list semantics where each expander reveals only a sentence or two. 

Be careful to wrap the set of `<li>` expanders in a `<ul>`.
