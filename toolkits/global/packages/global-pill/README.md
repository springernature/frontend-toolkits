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

## Modifiers

### Secondary
Allows for an alternative colour scheme to be used. This includes text colour, border colour, and background colour.

```scss
<div class="c-pill c-pill--secondary">Pill</div>
```

### Borderless
Allows for a borderless component.

```scss
<div class="c-pill c-pill--borderless">Pill</div>
```

#### HTML

```html
<ul>
    <li>
        <a href="/path/to/1" class="c-pill">Link</a>
    </li>
    <li>
        <p href="/path/to/2" class="c-pill">Some text</p>
    </li>
    <li>
        <a href="/path/to/3" class="c-pill">Another link</a>
    </li>
</ul>
```
