# Nature Header

The Nature Header component includes:

- the journal’s logo - which appears in the top left
- a list of common actions, like view all journals, search and login - which appear in the top right
- a vertical list of dropdown menu  links - which appear underneath the logo

![The Nature Header from the Nature.com homepage. It shows the Nature logo, dropdown links, and options to view all journals, search, and login.](https://user-images.githubusercontent.com/27411864/149321441-0042c5f5-9c1d-4b24-8998-41ae52574a23.png)

## When to use this component

Use the Nature Header for any product or service in the Nature Portfolio.

## How it works

### Navigation menu

The dropdown menu labels describe the main categories for the navigation menu sub-items. Research showed that users found what they needed more quickly and easily with the main categories listed out - rather than hidden behind a single “menu” button.

Do user research to learn the best way to categorise and label navigation menu items for the journal you’re working on. 

Use sentence case, not title case, for the text of each menu label.

### Separating menu items with keylines

In some cases, you may want to use a keyline to visually separate navigation menu items. For example, to separate social media links from the other navigation links, like this:

![A dropdown menu titled "Publish with us". The menu has 3 items. The last item has a keyline which visually separates it from the 2 items above it.](https://user-images.githubusercontent.com/27411864/149321067-6a0b513a-2ce0-4427-ac75-9229383310bd.png)

## Installation

To use the Header component, enter the following command in your Terminal:

```
npm install @springernature/nature-section-heading
```
Import the installed component code in your `scss` file:

```scss
@import '@springernature/nature-header/scss/50-components/header';
@import '@springernature/nature-header/scss/50-components/header-expander';
```

Then import the JavaScript as follows: 

```
import {enhancedHeader} from '@springernature/nature-header/js/enhanced-header';

enhancedHeader();
```

Once you’ve installed the `scss` and JavaScript, build your Header using the Handlebars template below as a guide.

### Header

In the oscar-sites-nature application, the color of the border on each journal’s header is defined from Pubserv. It will override the Header’s default black border.

For ease of maintenance, the `scss` for this component is separated into 2 classnames and contained in 2 separate files:

- `c-header-expander` - for all interactive Header parts that users can open and close, like dropdown menus and pop-out modals
- `c-header` - for all  other parts of the Header

The following code example is a Handlebars template. Use this code in your application, adapting to whatever template rendering engine you're using. 

The loops and conditional statements show which parts of the component contain dynamic content.

```html
<header class="c-header" id="header" data-header=nature-150-split-header" style="border-color:#000">
    <div class="c-header__row c-header__row--flush">
        <div class="c-header__container">
            <div class="c-header__split">
                <h1 class="c-header__logo-container u-mb-0">
                    <a href="/">
                        <picture class="c-header__logo">
                            <source srcset="//media.springernature.com/full/nature-cms/uploads/product/nature/header-86f1267ea01eccd46b530284be10585e.svg" media="(min-width: 875px)">
                            <img src="//media.springernature.com/full/nature-cms/uploads/product/nature/header-86f1267ea01eccd46b530284be10585e.svg" alt="Nature">
                        </picture>
                    </a>
                </h1>
                <ul class="c-header__menu c-header__menu--global">
                    <li class="c-header__item c-header__item--nature-research">
                        <a class="c-header__link" href="https://www.nature.com/siteindex"><span>View all journals</span></a>
                    </li>
                    <li class="c-header__item c-header__item--pipe">
                        <a class="c-header__link" href="javascript:;" data-header-expander="" role="button" aria-haspopup="true" aria-expanded="false"><span>Search</span><svg role="img" aria-hidden="true" focusable="false" height="22" width="22" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M16.48 15.455c.283.282.29.749.007 1.032a.738.738 0 01-1.032-.007l-3.045-3.044a7 7 0 111.026-1.026zM8 14A6 6 0 108 2a6 6 0 000 12z"></path></svg></a>
                        <div id="search-menu" class="c-header-expander c-header-expander--tray u-hide-print has-tethered u-js-hide" hidden="">
                        <div class="c-header-expander__container">
                            <h2 class="u-visually-hidden">Search</h2>
                            <div>
                                <div class="c-search c-search--max-width u-mb-16">
                                    <form action="/search" method="get" role="search" autocomplete="off">
                                        <label class="c-header-expander__heading u-mb-8" for="keywords">Search articles by subject, keyword or author</label>
                                        <div class="c-search__field">
                                            <div class="c-search__input-container c-search__input-container--md">
                                                <input type="text" required="" class="c-search__input" id="keywords" name="q" value="">
                                            </div>
                                            <div class="c-search__select-container">
                                                <label for="results-from" class="u-visually-hidden">Show results from</label>
                                                <select id="results-from" name="journal" class="c-search__select">
                                                    <option value="" selected="">All journals</option>
                                                    <option value="nature">This journal</option>
                                                </select>
                                            </div>
                                            <div class="c-search__button-container">
                                                <button type="submit" class="u-button u-button--primary u-button--full-width" >Search</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="c-header-expander__keyline u-mb-16">
                                <p class="u-ma-0"><a href="/search/advanced">Advanced search</a></p>
                            </div>
                            <h3 class="c-header-expander__heading">Quick links</h3>
                            <ul class="u-list-reset">
                                <li class="u-display-inline-block u-mr-24 u-mb-16"><a href="/subjects">Explore articles by subject</a></li>
                                <li class="u-display-inline-block u-mr-24 u-mb-16"><a href="/naturecareers">Find a job</a></li>
                                <li class="u-display-inline-block u-mr-24 u-mb-16"><a href="/authors/index.html">Guide to authors</a></li>
                                <li class="u-display-inline-block u-mr-24 u-mb-16"><a href="/authors/editorial_policies/">Editorial policies</a></li>
                            </ul>
                        </div>
                    </div>
                    </li>
                    <li class="c-header__item">
                        <a href="/nams/svc/myaccount" id="my-account" class="c-header__link placeholder" style="display: none;">
                            <span>My Account</span><svg role="img" aria-hidden="true" focusable="false" height="22" width="22" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M10.238 16.905a7.96 7.96 0 003.53-1.48c-.874-2.514-2.065-3.936-3.768-4.319V9.83a3.001 3.001 0 10-2 0v1.277c-1.703.383-2.894 1.805-3.767 4.319A7.96 7.96 0 009 17c.419 0 .832-.032 1.238-.095zm4.342-2.172a8 8 0 10-11.16 0c.757-2.017 1.84-3.608 3.49-4.322a4 4 0 114.182 0c1.649.714 2.731 2.305 3.488 4.322zM9 18A9 9 0 119 0a9 9 0 010 18z" fill="#333" fill-rule="evenodd"></path></svg>
                        </a>
                        <a href="https://idp.nature.com/authorize/natureuser?client_id=grover&amp;redirect_uri=https%3A%2F%2Fwww.nature.com%2Fnature" id="login-button" style="" class="c-header__link placeholder" >
                            <span>Login</span><svg role="img" aria-hidden="true" focusable="false" height="22" width="22" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M10.238 16.905a7.96 7.96 0 003.53-1.48c-.874-2.514-2.065-3.936-3.768-4.319V9.83a3.001 3.001 0 10-2 0v1.277c-1.703.383-2.894 1.805-3.767 4.319A7.96 7.96 0 009 17c.419 0 .832-.032 1.238-.095zm4.342-2.172a8 8 0 10-11.16 0c.757-2.017 1.84-3.608 3.49-4.322a4 4 0 114.182 0c1.649.714 2.731 2.305 3.488 4.322zM9 18A9 9 0 119 0a9 9 0 010 18z" fill="#333" fill-rule="evenodd"></path></svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="c-header__row">
        <div class="c-header__container" >
            <div class="c-header__split">
                <div class="c-header__split">
                    <ul class="c-header__menu c-header__menu--journal">
                        <li class="c-header__item c-header__item--dropdown-menu" >
                            <a href="javascript:;" class="c-header__link c-header__link--chevron" data-header-expander="" role="button" aria-haspopup="true" aria-expanded="false">
                                <span><span class="c-header__show-text">Explore</span> content</span><svg role="img" aria-hidden="true" focusable="false" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m5.58578644 3-3.29289322-3.29289322c-.39052429-.39052429-.39052429-1.02368927 0-1.41421356s1.02368927-.39052429 1.41421356 0l4 4c.39052429.39052429.39052429 1.02368927 0 1.41421356l-4 4c-.39052429.39052429-1.02368927.39052429-1.41421356 0s-.39052429-1.02368927 0-1.41421356z" transform="matrix(0 1 -1 0 11 3)"></path></svg>
                            </a><nav class="u-hide-print c-header-expander has-tethered u-js-hide" aria-labelledby="Explore-content" id="explore" hidden="">
                            <div class="c-header-expander__container">
                                <h2 id="Explore-content" class="c-header-expander__heading u-js-hide">Explore content</h2>
                                <ul class="c-header-expander__list">
                                    {{#each exploreContent as |siteNavItem|}}
                                    <li class="c-header-expander__item">
                                        <a class="c-header-expander__link" href="{{siteNavItem.slug}}">{{siteNavItem.text}}</a>
                                    </li>
                                    {{/each}}
                                    {{#if facebookUri}}
                                    <li class="c-header-expander__item{{#if exploreContent}} c-header-expander__item--keyline c-header-expander__item--keyline-first-item-only{{/if}}">
                                        <a class="c-header-expander__link" href="{{facebookUri}}">Follow us on Facebook</a>
                                    </li>
                                    {{/if}}
                                    {{#if twitterUri}}
                                    <li class="c-header-expander__item{{#if exploreContent}} c-header-expander__item--keyline c-header-expander__item--keyline-first-item-only{{/if}}">
                                        <a class="c-header-expander__link" href="{{twitterUri}}">Follow us on Twitter</a>
                                    </li>
                                    {{/if}}
                                    {{#if showSubscribeButton}}
                                    <li class="c-header-expander__item{{#if exploreContent}} c-header-expander__item--keyline c-header-expander__item--keyline-first-item-only{{/if}} u-hide-at-lg">
                                        <a class=c-header-expander__link" href="https://www.nature.com/{{pcode}}/subscribe"><span>Subscribe</span></a>
                                    </li>
                                    {{/if}}
                                    {{#if alertsLink}}
                                    <li class="c-header-expander__item{{#if exploreContent}} c-header-expander__item--keyline c-header-expander__item--keyline-first-item-only{{/if}} u-hide-at-lg">
                                        <a class="c-header-expander__link" href="{{alertsLink}}" rel="nofollow">Sign up for alerts<svg role="img" aria-hidden="true" focusable="false" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m4 10h2.5c.27614237 0 .5.2238576.5.5s-.22385763.5-.5.5h-3.08578644l-1.12132034 1.1213203c-.18753638.1875364-.29289322.4418903-.29289322.7071068v.1715729h14v-.1715729c0-.2652165-.1053568-.5195704-.2928932-.7071068l-1.7071068-1.7071067v-3.4142136c0-2.76142375-2.2385763-5-5-5-2.76142375 0-5 2.23857625-5 5zm3 4c0 1.1045695.8954305 2 2 2s2-.8954305 2-2zm-5 0c-.55228475 0-1-.4477153-1-1v-.1715729c0-.530433.21071368-1.0391408.58578644-1.4142135l1.41421356-1.4142136v-3c0-3.3137085 2.6862915-6 6-6s6 2.6862915 6 6v3l1.4142136 1.4142136c.3750727.3750727.5857864.8837805.5857864 1.4142135v.1715729c0 .5522847-.4477153 1-1 1h-4c0 1.6568542-1.3431458 3-3 3-1.65685425 0-3-1.3431458-3-3z" fill="#fff"/></svg></a>
                                    </li>
                                    {{/if}}
                                    {{#if rssLink}}
                                    <li class="c-header-expander__item{{#if exploreContent}} c-header-expander__item--keyline c-header-expander__item--keyline-first-item-only{{/if}} u-hide-at-lg">
                                        <a class="c-header-expander__link" href="{{rssLink}}"><span>RSS feed</span></a>
                                    </li>
                                    {{/if}}
                                </ul>
                            </div>
                        </nav>
                        </li>
                        <li class="c-header__item c-header__item--dropdown-menu">
                            <a href="javascript:;" class="c-header__link c-header__link--chevron" data-header-expander="" role="button" aria-haspopup="true" aria-expanded="false">
                                <span>About <span class="c-header__show-text">the journal</span></span><svg role="img" aria-hidden="true" focusable="false" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m5.58578644 3-3.29289322-3.29289322c-.39052429-.39052429-.39052429-1.02368927 0-1.41421356s1.02368927-.39052429 1.41421356 0l4 4c.39052429.39052429.39052429 1.02368927 0 1.41421356l-4 4c-.39052429.39052429-1.02368927.39052429-1.41421356 0s-.39052429-1.02368927 0-1.41421356z" transform="matrix(0 1 -1 0 11 3)"></path></svg>
                            </a><nav class="u-hide-print c-header-expander has-tethered u-js-hide" aria-labelledby="about-the-journal" id="about-journal" hidden="">
                            <div class="c-header-expander__container">
                                <h2 id="About-the-journal" class="c-header-expander__heading u-js-hide">About the journal</h2>
                                <ul class="c-header-expander__list">
                                    {{#each aboutJournalContent as |siteNavItem|}}
                                    <li class="c-header-expander__item">
                                        <a class="c-header-expander__link" href="{{siteNavItem.slug}}">{{siteNavItem.text}}</a>
                                    </li>
                                    {{/each}}
                                </ul>
                            </div>
                        </nav>
                        </li>
                        <li class="c-header__item c-header__item--dropdown-menu u-mr-2" >
                            <a href="javascript:;" class="c-header__link c-header__link--chevron c-header__link--dropdown-menu" data-header-expander="" role="button" aria-haspopup="true" aria-expanded="false">
                                <span>Publish <span class="c-header__show-text">with us</span></span><svg role="img" aria-hidden="true" focusable="false" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m5.58578644 3-3.29289322-3.29289322c-.39052429-.39052429-.39052429-1.02368927 0-1.41421356s1.02368927-.39052429 1.41421356 0l4 4c.39052429.39052429.39052429 1.02368927 0 1.41421356l-4 4c-.39052429.39052429-1.02368927.39052429-1.41421356 0s-.39052429-1.02368927 0-1.41421356z" transform="matrix(0 1 -1 0 11 3)"></path></svg>
                            </a><nav class="u-hide-print c-header-expander has-tethered u-js-hide" aria-labelledby="Publish-with-us-label" id="publish-with-us" hidden="">
                            <div class="c-header-expander__container">
                                <h2 id="Publish-with-us-label" class="c-header-expander__heading u-js-hide">Publish with us</h2>
                                <ul class="c-header-expander__list">
                                    {{#each publishWithUsContent as |siteNavItem|}}
                                    <li class="c-header-expander__item">
                                        <a class="c-header-expander__link" href="{{siteNavItem.slug}}">{{siteNavItem.text}}</a>
                                    </li>
                                    {{/each}}
                                    {{#if submissionLink}}
                                    <li class="c-header-expander__item{{#if publishWithUs}} c-header-expander__item--keyline{{/if}}">
                                        <a class="c-header-expander__link" href="{{submissionLink}}">Submit manuscript<svg role="img" aria-hidden="true" focusable="false" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m15 0c1.1045695 0 2 .8954305 2 2v5.5c0 .27614237-.2238576.5-.5.5s-.5-.22385763-.5-.5v-5.5c0-.51283584-.3860402-.93550716-.8833789-.99327227l-.1166211-.00672773h-9v3c0 1.1045695-.8954305 2-2 2h-3v10c0 .5128358.38604019.9355072.88337887.9932723l.11662113.0067277h7.5c.27614237 0 .5.2238576.5.5s-.22385763.5-.5.5h-7.5c-1.1045695 0-2-.8954305-2-2v-10.17157288c0-.53043297.21071368-1.0391408.58578644-1.41421356l3.82842712-3.82842712c.37507276-.37507276.88378059-.58578644 1.41421356-.58578644zm-.5442863 8.18867991 3.3545404 3.35454039c.2508994.2508994.2538696.6596433.0035959.909917-.2429543.2429542-.6561449.2462671-.9065387-.0089489l-2.2609825-2.3045251.0010427 7.2231989c0 .3569916-.2898381.6371378-.6473715.6371378-.3470771 0-.6473715-.2852563-.6473715-.6371378l-.0010428-7.2231995-2.2611222 2.3046654c-.2531661.2580415-.6562868.2592444-.9065605.0089707-.24295423-.2429542-.24865597-.6576651.0036132-.9099343l3.3546673-3.35466731c.2509089-.25090888.6612706-.25227691.9135302-.00001728zm-.9557137-3.18867991c.2761424 0 .5.22385763.5.5s-.2238576.5-.5.5h-6c-.27614237 0-.5-.22385763-.5-.5s.22385763-.5.5-.5zm-8.5-3.587-3.587 3.587h2.587c.55228475 0 1-.44771525 1-1zm8.5 1.587c.2761424 0 .5.22385763.5.5s-.2238576.5-.5.5h-6c-.27614237 0-.5-.22385763-.5-.5s.22385763-.5.5-.5z" fill="#fff"/></svg>
                                        </a>
                                    </li>
                                    {{/if}}
                                </ul>
                            </div>
                        </nav>
                        </li>
                    </ul>
                    <div class="c-header__menu u-ml-16 u-show-lg u-hide u-show-at-lg">
                        <div class="c-header__item c-header__item--pipe">
                            <a class="c-header__link" href="https://www.nature.com/nature/subscribe">
                                <span>Subscribe</span>
                            </a>
                        </div>
                    </div>
                </div>
                <ul class="c-header__menu c-header__menu--tools">
                    <li class="c-header__item">
                        <a class="c-header__link" href="https://www.nature.com/my-account/alerts/subscribe-journal?list-id=1" rel="nofollow">
                            <span>Sign up for alerts</span><svg role="img" aria-hidden="true" focusable="false" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m4 10h2.5c.27614237 0 .5.2238576.5.5s-.22385763.5-.5.5h-3.08578644l-1.12132034 1.1213203c-.18753638.1875364-.29289322.4418903-.29289322.7071068v.1715729h14v-.1715729c0-.2652165-.1053568-.5195704-.2928932-.7071068l-1.7071068-1.7071067v-3.4142136c0-2.76142375-2.2385763-5-5-5-2.76142375 0-5 2.23857625-5 5zm3 4c0 1.1045695.8954305 2 2 2s2-.8954305 2-2zm-5 0c-.55228475 0-1-.4477153-1-1v-.1715729c0-.530433.21071368-1.0391408.58578644-1.4142135l1.41421356-1.4142136v-3c0-3.3137085 2.6862915-6 6-6s6 2.6862915 6 6v3l1.4142136 1.4142136c.3750727.3750727.5857864.8837805.5857864 1.4142135v.1715729c0 .5522847-.4477153 1-1 1h-4c0 1.6568542-1.3431458 3-3 3-1.65685425 0-3-1.3431458-3-3z" fill="#222"></path></svg>
                        </a>
                    </li>
                    <li class="c-header__item c-header__item--pipe">
                        <a class="c-header__link" href="http://feeds.nature.com/nature/rss/current">
                            <span>RSS feed</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</header>
```

### Header expander

The Header’s JavaScript file uses: 

- [the Global expander component](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-expander)
- `makeArray` in [the Global JavaScript component](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-javascript)

When a user selects the trigger, the Global expander component opens and closes the specified target. You’ll need to put matching values into the `href` of the trigger and the `id` attribute on the target element to make this work.

### Adding keylines above menu items

There are 2 ways to apply keylines to menu items.

If your menu is static - meaning it can’t be changed from another source, like a CMS - use the `c-header-expander__item–keyline`  classname to apply a keyline above a menu item. For example:

```html
<li class="c-header-expander__item c-header-expander__item--keyline">
    <a href="some url">Some text</a>
</li>
```

If the items in your menu are dynamic, you can use the `c-header-expander__item–keyline-first-item-only` classname to apply a keyline above the first menu item in a group.

For example, you may want to keep social media links grouped together, visually separated from the other menu items.

In these instances, you can apply `c-header-expander__item–keyline-first-item-only` to a group of list items, so the first item in that group always has a keyline above it.

You can see an example of this in the code example above.

## Research on this component

The Pandora team originally created this component whilst [redesigning the information architecture of the Nature journal websites](https://hive.springernature.com/home/designing-a-new-information-architecture-for-the-nature-journal-websites).

The team designed the header to help users find what they needed more easily than with the previous version, which placed all navigation items behind a single “Menu” button.

A/B testing showed that exposing top-level navigation links in the menu increased the number of people visiting certain pages. For example, information for authors.

[Read a blog post on the Nature header and navigation redesign](https://hive.springernature.com/home/ls/community/content-consumption/post/4537888966049792)

## Help improve this page

If you’ve got a question, idea or suggestion about how to improve this component or guidance, post  in the [#design-systems Slack channel](https://springernature.slack.com/archives/C75DHBTBP).
