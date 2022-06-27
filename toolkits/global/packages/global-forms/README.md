# Global Forms

This component comprises a number of form fields and related templates. It is designed to make constructing any variety of HTML form a relatively straightforward process. The component does not ship with any JavaScript. States (such as an invalid/error state) are defined at a data level. 

## Usage

First, include the necessary Sass files in your project.

```scss
// Include this with your settings
@import '@springernature/global-forms/scss/10-settings/default';

// Include this with your other components
@import '@springernature/global-forms/scss/50-components/forms';
```

Then you will need to register the Handlebars partials in the `/view` folder. Compile the forms templates based on a data structure exemplified by the `/demo/context.json` file. Note that you will have to iterate over the data’s fieldsets, like so:

```
<form>
    {{> errorSummary errorSummary}}
    {{#each fieldsets}}
        {{> fieldset }}
    {{/each}}
</form>
```

### Fieldsets

Fieldsets are used to group fields. If you do not want to include a (visible) fieldset element or `<legend>`, simply omit the `legend` property. The following example represents a simple form body with a single, unlabeled fieldset containing two text inputs:

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

### Common attributes

A wide range of standard input/field attributes are supported. So, for example, if you wanted to include a `readonly` attribute on your text input, you would just include a property on the data of the same name:

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

Errors can be summarized using a top level `errorSummary` property. Each error in the errors array must point to the `id` of the respective input and repeat its `error` message:

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

Sets of radios are implicitly fieldsets, where the _group_ label (“Animal” here) does not render as a `<label>` but a `<legend>`.

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



