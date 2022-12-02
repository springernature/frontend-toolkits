# Global Customer Satisfaction Input

> **Warning**
> This component is currently [an experimental version](https://github.com/springernature/frontend-elements-docs/blob/main/user-guide/versioning.md#component-state). Please do not use this component on production at this time.

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
You will also need to ensure you have its dependencies installed. These are Brand Context and Global Forms:

> **Warning**
> This component violates [the design system rule](https://github.com/springernature/frontend-elements-docs/blob/main/user-guide/dependencies.md#dependencies) that states a component must not have a dependency on another component. Please do not follow this pattern in any other component you are building.

```shell
npm install @springernature/brand-context@30.0.4
```
```shell
npm install @springernature/global-forms@5.0.0
```

### Sass
Include the necessary Sass files in your project in this order (if they are not already there!):
```sass
@import '@springernature/brand-context/[YOUR BRAND HERE]/scss/core.scss';
@import '@springernature/brand-context/[YOUR BRAND HERE]/scss/enhanced.scss';
@import '@springernature/global-forms/scss/00-tokens/default.tokens.scss';
@import '@springernature/global-customer-satisfaction-input/scss/00-tokens/default.tokens.scss';
@import '@springernature/global-customer-satisfaction-input/scss/30-mixins/customer-satisfaction-input-button';
@import '@springernature/global-forms/scss/50-components/forms';
@import '@springernature/global-customer-satisfaction-input/scss/50-components/customer-satisfaction-input';
@import '@springernature/brand-context/default/scss/60-utilities/hiding.scss';
@import '@springernature/brand-context/default/scss/60-utilities/spacing.scss';
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
A data model is required to render the component's view template. An example of the data model can be seen in the component's demo. This can be found at `/demo/context.json`.

> **Note**
> Some of the data for this component is considered static, should be copied as defined in this document and should **not** be edited. This concerns all data that is passed to the Global Forms component. See below section on Global Forms Data.

#### Configuring the component
The component can be configured using the following data properties:

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

#### Global Forms Data (Mandatory)

This component has a dependency on another component: [Global Forms](https://github.com/springernature/frontend-toolkits/tree/main/toolkits/global/packages/global-forms). See [package.json](https://github.com/springernature/frontend-toolkits/tree/main/toolkits/global/packages/global-customer-satisfaction-input/package.json#L10) which defines the version of Global Forms that this component is dependent on.

The view template for Global Customer Satisfaction Input includes the Global Forms fieldset partial which requires a data model suitable for Global Forms. The data to support the Global Forms partial is considered static data. This can be found in `/demo/context.json` as the JSON object `"globalFormData"` and should be defined with the same names, structure and values in your project. The data is also provided [here in JSON](https://gist.github.com/benjclark/8c77fce1ab83a1c3fd8b9ed21be9f366) for your convenience.

### Projects that do not use Elements

If you do not use the Elements design system you are still able to use this component:

1. You can copy the source files from this repository into your project.
or
2. You can generate a component demo using the editing `/demo/context.json` and using the command `npm run demo -- -p global-customer-satisfaction-input`. Then, copy the compiled code from `/demo/dist/index.html` in to your project.

> **Warning**
> These approaches are **not** preferred and should only be used in exceptional circumstances where Elements cannot be used in your application. If you use either of these approaches you **must** ensure you have adequate means of staying up to date with any new version releases for this component. 

