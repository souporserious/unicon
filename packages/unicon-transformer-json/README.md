# unicon-transformer-json

Takes SVGs imported via unicon and creates a single JSON object with keys for objects containing SVG details.

Current provides:

- name
- width
- height
- children
  - tag
  - props
- raw (the raw svg source)

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
}).then(svgs => console.log(svgs))
```

### Example Output

```json
{
  "IconName": {
    "name": "IconName",
    "width": 64,
    "height": 64,
    "children": [
      {
        "tag": "path",
        "props": {
          "fillRule": "evenodd",
          "clipRule": "evenodd",
          "d": "M15.5 14h-.79l-.28-.27A6.471 6.471...",
          "fill": "#8492A6"
        }
      }
    ],
    "raw": "<svg width=\"64\" height=\"64\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M15.5 14h-.79l-.28-.27A6.471 6.471...\" fill=\"#8492A6\"/></svg>"
  },
  ...
}
```
