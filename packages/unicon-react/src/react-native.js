import React, { Children, createElement } from 'react'
import * as Svg from 'react-native-svg'

function pascalcase(str) {
  return str
    .toLowerCase()
    .trim()
    .split(/[.\-_\s]/g)
    .reduce((str, word) => str + word[0].toUpperCase() + word.slice(1), '')
}

function renderChildren({ tag, props, children }) {
  const component = Svg[pascalcase(tag)]
  if (!component) {
    console.warn(`${pascalcase(tag)} is not supported right now.`)
    return null
  }
  if (!props.fill) {
    props.fill = 'none'
  }
  return createElement(
    component,
    props,
    children
      ? children.constructor === Array
        ? Children.toArray(children.map(renderChildren))
        : children
      : null
  )
}

function Graphic({ children, source, scale = 1, ...restProps }) {
  const internalProps = {}
  const childrenToRender = Children.toArray(source.children.map(renderChildren))
  if (scale === 'auto') {
    internalProps.preserveAspectRatio = 'xMinYMin meet'
    internalProps.shapeRendering = 'crispEdges'
  } else {
    internalProps.width = source.width * scale
    internalProps.height = source.height * scale
  }
  return createElement(
    Svg.default,
    {
      viewBox: `0 0 ${source.width} ${source.height}`,
      ...source.props,
      ...internalProps,
      ...restProps,
    },
    typeof children === 'function'
      ? children(childrenToRender)
      : childrenToRender
  )
}

export default Graphic
