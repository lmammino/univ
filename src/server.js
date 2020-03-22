import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import react from 'react'
import reactServer from 'react-dom/server.js'
import fastify from 'fastify'
import fastifyStatic from 'fastify-static'
import { StaticRouter } from 'react-router-dom'
import { App } from './frontend/app.js'
import { api } from './api.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const h = react.createElement
const server = fastify({ logger: true })

const template = (content) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My library</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="/public/wing.css" rel="stylesheet">
    <link href="/public/style.css" rel="stylesheet">
  </head>
  <body>
    <div id="root">${content}</div>
    <script type="text/javascript" src="/public/main.js"></script>
  </body>
</html>`

server.register(api, { prefix: '/api' })

server.register(fastifyStatic, {
  root: resolve(__dirname, '..', 'public'),
  prefix: '/public/'
})

server.get('*', async (req, reply) => {
  const path = req.raw.originalUrl
  const context = {}
  const serverApp = h(StaticRouter, { path, context }, h(App))
  const content = reactServer.renderToString(serverApp)

  // TODO: Add here checks on the context to see 404s
  // TODO: implement async data loading

  reply.type('text/html').send(template(content))
})

const port = Number.parseInt(process.env.PORT) || 3000
const address = process.env.ADDRESS || '127.0.0.1'

server.listen(port, address, function (err, addr) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
})
