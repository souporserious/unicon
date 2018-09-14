import React, { Children, createElement } from 'react'

function renderChildren({ tag, props, children }) {
  return createElement(
    tag,
    props,
    children
      ? children.constructor === Array
        ? Children.toArray(children.map(renderChildren))
        : children
      : null,
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
    'svg',
    {
      viewBox: `0 0 ${source.width} ${source.height}`,
      ...source.props,
      ...internalProps,
      ...restProps,
    },
    typeof children === 'function'
      ? children(childrenToRender)
      : childrenToRender,
  )
}

export default Graphic
