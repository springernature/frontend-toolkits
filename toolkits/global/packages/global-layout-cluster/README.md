# Global layout cluster

The Cluster component is a simple layout primitive for grouping (_clustering_) elements together. It improves upon basic `inline` and `inline-block` solutions by using Flexbox and the `gap` property to apportion space only _between_ the child elements.

## Branding

The `global-layout-cluster` component can be used in any brand context. You just need to import the component itself:

```scss
@import '@springernature/global-layout-stack/scss/10-settings/default';
@import '@springernature/global-layout-stack/scss/50-components/layout-cluster';
```

## Usage

### Default settings

A cluster of buttons:

```html
<fieldset class="l-cluster">
    <button class="u-button" type="button">Edit</button>
	<button class="u-button" type="button">Save</button>
	<button class="u-button" type="button">Delete</button>
	<button class="u-button" type="button">Share</button>
</fieldset>
```

### Alignment

You can align the cluster’s child elements along both axes with the modifiers `l-cluster--right`, `l-cluster--center`, `l-cluster--top`, `l-cluster--middle`, and `l-cluster--bottom`.

By default, the elements are justified to the left and aligned with `stretch`. This is particularly useful for clustering text inputs with (submit) buttons, since the elements will stretch to share the same height regardless of padding and `font-size`.

```html
<label for="name">Name:</label>
<div class="l-cluster">
    <input type="text" id="name" name="name">
</div>
```

### Custom gap

The `global-layout-cluster` component’s gap setting is mapped to a CSS custom property, meaning you can alter it inline. In the following example, the gap is `0`, making the submit button flush with the input (`1em` is the default value).

```html
<label for="name">Name:</label>
<div class="l-cluster" style="--cluster-gap: 0">
    <input type="text" id="name" name="name">
</div>
```


