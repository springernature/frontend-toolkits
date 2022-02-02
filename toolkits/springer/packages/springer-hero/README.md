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

You can display the image on the right (default; bottom on smaller screens) or left (top on smaller screens) by changing the data’s `imageLeft` property to `true`.
