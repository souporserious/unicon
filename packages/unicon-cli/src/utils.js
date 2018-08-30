const fs = require('fs')
const path = require('path')
const pascalcase = require('pascalcase')
const util = require('util')

function writeSVGFile(output, filename, data) {
  fs.writeFileSync(
    path.resolve(output, filename + '.js'),
    Object.keys(data)
      .map(
        key =>
          `export const ${pascalcase(key)} = ${util.inspect(data[key], {
            breakLength: Infinity,
            depth: null,
          })}`
      )
      .join('\n')
  )
}

function generateImportsFromSvgs({ name, output, svgs, group }) {
  if (group) {
    Object.keys(svgs).forEach(key => writeSVGFile(output, key, svgs[key]))
  } else {
    writeSVGFile(output, name, svgs)
  }
}

module.exports = {
  generateImportsFromSvgs,
}
