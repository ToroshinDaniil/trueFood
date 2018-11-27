const express = require('express')
const app = express()
const { Nuxt, Builder } = require('nuxt')
const utils = require('./modules/utils')
const UploadFile = require('./modules/upload-file')
const RemoveFile = require('./modules/remove-file')
const bodyParser = require('body-parser')
const RequestLogger = require('./modules/request-logger')



const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.use(bodyParser.json())

//config - change mode
const mode = utils.argMode()
let config = require('../../nuxt.config.js')
config.dev = utils.isDevMode()
config.env['appEnv'] = mode
console.log('mode', mode)

const nuxt = new Nuxt(config)

nuxt.hook('render:route', (url, result, req) => {

  if (typeof req === 'undefined') {
    return
  }

  //req.requestLogger.finishLog()

  //console.log('!!!render:route', url, req.requestLogger)

  req.requestLogger = null
})

//upload backoffice files
app.post('/upload-file', function (req, res) { new UploadFile(req, res); })
app.post('/remove-file', function (req, res) { new RemoveFile(req, res); })


// Start build process in dev mode
if (utils.isDevMode()) {
  app.use('/_static/uploads', express.static('../../uploads'))

  const builder = new Builder(nuxt)
  builder.build()
}


// Give nuxt middleware to express
app.use(async function (req, res, next) {

  if (mode == 'PRODUCTION') {
    console.log('request', req.url)
  }
    req.requestLogger = new RequestLogger()



    //variant 1 = renderRoute - рисует только страницы - js и другую статику не рисует 404 возвращает
  // const context = {req, res, next}
  // const { html } = await nuxt.renderRoute(req.url, context)
  // res.end(html)

  //variant 2
  nuxt.render(req, res, next)
})

// Start express server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port)
