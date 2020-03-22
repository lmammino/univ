import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import react from 'react'
import reactServer from 'react-dom/server.js'
import fastify from 'fastify'
import fastifyStatic from 'fastify-static'
import { StaticRouter, matchPath } from 'react-router-dom'
import { App } from './frontend/app.js'
import { routes } from './frontend/routes.js'
import { api } from './api.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const h = react.createElement
const server = fastify({ logger: true })

const template = ({ content, serverData }) => `<!DOCTYPE html>
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
    ${serverData ? `<script type="text/javascript">${serverData}</script>` : ''}
    <script type="text/javascript" src="/public/main.js"></script>
  </body>
</html>`

server.register(api, { prefix: '/api' })

server.register(fastifyStatic, {
  root: resolve(__dirname, '..', 'public'),
  prefix: '/public/'
})

server.get('*', async (req, reply) => {
  const location = req.raw.originalUrl
  let component
  let match
  let matched = false
  for (const route of routes) {
    component = route.component
    match = matchPath(location, route)
    if (match) {
      matched = true
      break
    }
  }

  let code = 200
  if (!matched) {
    code = 404
  }

  let data
  if (typeof component.loadData === 'function') {
    // TODO: implement error logic (WHAT IF FAILING THE ASYNC, e.g. author not found)
    data = await component.loadData({ match })
  }

  const app = h(StaticRouter, { location, context: { data } }, h(App))
  const content = reactServer.renderToString(app)
  const serverData = data ? `window.__ASYNC_DATA__=${JSON.stringify(data)}` : ''
  const html = template({ content, serverData })

  reply.code(code).type('text/html').send(html)
})

const port = Number.parseInt(process.env.PORT) || 3000
const address = process.env.ADDRESS || '127.0.0.1'

server.listen(port, address, function (err, addr) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
})
