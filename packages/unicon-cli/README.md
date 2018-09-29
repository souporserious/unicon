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

`unicon figma <figma-id>`

Accepts a Figma file id. Collects all of the components in the file.

#### Required setup

`FIGMA_TOKEN=<personal-access-token>`

You must include a
[personal access token](https://www.figma.com/developers/docs#auth-dev-token) in
a `.env` at the root of your project or as an environment variable.

### Sketch

`unicon sketch <path-to-sketch-file>`

Accepts a path to a Sketch file. Collects all of the artboards in the file.

### Folder

`unicon folder <path-to-folder-of-svgs>`

Accepts a path to a directory of svgs.

## Options

### `—output`

Folder to output parsed SVGs. Defaults to `cwd`.

### `—group`

When `true`, groups returned SVG data by pages or sub directories.

### `—transformer`

Path to a file that exports a method to transform each SVG. If using a package
like [`unicon-transformer-json`](../unicon-transformer-json), you can omit
`unicon-transformer` and just pass the name of the transformer, and it will be
resolved properly.

### `—watch`

Builds SVG exports file on source directory/file update.

## Usage with NPM scripts

```json
{
  "scripts": {
    "icons": "unicon figma 5XaqhenkjvPmJprGZMFw2ge --name icons --transformer json"
  }
}
```

### Example Output

```js
export const Archive = { width: 24, height: 24, }, children: [...] }
export const Trash = { width: 24, height: 24, children: [...] }
```
