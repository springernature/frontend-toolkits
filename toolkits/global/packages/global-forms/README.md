# Global Forms

**IMPORTANT:** _This is a **release candidate** representing an ambitious reworking of the global-forms component, including design tokens integration, at a component level, for the first time. It is expected to need some additional work before a full release can be made. Tokens are generated to the `scss/00-tokens` folder and cannot be edited directly. If you need to temporarily add or override variables, please do this in a `10-settings` folder, one level down. The Elements Design System team will assess these changes for making these variables tokens later._

This component includes a number of form fields and related templates. It is designed to make it as simple as possible to create an HTML form.

The component does not include any JavaScript. States (such as an invalid/error state) are defined at a data level. If you're using client-side processing, you might benefit from compiling the form’s handlebars template in the browser.

## Usage

First, include the necessary Sass files in your project.

```scss
// Include this with your settings
@import '@springernature/global-forms/scss/10-settings/default';

// Include this with your other components
@import '@springernature/global-forms/scss/50-components/forms';

// Include these with your utilities (if not already there)
@import '@springernature/brand-context/default/scss/60-utilities/buttons.scss';
@import '@springernature/brand-context/default/scss/60-utilities/spacing.scss';
```

Then you will need to register the handlebars partials in the `/view` folder. 

There are two options for rendering form fields: 

1. Compile fields independently, using their respective templates from the `view/fields` folder.
2. Organise multiple related fields into fieldsets using the data structure like that shown in `demo/context.json`. For example, a group of fields used to let someone enter their address. In this case, you’ll have to iterate over a `fieldsets` array something like this:

```html
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

Fieldsets are used to group fields itemised under their `fields` property. If you do not want to include a (visible; screen reader identifiable) fieldset element or legend, simply omit the `legend` property. The following example shows a simple form body with a single, unlabelled fieldset containing two text inputs:

```json
"fieldsets": {
    [
        {
            "fields": [
                {
                    "template": "globalFormText",
                    "label": "Your name",
                    "id": "your-name",
                    "name": "your-name"
                },
                {
                    "template": "globalFormText",
                    "label": "Your email",
                    "id": "your-email",
                    "name": "your-email"
                }
            ]
        }
    ]
}
```

If you do wish to include a legend, you can use HTML to style it and add semantic meaning. In most cases, legends should be headings, with the heading level determined by the page structure.

```json
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

### Fields

The `template` property sets the type of field - for example, `"template": "globalFormText"` renders a text input field if that is what you have registered the **view/fields/globalFormText.hbs** template as. Aim to make the `template`, `label`, `id`, and `name` properties mandatory parts of your data schema.

This component supports a wide range of standard form field attributes. For example, to include a `readonly` attribute on your text input, you can include a property of the same name on the data:

```json
{
    "template": "globalFormText",
    "label": "Your email address",
    "id": "your-email",
    "name": "your-email",
    "readonly": true
}
```

The `hint` property adds hint text under the main label text but _inside_ the `<label>`. This means it is automatically available to screen reader software.

```json
"hint": "This will be the email address you used when registering"
```

The `optional` property adds _“(optional)”_ to the label text.

```json
"optional": true
```

In addition to these top-level properties, you can add data properties as a `dataAttrs` array, which can be useful for unit testing.

```json
{
    "template": "globalFormText",
    "label": "Your email address",
    "id": "your-email",
    "name": "your-email",
    "dataAttrs": {
        "test": "someValue"
    }
}
```

This would create the following attribution: `data-test: someValue`.

### Errors

Each field can have an `error` property. The inclusion of the property means the field is in an error state. The property value (a string) defines the error message the user sees.

```json
{
    "template": "globalFormText",
    "label": "Your name",
    "id": "your-name",
    "name": "your-name",
    "error": "Enter your name"
}
```

You can summarise errors using a top level `errorSummary` property adjacent to the `fieldsets` property. Each error in the errors array must point to the `id` of the input it relates to and repeat its `error` message:

```json
"errorSummary": {
    "id": "summary",
    "title": "There are problems",
    "errors": [
        {
            "id": "your-name-error",
            "error": "Enter your name"
        },
        {
            "id": "checkbox-terms-error",
            "error": "Agree to the terms to continue"
        }
    ]
}
```

### Making choices

`Select` fields (using the `<select>` element) define the user’s options with an `options` property, which must be an array. The `selected` property is a Boolean:

