# unicon-transformer-json

Uses [svgo](https://github.com/svg/svgo) to cleanup each svg, as well as
[svgson](https://github.com/elrumordelaluz/svgson-next/) to produce a JSON
fragment for each svg.

### Install

```
yarn add unicon-transformer-json --dev
```

```
npm install unicon-transformer-json --save-dev
```

### Usage

### unicon-cli

When using with [unicon-cli](../unicon-cli) you can omit the
`unicon-transformer` portion.

```json
{
  "scripts": {
    "icons": "unicon figma 5XaqhenkjvPmJprGZMFw2ge --name icons --transformer json"
  }
}
```

### node

```js
import { getSvgsFromFigma } from 'unicon'
import svgToJson from 'unicon-transformer-json'

getSvgsFromFigma('5XaqhenkjvPmJprGZMFw2ge', {
  transformSvg: svgToJson,
}).then((svgs) => console.log(svgs))
```

### Example Output

```json
{
  "tag": "path",
  "props": {
    "d": "M15.5 14h-.79l-.28-.27A6.471 6.471...",
    "fill": "rainbow"
  },
  "children": ["..."]
}
```
