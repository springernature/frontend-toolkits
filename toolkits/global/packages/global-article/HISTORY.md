# History

## 21.1.0 (2020-12-04)
    * Add article--font-family default setting and override for Nature

## 21.0.1 (2020-11-19)
    * Bump to get latest version package-manager with updated post install script

## 21.0.0 (2020-11-18)
    * BREAKING: 
        * Switch to use brand-context
        * Bump global-expander and global-popup dependencies

## 20.0.0 (2019-07-13)
	* Removes basic popup styles from article-enhanced.scss as replaced by Global Popup
	* Removes popup component from Global Article
	* Uses Global Popup js in Global Article authors.js
	* Adds Global-Expander and Global-Popup as js dependencies of Global-Article

## 19.2.0 (2019-04-21)
	* Add test coverage for `Authors` component

## 19.1.0 (2020-04-20)
	* `closest` polyfill doesn't work in IE on SVG elements, since `InternalNavigation` isn't triggered from any elements using SVG we can just guard against the error and carry on

## 19.0.0 (2020-04-16)
	* Remove support for `activeMediaQuery` from animate icon, we don't seem to have anything that still uses this
	* Remove `deviceState` now it's not needed for  `activeMediaQuery`

## 18.0.3 (2020-04-16)
	* Fix unused variable from lint comment

## 18.0.2 (2020-04-16)
	* Fix debugging for issue where it appears `closest` polyfill isn't being applied sometimes

## 18.0.1 (2020-04-14)
	* Debugging for issue where it appears `closest` polyfill isn't being applied sometimes

## 18.0.0 (2019-04-09)
	* Remove the mapping $article--breakpoints within article.scss

## 17.0.0 (2019-04-08)
	* Remove the mapping $article--breakpoints and use breakpoints from global-context

## 16.0.0 (2019-03-26)
	* Convert `AuthorList` to use `module.exports`

## 15.1.0 (2019-03-24)
	* Add test coverage for `ShareBox` component

## 15.0.0 (2019-03-20)
	* Convert `ReadingCompanion` to use `module.exports` and add unit tests for it

## 14.0.0 (2019-03-17)
	* Remove `TabGroup` and associated styles, it's no longer used

## 13.0.1 (2020-03-13)
	* Remove unsupported popup group options from author popups

## 13.0.0 (2020-03-13)
	* Convert `PopupGroup` and `Popup` to use `module.exports`

## 12.0.0 (2020-03-10)
	* Convert `Scheduler` to use `module.exports` and remove jQuery

## 11.0.0 (2020-03-03)
	* Convert `InternalNavigation` to use `module.exports`

## 10.4.0 (2020-03-03)
	* Change markup and aligment for elements in the footer inside the author popup

## 10.3.1 (2020-02-25)
	* Fix the max-height for the pdf download button

## 10.3.0 (2020-02-25)
	* Remove the need to pass mainColSelector as we can use the .js-main-column as the hook

## 10.2.0 (2020-02-24)
	* Add new class for use on article body container for replacing .main-column eventually

## 10.1.2 (2020-02-20)
	* Set font-family to sans for the content in the metrics page
	* Adjust padding and alignment in access and citations section
	* Add variable for the font-weight in section headings in the metrics page.

## 10.1.1 (2020-02-19)
	* Bump to kick of travis :(

## 10.1.0 (2020-02-19)
	* Add styles for peer review reports

## 10.0.0 (2020-02-17)
	* Add new brand styles for metrics page corresponding to a different markup

## 9.3.2 (2020-02-11)
	* Revert changes from 9.2.1 - they're causing a lot of layout issues (we might revisit what to do about inline equations overflowing, but since they're rare and this is tricky we may not)

## 9.3.1 (2020-01-30)
	* Tidy up fonts used in author popups and big consortia lists

## 9.3.0 (2020-01-17)
	* Slightly simplify author JS to go with updated article XSLT

## 9.2.1 (2020-01-16)
	* Fix inline mathjax equations displaying outside the container

## 9.2.0 (2020-01-15)
	* Adjust font size within author pop up

## 9.1.0 (2020-01-08)
	* Allow call to action buttons to appear as sticky elements above the reading companion tabs

## 9.0.2 (2020-01-07)
	* Fix spacing between successive `.c-article-info-details` elements

