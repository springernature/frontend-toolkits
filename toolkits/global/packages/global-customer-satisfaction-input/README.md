# Global Customer Satisfaction Input

The Global Customer Satisfaction Input component is the frontend for an overall solution for gathering customer satisfaction feedback, the documentation for which can be found here: https://customer-satisfaction-survey.public.springernature.app/docs/introduction.

The component comprises a set of 5 pictographic radio inputs used to collect a satisfaction score from our customers. The user is able to submit one of the following scores: Awful, Bad, OK, Good, Great.

It is a JavaScript dependent component. When a user interacts with the component an event is dispatched to `window.dataLayer` allowing customer satisfaction score data and context data scraped from the page to be sent to Google Tag Manager and Google Cloud Big Query. 

## Usage
This documents how to implement this component on your website. If your project does not use Elements you can still use this component, see refer to the `Projects that do not use Elements` section below.
### Install
Install the Global Customer Satisfaction Input package:
```shell
npm install @springernature/global-customer-satisfaction-input
```
You will also need to ensure you have its dependencies installed: Brand Context.

```shell
npm install @springernature/brand-context@32.0.0
```

### Sass
Include the necessary Sass files in your project in this order (if they are not already there!):
```sass
@import '@springernature/brand-context/[YOUR BRAND HERE]/scss/core.scss';
@import '@springernature/brand-context/[YOUR BRAND HERE]/scss/enhanced.scss';
@import '@springernature/global-customer-satisfaction-input/scss/10-settings/default.scss';
@import '@springernature/global-customer-satisfaction-input/scss/50-components/customer-satisfaction-input';
@import '@springernature/brand-context/default/scss/60-utilities/hiding.scss';
```

### JavaScript
Include the component JavaScript in your application bundle:
```js
import {customerSatisfactionInput} from '@springernature/global-customer-satisfaction-input';

customerSatisfactionInput();
```

### HTML
Consume the component's Handlebars view template found in the `/view/` directory

If you are unable to consume view templates in your project you can still use this component. Use the component demo to generate the HTML. This can be done as follows:

1. Edit the JSON data file found at `/demo/context.json` and define the data you need for your instance (see below Data section) 
2. Run `npm run demo -- -p global-customer-satisfaction-input`
3. Copy the `<aside>` and its contents from the generated demo file at `/demo/dist/index.html` and paste it into the relevant location in your project

### Data
An example of the data model needed to render this component can be found at `/demo/context.json`.

#### Configuring the component
The component can be configured using the following data properties:

> **Note**
> Are you going to implement more than one CSAT component on the same page? Please refer to the 'id' data property if so.

**userJourneys** (Mandatory)

A string that represents the user journeys that are associated with the placement of the component.

Currently, only the following values are permissible:
* `get prepared to publish`
* `get published`
* `discover relevant scholarly content`
* `manage my editorial work`
* `manage my peer reviews`
* `promote my work`
* `evaluate the performance of scholarly work`
* `manage an apc`
* `buy something`
* `access what i am entitled to`
* `librarian get the information i need`
* `librarian assess the performance and use of my portfolio`
* `librarian buy something`

> **Note**
> Permissible values are managed in the component's javascript file found at: `/js/customer-satisfaction-input.js`. Please do not edit these without consultation with UXD (Niamh Walsh at the time of writing).

Please refer to our guide on [choosing associated user journeys](https://customer-satisfaction-survey.public.springernature.app/docs/getting-started/choosing-associated-user-journeys).

You may define multiple user journeys separated by commas e.g. `"userJourneys":"get published, content discovery"`. If a non-permissible value is entered an error will be logged to the browser console and data will not be sent to the Big Query database. Case handling has been implemented, ensuring any value is converted to lowercase prior to data being sent to Big Query.

**headingLevel** (Mandatory)

A string that represents the heading level number, e.g. `"headingLevel":"3"`. Please ensure the heading level defined is correct for the placement of the component on the page.

**questionUrl** (Optional)

A string that defines the link href for any survey you wish to link to after a user has submitted a customer satisfaction score, e.g. `"questionUrl": "https://www.surveymonkey.com/r/97W8JW7"`. A link will only display if both questionUrl and questionText have been defined.

**questionText** (Optional)

A string that defines the link text for any survey you wish to link to after a user has submitted a customer satisfaction score, e.g. `"questionText": "Tell us why"`. A link will only display if both questionUrl and questionText have been defined.

**additionalInfo** (Optional)

A string that can be used to define additional data that you would like to be captured with the user's customer satisfaction score. This property aims to future-proof this component to ensure we can capture additional meaning if needed.

**additionalInfo** (Optional)

A string that can be used to define additional data that you would like to be captured with the user's customer satisfaction score. This property aims to future-proof this component to ensure we can capture additional meaning if needed.

**id** (Optional)

Please define a unique value here if you are going to implement more than one CSAT component on the same page. This will ensure there are no duplicate id values in the page HTML.

### Survey Link

Please note that the JavaScript for this component appends data to your survey links as URL parameters, as follows:

**location**

This is the url of the page the user is on.

**responseRating**

This is the rating that the user chose when they submitted the form.

**userJourneys** and **additionalInfo**

These parameters will each be appended only if you set them when using the Handlebars template or the HTML generated by this component. They will contain the values you provide for each.

These data can be used in your reporting system to filter your survey responses. For example, in Survey Monkey you can configure custom variables with your survey so that these can be used in reporting analysis and queries.

### Projects that do not use Elements

If you do not use the Elements design system you are still able to use this component:

1. You can copy the source files from this repository into your project.
or
2. You can generate a component demo using the editing `/demo/context.json` and using the command `npm run demo -- -p global-customer-satisfaction-input`. Then, copy the compiled code from `/demo/dist/index.html` in to your project.

> **Warning**
> These approaches are **not** preferred and should only be used in exceptional circumstances where Elements cannot be used in your application. If you use either of these approaches you **must** ensure you have adequate means of staying up to date with any new version releases for this component. 

