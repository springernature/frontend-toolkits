# Skip Link

Full width link on top of the page that enables keyboard users and users of assistive technology to jump to the main content of the page and bring it immediately into view, without having to tab over all navigational items.

## Branding

To include `global-skip-link` in your application, you need to choose **ONE** brand from those available. The `DEFAULT` brand is included in all other brands, and any settings that are not configured will fall back to default.

```scss
// Pick ONE of the brands below to include
@import '@springernature/global-skip-link/scss/10-settings/default';
@import '@springernature/global-skip-link/scss/10-settings/springernature';
@import '@springernature/global-skip-link/scss/10-settings/nature';
@import '@springernature/global-skip-link/scss/10-settings/springer';

// Include this with your other components
@import '@springernature/global-skip-link/scss/50-components/skip-link';
```

## Usage

The skip-link is the first focusable element on the page.
It is an <a> pointing to an id of the section it links to.
For example if the main container is:

```html
<main id="main">
...
</main>
```

then the skip link should look like this:

```html
<a class="c-skip-link" href="#main">
    Skip to main content
</a>
```

ATTENTION:
1. The target section must be focusable.
You will need to add a negative tabindex in order to improve screen reader accessibility for browsers like IE11.
It's advised to do so via [JavaScript](https://codepen.io/200ok/pen/jvNBMP) and not directly in the html because:
* Some apps will display the browser's default focus styles around the main element
* When clicking anywhere in the page, focus will return back to the top

Check the [GOV.UK Design System](https://github.com/alphagov/govuk-design-system-backlog/issues/66) for more.

2. If there is an iframe in the page, it is highly recommended to add the skip link markup before it.

More resources:
* https://webaim.org/techniques/skipnav/
* https://css-tricks.com/how-to-create-a-skip-to-content-link/
* https://axesslab.com/skip-links/


