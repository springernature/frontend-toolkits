# Design Tokens

## What are design tokens?

> Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development.
>
> Salesforce, Lightning Design System
## The design tokens workflow

Make sure that: 

- you are in the `design-tokens` directory
- you are using the correct version of node (`12.0.0`) 
- all dependencies are installed

```bash
nvm use
```

```bash
npm install
```
### Design tokens npm scripts

There are several npm scripts available that can be run to generate the design tokens.

#### Deleting existing design tokens
To delete all of the generated `scss` files in the `00-tokens` folder from the Elements components and the components, run:
```bash
npm run tokens:clean-all
```
To delete all of the generated `scss` files in the `00-tokens` folder from the theme brand context folders, run:
```bash
npm run tokens:clean-context
```
To delete all of the generated `scss` files in the `00-tokens` folder from the default themes brand context folder, run:
```bash
npm run tokens:clean-default
```
To delete all of the generated `scss` files in the `00-tokens` folder from the Nature themes brand context folder, run:
```bash
npm run tokens:clean-nature
```
To delete all of the generated `scss` files in the `00-tokens` folder from the Springer themes brand context folder, run:
```bash
npm run tokens:clean-springer
```
To delete all of the generated `scss` files in the `00-tokens` folder from the Springer Nature themes brand context folder, run:
```bash
npm run tokens:clean-springe-rnature
```
To delete all of the generated `scss` files in the `00-tokens` folder from the all of the components, run:
```bash
npm run tokens:clean-components
```
#### Compiling design tokens for general styling

To generate the relevant `scss` files for the Elements components from the literal design tokens, run:
```bash
npm run tokens:compile-literal
```
To generate the relevant `scss` files for the Elements components from the alias design tokens, run:
```bash
npm run tokens:compile-alias
```
When these are run you may need to delete or rebuild the `index.scss` file that `@import`s all of the `scss` files in the folder. This is because the `index.scss` file is not automatically updated when the `scss` files are generated.

To delete any existing `index.scss` files, run:
```bash
npm run tokens:delete-index
```
To generate new `index.scss` files, run:
```bash
npm run tokens:build-index
```
#### Compiling design tokens for the Elements components

To generate the all `scss` files for Elements components from the design tokens, run:
```bash
npm run tokens:brand-components
```
To generate the all `scss` files for the Elements components from the design tokens, run:
```bash
npm run tokens:components
```
note: this will override any and all existing `scss` files for the components.

To generate the `scss` file for a specific component for a specific brand from the design tokens, run:
```bash
npm run tokens:component -- component-name theme
```
#### Generating design tokens documentation `json` files (experimental)

To generate the `json` files for the design tokens documentation for the Elements Design System, run:
```bash
npm run tokens:docs
```
#### Generating design tokens `json` for the Figma tokens plugin (experimental)
If you're using Figma, you can use a plugin that pulls in the `json` files created in this script. This keeps design tokens in Figma in sync with the HTML code that will be built using them. At this point the Figma script is a proof of concept.


To generate the `json` files for the figma-tokens plugin for Figma, run:
```bash
npm run tokens:figma
```

#### Generating CSS utility classes (experimental)
This currently only generates utility classes for spacing.


To generate the CSS utility classes from the design tokens, run:
```bash
npm run tokens:utilities
```
## Design tokens schema

The design tokens are defined in a `.json` file. The design tokens `json` is a set of nested json objects. The main `json` object (`aspect-ratio` in the above example) is the logical group of design properties. The first array of objects (`1x1` in the above example) is the name of the design property. Inside this object is the definition of the design property with all its necessary information, as described below:
### Design tokens object

