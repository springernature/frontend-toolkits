# Springer Hero

Inspired by Nature’s hero component. Includes a less image-heavy mode for subject/discipline pages.

# Usage

Import the Sass:

```scss
@import '../node_modules/@springernature/springer-hero/scss/10-settings/springer-hero';
@import '../node_modules/@springernature/springer-hero/scss/50-components/springer-hero';
```

Then compile the template located in the `./view` folder whenever the component is needed. See `./demo/context.json` for an example of the expected data.

## Variants

Both the image (`imageSrc`) and content (`content`) are optional. The component will not appear “broken” in the absence of either.

Images of any aspect ratio are permitted. Some cropping occurs, in some circumstances, to ensure the image fits the space without becoming distorted. 

There is no restriction to the amount of content. Generally, taller images work better when paired with larger amounts of content, necessitating less image cropping.

### `smallerImage`

By default, the image will take up two thirds of the horizontal space. To create a hero with less visual impact, you can set `smallerImage` to true. In this mode, the image will only take up _one_ third of the horizontal space. The content always fills the remaining space beside the image.

### `color`

You can override the default background color by including a `color` property. Pick a color with sufficient contrast when paired with the text, which will remain white.
