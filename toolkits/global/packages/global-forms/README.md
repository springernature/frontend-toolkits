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
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\" viewBox=\"0 0 100 100\"><defs><clipPath id=\"abad\"><path d=\"M100 0v100H0V0h100Z\"/></clipPath><clipPath id=\"bbad\"><path d=\"M28.2335497 12.4737512c-2.462845.7430998-4.1188959.8917197-5.3503184-2.3779194-1.3163482-3.48195324-4.670913-5.1380042-8.5138005-5.22292989-3.9278131-.10615711-7.15498934 1.29511677-9.23566875 4.73460722-.59447983.95541397-.91295117 2.03821657-1.35881104 3.09978767H.08068349C-.72611056 6.42279575 4.6029765.9875516 12.2462886.11706327c8.343949-.97664544 15.2016985 4.2462845 15.9872611 12.35668793Z\"/></clipPath><clipPath id=\"cbad\"><path d=\"M6.47737208 0c3.50318471 0 6.70912952 3.33333333 6.60297242 6.87898089-.0849257 3.39702761-3.22717624 6.47558391-6.60297242 6.47558391-3.60934182 0-6.56050955-3.1210192-6.47558386-6.85774951C.06548248 2.92993631 2.99541879 0 6.47737208 0Z\"/></clipPath><clipPath id=\"dbad\"><path d=\"M13.0851396 6.3500091c.1698514 3.7367304-2.717622 6.9002123-6.3481953 6.985138-3.35456475.0849257-6.58174097-2.9511677-6.73036093-6.3269639C-.16326801 3.48376706 2.97898252.08673946 6.48216723.00181377c3.43949045-.08492569 6.47558387 2.8237792 6.60297237 6.34819533Z\"/></clipPath><clipPath id=\"ebad\"><path d=\"M50 0c27.6220807 0 50 22.3991507 50 50s-22.3779193 50-50 50S0 77.6008493 0 50 22.3779193 0 50 0Zm0 4.01273885C24.6072187 4.01273885 4.01273885 24.6072187 4.01273885 50 4.01273885 75.3927813 24.6072187 95.9872611 50 95.9872611c25.3927813 0 45.9872611-20.5944798 45.9872611-45.9872611S75.3927813 4.01273885 50 4.01273885Z\"/></clipPath></defs><g clip-path=\"url(#abad)\"><g clip-path=\"url(#bbad)\" transform=\"translate(35.35456067 60.26510234)\"><path d=\"M0 0h28.2335497v12.9146358H0V0z\"/></g><g clip-path=\"url(#cbad)\" transform=\"translate(15.8580844 37.2611465)\"><path d=\"M0 0h13.0829089v13.3545648H0V0z\"/></g><g clip-path=\"url(#dbad)\" transform=\"translate(69.90849094 37.25933272)\"><path d=\"M0 0h13.0922672v13.3368874H0V0z\"/></g><g clip-path=\"url(#ebad)\"><path d=\"M0 0h100v100H0V0z\"/></g></g></svg>",
    "showLabel": false,
    "imageDescription": "An image of a cartoon face with a sad expression."
  },
  {
    "label": "OK",
    "value": "OK",
    "id": "radio-ok",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\" viewBox=\"0 0 100 100\"><defs><clipPath id=\"aneutral\"><path d=\"M100 0v100H0V0h100Z\"/></clipPath><clipPath id=\"bneutral\"><path d=\"M25.626327 0v4.52229299H0V0h25.626327Z\"/></clipPath><clipPath id=\"cneutral\"><path d=\"M14.8407643 0v4.16135881H0V0h14.8407643Z\"/></clipPath><clipPath id=\"dneutral\"><path d=\"M14.7983015 0c.0849257 1.48619958.1486199 2.80254777.2547771 4.64968153H0V0h14.7983015Z\"/></clipPath><clipPath id=\"eneutral\"><path d=\"M50 0c27.6220807 0 50 22.3991507 50 50s-22.3779193 50-50 50S0 77.6008493 0 50 22.3779193 0 50 0Zm0 4.01273885C24.6072187 4.01273885 4.01273885 24.6072187 4.01273885 50 4.01273885 75.3927813 24.6072187 95.9872611 50 95.9872611c25.3927813 0 45.9872611-20.5944798 45.9872611-45.9872611S75.3927813 4.01273885 50 4.01273885Z\"/></clipPath></defs><g clip-path=\"url(#aneutral)\"><g clip-path=\"url(#bneutral)\" transform=\"translate(37.32484076 67.40976645)\"><path d=\"M0 0h25.626327v4.52229299H0V0z\"/></g><g clip-path=\"url(#cneutral)\" transform=\"translate(69.70276008 42.88747346)\"><path d=\"M0 0h14.8407643v4.16135881H0V0z\"/></g><g clip-path=\"url(#dneutral)\" transform=\"translate(15.45647558 42.6326964)\"><path d=\"M0 0h15.0530786v4.64968153H0V0z\"/></g><g clip-path=\"url(#eneutral)\"><path d=\"M0 0h100v100H0V0z\"/></g></g></svg>",
    "showLabel": false,
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
"svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"--forms--pictographic-radio-icon-size: 2rem\" focusable=\"false\" aria-hidden=\"true\" viewBox=\"0 0 100 100\">...</svg>"
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
