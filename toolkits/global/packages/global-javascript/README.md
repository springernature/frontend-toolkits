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


**Dom**
- [getDataOptions](#getDataOptions)

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
