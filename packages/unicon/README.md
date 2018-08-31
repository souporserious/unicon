# unicon

A set of functions to source SVG data from _any_ design tool.

## Install

```
yarn add unicon
```

```
npm install unicon
```

## Exports

### Figma

#### `setFigmaToken(authToken: String)`

You must set a
[personal access token](https://www.figma.com/developers/docs#auth-dev-token) in
order to use the `getSvgsFromFigma` function below.

#### `getSvgsFromFigma(figmaFileId: String, options: Object): Promise.resolve(svgs: Any)`

### Sketch

#### `getSvgsFromSketch(pathToSketchFile: String, options: Object): Promise.resolve(svgs: Any)`

### Folder

#### `getSvgsFromFolder(pathToFolderOfSvgs: String, options: Object): Promise.resolve(svgs: Any)`

## Shared Options

Each function above accepts a second paramater for options.

### transformSvg `(svg: String) => svg: Any`

Accepts a function that receives the raw SVG string.

### group

Groups the data by pages when using Figma or Sketch and by sub-directory name
when using a folder.
