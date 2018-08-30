const {
  setFigmaToken,
  getSvgsFromFigma,
  watchFigmaFile,
} = require('./get-svgs-from-figma')
const { getSvgsFromSketch, watchSketchFile } = require('./get-svgs-from-sketch')
const { getSvgsFromFolder, watchFolder } = require('./get-svgs-from-folder')

module.exports = {
  setFigmaToken,
  getSvgsFromFigma,
  getSvgsFromSketch,
  getSvgsFromFolder,
  watchFigmaFile,
  watchSketchFile,
  watchFolder,
}
