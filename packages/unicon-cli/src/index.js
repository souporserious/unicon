#!/usr/bin/env node

require('dotenv').load()

const fs = require('fs')
const path = require('path')
const meow = require('meow')
const {
  setFigmaToken,
  getSvgsFromFigma,
  getSvgsFromSketch,
  getSvgsFromFolder,
  watchFigmaFile,
  watchSketchFile,
  watchFolder,
} = require('unicon')
const { generateImportsFromSvgs } = require('./utils')

const cli = meow(
  `
  unicon

  Figma
  $ unicon figma <file-id>

  Sketch
  $ unicon sketch <path-to-sketch-file>

  Folder
  $ unicon folder <path-to-folder-of-svgs>
  
  Options
  --name         name of the generated JSON file
  --output       output directory (defaults to cwd)
  --transformer  path to transform function
  --group        whether or not the data should be grouped by pages/sub-directory
  --watch        whether or not the file/directory should be watched for changes
  `,
  {
    flags: {
      name: {
        type: 'string',
      },
      output: {
        type: 'string',
      },
      transformer: {
        type: 'string',
      },
      group: {
        type: 'boolean',
      },
      watch: {
        type: 'boolean',
      },
    },
  }
)

const [command, source] = cli.input
const options = Object.assign(
  {
    name: 'components',
    output: '',
  },
  cli.flags
)
options.output = path.resolve(options.output)

if (!command || !source) {
  cli.showHelp(0)
} else {
  const getSvgsFromTool = {
    figma: getSvgsFromFigma,
    sketch: getSvgsFromSketch,
    folder: getSvgsFromFolder,
  }[command]
  const toolOptions = {
    group: options.group,
  }

  if (command === 'figma') {
    if (!process.env.FIGMA_TOKEN) {
      console.error('You must define a FIGMA_TOKEN environment variable.')
      process.exit(1)
    } else {
      setFigmaToken(process.env.FIGMA_TOKEN)
    }
  }

  if (options.transformer) {
    try {
      toolOptions.transformSvg = require(path.resolve(options.transformer))
    } catch (err) {
      try {
        toolOptions.transformSvg = require(path.resolve(
          `./node_modules/unicon-transformer-${options.transformer}`
        ))
      } catch (err) {
        console.error(
          `Transformer could not be found. Make sure path is valid or try installing ${`unicon-transformer-${
            options.transformer
          }`}`
        )
      }
    }
  }

  const generateFileFromSvg = () =>
    getSvgsFromTool(source, toolOptions).then(svgs =>
      generateImportsFromSvgs({
        name: options.name,
        output: options.output,
        group: options.group,
        svgs,
      })
    )
  if (options.watch) {
    const watchSource = {
      figma: watchFigmaFile,
      sketch: watchSketchFile,
      folder: watchFolder,
    }[command]
    watchSource(source, generateFileFromSvg)
  }
  generateFileFromSvg()
}
