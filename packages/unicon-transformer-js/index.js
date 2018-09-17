const svgson = require('svgson-next').default

function walkChildren({ attributes, children, name }) {
  const shape = {
    tag: name,
    props: attributes,
  }
  if (children && children.length > 0) {
    shape.children =
      children[0].type === 'text'
        ? children[0].value
        : children.map(walkChildren)
  }
  return shape
}

async function transformSvg(svg) {
  const optimizedSvg = await optimizeSvg(svg)
  const json = await svgson(svg, { camelcase: true })
  const { width, height } = getSize(json)
  return {
    width: parseInt(width, 10),
    height: parseInt(height, 10),
    children: json.children.map(walkChildren),
  }
}

module.exports = transformSvg
