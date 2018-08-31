# unicon-react

Universal SVG rendering for React ✨

### Install

```
yarn add unicon-react
```

```
npm install unicon-react
```

### Usage

```jsx
import Graphic from 'unicon-react'
import { Archive } from './icons'
export default () => <Graphic source={Archive} scale={4} />
```

### Props

#### source `(JSON fragment)`

Accepts a JSON fragment produced by the [`unicon-cli`](../unicon-cli) tool.

#### scale `(number | 'auto')`

Scales the width + height equally. If set to `auto`, it will set
`preserveAspectRatio="xMinYMin meet"` and
`internalProps.shapeRendering='crispEdges'` for responsive SVGs.

#### children `(children) => children)`

Accepts a function allowing you to manipulate child layers.
