# Springer Product Header

The title, print cover, imprint logo and themed background colour. The title is an important signifier to recognise relevancy. Cover images are an additional visual aid to help users familiarise.

Use the Product header for all pages that feature a Journal, Book or aggregations of content, such as Book series. The cover image comes from DDS. Colour is taken from the cover image automatically. Both the cover and title should link to the homepage of the title.

## Usage

```html
<div class="c-product-header">
    <!-- #not mandatory -->
    <div class="c-product-header__theme" style="background-image: url('https://media.springernature.com/dominant-colour/springer-static/cover/journal/123.jpg')"></div>
    <!-- /not mandatory -->
    <div class="c-product-header__content">
        <div class="c-product-header__main">
            <!-- #not mandatory -->
            <div class="c-product-header__cover">
                <img alt=""
                        srcset="
                        https://media.springernature.com/w92/springer-static/cover/journal/123.jpg 1x,
                        https://media.springernature.com/w138/springer-static/cover/journal/123.jpg 1.5x,
                        https://media.springernature.com/w184/springer-static/cover/journal/123.jpg 2x,
                        https://media.springernature.com/w276/springer-static/cover/journal/123.jpg 3x"
                        src="https://media.springernature.com/w92/springer-static/cover/journal/123.jpg"/>
            </div>
            <!-- /not mandatory -->
            <div class="u-flex-shrink">
                <h1 class="c-product-header__title">
                    <a href="/">{{{journalTitle}}}</a>
                </h1>
                <!-- #not mandatory -->
                    <p class="c-product-header__subtitle">{{{journalSubtitle}}}</p>
                <!-- /not mandatory -->
            </div>
        </div>
        <!-- #not mandatory -->
        <div class="c-product-header__side">
            <img class="c-product-header__imprint" data-test="journal-header-imprint"
                alt="Birkhäuser imprint" height="30" src="https://www.springer.com/oscar-static/images/birkhauser-logo.svg"
                role="img">
        </div>
        <!-- /not mandatory -->
    </div>
</div>
```