## Global Dropdown

This is a generic dropdown component. It is not a `<select>`, but rather a list which is expanded when the user clicks a button.

The component is keyboard navigable.

```
init(dropdownSelector = '[data-dropdown]', itemSelector = '[data-dropdown-item]') 
```
By default the component relies on a data-dropdown and data-dropdown-item HTML attributes. These can be overwritten in the init function.

The first argument is a CSS selector to target the dropdown button. The second argument is a CSS selector to target items inside the list.

## Dependencies
This component relies on classes from the global-css-utilities package. Make sure you import `hiding.scss` and `transforms.scss`. 
   
