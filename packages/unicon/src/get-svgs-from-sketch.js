const exec = require('exec-then')
const makeDirectory = require('make-dir')
const deleteDirectory = require('del')
const { getSvgsFromFolder } = require('./get-svgs-from-folder')
const { watch } = require('./utils')

function SketchTool(...args) {
  return exec([
    `/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool`,
    ...args,
  ])
}

function watchSketchFile(source, cb) {
  return watch(source, cb)
}

async function getSvgsFromSketch(path, { group, transformSvg } = {}) {
  const temporaryDirectory = await makeDirectory('./.svgs')
  if (group) {
    const pages = await SketchTool(`dump ${path}`).then(({ stdout }) =>
      JSON.parse(stdout).pages.map((page) => ({
        name: page.name,
        layers: page.layers
          .filter((layer) => layer['<class>'] === 'MSArtboardGroup')
          .map((layer) => layer.objectID),
      }))
    )
    await Promise.all(
      pages.map(async (page) => {
        const subDirectory = await makeDirectory(`./.svgs/${page.name}`)
        return SketchTool(
          `export artboards ${path}`,
          `--items=${page.layers.join(',')}`,
          `--output=${subDirectory}`,
          `--formats=svg`
        )
      })
    )
  } else {
    await SketchTool(
      `export artboards ${path}`,
      `--output=${temporaryDirectory}`,
      `--formats=svg`
    )
  }
  return getSvgsFromFolder(temporaryDirectory, {
    group,
    transformSvg,
  }).then((svgs) => {
    deleteDirectory(temporaryDirectory)
    return svgs
  })
}

module.exports = {
  getSvgsFromSketch,
  watchSketchFile,
}
