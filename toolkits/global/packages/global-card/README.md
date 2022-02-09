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

## Grouping

Cards should almost always exist as list items for accessibility. It is highly recommended the parent list element (`<ul>`) takes the `l-grid` class from the `global-layout-grid` component (and accompanying custom property-based settings) and that each card is placed inside an `<li>`.

In the following example, custom properties are used to adjust the gap (gutter) and target/idealized card width (here set to `230px`):

```html
<!-- cards are always list items, organized in a `<ul>` -->
<ul class="l-grid" style="--grid-gap: 1.5em; --grid-basis: min(230px, 100%)">
{{#with data}}
    {{#each cards}}
        {{>card}}
    {{/each}}
{{/with}}
</ul>
```

## Variants

### Aspect ratio

By default, the aspect ratio for the space into which the image is placed is `16 / 9`. This can be adjusted by placing an `aspectRatio` property on the card’s data. This is a string.

```json
"aspectRatio": "1 / 1"
```

### Heading level

For cards that have a title/heading, you may need to adjust their heading levels to befit the context. For example, if a set of cards are introduced with an `<h3>` heading, the cards should each have a heading level of `4` to mark them as subsections under the `<h3>` (they belong the the `<h3>`’s section in the document outline). You can control the the heading level with the `level` property. Note that `level` should be a string, not an integer.

```json
"level": "4"
```

Note that this is achieved using `aria-level`, so the appearance (font size) of the heading/title remains unaffected.

Each card should have the same heading level, so if you change it to, say, `4` for one card, you need to apply it to each of the accompanying cards in the array.

### No shape

By applying `noShape: true`, the border, background, and `box-shadow` are removed (and padding is removed from the content area accordingly). 

```json
"noShape": true
```

### No faux block link

If your card contains links in the body text, they will not be reachable when `u-link-faux-block()` is included and active. By applying `noBlockLink` to the card, you can remove this feature.

```json
"noBlockLink": true
```
