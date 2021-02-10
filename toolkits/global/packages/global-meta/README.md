# Global Meta

Brief information about the content.

## Branding

To include `global-meta` in your application, you need to choose **ONE** brand from those available. The `DEFAULT` brand is included in all other brands, and any settings that are not configured will fall back to default.

```scss
// Pick ONE of the brands below to include
@import '@springernature/global-meta/scss/10-settings/default';
@import '@springernature/global-meta/scss/10-settings/nature';
@import '@springernature/global-meta/scss/10-settings/springer';
@import '@springernature/global-meta/scss/10-settings/springernature';

// Include this with your other components
@import '@springernature/global-meta/scss/50-components/meta';
```

## Usage

```html
<!-- single item-->
<div class="c-meta">
    <span class="c-meta__item">Article</span>
</div>

<!-- multiple items-->
<div class="c-meta">
    <span class="c-meta__item">Editorial</span>
    <span class="c-meta__item">15 October 2019</span>
</div>

<!-- differentiate an item -->
<div class="c-meta">
    <span class="c-meta__item">
        <span class="c-meta__type">Editorial</span>
    </span>
</div>
```
