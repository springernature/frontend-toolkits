# Global Forms

The forms component provides a range of form elements and inputs that allow users to enter information. It also includes error messages. It is designed to make it as simple as possible to create an HTML form.

## When to use this component
Use the forms component when users need to submit information or data. This could be in order to complete a task or as part of a service we provide. For example, when an author needs to enter the title of their manuscript when submitting to a journal.


## How it works
The forms component does not include any JavaScript. States (such as an invalid/error state) are defined at a data level. If you're using client-side processing, you might benefit from compiling the form’s handlebars template in the browser.

- Data structure
- Interdependencies
- Registering partials

## Installation
To use the forms component, enter the following command in your Terminal:

```
npm install @springernature/global-forms
```

Then include the necessary Sass files in your project:

```scss
// Include this with your other components
@import '@springernature/global-forms/scss/50-components/forms';

// Include these with your utilities (if not already there)
@import '@springernature/brand-context/default/scss/60-utilities/buttons.scss';
@import '@springernature/brand-context/default/scss/60-utilities/spacing.scss';
```

Then you will need to register the handlebars partials in the `/view` folder. There are 2 options for rendering form fields: 

1. Compile fields independently, using their respective templates from the `view/fields` folder.
2. Organise your data into arrays of fieldsets and fields and loop over these arrays, assigning the `globalFormFieldset` and `globalFormField` partials respectively.

Here is an example base template implementation:

```html
<form id="my-form" action="/something">
    {{#each myFields}}
        {{> globalFormField}}
    {{/each}}
</form>
```

For this example, you might have 2 simple inputs for a name and password:

```html
"myFields": {
    [
        {
            "template": "globalFormText",
            "label": "Your name",
            "id": "your-name",
            "name": "your-name",
        },
        {
            "template": "globalFormPassword",
            "name": "password",
            "label": "Your password",
            "id": "password"
        }
    ]
}
```


## Fields and fieldsets

### Fields

Form fields are made up of a control (the input) and an associated label. They can also include hints that give extra guidance when filling out a field. 

The `template` property sets the type of field - for example, `"template": "globalFormText"` renders a text input field if that is what you have registered the view/fields/globalFormText.hbs template as. Aim to make the `template, id, label,` and `name` properties mandatory parts of your data schema.

This component supports standard form field attributes. For example, to include a `readonly` attribute on your text input, you can include a property of the same name on the data:

```json
{
    "template": "globalFormText",
    "label": "Your email address",
    "id": "your-email",
    "name": "your-email",
    "readonly": true
}
```

### Fieldsets

Use a fieldset to group related inputs that are itemised under their `fields` property, with a legend to label the fieldset itself.  

![Panel](https://user-images.githubusercontent.com/15365576/209008283-cf253e6c-2ef8-4af1-8751-8a04da67c317.png)

There are 2 ways to add fieldsets to your form:
1. Create a field with the template value of globalFormFieldset and an array of fields using the fields property.
2. Create an array of fieldsets and loop over them, assigning the globalFormFieldset partial.

#### (1) The fieldset field

```json
{
    "template": "globalFormFieldset",
    "legend": "<h1>Login</h1>",
    "fields": [
        ...
    ]
```
    
#### (2) A fieldset array
In this case, each fieldset is an object:

```html
"myFieldsets": [
    {
        "legend": "<h2>One fieldset</h2>",
        "fields": [
            ...
        ]
    },
    {
        "legend": "<h2>Another, different fieldset</h2>",
        "fields": [
            ...
        ]
    }    
]
```

And the accompanying template would include this:

```html
{{#each myFieldsets}}
    {{> globalFormFieldset}}
{{/each}}
```


## Legends

Use HTML to style the legend and add semantic meaning. In most cases, legends should be headings, with the heading level determined by the page structure.

![Legends](https://user-images.githubusercontent.com/15365576/210399801-a3078572-c8cb-4826-93bb-02b2aabb9fbc.png)

```html
"fieldsets": {
    [
        {
            "legend": "<h2>My level 2 legend</h2>",
            "fields": [
                ...
            ]
        }
    ]
}
```

For accessibility, do not use a fieldset without an accompanying legend. If a legend is not appropriate, neither is a fieldset; just use fields without a fieldset parent.

A fieldset can include one or more nested fieldsets. If you are including headings in your fieldsets, be careful to use a heading level that reflects the nesting level. For example, if a fieldset’s legend uses `<h2>`, any child fieldset within it should use `<h3>` or no heading level at all.


## Validation

### Required and optional fields

![Optional fields](https://user-images.githubusercontent.com/15365576/210429547-3736bd66-8676-4336-bfdd-c8e3c57a9932.png)

Avoid asking for information unless you really need it. To support this, form fields are set to `required` by default.

You do not need to mark fields as required. If a user tries to submit the form without filling in a required field, browser validation will show them an error message.

If you need to ask for optional information, set `optional: true`. This will remove `required` and `aria-required="true"` and append the text “(optional)” to the field’s label. 

### Error messages

Error messages inform the user when there’s a problem with the information they’ve provided and how they can fix it.

Error messages are displayed inline, underneath the label and above the input of the relevant field. Error messages are prefixed with a cross icon. This helps to make the error more obvious to users who cannot perceive the red colour. 

![Error messages](https://user-images.githubusercontent.com/15365576/210441442-39bf66c2-f61b-4d7a-b1c8-dd4f3d36465f.png)

Each field can have an `error` property. The inclusion of the property means the field is in an error state. The property value (a string) defines the error message the user sees.

```json
{
    "template": "globalFormText",
    "label": "Full name",
    "id": "full-name",
    "name": "full-name",
    "error": "Enter your name"
}
```

### Error summary

![Error summary](https://user-images.githubusercontent.com/15365576/210442372-8f8547d9-27eb-4425-90f4-f1237bea0e59.png)

Summarise errors using a top level `errorSummary` property. Each error in the errors array must point to the `id` of the input it relates to and repeat its `error` message:

```
"errorSummary": {
    "id": "summary",
    "title": "There is a problem",
    "errors": [
        {
            "id": "full-name-error",
            "error": "Enter your full name"
        },
        {
            "id": "checkbox-terms-error",
            "error": "Agree to the terms to continue"
        }
    ]
}
```