## 9.0.1 (2020-01-06)
	* BUG: Javascript errors in IE10 after linting fixes
		* Revert use of `append`, `includes`, `remove`

## 9.0.0 (2020-01-06)
	* Refactor for new linting rules

## 8.0.4 (2020-01-02)
	* Add styles for show article history link

## 8.0.3 (2019-12-30)
	* Remove `float: right` from `c-blockquote`, it seems to be there in error since there's also a `c-blockquote--right` modifier

## 8.0.2 (2019-12-02)
	* Remove unnecessary specific classes for figures for when no border as they causing the image overflows the container

## 8.0.1 (2019-11-20)
	* Small change on author list spacing

## 8.0.0 (2019-11-14)
	* Replace iifes in some components with named functions to add unit tests
	* Export named functions to object in these components to be exposed as modules (temporary step until ES6 modules migration)
	* Include jquery as devDependency to add unit tests
	* Add unit tests for these components.

## 7.12.1 (2019-11-07)
	* Replace flex column layout with display block to fix rendering issues in IE 11

## 7.12.0 (2019-11-06)
	* Add a more generic classname for replacing .c-article-access-provider eventually

## 7.11.6 (2019-11-01)
	* Make reference display slightly more compact at small screen sizes
	* Tweak display of about this article at small screen sizes

## 7.11.5 (2019-10-31)
	* Fix positioning of author popups at small screen sizes

## 7.11.4 (2019-10-31)
	* Use a consistent divider style before the cite as link

## 7.11.3 (2019-10-31)
	* Add a little space at the top of the bibliographic information section

## 7.11.2 (2019-10-30)
	* Fix `aria-label` for show more/show less buttons in the author list picking up the wrong value on the article page

## 7.11.1 (2019-10-29)
	* Add styles for citation information in the bibliographic info section
	* Move download citation link

## 7.11.0 (2019-10-25)
	* Move download citation icon and right chevron to use inline svg

## 7.10.0 (2019-10-24)
	* Increase the font size across all information / interface text

## 7.9.1 (2019-10-23)
	* Add underline on hover for reading companion section links
	* Add top border for reading companion panels

## 7.9.0 (2019-10-22)
	* Update email author icon (now uses inline svg instead of a background image)

## 7.8.2 (2019-10-21)
	* Allow wrapping for reference links

## 7.8.1 (2019-10-21)
	* Add underline on hover for corresponding author link in the author popup

## 7.8.0 (2019-10-18)
	* Make figure descriptions use serif fonts
	* Make author info in popups use serif fonts
	* Use 8pt grid sizes for author popup spacing
	* Try harder to avoid long links overflowing

## 7.7.0 (2019-10-18)
	* Base spacing of reference links on the 8pt grid
	* Base spacing of items in reading companion figures and references on the 8pt grid
	* Remove unused reading companion figures download
	* Try to avoid wrapping doi in article info section
	* Try to avoid long links overflowing
	* Use a sans-serif font for the shareable link description

## 7.6.0 (2019-10-18)
	* Update spacing around article events to match global spacing

## 7.5.1 (2019-10-16)
	* Add borders under section headings, remove border from under article header

## 7.5.0 (2019-10-16)
	* Don't highlight the first item in the reading companion sections until it's scrolled into
	* Remove hardcoded `max-width` on reading companion tabs and section list

## 7.4.1 (2019-10-16)
	* Update previous change to adjust margin rather than padding

## 7.4.0 (2019-10-16)
	* Move about this article border/padding so if we dont display crossref link we dont get border/padding
	* Add class u-h3 to share heading for correct font-size

## 7.3.2 (2019-10-15)
	* Make author lists, article info etc... use the sans-serif font for the imprint

## 7.3.1 (2019-10-15)
	* Move border to base of c-article-header as was not capturing all of header

## 7.3.0 (2019-10-15)
	* Update design of reading companion sections list and tabs

## 7.2.1 (2019-10-15)
	* Decrease padding under article title

## 7.2.0 (2019-10-14)
	* Update styles to use 8 point layout

## 7.1.1 (2019-10-14)
	* Fix display of indexed footnotes containing multiple paragraphs

## 7.1.0 (2019-10-14)
	* Update spacing styles to use 8 point grid sizing

## 7.0.3 (2019-10-10)
	* Extra margin at the bottom of sections

