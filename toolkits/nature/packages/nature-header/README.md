# Nature Header

Publisher level header for Nature products.

## Usage

### Header

```html
<div class="c-header" data-header>
    <div class="c-header__row c-header__row--flush">
        <div class="c-header__container">
            <div class="c-header__split">
                <div class="c-header__logo-container">
                    <a href="/nature">
                        <picture class="c-header__logo">
                            <source srcset="primary-logo.svg" media="(min-width: 875px)">
                            <img src="secondary-logo.svg" alt="logo name">
                        </picture>
                    </a>
                </div>

                <ul class="c-header__menu c-header__menu--global">
                    <li class="c-header__item c-header__item--nature-research">
                        <a class="c-header__link" href="https://www.nature.com/siteindex">
                            <span>View all Nature Research journals</span>
                        </a>
                    </li>

                    <li class="c-header__item c-header__item--pipe">
                        <a class="c-header__link" href="#search-menu">
                            <span>Search</span>
                            <svg role="img" aria-hidden="true" focusable="false" height="22" width="22" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M16.48 15.455c.283.282.29.749.007 1.032a.738.738 0 01-1.032-.007l-3.045-3.044a7 7 0 111.026-1.026zM8 14A6 6 0 108 2a6 6 0 000 12z"></path></svg>
                        </a>
                    </li>
                    
                    <li class="c-header__item">
                        <a href="#"
                           id="login-button" class="c-header__link placeholder">
                            <span>Login</span>
                            <svg role="img" aria-hidden="true" focusable="false" height="22" width="22" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M10.238 16.905a7.96 7.96 0 003.53-1.48c-.874-2.514-2.065-3.936-3.768-4.319V9.83a3.001 3.001 0 10-2 0v1.277c-1.703.383-2.894 1.805-3.767 4.319A7.96 7.96 0 009 17c.419 0 .832-.032 1.238-.095zm4.342-2.172a8 8 0 10-11.16 0c.757-2.017 1.84-3.608 3.49-4.322a4 4 0 114.182 0c1.649.714 2.731 2.305 3.488 4.322zM9 18A9 9 0 119 0a9 9 0 010 18z" fill="#333" fill-rule="evenodd"></path></svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="c-header__row">
        <div class="c-header__container">
            <div class="c-header__split">
                <div class="c-header__split">
                    <ul class="c-header__menu c-header__menu--journal">
                        <li class="c-header__item c-header__item--dropdown-menu">
                            <a href="#explore" class="c-header__link c-header__link--chevron" data-header-expander>
                                <span><span class="c-header__show-text">Explore</span> content</span>
                                <svg role="img" aria-hidden="true" focusable="false" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m5.58578644 3-3.29289322-3.29289322c-.39052429-.39052429-.39052429-1.02368927 0-1.41421356s1.02368927-.39052429 1.41421356 0l4 4c.39052429.39052429.39052429 1.02368927 0 1.41421356l-4 4c-.39052429.39052429-1.02368927.39052429-1.41421356 0s-.39052429-1.02368927 0-1.41421356z" transform="matrix(0 1 -1 0 11 3)"></path></svg>
                            </a>
                        </li>
    
                        <li class="c-header__item c-header__item--dropdown-menu">
                            <a href="#journal-info" class="c-header__link c-header__link--chevron" data-header-expander>
                                <span>Journal info<span class="c-header__show-text">rmation</span></span>
                                <svg role="img" aria-hidden="true" focusable="false" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m5.58578644 3-3.29289322-3.29289322c-.39052429-.39052429-.39052429-1.02368927 0-1.41421356s1.02368927-.39052429 1.41421356 0l4 4c.39052429.39052429.39052429 1.02368927 0 1.41421356l-4 4c-.39052429.39052429-1.02368927.39052429-1.41421356 0s-.39052429-1.02368927 0-1.41421356z" transform="matrix(0 1 -1 0 11 3)"></path></svg>
                            </a>
                        </li>
    
                        <li class="c-header__item c-header__item--dropdown-menu">
                            <a href="#publish-with-us"
                               class="c-header__link c-header__link--chevron c-header__link--dropdown-menu" data-header-expander>
                                <span>Publish <span class="c-header__show-text">with us</span></span>
                                <svg role="img" aria-hidden="true" focusable="false" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m5.58578644 3-3.29289322-3.29289322c-.39052429-.39052429-.39052429-1.02368927 0-1.41421356s1.02368927-.39052429 1.41421356 0l4 4c.39052429.39052429.39052429 1.02368927 0 1.41421356l-4 4c-.39052429.39052429-1.02368927.39052429-1.41421356 0s-.39052429-1.02368927 0-1.41421356z" transform="matrix(0 1 -1 0 11 3)"></path></svg>
                            </a>
                        </li>
    
                        <li class="c-header__item c-header__item--pipe u-show-lg">
                            <a class="c-header__link" href="#">
                                <span>Subscribe</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <ul class="c-header__menu c-header__menu--tools">
                    <li class="c-header__item">
                        <a class="c-header__link" href="#">
                            <span>Sign up for alerts</span>
                            <svg role="img" aria-hidden="true" focusable="false" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m4 10h2.5c.27614237 0 .5.2238576.5.5s-.22385763.5-.5.5h-3.08578644l-1.12132034 1.1213203c-.18753638.1875364-.29289322.4418903-.29289322.7071068v.1715729h14v-.1715729c0-.2652165-.1053568-.5195704-.2928932-.7071068l-1.7071068-1.7071067v-3.4142136c0-2.76142375-2.2385763-5-5-5-2.76142375 0-5 2.23857625-5 5zm3 4c0 1.1045695.8954305 2 2 2s2-.8954305 2-2zm-5 0c-.55228475 0-1-.4477153-1-1v-.1715729c0-.530433.21071368-1.0391408.58578644-1.4142135l1.41421356-1.4142136v-3c0-3.3137085 2.6862915-6 6-6s6 2.6862915 6 6v3l1.4142136 1.4142136c.3750727.3750727.5857864.8837805.5857864 1.4142135v.1715729c0 .5522847-.4477153 1-1 1h-4c0 1.6568542-1.3431458 3-3 3-1.65685425 0-3-1.3431458-3-3z" fill="#222"></path></svg>
                        </a>
                    </li>

                    <li class="c-header__item c-header__item--pipe">
                        <a class="c-header__link" href="#">
                            <span>RSS feed</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
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
