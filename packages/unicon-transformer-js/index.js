const fs = require('fs')
const path = require('path')
const pascalcase = require('pascalcase')
const util = require('util')

async function transformSvgs(svgs, { output, name }) {
  fs.writeFileSync(
    path.resolve(output, name + '.js'),
    Object.keys(svgs)
      .map(
        key =>
          `export const ${pascalcase(name)} = ${util.inspect(svgs[key], {
            breakLength: Infinity,
            depth: null,
          })}`,
      )
      .join('\n'),
  )
}

module.exports = transformSvgs
