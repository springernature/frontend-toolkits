# Javascript

Shared Javascript that can be included in your project or component.

## Helpers

A collection of JavaScript helpers to achieve common, repetitive tasks.

### Usage

You can import as many of the named exports from the helpers as you require for your project.

```javascript
import {helper1, helper2} from '@springernature/brand-context';
```

**Util**
- [makeArray](#makearray)
- [createEvent](#createevent)
- [getCookie](#getcookie)
- [setCookie](#setcookie)
- [deleteCookie](#deletecookie)
- [debounce](#debounce)
- [throttle](#throttle)
- [onetrust](#onetrust)


**Dom**
- [getDataOptions](#getdataoptions)
- [expander](#expander)

### Util
Util helpers are used to help achieve JavaScript tasks that do not involve touching the DOM.

#### makeArray
Makes an array from an iterable.
Commonly used for converting a NodeList into an Array so array methods can then be used on the iterable.

```javascript
const elementsNodeList = document.querySelectorAll('.elements');
const elementsArray = makeArray(elementsNodeList);

elementsArray.forEach(element => {
    // Do something
});
```

#### createEvent
Simple wrapper for [`customEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) that enforces an event namespace of the form `namespace:event`.

This should be the **default** method for component module communication, where the name of the component is used as the namespace.

```javascript
const elementToBind = document.getElementById('element');

// Create event namespaced to component
const event = createEvent('eventName', 'componentName', {
    bubbles:true,
    cancelable: true,
    detail: {
        hazcheeseburger: true
    }
});

// Dispatch event
elementToBind.dispatchEvent(event);

// Listen for event
elementToBind.addEventListener('componentName:eventName', function (event) {
    // Do something
}, false);
```

#### getCookie
Retrieves a cookie by name from `document.cookie`.

```javascript
const myCookie = getCookie('name-of-cookie');
```

#### setCookie
Sets a cookie with a name, value and attributes using `document.cookie`.
Configurable options are:

- `path` (string)
- `domain` (string)
- `max-age` (number as string)
- `expires` (string)
- `secure` (string)
- `samesite` (string) 

```javascript
setCookie('name-of-cookie', 'cookie-value', {
    path: '/',
    domain: 'mydomain.com',
    'max-age': '31536000'
});
```

#### deleteCookie
Expires a cookie by name from `document.cookie`.
Configurable options are:

- `path` (string)
- `domain` (string)

```javascript
deleteCookie('name-of-cookie', {
    path: '/',
    domain: 'mydomain.com',
});
```

#### debounce
Allows sequential calls to a function to be grouped together so that the function will only be called once.
The call will be made once the timeframe has passed after the last call.

The `debounce` function accepts two arguments, `func,` and an options object that accepts `wait` and `immediate`.
`func` is the function to debounce; `wait` is the time (in ms) that should pass after the last function call; `immediate` allows the function to be called once _before_ the timer begins.

`debounce` returns a function and will use `requestAnimationFrame` if no wait time is passed in.
`immediate` defaults to `false`.

Common use cases are when you want to execute a handler only at the end of a series of events, for example when making asynchronous requests in response to a users input.

```javascript
const input = document.querySelector('input.autocomplete');
input.addEventListener('input', debounce(myHandler, {wait: 200, immediate: true}));
```

#### throttle
Allows a function to be called once within a set timeframe. Additional function calls within the timeframe will be ignored.
The `throttle` function accepts two arguments, `func`, which is the function to throttle, and `wait`, which is the duration of the throttle (in ms).

`throttle` returns a function with a default `wait` time of 100.

Common use cases are when you want to consistently execute a handler but at a decreased ratio to the browsers default 1:1, for example scroll and resize event handlers.

```javascript
document.addEventListener('scroll', throttle(myHandler, 200));
```

#### onetrust
OneTrust is the cookie management tool we use in order to aid GDPR compliance.
This helper exports two named functions, `checkConsent` and `isConsentBannerClosed`.

##### checkConsent

Takes a OneTrust category string and returns a boolean representing whether the category has been consent to (retrieved from the `OptanonConsent` cookie).

Valid categories are: 

- "strictlyNecessary"
- "performance"
- "functional"
- "targetingFirstParty"
- "targetingThirdParty"

```javascript
checkConsent('targetingThirdParty');
```

An error will be thrown if an invalid category is passed in.

##### isConsentBannerClosed

Returns a boolean representing whether the cookie consent banner has been closed (retrieved from the `OptanonAlertBoxClosed` cookie).

```javascript
isConsentBannerClosed();
```

### Dom
Dom helpers are used to help achieve JavaScript tasks that involve getting information from, or manipulating the DOM.

#### getDataOptions
Takes an element and an Object of component options and data-attribute selectors and returns the an Object with the value for those data-attributes.
Because it returns an Object, it is easy to merge with other options Objects, such as the default options.

```html
<div class="my-component" data-mycomponent-option1="foo" data-mycomponent-option2="bar" data-mycomponent-option3="baz">My Component</div>
```

```javascript
// my-component.js
const DataOptions = {
    OPTION_1: 'data-mycomponent-option1',
    OPTION_2: 'data-mycomponent-option2',
    OPTION_3: 'data-mycomponent-option3',
};

const component = document.querySelector('.my-component');

const options = getDataOptions(component, DataOptions);

console.log(options);

// Output:

// {
//	OPTION_1: 'foo',
//	OPTION_2: 'bar',
//	OPTION_3: 'baz',
// }
``` 

#### Expander
Click a trigger element to toggle the display of a unique target element.

```javascript
import {expander} from '@springernature/brand-context';

expander(options);
```

```html
<button id="button1" data-expander data-expander-target="#target1">Expander 1</button>
<div id="target1">Target 1</div>
```

For more flexibility you can use the Expander class directly:

```javascript
const trigger = document.querySelector('.my-trigger');
const target = document.querySelector('.my-target');

const myExpander = new Expander(trigger, target, options);

myExpander.init();
``` 

You can also manually open and close any instance of expander with:

```javascript
expander.open();
expander.close();
```

##### Options

| Option             | Default Value | Type    | Description |
|--------------------|---------------|---------|------------------------------------------------------------------------------------------------------------------------------------|
| TARGET_HIDE_CLASS  | 'u-js-hide'   | String  | HTML class to be toggled on the target                                                                                             |
| TRIGGER_OPEN_CLASS | -             | String  | HTML class to be toggled to the trigger                                                                                            |
| TRIGGER_OPEN_LABEL | -             | String  | Text to set on the trigger when open                                                                                               |
| CLOSE_ON_FOCUS_OUT | true          | Boolean | Closes when you click or tab outside of the target                                                                                 |
| AUTOFOCUS          | null          | String  | Moves focus to an element when hitting trigger:                                                                                    |
|                    |               |         |`firstTabbable` will find the first tabbable element inside the target (will highlight text if appropriate, e.g. input with value). |
|                    |               |         |`target` will set focus on target element                                                                                           |
| OPEN_EVENT         | false         | Boolean | Dispatch custom event on trigger once Global Expander has completed it's Open method                                               |
| DEFAULT_OPEN       | false         | Boolean | Set the expander to be open by default                                                                                             |

The data attribute options are the same, but are lowercase and hyphenated (and strings where the option is a boolean):

- `data-expander-target-hide-class`
- `data-expander-trigger-open-class`
- `data-expander-trigger-open-label`
- `data-expander-close-on-focus-out`
- `data-expander-autofocus`
- `data-expander-open-event`
- `data-expander-default-open`

> *Note*: data attribute options will take precedence over any options set during initialisation.

##### Polyfills / Babel plugins required

- [plugin-transform-object-assign](https://babeljs.io/docs/en/babel-plugin-transform-object-assign)

