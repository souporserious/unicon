const { lstatSync, readdirSync, readFileSync } = require('fs')
const { join, basename } = require('path')
const { watch, processSvg } = require('./utils')

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory)

function watchFolder(source, cb) {
  return watch(source + '**/*.svg', cb)
}

async function getSvgsFromDirectory(path) {
  const files = readdirSync(path)
  const svgs = await Promise.all(
    files.map(name =>
      processSvg(
        name.replace('.svg', ''),
        readFileSync(`${path}/${name}`).toString('utf8'),
      ),
    ),
  )

  return files.reduce((collection, file, index) => {
    const name = file.replace('.svg', '')
    collection[name] = svgs[index]
    return collection
  }, {})
}

async function getSvgsFromFolder(path, { group = false } = {}) {
  if (group) {
    const directories = getDirectories(path)
    const svgs = await Promise.all(
      directories.map(directory => getSvgsFromDirectory(directory)),
    )
    return directories.reduce((collection, directory, index) => {
      collection[basename(directory)] = svgs[index]
      return collection
    }, {})
  } else {
    return getSvgsFromDirectory(path)
  }
}

module.exports = {
  getSvgsFromFolder,
  watchFolder,
}
