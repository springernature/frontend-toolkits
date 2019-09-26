**_THIS IS AN EXAMPLE, NOT FOR PRODUCTION USE_**

# CSS box component

Simple box component. Import each `scss` file into the respective level in your application.

To brand this component either totally replace the settings level in your app, or include your own settings file _before_ this one if you want to keep some of the defaults.

## Examples

### HTML
```html
<!-- standard box -->
<div class="c-box">box content</div>

<!-- circular box -->
<div class="c-box c-box--circle">box content</div>
```

### Handlebars
```hbs
<!-- standard box -->
{{#> box }}
    Add content here
    Can even be another partial
{{/box}}

<!-- circular box -->
{{#> circle }}
    Add content here
    Can even be another partial
{{/circle}}
```

### @mixin
```scss
// Standard box
.class-name {
    @include global-box;
}

// Circular box
.class-name {
    @include global-box;
    @include global-box--circle;
}
```