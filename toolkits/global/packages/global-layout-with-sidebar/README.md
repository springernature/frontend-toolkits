# Global layout with sidebar

The `global-layout-with-sidebar` component is a generic layout utility for creating two column layouts where

* One column is a sidebar with a chosen optimal width
* The other column takes up the rest of the available space
* The layout automatically wraps into one column based on a minimum percent-based width for the non-sidebar element

The purpose of the `global-layout-with-sidebar` is to enable responsive 1-2 column layouts without the necessity of media query breakpoints. It is based on [Every Layout’s Sidebar](https://every-layout.dev/layouts/sidebar/).

## Branding

The `global-layout-with-sidebar` component can be used in any brand context. You just need to import the component itself:

```scss
@import '@springernature/global-layout-with-sidebar/scss/10-settings/default';
@import '@springernature/global-layout-with-sidebar/scss/50-components/layout-with-sidebar';
```

## Usage

### Default settings

Using the default settings, the `l-with-sidebar` element will be `400px` in the 2-column configuration. Both columns grow to 100% width of their parent `l-with-sidebar` where they wrap into 1 column. By default, this happens when the non-sidebar (“Main content” below) becomes less than `50%` of the total width.

```html
<div class="l-with-sidebar">
    <div>
        Main content
    </div>
    <div class="l-with-sidebar__sidebar">
        Sidebar content
    </div>
</div>
```

### Sidebar on left

Somewhat unconventional, but the component can take it!

```html
<div class="l-with-sidebar">
    <div class="l-with-sidebar__sidebar">
        Sidebar content
    </div>
    <div>
        Main content
    </div>
</div>
```

### Custom settings

The `global-layout-with-sidebar` component’s settings are mapped to CSS custom properties, meaning you can alter them inline. You can also set custom properties within your stylesheet and modify them using media queries to adjust for different view widths.

In the following example, the `gap` between the columns is `2em`, the 1-column layout is triggered when the main content goes under `66.666%`, and the sidebar is `300px` wide in the 2-column layout.

```html
<div class="l-with-sidebar" style="--with-sidebar--gap: 2em">
    <div style="--with-sidebar--min: 66.666%">
        Main content
    </div>
    <div class="l-with-sidebar__sidebar" style="--with-sidebar--basis: 300px">
        Sidebar content
    </div>
</div>
```

Note that these custom values will not take effect in IE11, which retains the original values, with no impact on the accessibility of the content.
