# Global card

## Branding

To include `global-card` in your application, you need to choose **ONE** brand from those available. The `DEFAULT` brand is included in all other brands, and any settings that are not configured will fall back to default.

```scss
// Pick ONE of the brands below to include
@import '@springernature/global-card/scss/10-settings/default';
@import '@springernature/global-card/scss/10-settings/springer';
@import '@springernature/global-card/scss/10-settings/nature';

// Incude this with your other components
@import '@springernature/global-card/scss/50-components/card';
```

## Examples

### HTML
```html
<!-- standard card -->
<div class="c-card">
    <div class="c-card__image">
        <img src="image.jpg" alt="">
    </div>
    <div class="c-card__body">
        <h3 class="c-card__title">
            <a class="c-card__link" href="#">Card title</a>
        </h3>
        <div class="c-card__summary">Card summary</div>
    </div>
</div>
```
