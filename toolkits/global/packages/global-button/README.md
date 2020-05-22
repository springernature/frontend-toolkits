# Global Button

Button styles to use on buttons and links.

## Usage

To include `global-button` in your application, you need to choose **ONE** brand from those available. The `DEFAULT` brand is included in all other brands, and any settings that are not configured will fall back to default.

```scss
// Pick ONE of the brands below to include
@import '@springernature/global-button/scss/10-settings/default';
@import '@springernature/global-button/scss/10-settings/springer';
@import '@springernature/global-button/scss/10-settings/nature';

// Incude this with your other mixins
@import '@springernature/global-button/scss/30-mixins/button';

// Incude this with your other components
@import '@springernature/global-button/scss/50-components/button';
```

### Basic usage

```html
<button class="c-button">text</button>

<a class="c-button" href="#">text</a> 
```

### Themes

Add theme classes for different branding styles. If a theme does not exist for the brand you are using it will fallback to the default syle.

**Primary**
```html
<button class="c-button c-button--primary">text</button>
```

**Ghost**
```html
<button class="c-button c-button--ghost">text</button>
```

**Disabled**
```html
<button class="c-button c-button--disabled" disabled>text</button>
```

### Variants

Variant modifiers can be added to the default class, as well as to themes.

**Small**
```html
<button class="c-button c-button--small">text</button>
```

**Large**
```html
<button class="c-button c-button--large">text</button>
```

**Full width**
```html
<button class="c-button c-button--full-width">text</button>
```

**Icon left**
```html
<button class="c-button c-button--icon-left">
    <svg></svg>
    <span>text</span>
</button>
```

**Icon right**
```html
<button class="c-button c-button--icon-right">
    <span>text</span>
    <svg></svg>
</button>
```
