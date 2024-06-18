# HybridForms Template Formatter

It is an opinionated code formatter for HybridForms template files. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

## Table of Contents

- [HybridForms Template Formatter](#hybridforms-template-formatter)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Default Formatter](#default-formatter)
  - [Contribute](#contribute)
  - [License](#license)

## Installation

Install through VS Code extensions. Search for `HybridForms Template Formatter`.

[Visual Studio Code Market Place: HybridForms Template Formatter](https://marketplace.visualstudio.com/items?itemName=icomedias.hfformatter)

Can also be installed in VS Code: Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

```
ext install icomedias.hfformatter
```

### Default Formatter

To ensure that this extension is used over other extensions you may have installed, be sure to set it as the default formatter in your VS Code settings. This setting can be set for all languages or by a specific language.

```json
{
  "[html]": {
    "editor.defaultFormatter": "icomedias.hfformatter"
  }
}
```

## Contribute

PRs accepted.

If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[MIT License](LICENSE.md) © 2023 icomedias GmbH.
