import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import react from 'react'
import reactServer from 'react-dom/server.js'
import { createApp } from './app.js'
import fastify from 'fastify'
import fastifyStatic from 'fastify-static'

const __dirname = dirname(fileURLToPath(import.meta.url))

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

server.register(fastifyStatic, {
  root: resolve(__dirname, '..', 'public'),
  prefix: '/public/'
})

server.get('*', async (req, reply) => {
  const path = req.raw.originalUrl
  const App = createApp(path)
  const content = reactServer.renderToString(react.createElement(App))
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
