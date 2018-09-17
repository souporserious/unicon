const fs = require('fs')
const path = require('path')

async function transformSvgs(svgs, { output, name }) {
  fs.writeFileSync(
    path.resolve(output, name + '.json'),
    JSON.stringify(svgs, null, 2),
  )
}

module.exports = transformSvgs
