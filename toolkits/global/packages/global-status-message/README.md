# Global status message

## Branding

The `global-status-message` component currently uses the `DEFAULT` brand only.

```scss
// Include this with your settings
@import '@springernature/global-status-message/scss/10-settings/default';

// Include this with your other components
@import '@springernature/global-status-message/scss/50-components/status-message';
```

## Usage

#### HTML 

```html
<div class="c-status-message c-status-message--success u-mb-24">
    <svg class="c-icon c-status-message__icon" width="24" height="24" aria-hidden="true" focusable="false">
        <use xlink:href="#icon-success"></use>
    </svg>Your text example
</div>
```

### Modifiers

**Boxed** 

Sets a border around the status message

```html
<div class="c-status-message c-status-message--success u-mb-24 c-status-message--boxed">
    <svg class="c-icon c-status-message__icon" width="24" height="24" aria-hidden="true" focusable="false">
        <use xlink:href="#icon-success"></use>
    </svg>Your text
</div>
```

**Success**

```html
<div class="c-status-message c-status-message--success u-mb-24 c-status-message--boxed">...</div>
```

**Warning** 

```html
<div class="c-status-message c-status-message--warning u-mb-24 c-status-message--boxed">...</div>
```

**Error**

```html
<div class="c-status-message c-status-message--error u-mb-24 c-status-message--boxed">...</div>
```

**Info** 

```html
<div class="c-status-message c-status-message--info u-mb-24 c-status-message--boxed">...</div>
```