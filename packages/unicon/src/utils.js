const svgo = require('svgo')
const axios = require('axios')
const chokidar = require('chokidar')
const svgson = require('svgson-next').default

function getSvgFromUrl(url) {
  return axios
    .get(url, {
      headers: {
        'Content-Type': 'images/svg+xml',
      },
    })
    .then(response => response.data)
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

async function processSvg(name, svg) {
  const optimizedSvg = await optimizeSvg(svg)
  const json = await svgson(optimizedSvg, { camelcase: true })
  const { width, height } = getSize(json)

  return {
    name: name,
    width: parseInt(width, 10),
    height: parseInt(height, 10),
    children: json.children.map(walkChildren),
  }
}

function watch(source, cb) {
  const watcher = chokidar.watch(source, {
    persistent: true,
  })
  watcher.on('change', path => {
    console.log('file changed')
    cb()
  })
}

module.exports = {
  getSvgFromUrl,
  processSvg,
  watch,
}