- **name:** The name of the design token
- **value:** The value of the design token
- **description:** A description of the design token
- **type:** The type of the design token
- **category:** The category of the design token
- **themeable:** Whether the design token is themeable or not.
- **meta:**
  - **brand:** if the token is for a specific brand (springer, nature, springernature). If it’s a default theme, this can be omitted.
  - **public:** means that the design token will be generated by SD
  - **deprecated:** means if it’s deprecated there would be a message pointing to new value
  - **documented:** means that the design token will show up in the tokens documentation
  - **rxperimental:** if the token is part of a trial, user research, and subject to change.
  - **SassVariable:** A Sass variable is generated by SD and the value is shown in the documentation
  - **CSSCustomProperty:** A CSS Custom Property is generated by SD and the value is shown in the documentation.
  - **UtilityClass** A CSS utility class is generated by Style Dictionary.

#### Example

```json
{
    "aspect-ratio": {
        "1x1": {
            "name": "1x1",
            "value": "1",
            "description": "This is to make an item square",
            "type": "ratio",
            "category": "aspect-ratio",
            "themeable": false,
            "meta": {
                "public": true,
                "deprecated": false,
                "documented": true,
                "experimental": false,
                "SassVariable": true,
                "CSSCustomProperty": false
            }
        }
    }
}
```
## Design token tiers

There are three tiers of design tokens:

- `literal`: The base set of tokens that are used to build utility classes and inform the alias and component design tokens.
- `alias`: The set of design decisions as design tokens that are used to build the component design tokens.
- `component`: The set of tokens that are to generate the component specific `scss` files.

### Literal design tokens
These are the ‘locked’ tokens, that hold a value that should not change. Literal design tokens are defined in the `tokens/literal` folder. The literal design tokens are used to create alias design tokens.

### Alias design tokens
These are the ‘unlocked’ tokens, that hold a value that can change. Alias design tokens are defined in the `tokens/alias` folder. The alias design tokens are used to create the component design tokens.

### Component design tokens
These are the ‘unlocked’ tokens, that hold a value that can change. Component design tokens are defined in the `tokens/components` folder. The component design tokens are used to create a component specific set of Sass variables in a `scss` file in the components folder.
## Naming design tokens

With three tiers of Design Tokens, there are three naming conventions for the design tokens. These naming conventions include all possible options for the name but they do not all need to be used. The resulting value of the design token determine which options are used.

The naming convention for the Design Tokens is as follows:
### Literal design tokens
The literal tokens are named using the following convention:

`<category>-<property>-<value>`

Where:
- `<category>` is the category of the token (eg: spacing).
- `<property>` is the property of the token (eg: color).
- `<value>` is the value of the token (eg: 2rem).

The `<category>`, `<property>` and `<value>` are separated by a hyphen (`-`). Depending on the design property you may use either `<category>` or `<property>` or both.

For example, the `color` design property does not have a `<category>` and only has a `<property>` of `color`. The `spacing` design property uses a `<category>` of `spacing` and has no `<property`>.
### Alias design tokens
The alias tokens are named using the following convention:

`<property>-<category>-<priority>-<type>-<value>`

Where:
- `<property>` is the property of the token (eg: color).
- `<category>` is the category of the token (eg: spacing).
- `<priority>` is the priority of the token (eg: primary).
- `<type>` is the type of the token (eg: solid).
- `<value>` is the value of the token (eg: 2rem).
### Component design tokens
The component tokens are named using the following convention:

`<component>-<property>-<category>-<priority>-<type>-<state>-<validation>-<value>`

Where:
- `<component>` is the component of the token (eg: button).
- `<property>` is the property of the token (eg: color).
- `<category>` is the category of the token (eg: spacing).
- `<priority>` is the priority of the token (eg: primary).
- `<type>` is the type of the token (eg: solid).
- `<state>` is the state of the token (eg: hover).
- `<validation>` is the validation of the token (eg: valid).
- `<value>` is the value of the token (eg: 2rem).


---
## Sketch File

Literal and Alias Design Tokens taken from here - https://www.sketch.com/s/fa9c2fc9-a179-43f0-b21e-9562c9c17c0c/a/g0ZP71z
