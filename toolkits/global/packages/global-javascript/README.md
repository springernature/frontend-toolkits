# Global Javascript

Shared Javascript that can be included in your project or component.

## Helpers

A collection of JavaScript helpers to achieve common, repetitive tasks.

### Usage

You can import as many of the named exports from the helpers as you require for your project.

```javascript
    import {helper1, helper2} from '@springernature/global-javascript/helpers';
```

**Util**
- [makeArray](#makearray)
- [createEvent](#createevent)
- [getCookie](#getcookie)
- [getCookie](#debounce)
- [getCookie](#throttle)
- [onetrust](#onetrust)


**Dom**
- [getDataOptions](#getdataoptions)

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


## License

[MIT License][info-license] &copy; 2020, Springer Nature

[info-license]: https://github.com/springernature/frontend-toolkits/blob/master/LICENSE
