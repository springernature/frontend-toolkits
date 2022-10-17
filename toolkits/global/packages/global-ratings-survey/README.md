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
Add the component HTML to your project by consuming and rendering the component's view template. It is assumed your project is able to consume the component's Handlebars view template found in the `/view/` directory.

If you are unable to consume view templates in your project you can still use this component. You can use the component demo to generate the HTML that you need. The following process is suggested to generate your HTML:

1. Edit the JSON data file found at `/demo/context.json` and define the data you need for your instance (see below Data section) 
2. Run `npm run demo -- -p global-ratings-survey`
3. Copy the `<aside>` and its contents from the generated demo file at `/demo/dist/index.html` and paste it into the relevant location in your project

### Data
The component's view template requires a data model to be passed to it. An example of the data model can be seen in the component's demo. This can be found in `/demo/context.json`.

> **Note**
> Some of the data for this component is considered static and should **not** be edited. This concerns all of the data that is passed to the Global Forms component. 

#### Editable data properties
The following data properties exist for the component:



## Template
