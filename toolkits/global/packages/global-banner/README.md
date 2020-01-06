# CSS banner component

Visually full width banner component with pseudo elements `::before` and `::after` to extend background and border to edge of viewport. 

If banner needs to match the layout of site, this will need to managed outside of component (example below is using `u-container` for this). Additionally `overflow:hidden` will need to added above this to prevent horizontal scroll on Safari. 

```html
<!-- SpringerLink example using utility classes-->
<div class="u-overflow-hidden">
    <div class="u-container">
        <div class="c-banner">
            banner content
        </div>
    </div>
</div>
```

To brand this component either totally replace the settings level in your app, or include your own settings file _before_ this one if you want to keep some of the defaults.

## Examples

### HTML
```html
<!-- Simple banner -->
<div class="c-banner">
    <div class="c-banner__container">
        <p class="c-banner__item">Simple banner example</p> 
    </div>
</div>

<!-- Inverted color banner - set opposite colors of banner background, text and links. base banner. eg. to increase contrast of light colored logo with dark background -->
<div class="c-banner c-banner--inverted">
    <div class="c-banner__container">
        <p class="c-banner__item">Simple banner example</p> 
    </div>
</div>

<!-- Banner with text and right aligned anchor link -->
<div class="c-banner">
    <div class="c-banner__container">
        <p class="c-banner__item">
            Simple banner example
        </p>
        <p class="c-banner__item">
            <a class="c-banner__neutral-link" href="#">Link</a>
        </p> 
    </div>
</div>

<!-- Banner with image and right aligned anchor link -->
<div class="c-banner">
    <div class="c-banner__container">
        <div class="c-banner__item">
            <a href="#">
                <img class="c-banner__image" src="http://placehold.it/430x36" alt=""/>
            </a>
        </div>
        <p class="c-banner__item">
            <a class="c-banner__neutral-link" href="#">Link</a>
        </p>
    </div> 
</div>
```
