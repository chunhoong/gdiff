# GDiff

A utility to detect the changed files between commits.

## Prerequisite

GDiff is a wrapper to Git command. Thus Git must be installed before running GDiff.

## Installation

```bash
npm i -g gdiff
```

## How to use

To detect the changed files between two commits:

```bash
gdiff --commits <commit-id-of-first-commit> <commit-id-of-second-commit>
```

To detect the changed files between HEAD and latest tag:

```bash
gdiff --commits HEAD TAG
```

GDiff also support file-based configuration, which can be done by creating `gdiff.config.js` at root level of your repository (refer to [sample](sample/gdiff.config.js)). Note that configuration via command line argument should take higher precedence over file-based configuration.

```bash
# commits can be omitted when commits are set via at gdiff.config.js
gdiff
```

## License

[MIT](LICENSE.md)
