# Global Menu

Create common navigation patterns for list elements.

## Branding

The `global-menu` component currently uses the `DEFAULT` brand only.

```scss
// Inlcude this with your settings
@import '@springernature/global-menu/scss/10-settings/default';

// Include this with your other components
@import '@springernature/global-menu/scss/50-components/menu';
```

## Usage

### Basic usage

Menu items are displayed horizontally.

```html
<ul class="c-menu">
    <li class="c-menu__item">
        <a class="c-menu__link" href="#">Item One</a>
    </li>
    <li class="c-menu__item">
        <a class="c-menu__link" href="#">Item Two</a>
    </li>
    <li class="c-menu__item">
        <a class="c-menu__link" href="#">Item Three</a>
    </li>
</ul>
```

### Modifiers

#### Small

Reduces the menu font-size.

```html
<ul class="c-menu c-menu--small">
   ...
</ul>
```

#### Inherit

Sets the colour on the links to inherit.

```html
<ul class="c-menu c-menu--inherit">
   ...
</ul>
```

#### Keyline

Adds a keyline in between each item.

```html
<ul class="c-menu c-menu--keyline">
   ...
</ul>
```

#### Vertical

Displays the items vertically.

```html
<ul class="c-menu c-menu--vertical">
   ...
</ul>
```

#### Padded

Creates spacing using padding on the links instead of margins on the items, increasing the clickable area.

```html
<ul class="c-menu c-menu--padded">
   ...
</ul>
```

### Combining Modifiers

Any of the above modifiers can be combined to create menu variations, for example:

```html
<ul class="c-menu c-menu--small c-menu--vertical c-menu--keyline c-menu--padded">
   ...
</ul>
```
