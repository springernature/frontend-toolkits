# Default brand

Use this context configuration in your product to skin components with the `default` brand. The components you use should all be from the `global` toolkit.

- [Breakpoints](#breakpoints)
- [Colors](#colors)
	- [Greyscale](#greyscale)
	- [Color](#color)
	- [Foreground color](#foreground-color)
- [Buttons](#buttons)
- [Layers](#layers)
- [Icons](#icons)

## Breakpoints

The `media-query` mixin is provided for handling breakpoints. Breakpoint values are provided at the `10-settings` level using the `$context--breakpoints` map.

### Usage

**range**

```scss
@include media-query('min-breakpoint-name' 'max-breakpoint-name', 'range') {}
@include media-query('min-breakpoint-name' 'max-breakpoint-name', 'range', $custom-map) {}
```

**max-width**

```scss
@include media-query('breakpoint-name', 'max') {}
@include media-query('breakpoint-name', 'max', $custom-map) {}
```

**min-width**

```scss
@include media-query('breakpoint-name') {}
@include media-query('breakpoint-name', 'min', $custom-map) {}
```

## Colors

Functions are provided for accessing colors from your context.

### Greyscale

- Grey colors work by having a base grey color, then allowing various degrees of lightness on a scale
- The lightness is measured in percentages

The following variables are set:

```scss
$context--greyscale-base      // the dark base color off which all greys are based
$context--greyscale-min       // the minimum lightness percentage
$context--greyscale-max       // the maximum lightness percentage
$context--greyscale-stops     // the allowed interval for percentages
```

- A helper function - `greyscale()` - is provided for adding grey colors to your scss files
- The following lightness values are available `0, 5, 10, 15, 20 ... 80`

#### Examples

```scss
color: greyscale();        // returns result of greyscale($context--greyscale-min) - greyscale(0)
color: greyscale(8);       // rounds up to nearest stop, so returns result of greyscale(10)
color: greyscale(20);      // returns grey with 20% transparency
color: greyscale(25);      // returns grey with 25% transparency

// ...

color: greyscale(80);      // returns grey with 80% transparency
color: greyscale(120);     // rounds down, so returns result of greyscale(80)
```

You can also add transparency to any grey color by adding a second transparency value between 0 and 1, rounded to one decimal place.

```scss
color: greyscale(30, 0.5);     // 30% greyscale with 50% transparency
color: greyscale(30, 0.62);    // 30% greyscale with 60% transparency, rounded down
color: greyscale(30, 0.68);    // 30% greyscale with 70% transparency, rounded up
```

#### Other usage examples

```scss
background-color: greyscale();
border-bottom: 1px solid greyscale(80);
```

#### Matching mosaic greyscale

The following are the closest matches to grey colors as defined in the mosaic styleguide:
* off-black: `greyscale(0)`
* dark-grey: `greyscale(25)`
* grey: `greyscale(45)`
* medial-grey: `greyscale(70)`
* light-grey: `greyscale(80)`

### Color

There are three maps that store color palettes:

* `$colors` : for default colors
* `$brand-colors` : for brand specific colors, only to be used for the relevant brands
* `$subject-areas-colors` : for subject areas

A helper function - `color()` - is provided for adding colors to your scss files.

#### Examples

```scss
color: color('blue')                                               // returns color from $colors map
color: color('strawberry', $colors)                                // returns color from $colors map
color: color('npj-primary', $brand-colors)                         // returns color from $brand-colors map
color: color('health-sciences-primary', $subject-areas-colors)     // returns color from $subject-areas-colors map
```

You can also add transparency to any color by adding a transparency value between 0 and 1, rounded to one decimal place. The transparency value can be the second or third argument depending on if a custom map is also passed.

```scss
color: color('blue', 0.5)                            // returns the color from $colors with 50% transparency
color: color('npj-primary', $brand-colors, 0.62)     // returns the color from $brand-colors with 60% transparency
```

#### Other usage examples

```scss
background-color: color('grape');
border: 1px solid color('lemon');
```

### Foreground color

- Given a (background) color, this function will return either a predefined light (`$context--foreground-light`) or dark (`$context--foreground-dark`) color to be used in the foreground
- The `foreground-color()` function will choose the correct color to allow for a high enough contrast ratio between background and foreground

```scss
color: foreground-color();                                 // returns the foreground color for $context--greyscale-base
color: foreground-color(30);                               // returns the foreground color for 30% $context--greyscale-base
color: foreground-color('blue');                           // returns the foreground color for the color from $colors
color: foreground-color('npj-primary', $brand-colors);     // returns the foreground color for the color from $brand-colors
color: foreground-color($var);                             // returns the foreground color for color stored as variable
```

## Buttons

The context comes with branded button styles to use on buttons and links.

### Use via `@mixin`

If button styles are available for you brand then you get mixins included via the context

#### Basic usage

```scss
// Default
.my-class {
	@include button-default;
}
```

#### Themes

Add theme classes for different branding styles. If a theme does not exist for the brand you are using it will be ignored.

```scss
// Primary
.my-class {
	@include button-default;
	@include button-primary;
}

// Ghost
.my-class {
	@include button-default;
	@include button-ghost;
}

// Disabled
.my-class {
	@include button-default;
	@include button-disabled;
}
```

#### Variants

Variant modifiers can be added to the default class, as well as to themes.

```scss
// Small
.my-class {
	@include button-default;
	@include button-small;
}

// Large
.my-class {
	@include button-default;
	@include button-large;
}


// Full width
.my-class {
	@include button-default;
	@include button-full-width;
}

// Icon left
.my-class {
	@include button-default;
	@include button-icon-left;
}

// Icon right
.my-class {
	@include button-default;
	@include button-icon-right;
}
```

### Use via utility classes

The button utility classes are an exception to how utilities usually work, as they modify the styling of elements. For this reason it is preferable to use the relevant `@mixin` within an existing component, but the utility classes can be used if you need them.

```scss
// Include the button utility classes
@import '@springernature/brand-context/default/scss/60-utilities/buttons';
```

#### Basic usage

```html
<button class="c-button">text</button>

<a class="c-button" href="#">text</a> 
```

#### Themes

Add theme classes for different branding styles. If a theme does not exist for the brand you are using it will be ignored.

```html
<!-- Primary -->
<button class="c-button c-button--primary">text</button>

<!-- Ghost -->
<button class="c-button c-button--ghost">text</button>

<!-- Disabled -->
<button class="c-button c-button--disabled" disabled>text</button>
```

#### Variants

Variant modifiers can be added to the default class, as well as to themes.

```html
<!-- Small -->
<button class="c-button c-button--small">text</button>
```

```html
<!-- Large -->
<button class="c-button c-button--large">text</button>
```

```html
<!-- Full width -->
<button class="c-button c-button--full-width">text</button>
```

```html
<!-- Icon left -->
<button class="c-button c-button--icon-left">
    <svg></svg>
    <span>text</span>
</button>
```

```html
<!-- Icon right -->
<button class="c-button c-button--icon-right">
    <span>text</span>
    <svg></svg>
</button>
```

## Layers

Function provided for accessing z-index from your context.

### Z

The following variable is set:

```scss
$context--z-layers //default layers values
```

A helper function - `z()` - is provided for adding z-index to your scss files

#### Examples

```scss
z-index: z("layer-name"); //return "default" z-index
z-index: z("layer-name", "layer-variant"); //return z-index for a particular name and variant
z-index: z("layer-name", $my-map); //return z-index from $my-map map
z-index: z("layer-name", "layer-variant", $my-map); //return z-index a name and variant from $my-map map
```

## Icons
A [set of icons](img/icons) is provided for use across all brands. Implementation is currently done at the product level due to the varying ways SVG Icons can be implemented. There is no agreed approach to this currently in Springer Nature. 

There is a recommendation that [SVG sprites](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) are used, but this is a choice. The sprite can be made manually or if you use Gulp then they can be made automatically with [SVG Store](https://www.npmjs.com/package/gulp-svgstore).

For further information on the various implementation methods, please read this article https://css-tricks.com/pretty-good-svg-icon-system/

The Icons have been optimised, you should not need to optimise them further.
