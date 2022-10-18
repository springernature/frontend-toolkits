# Global Ratings Survey

```text
Component README follows Elements’ template, covering:
- [Description]
- [Demo]
- When to use and when not to use this component
- How it works
- Installation
- Template
- Research on this component
```

## Description
- Designed to be used at multiple points in a journey
- Collects information in a passive way
- Designed to be comparable for data and collect any instances of major errors on our websites continuously
- Designed to be unobtrusive - can be placed any page at any point in a user journey
## When to use this component
- Use this component for the CSAT method
- Used in combination with other survey tools
  - Could be used in combination with an additional survey at the end of a task / exit survey
## When not to use this component
- Do not use this component for NPS. NPS  is a different use-case - not an either or. If you need to use NPS - it should be placed at the end / exit of a task.
## How to use (setup)
Who to contact
The question can be not changed
- Surveymonkey
- Discuss with Ben on the backend
- Research ops?
- Document what we discuss with Roland on how to get setup
- Where it goes on the page (e.g. right hand column may only be used in contexts where the content is very long)

## Usage
In order to use the component the instructions in all of the following sections must be carried out.
### Install
Install the Global Ratings Survey package:
```shell
npm install @springernature/global-ratings-survey
```
You will also need to ensure you have its dependencies installed. These are Brand Context and Global Forms:
```shell
npm install @springernature/brand-context
```
```shell
npm install @springernature/global-forms
```

### Sass
Include the necessary Sass files in your project in this order (if they are not already there!):
```sass
@import '@springernature/brand-context/[YOUR BRAND HERE]/scss/core.scss';
@import '@springernature/brand-context/[YOUR BRAND HERE]/scss/enhanced.scss';
@import '@springernature/global-forms/scss/00-tokens/default.tokens.scss';
@import '@springernature/global-ratings-survey/scss/00-tokens/default.tokens.scss';
@import '@springernature/global-ratings-survey/scss/30-mixins/ratings-survey-button';
@import '@springernature/global-forms/scss/50-components/forms';
@import '@springernature/global-ratings-survey/scss/50-components/ratings-survey';
@import '@springernature/brand-context/default/scss/60-utilities/hiding.scss';
@import '@springernature/brand-context/default/scss/60-utilities/spacing.scss';
```

### JavaScript
Include the component JavaScript in your application bundle:
```js
import {ratingSurveys} from '@springernature/global-ratings-survey';

ratingSurveys();
```

### HTML
Consume the component's Handlebars view template found in the `/view/` directory

If you are unable to consume view templates in your project you can still use this component. Use the component demo to generate the HTML. This can be done as follows:

1. Edit the JSON data file found at `/demo/context.json` and define the data you need for your instance (see below Data section) 
2. Run `npm run demo -- -p global-ratings-survey`
3. Copy the `<aside>` and its contents from the generated demo file at `/demo/dist/index.html` and paste it into the relevant location in your project

### Data
A data model is required to render the component's view template. An example of the data model can be seen in the component's demo. This can be found at `/demo/context.json`.

> **Note**
> Some of the data for this component is considered static, should be copied as defined in this document and should **not** be edited. This concerns all data that is passed to the Global Forms component. See below section on Global Forms Data.

#### Configuring the component
The component can be configured using the following data properties:

**userJourneys** (Mandatory)

A string that represents the user journeys that are associated with the placement of the component.

Currently, only the following values are permissible:
- get published
- content discovery

You may define multiple user journeys separated by commas e.g. `"userJourneys":"get published, content discovery"`. If a non-permissible value is entered an error will be logged to the browser console and data will not be sent to the Big Query database. Case handling has been implemented, ensuring any value is converted to lowercase prior to data being sent to Big Query.

**headingLevel** (Mandatory)

A string that represents the heading level number, e.g. `"headingLevel":"3"`. Please ensure the heading level defined is correct for the placement of the component on the page.

**questionUrl** (Optional)

A string that defines the link href for any survey you wish to link to after a user has submitted a rating, e.g. `"questionUrl": "https://www.surveymonkey.com/r/97W8JW7"`. A link will only display if both questionUrl and questionText have been defined.

**questionText** (Optional)

A string that defines the link text for any survey you wish to link to after a user has submitted a rating, e.g. `"questionText": "Tell us why"`. A link will only display if both questionUrl and questionText have been defined.

#### Global Forms Data

