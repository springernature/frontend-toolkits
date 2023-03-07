# Skip link

Skip link lets keyboard and assistive technology users go to the main content of the page without having to tab through the navigation elements.

## When to use this component

All web pages should have a skip link.

## How it works

The skip link is the first focusable element on the page. It stays visually hidden until it is focused by the first press of the tab key after page load. 

### Installation

To use the skip link component, enter the following command in your Terminal:

`npm install @springernature\global-skip-link`

Then, choose the brand you need and import the installed component code into your scss file:

```scss
// Choose one of these brands to include with your settings:

@import '@springernature/global-skip-link/scss/10-settings/default';
@import '@springernature/global-skip-link/scss/10-settings/springernature';
@import '@springernature/global-skip-link/scss/10-settings/nature';
@import '@springernature/global-skip-link/scss/10-settings/springer';

// Include this with your other components
@import '@springernature/global-skip-link/scss/50-components/skip-link';
```

### Link

The skip link should be a link to the main container of the page. You must supply an id for the link to point to.

For example, if you supply `main` as the `id`:

```html
<main id="main">
...
</main>
```

then the link would be:

```html
<a class="c-skip-link" href="#main">
    Skip to main content
</a>
```

### Focus

The target section must be focusable so that users can then continue to tab through content. Most browsers will do this automatically. However, Internet Explorer 11 does not.

To help skip link work for keyboard and assistive technology users in IE11, add a negative `tabindex` to the main element. 

```html
<main id="main" tabindex="-1">
```

Some applications might display the browser's default focus styles around the main container. To prevent this, you can remove the focus styles programmatically.

```css
main:focus {
  outline: none;
}
```

### Iframe

If there is an iframe in the page, you must add the skip link markup before it.

## Template

You can see an example in the [skip link `demo` folder](https://github.com/springernature/frontend-toolkits/tree/main/toolkits/global/packages/global-skip-link/demo).

## Help improve this page

If you’ve got a question, idea or suggestion about how to improve this component or guidance, post in the [#ask-elements Slack channel](https://springernature.slack.com/archives/CNBTFLBLP).

