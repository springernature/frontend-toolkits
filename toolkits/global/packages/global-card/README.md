# Global card

## Branding

To include `global-card` in your application, you need to choose **ONE** brand from those available. The `DEFAULT` brand is included in all other brands, and any settings that are not configured will fall back to default.

## Usage

First include the styling to be compiled:

```scss
// Pick ONE of the brands below to include
@import '@springernature/global-card/scss/10-settings/default';
@import '@springernature/global-card/scss/10-settings/nature';
@import '@springernature/global-card/scss/10-settings/springer';
@import '@springernature/global-card/scss/10-settings/springernature';

// Include this with your other components
@import '@springernature/global-card/scss/50-components/card';
```

Then compile the template located in the `./view` folder whenever the component is needed. See the `./demo/context.json` to see what the data would look like. 

Note that a set of cards can come with some shared settings. These settings (`aspectRatio`, `noShape`, `portrait`, all optional) need to be on the same level as the `cards` array on the data:

```json
{
    "data": {
        "noShape": true,
        "aspectRatio": "1 / 1",
        "cards": [
            ...
        ]
    }
}
```

When iterating over cards using a partial for the card itself, you need to explicitly pass the parent context down as `parent`:

```html
<!-- cards are always list items, organized in a `<ul>` -->
<ul class="l-grid">
{{#with data}}
    {{#each cards}}
        {{>card parent=..}}
    {{/each}}
{{/with}}
</ul>
```

## Grouping

Cards should almost always exist as list items for accessibility. It is highly recommended the parent list element (`<ul>`) takes the `l-grid` class from the `global-layout-grid` component (and accompanying custom property-based settings) to arrange the cards in a responsive grid formation using the CSS Grid module.

In the following example, custom properties are used to adjust the gap (gutter) and target/idealized card width (here set to `230px`):

```html
<!-- cards are always list items, organized in a `<ul>` -->
<ul class="l-grid" style="--grid-gap: 1.5em; --grid-basis: min(230px, 100%)">
{{#with data}}
    {{#each cards}}
        {{>card parent=..}}
    {{/each}}
{{/with}}
</ul>
```

## Variants

### Aspect ratio

By default, the aspect ratio for the space into which the image is placed is `16 / 9`. This can be adjusted by placing a top-level `aspectRatio` property on the card data (see **Usage**). This is a string.

```json
{
    "data": {
        "aspectRatio": "1 / 1",
        "cards": [
            ...
        ]
    }
}
```

Unless `portrait` is set to true, the image will cover the area defined by the aspect ratio. The `object-fit: cover` declaration ensures this is achieved without distortion by cropping the image around its center.

### Heading level

For cards that have a title/heading, you may need to adjust their heading levels to befit the context. For example, if a set of cards are introduced with an `<h3>` heading, the cards should each have a heading level of `4` to mark them as subsections under the `<h3>` (they belong the the `<h3>`’s section in the document outline). You can control the the heading level in the parent context with the `level` property. Note that `level` should be a string, not an integer.

```json
{
    "data": {
        "level": "4"
        "cards": [
            ...
        ]
    }
}
```

Note that this is achieved using `aria-level`, so the appearance (font size) of the heading/title remains unaffected.

### Portrait mode

By placing `portrait: true` on the top-level of the card data (see **Usage** for the data structure) the image no longer _covers_ the image space. Instead it is contained within the space and aligned to the left and bottom of the space. This proves to be a better layout strategy for portrait oriented images, allowing for landscape images as outliers. 

Landscape images in `portrait` mode are also contained such that their height is diminished. They are aligned to the bottom of the image area so that the gap between the visible image and the title above it does not differ from the surrounding (portrait) cards.

```json
{
    "data": {
        "portrait": true,
        "cards": [
            ...
        ]
    }
}
```

### No shape

By applying `noShape: true` (see **Usage**), the border, background, and `box-shadow` are removed (and padding is removed from the content area accordingly). Cards with `portrait: true` applied (see **Portrait mode**) have `noShape` applied automatically.

```json
{
    "data": {
        "noShape": true,
        "cards": [
            ...
        ]
    }
}
```

### No faux block link

If your card contains links in the body text, they will not be reachable when `u-link-faux-block()` is included and active. By applying `noBlockLink` to the card or `noBlockLinks` to the card’s parent context, you can remove this feature.

```json
{
    "data": {
        "noBlockLinks": true,
        "cards": [
            ...
        ]
    }
}
```

### No list semantics

In case you want to remove the list semantics, you can either put `noList: true` on the parent context or `noListItem: true` on an individual card object. Since this feature is intended mostly for single cards, you are more likely to use `noListItem: true`. Groups of cards should typically be presented as unordered lists for accessibility.

```json
{
    "data": {
        "noList": true,
        "cards": [
            ...
        ]
    }
}
```
