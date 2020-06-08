# Banner

Full width banner used for displaying informational messages.

## Branding

To include global-banner in your application, you need to choose **ONE** brand from those available. The `DEFAULT` brand is included in all other brands, and any settings that are not configured will fall back to default.

```scss
// Pick ONE of the brands below to include
@import '@springernature/global-banner/scss/10-settings/default';
@import '@springernature/global-banner/scss/10-settings/springer';
@import '@springernature/global-banner/scss/10-settings/nature';

// Incude this with your other components
@import '@springernature/global-banner/scss/50-components/banner';
```

## Usage

```html
<div class="c-banner">
    Simple banner example
</div>
```

`c-banner__container` allows you to have two child items, one on either side of the banner. For example:

```html
<div class="c-banner">
    <div class="c-banner__container">
        <div class="c-banner__item">
            <a href="#">
                <img class="c-banner__image" src="http://placehold.it/430x36" alt=""/>
            </a>
        </div>
        <p class="c-banner__item">
            <a class="c-banner__link" href="#">Link</a>
        </p>
    </div> 
</div>
```

### Modifiers

**Inverted**

Sets opposite colors of banner background, text and links. For example, to increase contrast of light colored logo with dark background.

```html
<div class="c-banner c-banner--inverted">...</div>
```

**Flush**

Removes the left and right padding on the banner.

```html
<div class="c-banner c-banner--flush">...</div>
```

### Constraining the width of the banner

If you want to constrain the width of the banner or the contents of the banner, it is best to use a utility class such as `u-container` or an application specific class that you can apply styles to.

**Constrain entire banner**

```html
<div class="u-container">
    <div class="c-banner">
        <div class="c-banner__container">
            <p class="c-banner__item">Simple banner example</p> 
        </div>
    </div>
</div>
```

**Constrain banner content**

If you are constraining just the content of the banner and your container utility has padding on each side, then you can use the `c-banner--flush` modifier.

```html
<div class="c-banner c-banner--flush">
    <div class="u-container">
        <div class="c-banner__container">
            <p class="c-banner__item">Simple banner example</p> 
        </div>
    </div>
</div>
```