```json
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

Radios define choices with an `inputs` array:

```json
{
    "template": "globalFormRadios",
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

The `name` property is placed at the top level and inherited by each input.

Radios are always grouped together in a `fieldset`, so the group label (“Animal”, here) renders as a `legend` not a `label`.

Pictographic radios are also supported and can be enabled by including the property `pictographic: true`:

```json
{
    "legend": "Pictographic Radios",
    "fields": [
        {
            "template": "globalFormRadios",
            "label": "Rating",
            "description": "A scale of 5 feelings conveyed using images that range from terrible to great. The feelings represent how you feel about this page.",
            "id": "radios-rating",
            "name": "radios-rating",
            "pictographic": true,
            "boxed": true,
            "inputs": [...]
        }
    ]
}
```
There are two other properties in the above example that are used to configure pictographic radios: `groupDescription` and `boxed`.

It is strongly recommended that the `groupDescription` property is set when defining a group of pictographic radios to ensure users of assistive technologies are provided with sufficient information to understand the group of radio elements.

The `boxed` property allows for `border` and `padding` to be applied to the pictographic radio's SVG elements. When this setting is enabled the CSS classname `c-forms__label--boxed-icon` is applied to the components HTML to facilitate this.

As with ordinary radio elements, data for each pictographic radio element is defined in the `inputs` array:

```json
"inputs": [
    {
    "label": "Bad",
    "value": "Bad",
    "id": "radio-bad",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"transparent\" stroke=\"currentColor\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\"> <defs> <clipPath id=\"frowna\"> <path d=\"M24 0v24H0V0h24Z\"/> </clipPath> <clipPath id=\"frownb\"> <path d=\"M1 0c.6 0 1 .4 1 1v2a1 1 0 1 1-2 0V1c0-.6.4-1 1-1Z\"/> </clipPath> </defs> <g clip-path=\"url(#frowna)\"> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1.8\" stroke-linejoin=\"round\" d=\"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z\"/> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1.8\" stroke-linejoin=\"round\" d=\"M9 17c1-2.7 5-2.7 6 0\"/> <g clip-path=\"url(#frownb)\" transform=\"translate(8 8)\"> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" stroke-linejoin=\"round\" d=\"M0 0h2v4H0V0z\"/> </g> <g clip-path=\"url(#frownb)\" transform=\"translate(14 8)\"> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" stroke-linejoin=\"round\" d=\"M0 0h2v4H0V0z\"/> </g> </g> </svg>",
    "showLabel":  false,
    "imageDescription": "An image of a cartoon face with a frown."
    
    },
    {
    "label": "OK",
    "value": "OK",
    "id": "radio-ok",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"transparent\" stroke=\"currentColor\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\"> <defs> <clipPath id=\"neutrala\"> <path d=\"M24 0v24H0V0h24Z\"/> </clipPath> <clipPath id=\"neutralb\"> <path d=\"M1 0c.6 0 1 .4 1 1v2a1 1 0 1 1-2 0V1c0-.6.4-1 1-1Z\"/> </clipPath> </defs> <g clip-path=\"url(#neutrala)\"> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1.8\" stroke-linejoin=\"round\" d=\"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z\"/> <g clip-path=\"url(#neutralb)\" transform=\"translate(8 8)\"> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" stroke-linejoin=\"round\" d=\"M0 0h2v4H0V0z\"/> </g> <g clip-path=\"url(#neutralb)\" transform=\"translate(14 8)\"> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" stroke-linejoin=\"round\" d=\"M0 0h2v4H0V0z\"/> </g> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1.8\" stroke-linejoin=\"round\" d=\"M9 16h6\"/> </g> </svg>",
    "showLabel":  false,
    "imageDescription": "An image of a cartoon face with a neutral expression."
    
    }
]
```

However, there are properties in the above example that are unique to pictographic radios: `svg`, `showLabel`, and `imageDescription`.

The images used for pictographic radios must be defined as inline SVG elements using the `svg` property. This property is mandatory and must contain a string defining the inline SVG code. Please note that special characters within the string such as double quotes must be escaped.

The `showLabel` property allows for the `<label>` text to be visually hidden. If you choose to enable this setting for a radio input label please ensure it does not negatively impact the user experience, particularly accessibility.

It is strongly recommended that the `imageDescription` property is set when defining a pictographic radio to ensure users of assistive technologies are provided with sufficient information to understand the meaning of the image that has been used.

The width and height of each SVG can be overridden using the CSS variable `--forms--pictographic-radio-icon-size`. This can be applied to the SVG html in the `style` attribute as follows:

```json
"svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"--forms--pictographic-radio-icon-size: 2rem\" focusable=\"false\" aria-hidden=\"true\" viewBox=\"0 0 24 24\">...</svg>"
```
Unlike radios, which are always used in sets of two or more, you can have a single checkbox field. To give users a set of checkbox choices, organise the checkboxes into a `fieldset`:

```json
{
    "legend": "<h2>Which animals do you like?</h2>",
    "fields": [
        {
            "template": "globalFormCheckbox",
            "label": "Monkeys",
            "id": "checkbox-monkeys",
            "name": "checkbox-monkeys"
        },
        {
            "template": "globalFormCheckbox",
            "label": "Horses",
            "id": "checkbox-horses",
            "name": "checkbox-horses"
        }
    ]
}
```


#### Supplementary fields

You might want to show users an additional field when they select a particular radio or checkbox. For example, revealing a text input field for them to give more specific information about the option they’ve selected.

These fields can have any properties of a standard form field. Set these properties using the `fields` property (an array), like this:

```json
{
    "label": "Monkey",
    "value": "Monkey",
    "name": "animal",
    "fields": [
        {
            "template": "globalFormText",
            "label": "What type of monkey?",
            "id": "monkey-type",
            "name": "monkey-type",
            "hint": "Chimps are not monkeys"
        }
    ]
}
```

### Buttons

A `template` of `buttons` defines a set of button controls, displayed inline (using Flexbox and `gap` for tidy wrapping). 
The `type` property for each individual button corresponds to the `type` HTML attribute. For example, here is how you would include a submit button:

```json
"fields": [
    ...
    {
        "template": "globalFormButtons",
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

The `modifiers` property is an array. Each value should match one of these modifiers from the brand context’s button utility styles:

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

Text input fields can have a `datalist` property, which lets you implement autocomplete. This takes two properties: `id` and `options` (an array):

```json
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

This builds a standard `datalist` field, with `option`s, and associates it with the input. If a `datalist` already exists in the markup, provide just the `id` and forego the `option` property. If you want to use a custom-built autocomplete solution using JavaScript, omit the `datalist` property from the field altogether.
