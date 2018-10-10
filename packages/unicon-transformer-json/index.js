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
  if (json.props.viewBox) {
    const [, , width, height] = json.props.viewBox.split(' ')
    return { width, height }
  } else {
    const { width, height } = json.props
    return { width, height }
  }
}

async function transformSvg(svg) {
  const optimizedSvg = await optimizeSvg(svg)
  const json = await svgson(svg, {
    camelcase: true,
    transformNode: ({ attributes, children, name }) => ({
      tag: name,
      props: attributes,
      ...(children && children.length > 0
        ? {
            children:
              children[0].type === 'text' ? children[0].value : children,
          }
        : {}),
    }),
  })
  const { width, height } = getSize(json)
  return {
    width: parseInt(width, 10),
    height: parseInt(height, 10),
    children: json.children,
  }
}

module.exports = transformSvg
