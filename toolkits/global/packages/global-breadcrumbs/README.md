# Global Breadcrumbs

## Branding

To include `global-breadcrumbs` in your application, you need to choose ONE brand from those available. The DEFAULT brand is included in all other brands, and any settings that are not configured will fall back to default.

```scss
// Pick ONE of the brands below to include
@import '@springernature/global-breadcrumbs/scss/10-settings/default';
@import '@springernature/global-breadcrumbs/scss/10-settings/nature';
@import '@springernature/global-breadcrumbs/scss/10-settings/springernature';

// Include this with your other components
@import '@springernature/global-breadcrumbs/scss/50-components/breadcrumbs';
```

## Usage

#### HTML
```html
<ul class="c-breadcrumbs">
   <li class="c-breadcrumbs__item">
        <a class="c-breadcrumbs__link">Link 1</a>
        <svg class="c-breadcrumbs__chevron" width="12" height="12" aria-hidden="true" focusable="false">
            <use xlink:href="#icon-chevron-right"></use>
        </svg>
    </li>
    <li class="c-breadcrumbs__item">
        <a class="c-breadcrumbs__link">Link 2</a>
        <svg class="c-breadcrumbs__chevron" width="12" height="12" aria-hidden="true" focusable="false">
            <use xlink:href="#icon-chevron-right"></use>
        </svg>
    </li>
    <li class="c-breadcrumbs__item">
        Text 3
    </li>
</ul>
```
