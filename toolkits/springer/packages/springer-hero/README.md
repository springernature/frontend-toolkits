# Springer Hero

Inspired by Nature’s hero component. Principally used for introducing subject/discipline pages.

# Usage

Import the Sass:

```scss
@import '../node_modules/@springernature/springer-hero/scss/10-settings/springer-hero';
@import '../node_modules/@springernature/springer-hero/scss/50-components/springer-hero';
```

Then compile the template located in the `./view` folder whenever the component is needed. See the `./demo/context.json` to see an example of the expected data.

## Variants

Both the image (`imageSrc`) and content (`content`) are optional. The component reconfigures automatically where these properties are omitted.

### `imageLeft`

You can display the image on the right (default; bottom on smaller screens) or left (top on smaller screens) by changing the data’s `imageLeft` property to `true`.

### `color`

You can override the default background color by including a `color` property.

### `contentBasis` and `imageMin`

Used together, these two properties let you control how much of the hero is given to content, how much to the image, and at which point the image disappears. 

The `contentBasis` property sets the width of the content area when there is enough space to display the image and content side-by-side.

The `imageMin` property needs a percentage value, defaulting to `50%`. It represents the minimum width of the image area at which the image itself will appear. For example, if the value is set to `30%`, the image will be visible where the image area takes up at least `30%` of the component’s total width. The narrower the component, the less likely the image will appear.

### `paddingInline` and `paddingBlock`

Use these properties to adjust the padding around the content.
