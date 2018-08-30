const Figma = require('figma-js')
const { compareAsc } = require('date-fns')
const { getSvgFromUrl } = require('./utils')

const lastModified = {}
let filterId = -1
let client

function setFigmaToken(token) {
  client = Figma.Client({ personalAccessToken: token })
}

function checkIfFigmaFileModified(fileId, cb) {
  const previouslyModified = lastModified[fileId]
  client.file(fileId).then(({ data }) => {
    if (
      !previouslyModified ||
      compareAsc(data.lastModified, previouslyModified)
    ) {
      cb(data)
      lastModified[fileId] = data.lastModified
    }
  })
}

function watchFigmaFile(fileId, cb, pollingInterval = 1000) {
  setInterval(() => {
    checkIfFigmaFileModified(fileId, cb)
  }, pollingInterval)
}

function replaceValue(_, start, middle, end) {
  return `${start}${filterId}_${middle}${end}`
}

function incrementFilterId(str) {
  filterId++
  return str
    .replace(/(filter="url\(#)(.*)(\)")/g, replaceValue)
    .replace(/(<filter id=")([\s\S]*?)(" [\s\S]*?>)/g, replaceValue)
}

function traverseLayers(children, layers = {}) {
  if (children) {
    children.forEach(child => {
      if (child.type === 'COMPONENT') {
        layers[child.name] = child.id
      } else if (child.children) {
        layers = { ...layers, ...traverseLayers(child.children, layers) }
      }
    })
  }
  return layers
}

function getSvgsFromFigma(
  fileId,
  { group = false, transformSvg = svg => svg } = {}
) {
  if (!client) {
    throw new Error(
      'You must set a Figma token before using this function. Please see the docs for setFigmaToken usage.'
    )
  }
  return client.file(fileId).then(({ data }) => {
    const pages = data.document.children.reduce((collection, page) => {
      collection[page.name] = traverseLayers(page.children)
      return collection
    }, {})
    const componentIds = Object.keys(pages).reduce((ids, key) => {
      const components = pages[key]
      return [...ids, ...Object.keys(components).map(key => components[key])]
    }, [])
    if (componentIds.length > 0) {
      console.log('Fetching components... 🌀')
      return client
        .fileImages(fileId, {
          ids: componentIds,
          format: 'svg',
          svg_include_id: true,
        })
        .then(({ data: { images } }) => {
          console.log('Successfully fetched components ✅')
          console.log('Fetching svgs... 🌀')
          return Promise.all(
            componentIds.map(key => images[key]).map(getSvgFromUrl)
          )
        })
        .then(svgs =>
          Promise.all(svgs.map(svg => transformSvg(incrementFilterId(svg))))
        )
        .then(svgs => {
          console.log('Successfully fetched svgs ✅')
          if (group) {
            let startIndex = 0
            return Object.keys(pages).reduce((pageSvgs, key) => {
              const components = pages[key]
              const componentKeys = Object.keys(components)
              const endIndex = startIndex + componentKeys.length
              pageSvgs[key] = svgs
                .slice(startIndex, endIndex)
                .reduce((collection, svg, index) => {
                  const name = componentKeys[index]
                  collection[name] = svg
                  return collection
                }, {})
              startIndex = endIndex
              return pageSvgs
            }, {})
          } else {
            return Object.keys(pages)
              .reduce((keys, key) => [...keys, ...Object.keys(pages[key])], [])
              .reduce((collection, key, index) => {
                collection[key] = svgs[index]
                return collection
              }, {})
          }
        })
    } else {
      console.log('No components found 📭')
      return null
    }
  })
}

module.exports = {
  getSvgsFromFigma,
  setFigmaToken,
  watchFigmaFile,
}
