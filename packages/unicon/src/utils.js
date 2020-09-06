const axios = require('axios')
const chokidar = require('chokidar')

function getSvgFromUrl(url) {
  return axios
    .get(url, {
      headers: {
        'Content-Type': 'images/svg+xml',
      },
    })
    .then((response) => response.data)
}

function watch(source, cb) {
  const watcher = chokidar.watch(source, {
    persistent: true,
  })
  watcher.on('change', (path) => {
    console.log('file changed')
    cb()
  })
}

module.exports = {
  getSvgFromUrl,
  watch,
}
