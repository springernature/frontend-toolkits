# Global grid

The `global-layout-grid` component is a generic layout utility for creating responsive grid layouts where 

* Each grid item should be the same width
* Grid items should wrap according to available space

The purpose of `global-layout-grid` is to enable basic grid layouts—suitable for all kinds of content and product teasers—without having to defer to `@media` queries. Grid items are sized based around an ideal width (set as `$grid--basis` in Sass and `--grid--basis` in CSS).

## Branding

The `global-layout-grid` component can be used in any brand context. You just need to import the component itself:

```scss
@import '@springernature/global-layout-grid/scss/10-settings/default';
@import '@springernature/global-layout-grid/scss/50-components/layout-grid';
```

## Usage

### Default settings

Using the default settings, `$grid--basis` is equal to `min(300px, 100%)`. This means each item will be the same width and as close to `300px` in width as the context will allow. The `min()` function prevents items using more than `100%` of the horizontal space and causing overflow (obscured content; horizontal scrolling).

Note the use of list semantics. Collections of teasers/products should ordinarily be identified as lists in screen reader software. However, `<ul>` and `<li>` are not mandatory, allowing you to repurpose the component.

```html
<ul class="l-grid">
    <li>
        Item 1
    </li>
    <li>
        Item 2
    </li>
    <li>
        Item 3
    </li>
    <li>
        Item 4
    </li>
</ul>
```

### Custom settings

The component maps `$grid--basis` and `$grid--gap` to CSS custom properties, allowing you to adjust the values inline. In the following example, `--grid--gap` is set to `2em` and `--grid--basis` to `20ch`.

```html
<ul class="l-grid" style="--grid--gap: 2em; --grid--basis: min(20ch, 100%)">
    <li>
        Item 1
    </li>
    <li>
        Item 2
    </li>
    <li>
        Item 3
    </li>
    <li>
        Item 4
    </li>
</ul>
```

Note that the `20ch` has to be wrapped in the `min()` function. This is the result of the initial Sass value having to include the `min()` function inside Sass’s `unquote()` function. The version of Sass we are running at the time of writing cannot interpret `min()` and this is a workaround.
