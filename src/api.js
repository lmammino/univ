import { authors } from './data/authors.js'

export async function api (fastify, opts) {
  fastify.get('/authors', async function (req, reply) {
    return authors.map(({ id, name, picture }) => ({ id, name, picture }))
  })

  fastify.get('/authors/:authorId', async function (req, reply) {
    const author = authors.find(({ id }) => id === req.params.authorId)
    if (!author) {
      reply.code(404)
      return { error: 'Author not found' }
    }
    return author
  })
}
