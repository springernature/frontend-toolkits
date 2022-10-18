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
```

## Usage
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

#### Global Forms Data (Mandatory)

This component has a dependency on another component: [Global Forms](https://github.com/springernature/frontend-toolkits/tree/main/toolkits/global/packages/global-forms). See [package.json](https://github.com/springernature/frontend-toolkits/tree/main/toolkits/global/packages/global-ratings-survey/package.json#L10) which defines the version of Global Forms that this component is dependent on.

The view template for Global Ratings Survey includes the Global Forms fieldset partial which requires a data model. The data to support the Global Forms partial is considered static data. This can be found in `/demo/context.json` as the JSON object `"globalFormData"` and should be defined with the same name in your project. The data is also provided [here in JSON](https://gist.github.com/benjclark/8c77fce1ab83a1c3fd8b9ed21be9f366) for your convenience.
