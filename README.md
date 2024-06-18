# HybridForms DevTools

Welcome to HybridForms DevTools, your comprehensive toolkit for creating, managing, and deploying HybridForms templates with ease and efficiency. 

## Table of Contents

- [HybridForms DevTools](#hybridforms-devtools)
  - [Table of Contents](#table-of-contents)
  - [Formatter](#formatter)
    - [Installation](#installation)
      - [Default Formatter](#default-formatter)
  - [Snippets](#snippets)
    - [Usage](#usage)
      - [hf-combobox](#hf-combobox)
      - [hf-js](#hf-js)
    - [Pro Tip](#pro-tip)
      - [HTML Snippets](#html-snippets)
        - [Block Snippets](#block-snippets)
        - [FormControl Snippets](#formcontrol-snippets)
        - [Attribute Snippets](#attribute-snippets)
      - [Stages Snippets](#stages-snippets)
      - [TypeScript Snippets](#typescript-snippets)
      - [JavaScript Snippets](#javascript-snippets)
      - [Extended Snippets](#extended-snippets)
  - [Contribute](#contribute)
  - [License](#license)

## Formatter 

It is an opinionated code formatter for HybridForms template files. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

### Installation

Install through VS Code extensions. Search for `HybridForms HybridForms DevTools`.

[Visual Studio Code Market Place: HybridForms HybridForms DevTools](https://marketplace.visualstudio.com/items?itemName=icomedias.hfdevtools)

Can also be installed in VS Code: Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

```
ext install icomedias.hfdevtools
```

#### Default Formatter

To ensure that this extension is used over other extensions you may have installed, be sure to set it as the default formatter in your VS Code settings. This setting can be set for all languages or by a specific language.

```json
{
  "[html]": {
    "editor.defaultFormatter": "icomedias.hfdevtools"
  }
}
```

## Snippets

HTML and JavaScript/TypeScript snippets for HybridForms template developemnt.

All code snippets are based on and follow the official TemplateReferenceGuide and JavaScriptGuidance

### Usage

All snippets starts with "hf-". Type part of a snippet, press enter, and the snippet unfolds.

#### hf-combobox

![hf-combobox](images/hf-combobox.gif)

#### hf-js

![hf-js](images/hf-js.gif)

### Pro Tip

You don't need to type any dashes: "hfcustomcontrol" -> "hf-customcontrol" snippet

#### HTML Snippets

##### Block Snippets

| Snippet            | Description                                      |
| ------------------ | ------------------------------------------------ |
| hf-block           | Creates an empty block container                 |
| hf-condition       | Creates a block, area, tab, condition definition |
| hf-pagetemplate    | Creates a Page template                          |
| hf-tabtemplate     | Creates a Tab template                           |
| hf-fullwidth-block | Creates a FullWidth block definition             |
| hf-observefield    | Creates a ObserveField element                   |
| hf-dateformater    | Creates a DateFormater element                   |
| hf-textcontent     | Creates a text content element                   |

##### FormControl Snippets

| Snippet                    | Description                           |
| -------------------------- | ------------------------------------- |
| hf-buttoncontrol           | Creates a ButtonControl               |
| hf-checkbox                | Creates a Checkbox                    |
| hf-combobox                | Creates a Combobox input field        |
| hf-datacontrol             | Creates a DataControl field           |
| hf-datepicker              | Creates a Datepicker input field      |
| hf-drawingcontrol          | Creates a Drawingcontrol input field  |
| hf-dropdownlist            | Creates a DropDownList input field    |
| hf-htmlcontainer           | Creates a HtmlContainer input element |
| hf-inkcontrol              | Creates a Inkcontrol input field      |
| hf-label                   | Creates a Label                       |
| hf-mailbutton              | Creates a Mail Button                 |
| hf-mapbutton               | Creates a Map Button                  |
| hf-numericfield            | Creates a NumericField input field    |
| hf-phonebutton             | Creates a Phone Button                |
| hf-picturepicker           | Creates a Picture Picker              |
| hf-radiobox                | Creates a RadioBox input field        |
| hf-reversegeolocatorbutton | Creates a Reverse Geolocator Button   |
| hf-selectbox               | Creates a Selectbox                   |
| hf-signature               | Creates a Signature input field       |
| hf-textfield               | Creates a Text input field            |
| hf-textfield-tel           | Creates a Tel number input field      |
| hf-textarea                | Creates a textarea                    |
| hf-timepicker              | Creates a Time Picker input field     |
| hf-treeview                | Creates a TreeView                    |
| hf-webview                 | Creates a Webview                     |

##### Attribute Snippets

| Snippet           | Description                           |
| ----------------- | ------------------------------------- |
| hf-title-attr     | Creates a data-hf-title attribute     |
| hf-condition-attr | Creates a data-hf-condition attribute |

#### Stages Snippets

| Snippet                 | Description                     |
| ----------------------- | ------------------------------- |
| hf-condition-workflow   | Creates a condition workflow    |
| hf-copypdf-workflow     | Creates a copy pdf workflow     |
| hf-email-workflow       | Creates an email workflow       |
| hf-setowner-workflow    | Creates a set owner workflow    |
| hf-setstatus-workflow   | Creates a set status workflow   |
| hf-setgroup-workflow    | Creates a set group workflow    |
| hf-setfield-workflow    | Creates a set field workflow    |
| hf-stagechange-workflow | Creates a stage change workflow |

#### TypeScript Snippets

| Snippet          | Description                                                          |
| ---------------- | -------------------------------------------------------------------- |
| hf-ts            | Custom TypeScript starting point                                     |
| hf-customcontrol | JavaScript derived Custom Control                                    |
| hf-onchange      | JavaScript onChange event handler                                    |
| hf-set           | Get and set values                                                   |
| hf-ctrl          | Get a control                                                        |
| hf-field         | Get a field                                                          |
| hf-repeating     | Get post fix of a repeating unit                                     |
| hf-user          | Get current display name of user and write it to control by given id |
| hf-signer        | Add field values to Signature by given comma serperated ids          |
| hf-counter       | Add Counter request template                                         |

#### JavaScript Snippets

| Snippet          | Description                       |
| ---------------- | --------------------------------- |
| hf-js            | Custom Javascript starting point  |
| hf-customcontrol | JavaScript derived Custom Control |
| hf-onchange      | JavaScript onChange event handler |
| hf-set           | Get and set values                |
| hf-ctrl          | Get a control                     |
| hf-field         | Get a field                       |
| hf-repeating     | Get post fix of a repeating unit  |

#### Extended Snippets

These snippets must be executed in all specified file types in order to obtain all the necessary code parts and the desired functionality!

| Snippet           | File Types     | Description                   |
| ----------------- | -------------- | ----------------------------- |
| hf-repeatinginput | HTML, SCSS, TS | Add RepeatingInput to project |
| hf-initializr     | HTML, TS       | Add Initializr block to file  |

## Contribute

PRs accepted.

If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[MIT License](LICENSE.md) © 2023 icomedias GmbH.
