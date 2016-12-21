const express = require('express')
const webpack = require('webpack')
const path = require('path')
const config = require('./webpack.config.dev')

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()
const port = 8123
app.use(express.static('src'))
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}))

app.use(webpackHotMiddleware(compiler))

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
})