This component has a dependency on another component: [Global Forms](https://github.com/springernature/frontend-toolkits/tree/main/toolkits/global/packages/global-forms). See [`package.json`](https://github.com/springernature/frontend-toolkits/tree/main/toolkits/global/packages/global-ratings-survey/package.json#L10) which defines the version of Global Forms that this component is dependent on.

The view template for Global Ratings Survey includes the Global Forms fieldset partial which requires a data model. The data to support the Global Forms partial is considered static data. This can be found in `/demo/context.json` as the JSON object `"globalFormData"` and should be defined with the same name in your project. The data is also provided here in JSON, below, for your convenience:

```json
"globalFormData": {
			"fields": [
				{
					"template": "globalFormRadios",
					"error": "Please select one rating",
					"label": "Rating",
					"groupDescription": "A scale of 5 feelings conveyed using images that range from awful to great. The feelings represent how you feel about your experience today.",
					"id": "ratings-survey-radios1",
					"name": "ratings-survey-radios",
					"pictographic": true,
					"boxed": true,
					"inputs": [
						{
							"label": "Awful",
							"value": "1",
							"id": "radio-awful1",
							"svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"transparent\" stroke=\"currentColor\" aria-hidden=\"true\" focusable=\"false\"> <clipPath id=\"a\"> <path d=\"M24 0v24H0V0z\"></path> </clipPath> <g stroke-width=\"1.8\" clip-path=\"url(#a)\"> <path d=\"M12 22c5.5228475 0 10-4.4771525 10-10S17.5228475 2 12 2 2 6.4771525 2 12s4.4771525 10 10 10z\" stroke-miterlimit=\"10\"></path> <g stroke-linecap=\"round\"> <path d=\"M8 17c.5-5.33333333 7.5-5.33333333 8 0z\" stroke-linejoin=\"round\"></path> <path d=\"m9 9-2 1M17 10l-2-1\" stroke-miterlimit=\"10\"></path> </g> </g></svg>",
							"showLabel": true,
							"imageDescription": "An image of a cartoon face that is very unhappy.",
							"dataAttrs": {
								"ratings-survey": "radio"
							}
						},
						{
							"label": "Bad",
							"value": "2",
							"id": "radio-bad1",
							"svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"transparent\" stroke=\"currentColor\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\"> <defs> <clipPath id=\"frowna\"> <path d=\"M24 0v24H0V0h24Z\"/> </clipPath> <clipPath id=\"frownb\"> <path d=\"M1 0c.6 0 1 .4 1 1v2a1 1 0 1 1-2 0V1c0-.6.4-1 1-1Z\"/> </clipPath> </defs> <g clip-path=\"url(#frowna)\"> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1.8\" stroke-linejoin=\"round\" d=\"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z\"/> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1.8\" stroke-linejoin=\"round\" d=\"M9 17c1-2.7 5-2.7 6 0\"/> <g clip-path=\"url(#frownb)\" transform=\"translate(8 8)\"> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" stroke-linejoin=\"round\" d=\"M0 0h2v4H0V0z\"/> </g> <g clip-path=\"url(#frownb)\" transform=\"translate(14 8)\"> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" stroke-linejoin=\"round\" d=\"M0 0h2v4H0V0z\"/> </g> </g> </svg>",
							"showLabel":  true,
							"imageDescription": "An image of a cartoon face with a frown.",
							"dataAttrs": {
								"ratings-survey": "radio"
							}
						},
						{
							"label": "OK",
							"value": "3",
							"id": "radio-ok1",
							"svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"transparent\" stroke=\"currentColor\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\"> <defs> <clipPath id=\"neutrala\"> <path d=\"M24 0v24H0V0h24Z\"/> </clipPath> <clipPath id=\"neutralb\"> <path d=\"M1 0c.6 0 1 .4 1 1v2a1 1 0 1 1-2 0V1c0-.6.4-1 1-1Z\"/> </clipPath> </defs> <g clip-path=\"url(#neutrala)\"> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1.8\" stroke-linejoin=\"round\" d=\"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z\"/> <g clip-path=\"url(#neutralb)\" transform=\"translate(8 8)\"> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" stroke-linejoin=\"round\" d=\"M0 0h2v4H0V0z\"/> </g> <g clip-path=\"url(#neutralb)\" transform=\"translate(14 8)\"> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" stroke-linejoin=\"round\" d=\"M0 0h2v4H0V0z\"/> </g> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1.8\" stroke-linejoin=\"round\" d=\"M9 16h6\"/> </g> </svg>",
							"showLabel":  true,
							"imageDescription": "An image of a cartoon face with a neutral expression.",
							"dataAttrs": {
								"ratings-survey": "radio"
							}
						},
						{
							"label": "Good",
							"value": "4",
							"id": "radio-good1",
							"svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"transparent\" stroke=\"currentColor\"  aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\"> <defs> <clipPath id=\"smilea\"> <path d=\"M24 0v24H0V0h24Z\"/> </clipPath> <clipPath id=\"smileb\"> <path d=\"M1 0c.6 0 1 .4 1 1v2a1 1 0 1 1-2 0V1c0-.6.4-1 1-1Z\"/> </clipPath> </defs> <g clip-path=\"url(#smilea)\"> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1.8\" stroke-linejoin=\"round\" d=\"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z\"/> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1.8\" stroke-linejoin=\"round\" d=\"M9 15c1 2.7 5 2.7 6 0\"/> <g clip-path=\"url(#smileb)\" transform=\"translate(8 8)\"> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" stroke-linejoin=\"round\" d=\"M0 0h2v4H0V0z\"/> </g> <g clip-path=\"url(#smileb)\" transform=\"translate(14 8)\"> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\" stroke-linejoin=\"round\" d=\"M0 0h2v4H0V0z\"/> </g> </g> </svg>",
							"showLabel":  true,
							"imageDescription": "An image of a cartoon face with a smile.",
							"dataAttrs": {
								"ratings-survey": "radio"
							}
						},
						{
							"label": "Great",
							"value": "5",
							"id": "radio-great1",
							"svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"transparent\" stroke=\"currentColor\" aria-hidden=\"true\" focusable=\"false\" viewBox=\"0 0 24 24\"> <defs> <clipPath id=\"grina\"> <path d=\"M24 0v24H0V0h24Z\"/> </clipPath> </defs> <g clip-path=\"url(#grina)\"> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1.8\" stroke-linejoin=\"round\" d=\"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z\"/> <path stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1.8\" stroke-linejoin=\"round\" d=\"M17.5 10v-.5a1.7 1.7 0 0 0-3.5 0v.5M10 10v-.5a1.7 1.7 0 0 0-3.5 0v.5M8 14c.5 5 7.5 5 8 0H8Z\"/> </g> </svg>",
							"showLabel":  true,
							"imageDescription": "An image of a cartoon face with an open mouth grin.",
							"dataAttrs": {
								"ratings-survey": "radio"
							}
						}
					]
				}
			]
		}
```

## Template
