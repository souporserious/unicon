const svgo = require('svgo')
const svgson = require('svgson-next').default

function optimizeSvg(svg) {
  return new svgo({
    multipass: true,
  })
    .optimize(svg)
    .then(({ data }) => data)
}

function getSize(json) {
  if (json.attributes.viewBox) {
    const [, , width, height] = json.attributes.viewBox.split(' ')
    return { width, height }
  } else {
    const { width, height } = json.attributes
    return { width, height }
  }
}

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
