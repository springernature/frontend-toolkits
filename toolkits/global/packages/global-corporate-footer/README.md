# Global corporate footer

## Branding

To include `global-corporate-footer` in your application, you need to choose **ONE** brand from those available. The `DEFAULT` brand is included in all other brands, and any settings that are not configured will fall back to default.

```scss
// Pick ONE of the brands below to include
@import '@springernature/global-corporate-footer/scss/10-settings/default';
@import '@springernature/global-corporate-footer/scss/10-settings/springer';
@import '@springernature/global-corporate-footer/scss/10-settings/nature';

// Include this with your other components
@import '@springernature/global-corporate-footer/scss/50-components/corporate-footer';
```

## Examples

### HTML
```html
<div class="c-corporate-footer">
    <div class="u-container">
        <img src=images/logos/sn-logo-white.svg" alt="Springer Nature" loading="lazy" width="140" height="14"/>
        <p class="c-corporate-footer__legal" data-test="copyright">&copy; 2020 Springer Nature Limited</p>
    </div>
</div>
```
