# Design Tokens

## What Are Design Tokens


> Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development.
>
> Salesforce, Lightning Design System

The Design Tokens are generated from several `.json` files which are (currently) compiled into various Sass files are needed.
## Running The Design Tokens Workflow

Make sure you are in the `design-tokens` directory. You will then need to make sure all dependencies are installed.

```bash
npm install
```

There are three levels of Design Tokens:

- `literal`: The base set of tokens that are used to build the rest of the tokens.
- `alias`: The set of tokens that are used to build the rest of the tokens.
- `component`: The set of tokens that are used to build the rest of the tokens.

..


To get this up and running you will need to be in the root of this repo and have ran `npm install`.

### Generate Design Tokens

To generate the tokens run `npm run tokens:generate`.

This will run the `tokens:clean` script and then take the `.json` files in the `design-tokens` folder and generate the relevant `.scss` files in a folder called `00-tokens` in the `brand-context` folder. It will also generate an `index.scss` file based on the created files inside the `00-tokens` folders.

### Clearning Generated Design Tokens

To clean the generated design tokens `.scss` files that are created in the `00-tokens` folder you can run `npm run tokens:clean`. This will remove the `00-tokens` folder and its contents. This script is part of the `npm run tokens:generate` script.



---
## Sketch File

Literal and Alias Design Tokens taken from here - https://www.sketch.com/s/fa9c2fc9-a179-43f0-b21e-9562c9c17c0c/a/g0ZP71z
