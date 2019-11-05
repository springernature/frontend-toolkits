# Springer Webfonts

Load webfonts on your product in a non-blocking asyncronous manner

## Font Face Observer

This package has a third party dependency on [Font Face Observer](https://github.com/bramstein/fontfaceobserver).
This is a peer dependency and must be installed, i.e. `npm i -S fontfaceobserver` then in package.json:

```json
  "peerDependencies": {
    "fontfaceobserver": "^2.1.0"
  }
```

## Custom Events Polyfill

This package requires your product to have polyfilled javascript custom events. For convenience here is a polyfill that you can include in your app:
```javascript
(function () {
    if (typeof window.CustomEvent === "function") { return false; }

    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();
```

## How to use
The component needs to be imported in to your bundle and when it is called you must pass in config that provides the details of the webfonts you need in the following format:

```javascript
// bundle.js

import webfonts from '@springernature/springer-webfont/js';

// example of one font
webfonts([
    {
        name: 'Europa',
        weights: ['100', '400', '700']
    }
]);

// example of multiple fonts
webfonts([
    {
        name: 'Europa',
        weights: ['100', '400', '700']
    },
    {
        name: 'Noto Serif',
        weights: ['400', '700']
    }
]);
```
If the user does not have the font already (we use sessionStorage to manage this) then the fonts are downloaded via Font Face Observer. Once complete the component emits a `webfonts-loaded` event on `document.DocumentElement`. This component does not prescribe any font switching mechanisms - it is up to you to listen for that event and then execute whatever font switching mechanism you desire. Here is an example where we place a class on the document which ensures webfonts are then displayed as per our css:
```javascript
// bundle.js
document.documentElement.addEventListener('webfonts-loaded', () => {
	document.documentElement.classList.add('webfonts-loaded');
});
webfonts([{name: 'Europa',weights: ['100', '400', '700']}]);

// styles.css
font-family: $fallback-font;

html.webfonts-loaded & {
    font-family: $webfont;
}
```

## Error handling
This component contains occurences of `throw new Error()` and therefore assumes your app has a way of handling those errors without blocking execution of your app should an error occur.

## License

[MIT License][info-license] &copy; 2019, Springer Nature

[info-license]: https://github.com/springernature/frontend-springer-toolkit/blob/master/LICENCE
