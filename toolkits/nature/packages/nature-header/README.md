# Nature Header

Publisher level header for Nature products.

## Usage

### Header

```html
<header class="c-header" data-header>
    <div class="c-header__row-border">
        <div class="c-header__container">
            <div class="c-header__layout">
                <a href="#">
                    <picture class="c-header__logo">
                        <source srcset="path/to/logo.svg" media="(min-width: 769px)">
                        <img src="path/to/logo.svg" alt="logo name">
                    </picture>
                </a>
                <div class="c-header__layout">
                    <!-- optional site navigation link -->
                    <div class="c-header__site-navigation c-header__site-navigation--show-at-md">
                        <a class="c-header__link" href="#">
                            <span>View all Nature Research journals</span>
                        </a>
                    </div>
                    
                    <div class="c-header__site-navigation c-header__site-navigation--border-left">
                        <!-- example of dropdown -->
                        <a class="c-header__link" href="#search-menu" data-header-expander>
                            <span>Search</span>
                        </a>
                        <a href="#" class="c-header__link">
                            <span>Log in</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- optional row under logo for menu -->
    <div class="c-header__container">
        <ul class="c-header__menu">
            <li class="c-header__item">
                <a href="#explore" class="c-header__link c-header__link--dropdown" data-header-expander>
                    <span>Explore <span class="c-header__show-text">our content</span></span>
                    <svg role="img" aria-hidden="true" focusable="false" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">...</svg>
                </a>
            </li>
            <!-- optional -->
            <li class="c-header__item c-header__item--pipe">
                <a class="c-header__link" href="#">
                    <span>Subscribe</span>
                </a>
            </li>            
        </ul>
    </div>
</header>
```

Color of border of header is set to black. In oscar-sites-nature the color of border on each journal is defined from Pubserv and set in the app to override default black border.

### Header expander
Enhanced header makes use of [global-expander](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-expander)
and [makeArray](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-javascript#makearray) in global-javascript.  

`id` in expander container should match `href` in trigger for enhanced-header to find and append to button.   

```html
<!-- example of standard expander that inlines with width of content -->
<div id="id-1" class="c-header-expander">
    <div class="c-header-expander__container">
        <!-- header expander contents -->
    </div>
</div>

<!-- example of expander that fills width of screen -->
<div id="id-2" class="c-header-expander c-header-expander--tray">
    <div class="c-header-expander__container">
        <!-- header expander contents -->
    </div>
</div>
```

#### Keylines

The classname `c-header-expander__item--keyline` can be used to apply a keyline above an item in a list, as follows:

```html
<li class="c-header-expander__item c-header-expander__item--keyline">
    <a href="some url">Some text</a>
</li>
```

Also, if you do not know upfront which list item will need a keyline, you may be able to use the `c-header-expander__item--keyline-first-item-only` classname to ensure that the first list item with the classname gets the keyline. This is useful in circumstances where list items can be present or not present depending on configuration, i.e. you never know what list items you will have on a given page upfront. As follows:  

```html
<li class="c-header-expander__item c-header-expander__item--keyline c-header-expander__item--keyline-first-item-only">
    <a href="some url">Some text</a>
</li>
<li class="c-header-expander__item c-header-expander__item--keyline c-header-expander__item--keyline-first-item-only">
    <a href="some url">Some text</a>
</li>
<li class="c-header-expander__item c-header-expander__item--keyline c-header-expander__item--keyline-first-item-only">
    <a href="some url">Some text</a>
</li>
<li class="c-header-expander__item c-header-expander__item--keyline c-header-expander__item--keyline-first-item-only">
    <a href="some url">Some text</a>
</li>
```
In the above example, even though they all have the same classnames, only the first occurence will have the keyline displayed above it.
