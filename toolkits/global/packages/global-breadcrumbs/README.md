# Global Breadcrumbs

## Branding

The `global-breadcrumbs` component currently uses the `DEFAULT` and `NATURE` brand only.

```scss
// Include this with your settings
@import '@springernature/global-breadcrumbs/scss/10-settings/default';

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
