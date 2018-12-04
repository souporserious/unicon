# unicon-cli

An opinionated cli tool that uses [`unicon`](../unicon) to create a file[s] of
exported SVG fragments.

## Install

```
yarn add unicon-cli --dev
```

```
npm install unicon-cli --save-dev
```

## Commands

### Figma

Accepts a Figma file id. Collects all of the components in the file. the `--page` option can be used to limit to a single page within the figma file.

`unicon figma <figma-id>`

#### Required setup

You must include a [personal access token](https://www.figma.com/developers/docs#auth-dev-token) in a `.env` at the root of your project or as an environment variable.

`FIGMA_TOKEN=<personal-access-token>`

### Sketch

`unicon sketch <path-to-sketch-file>`

Accepts a path to a Sketch file. Collects all of the artboards in the file.

### Folder

`unicon folder <path-to-folder-of-svgs>`

Accepts a path to a directory of svgs.

## Options

### `—output`

Folder to output parsed SVGs. Defaults to `cwd`.

### `-page`

Page within the file to use.

Currently works with `figma`.

### `—group`

When `true`, groups returned SVG data by pages or sub directories.

### `—transform`

Without this option unicon will just directly place a `.svg` for each icon found in the `output` directory.

To change this behavior provide a installed unicon transfomer name or a path to a file that exports a method to transform each SVG.

If using a package like [`unicon-transformer-json`](../unicon-transformer-json), you can omit `unicon-transformer` and just pass the name of the transformer, and it will be resolved properly.

for example:

`unicon figma XXXX --transformer json`

### `—watch`

Builds SVG exports file on source directory/file update.

## Usage within `package.json` scripts

```json
{
  "scripts": {
    "icons": "unicon figma 5XaqhenkjvPmJprGZMFw2ge --name icons --transformer json"
  }
}
```
