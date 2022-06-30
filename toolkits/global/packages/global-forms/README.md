# Global Forms

This component comprises a number of form fields and related templates. It is designed to make constructing any variety of HTML form a relatively straightforward process. 

The component does not ship with any JavaScript. States (such as an invalid/error state) are defined at a data level. Implementations using client-side processing/validation may benefit from compiling the form’s (handlebars) template in the browser.

## Usage

First, include the necessary Sass files in your project.

```scss
// Include this with your settings
@import '@springernature/global-forms/scss/10-settings/default';

// Include this with your other components
@import '@springernature/global-forms/scss/50-components/forms';
```

Then you will need to register the Handlebars partials in the `/view` folder. 

There are two options for rendering form fields: 

1. Compile each field independently, using its respective template from the `view/fields` folder.
2. Organize your fields into fieldsets using the data structure exemplified in `demo/context.json`. In this case, you will have to iterate over a `fieldsets` property something like this:

```
<form action="some/url">
    {{#with myFormData}}
		{{#with errorSummary}}
			{{> errorSummary }}
		{{/with}}
		{{#each fieldsets}}
			{{> fieldset }}
		{{/each}}
    {{/with}}
</form>
```

### Fieldsets

Fieldsets are used to group fields itemized under their `fields` property. If you do not want to include a (visible; screen reader identifiable) fieldset element or `<legend>`, simply omit the `legend` property. The following example represents a simple form body with a single, unlabeled fieldset containing two text inputs:

```
"fieldsets": {
    [
        {
            "fields": [
                {
                    "type": "text",
                    "label": "Your name",
                    "id": "your-name",
                    "name": "your-name"
                },
                {
                    "type": "text",
                    "label": "Your email",
                    "id": "your-email",
                    "name": "your-email"
                }
            ]
        }
    ]
}
```

Where you do wish to include a legend, HTML is permissable, meaning you can include a heading to reinforce the form and page structure:

```
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

(**Note:** it is valid and conforming to use heading elements inside `<legend>`s.)

### Fields

Fields take the `type` property to determine which of the `view/fields` they represent. This property along with `label`, `id`, and `name` should be mandatory in terms of your model.

A wide range of standard input/field attributes are supported. So, for example, if you wanted to include a `readonly` attribute on your text input, you would just include a property of the same name on the data:

```
{
    "type": "text",
    "label": "Your email",
    "id": "your-email",
    "name": "your-email",
    "readonly": true
}
```

The `hint` property includes supplementary text under the main `<label>` text but _inside_ the `<label>`, meaning it is automatically available to screen reader software.

```
"hint": "This will be the email you signed up using"
```

The `optional` property affects the field’s label, appending _“(optional)”_ to the label text.

```
"optional": true
```

### Errors

Each field can have an `error` property. The presence of the property indicates the field is in an error state and the property value (a string) defines the error message.

```
{
    "type": "text",
    "label": "Your name",
    "id": "your-name",
    "name": "your-name",
    "error": "That is not a name, it’s a number"
}
```

Errors can be summarized using a top level `errorSummary` property (adjacent to the `fieldset` property). Each error in the errors array must point to the `id` of the respective input and repeat its `error` message:

```
"errorSummary": {
    "id": "summary",
    "title": "Here’s what’s wrong",
    "errors": [
        {
            "id": "your-name-error",
            "error": "That is not a name, it’s a number"
        },
        {
            "id": "checkbox-terms-error",
            "error": "You must agree to the terms!"
        }
    ]
}
```

### Multiple choices

Select elements supply their choices via an `options` property, which must be an array. The `selected` property is a Boolean:

```
"options": [
    {
        "label": "Horse",
        "value": "Horse"
    },
    {
        "label": "Platypus",
        "value": "Platypus",
        "selected": true
    }
]
```

Radios provide _their_ choices via an `inputs` array:

```
{
    "type": "radios",
    "label": "Animal",
    "inputs": [
        {
            "label": "Horse",
            "value": "Horse",
            "name": "animal"
        },
        {
            "label": "Monkey",
            "value": "Monkey",
            "name": "animal"
        }
    ]
}
```

(**Note:** the `name` property is placed at the top level and inherited by each input.)

Sets of radios are implicitly fieldsets, where the _group_ label (“Animal” here) does not render as a `<label>` but as a `<legend>`.

Note that checked radios can be used to disclose additional fields. These are supplied via the `fields` property (an array). These fields can have any properties of a standard field.

```
{
    "label": "Monkey",
    "value": "Monkey",
    "name": "animal",
    "fields": [
        {
            "type": "text",
            "label": "What type of monkey?",
            "id": "monkey-type",
            "name": "monkey-type",
            "hint": "Chimps are not monkeys"
        }
    ]
}
```

Unlike radios, you can have a single checkbox field. If you want to supply a _set_ of checkbox choices, organize individual checkboxes into a fieldset:

```
{
    "legend": "<h2>Which animals do you like?</h2>",
    "fields": [
        {
            "type": "checkbox",
            "label": "Monkeys",
            "id": "checkbox-monkeys",
            "name": "checkbox-monkeys"
        },
        {
            "type": "checkbox",
            "label": "Horses",
            "id": "checkbox-horses",
            "name": "checkbox-horses"
        }
    ]
}
```

### Buttons

A field of `type` `buttons` defines a set of button controls, displayed inline (using Flexbox and `gap` for tidy wrapping). 
The `type` property for each _individual_ button corresponds to the standard `type` property. For example, here is how you would include a submit button:

```
"fields": [
    ...
    {
        "type": "buttons",
        "buttons": [
            {
                "type": "submit",
                "label": "Submit",
                "modifiers": ["primary"]
            }
        ]
    }
]
```

The `modifiers` property is an array. Each value should match one of these modifiers form the brand context:

* primary
* secondary
* tertiary
* contrast
* ghost
* xsmall
* small
* large
* full-width

### Datalist

The text field/partial can have a `datalist` property, allowing you to implement type ahead. This takes two properties: `id` and `options` (an array):

```
"datalist": {
    "id": "my-datalist",
    "options": [
        "monkey",
        "horse",
        "emu",
        "platypus",
        "cockroach",
        "whale"
    ]
}
```

This builds a standard `<datalist>` element—with `<option>`s—and associates it with the input. If a `<datalist>` already exists in the markup, provide just the `id` and forego the `options` property. If you wish to implement a bespoke type ahead solution, using JavaScript, omit the `datalist` property from the field altogether.
