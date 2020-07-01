# Global Breadcrumb

## Branding

The `global-breadcrumb` component currently uses the `DEFAULT` brand only.

```scss
// Include this with your settings
@import '@springernature/global-breadcrumb/scss/10-settings/default';

// Include this with your other components
@import '@springernature/global-breadcrumb/scss/50-components/breadcrumb';
```

## Usage

#### HTML
```html
<ul class="c-breadcrumb">
   <li class="c-breadcrumb__item">
        <a class="c-breadcrumb__link">Link 1</a>
        <svg class="c-breadcrumb__chevron" width="12" height="12" aria-hidden="true" focusable="false">
            <use xlink:href="#icon-chevron-right"></use>
        </svg>
    </li>
    <li class="c-breadcrumb__item">
        <a class="c-breadcrumb__link">Link 2</a>
        <svg class="c-breadcrumb__chevron" width="12" height="12" aria-hidden="true" focusable="false">
            <use xlink:href="#icon-chevron-right"></use>
        </svg>
    </li>
    <li class="c-breadcrumb__item">
        Text 3
    </li>
</ul>
```
