const fs = require('fs')
const path = require('path')

async function transformSvgs(svgs, { output }) {
  Object.keys(svgs).forEach(key => {
    const svg = svgs[key]

    fs.writeFileSync(path.resolve(output, svg.name + '.svg'), svg.raw)
  })
}

module.exports = transformSvgs
