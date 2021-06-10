# Global Pill

## Branding

To include `global-pill` in your application, you need to choose **ONE** brand from those available. The `DEFAULT` brand is included in all other brands, and any settings that are not configured will fall back to default.

```scss
// Pick ONE of the brands below to include
@import '@springernature/global-pill/scss/10-settings/default';
@import '@springernature/global-pill/scss/10-settings/nature';

// Include this with your other components
@import '@springernature/global-pill/scss/50-components/pill';
```

#### HTML

```html
<ul>
    <li>
        <a class="c-pill">Link</a>
    </li>
    <li>
        <p class="c-pill">Some text</p>
    </li>
    <li>
        <a class="c-pill">Another link</a>
    </li>
</ul>
```
