# Nature Hero

Hero for Nature products.

## CSS

Include the SCSS in your application

```scss
// Include this with your settings
@import '@springernature/nature-hero/scss/10-settings/hero';

// Include this with your other components
@import '@springernature/nature-hero/scss/50-components/hero';
```

## Usage

```html
<div class="c-hero">
    <div class="c-hero__image">
        <img src="hero-image.png" alt="">
    </div>
    <div class="c-hero__copy">
        <h2 class="c-hero__title">
            <a class="c-hero__link" href="#">Hero title</a>
        </h2>
        <p class="c-hero__summary">Hero text</p>
    </div>
</div>
```

[info-npm]: https://www.npmjs.com/package/@springernature/nature-hero
[badge-npm]: https://img.shields.io/npm/v/@springernature/nature-hero.svg