## 7.0.2 (2019-10-10)
	* Remove padding from reference links list

## 7.0.1 (2019-10-09)
	* Tweak spacing around section headings

## 7.0.0 (2019-10-08)
	* Remove collapsible sections

## 6.0.7 (2019-10-07)
	* Reading companion `rc.display` event should not fire as true if the reading companion wasn't initialised yet (happens when there's enough space for the reading companion but no content to display)

## 6.0.6 (2019-10-04)
	* Remove download figures from reading companion

## 6.0.5 (2019-09-30)
	* Display no share url message if the url returned from the readcube endpoint is missing/empty

## 6.0.4 (2019-09-27)
	* Allow `ShareBox` to accept only a url or a doi in its config

## 6.0.3 (2019-09-17)
	* Add param flag to allow render the institution name optionally in the provided by component

## 6.0.2 (2019-09-17)
	* Remove border from corresponding author fieldset (for sites where the default styling hasn't already done this)

## 6.0.1 (2019-09-17)
	* Add margin bottom to element to provide consistancy across imprints

## 6.0.0 (2019-09-17)
	* Style changes to move metrics bar from right hand column into body title area

## 5.1.1 (2019-09-17)
	* Don't attempt to bind reading companion events if there is nothing to display

## 5.1.0 (2019-09-10)
	* Separate render and insert html steps in two functions in provided by box component

## 5.0.2 (2019-09-09)
	* Add existing check for reading companion elements

## 5.0.1 (2019-08-23)
	* Remove offset from top of the viewport when calculating if a popup with fit

## 5.0.0 (2019-08-21)
	* Remove jQuery from popups
	* Remove popup functionality not needed by author popups
	* Improve popup positioning

## 4.2.0 (2019-08-21)
	* Remove uppercase transform from open access label

## 4.1.0 (2019-08-13)
	* Defer loading figures in the reading companion until the user switches to the figures tab

## 4.0.0 (2019-08-13)
	* Delete bootstrap.js from global-article

## 3.5.2 (2019-08-12)
	* Add `c-article-header` class to align the article header with the body sections

## 3.5.1 (2019-08-12)
	* Remove `c-article__sub-heading--light-with-border`

## 3.5.0 (2019-08-09)
	* Updates styles for notes and references sections

## 3.4.1 (2019-08-09)
	* Don't break open peer review label while removing `abbr`

## 3.4.0 (2019-08-09)
	* Remove `abbr` from open access label

## 3.3.0 (2019-08-07)
	* Add new styles for Associated content container

## 3.2.1 (2019-08-06)
	* Tidy up margins on equation objects

## 3.2.0 (2019-08-05)
	* Refactor publication details styles

## 3.1.1 (2019-08-05)
	* Fix display of references without reference links
	* Increase font size of reference links in reading companion

## 3.1.0 (2019-08-05)
	* Delete duplication of styles related to questions and answers section

## 3.0.9 (2019-08-02)
	* Bump up font size for reading companion reference text.

## 3.0.8 (2019-08-02)
	* Use a serif font for the reading companion reference text.

## 3.0.7 (2019-07-30)
	* Fix spacing in reading companion figures when there are no figure links.

## 3.0.6 (2019-07-26)
	* Fix order of :visited and :hover styles for download PDF button (fixes white text on white background)

## 3.0.5 (2019-07-24)
	* Allow reading companion to be triggered a customisable media query.

## 3.0.4 (2019-07-23)
	* Fix references alignment by using flex

## 3.0.3 (2019-07-22)
	* Update use of the class list-reset to be the utility class u-list-reset

## 3.0.2 (2019-07-15)
	* Update use of the class js-hide to be the utility class u-js-hide

## 3.0.1 (2019-07-12)
	* Make pdf download button full width now it's temporarily back in the right hand column.

## 3.0.0 (2019-07-10)
	* Make download PDF button more customisable from different imprints.

## 2.2.5 (2019-07-08)
	* Tweak width of download PDF button.

## 2.2.4 (2019-07-05)
	* Fix author info pop up to show present address
	* Make popup appear next to author clicked on

## 2.2.3 (2019-07-04)
	* Fix pdf download link visited styles for BMC.

## 2.2.2 (2019-07-04)
	* Fix pdf download link hover styles for BMC.

## 2.2.1 (2019-07-03)
	* Fix bug with section titles containing links breaking the reading companion section navigation.

## 2.2.0 (2019-07-03)
	* Add PDF download link styles.

## 2.1.0 (2019-07-01)
	* Add compatibility with orcid link

## 2.0.0 (2019-07-01)
	* Update share-box.js so readcude api endpoint can be passed in allowing all environments to use same code
	* Adds new style for no shareable link text

## 1.5.6 (2019-06-27)
	* Styles for heading dividers.

## 1.5.5 (2019-06-24)
	* Remove table icon on small screens

## 1.5.4 (2019-06-20)
	* Add map-get to media-query call

## 1.5.3 (2019-06-20)
	* Replace base64 encoded svg with url encoding.
	* Update icons that were hardcoded to use the nature link colour so they use `$article--link-icon-color`.
	* Optimise some icons.

## 1.5.2 (2019-06-20)
	* Replace 'desk' woth 'lrg' in media-query lookup

## 1.5.1 (2019-06-19)
	* Remove `text-decoration` from metrics citation counts.

## 1.5.0 (2019-06-19)
	* Add styles for article metrics bar.
	* Introduce `$article--link-icon-color` variable for setting the colour on svg link icons.

## 1.4.0 (2019-06-17)
    * Refactor c-bibliographic-information to use flex

## 1.3.1 (2019-06-17)
    * Add additional styles to affiliation addresses

## 1.3.0 (2019-06-12)
    * Add Mathjax zoom compatibility

## 1.2.0 (2019-06-12)
    * Add refactored styles for mathjax equations.

## 1.1.2 (2019-06-11)
	* Set a `min-width` for equation numbers.

## 1.1.1 (2019-06-11)
	* Set `max-width` of reading companion to match article body content.

## 1.1.0 (2019-06-11)
	* Update styles to include styles for global reading companion.

## 1.0.0 (2019-06-10)
	* Include js files for global-article.

## 0.0.24 (2019-06-05)
	* Create 'c-article-rights' for use on rights and permissions links

## 0.0.23 (2019-06-04)
	* Fix table captions broken if the caption contain a `<b>` element.

## 0.0.22 (2019-05-29)
	* Adapt subject lists to work for keywords too.

## 0.0.21 (2019-05-28)
	* Ensure correct reset for author list in articles.

## 0.0.20 (2019-05-28)
	* Ensure correct reset for author list in affiliations in articles.

## 0.0.19 (2019-05-28)
	* Boxes - slightly tidy up markup and fix IE 11 overflowing images

## 0.0.18 (2019-05-17)
	* Create a `c-abbreviation_list` for the Abbreviations section

## 0.0.17 (2019-05-17)
	* Rendering fixes for Q&A articles

## 0.0.16 (2019-05-14)
	* Fix display of long captions on large illustrations e.g. https://www.nature.com/articles/s41592-019-0399-6

## 0.0.15 (2019-05-14)
	* Enable removing some atomic classes from the author lists and popups

## 0.0.14 (2019-05-13)
	* Added new variable `article--section-title-background-color` to use across brands

## 0.0.13 (2019-05-09)
	* Stop long section titles overlapping the icon on article section accordion headings

## 0.0.12 (2019-05-08)
	* Simplify the display of table captions

## 0.0.11 (2019-05-08)
	* Fixes for display of tables

## 0.0.10 (2019-05-07)
	* Tweak layout of block level equations

## 0.0.9 (2019-05-07)
	* Fix spacing under figure images

## 0.0.8 (2019-05-07)
	* Make style changes to simplify markup for the links in article references

## 0.0.7 (2019-05-03)
	* Add `c-article-body` class for handling word wrapping on the body content

## 0.0.6 (2019-05-03)
	* Add `c-article__equation` class for laying out block level equations

## 0.0.5 (2019-05-02)
	* Remove `c-article-figure-hide` class

## 0.0.4 (2019-05-02)
	* Create a `c-article__pill-button` class for use on all the fullsize image/back to article buttons

## 0.0.3 (2019-05-02)
	* Fix margin on `.c-article-events + .c-article-events`

## 0.0.2 (2019-04-29)
	* Change url paths from SVG/GIF to data URIs

## 0.0.1 (2019-04-29)
	* First generic version of an article
