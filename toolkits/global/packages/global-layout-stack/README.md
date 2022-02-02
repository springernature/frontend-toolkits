# Global layout stack

The Stack component (see [Every Layout](https://every-layout.dev/layouts/stack/)) is a layout primitive for apportioning equal space between sibling block elements. It is an antidote to adding margin to individual components—without consideration of context—resulting in missing or unnecessary white space.

## Branding

The `global-layout-stack` component can be used in any brand context. You just need to import the component itself:

```scss
@import '@springernature/global-layout-stack/scss/10-settings/default';
@import '@springernature/global-layout-stack/scss/50-components/layout-stack';
```

## Usage

### Default settings

By default, an element with `class="l-stack"` will add a space/gap of `1.5em` (one line) between each of its child elements. Any existing margin is removed. The child elements can be any element type.

```html
<div class="l-stack">
    <p>child 1</p>
    <blockquote>child 2</blockquote>
    <p>child 3</p>
    <figure>child 4</figure>
</div>
```

### Custom gap

The `global-layout-stack` component’s gap setting is mapped to a CSS custom property, meaning you can alter it inline. In the following example, the gap is `3em`.

```html
<div class="l-stack" style="--stack--gap: 3rem">
    <p>child 1</p>
    <blockquote>child 2</blockquote>
    <p>child 3</p>
    <figure>child 4</figure>
</div>
```

Note that older browsers inject margin, but newer browsers use the `gap` property with Flexbox. Since IE11 (for example) does not support custom properties, the default gap/margin will remain.

### Nesting

```html
<div class="l-stack" style="--stack--gap: 3em">
    <p>child 1</p>
    <blockquote>child 2</blockquote>
    <p>child 3</p>
    <figure>child 4</figure>
    <div class="l-stack" style="--stack--gap: 0.5em">
        <div>tightly</div>
        <div>stacked</div>
        <div>elements</div>
    </div>
</div>
```
