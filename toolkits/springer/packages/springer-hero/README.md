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

### `color`

You can override the default background color by including a `color` property.

### `imageMin` and `contentMin`

Use these properties to adjust the layout and wrapping behaviour of the component.

* `imageMin` sets how narrow the image portion of the component can become before wrapping occurs. More likely to invoke cropping of the image (`object-fit` prevents squashing/distortion).
* `contentMin` sets how narrow the content area of the component can become before wrapping occurs. Be mindful of readability; lines of text should not become too short.

