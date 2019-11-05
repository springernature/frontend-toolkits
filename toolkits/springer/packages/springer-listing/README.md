# Springer listing

Display of scannable content typically within a non-curated list, for example, entries in a search results list.

Optional image shrinks besides the title and text as the viewport becomes smaller.

## Usage

```html
<!-- example of listing with text and image -->
<ul>
    <li>
        <article class="c-listing c-listing--row">
            <div class="c-listing__text-column">
                <h4 class="c-listing__title">
                    Title of an article
                </h4>
                <div class="c-listing__text">
                    Some introduction text for article
                </div>
            </div>
            <!-- optional image -->
            <div class="c-listing__image">
                <img src="article-image.png" alt="">
            </div>
        </article>
    </li>
</ul>

<!-- example of listing in a search result -->
<ul>
    <li>
        <article class="c-listing">
            <div class="c-meta">
                <p class="c-meta__item">Book Review</p>
            </div>
        
            <div class="u-margin-bottom-sm">
                <h3 class="c-listing__title">
                    <a href="#">Title</a>    
                </h3>
                <p class="c-listing__authors">Author 1, Author 2, Author 3</p>
            </div>
        
            <div class="u-margin-bottom-sm">
                <div class="c-listing__text c-listing__text--light">
                    <p>
                        <em>Genomics, Society and Policy</em>
                        2012
                        <span>8</span>:38
                    </p>
                    <p>Published on: <span>15 September 2012</span></p>
                </div>
            </div>
        
            <ul class="c-listing__view-options">
                <li>
                    <a href="#">
                        <svg class="c-listing__view-options-icon" width="16" height="16" aria-hidden="true">
                            <use xlink:href="#icon-chevron-right"></use>
                        </svg>
                        <span>Full Text</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <svg class="c-listing__view-options-icon" width="16" height="16" aria-hidden="true">
                            <use xlink:href="#icon-chevron-right"></use>
                        </svg>
                        <span>PDF</span>
                    </a>
                </li>
            </ul>                
        </article>
    </li>
</ul>
```
