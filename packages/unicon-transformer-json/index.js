const fs = require('fs')
const path = require('path')

async function transformSvgs(svgs) {
  console.log(JSON.stringify(svgs, null, 2))

  fs.writeFileSync(
    path.resolve('', 'icons.json'),
    JSON.stringify(svgs, null, 2),
  )
}

module.exports = transformSvgs
