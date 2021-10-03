'use strict'

const Fastify = require('fastify')
const routes = require('./routes')
const config = require('./config')
const fastify = Fastify({
  logger: config.server.loggingEnabled
})

function init () {
  // Initialize the routes
  fastify.register(routes)
  // Register routes, set default error and 404 handler
  fastify.setErrorHandler(errorHandler)
  fastify.setNotFoundHandler(notFoundHandler)
  return fastify
}

async function start () {
  // Start the server
  await fastify.listen(config.server.port)
  return fastify
}

async function stop () {
  await fastify.close()
}

async function errorHandler (err, request, reply) {
  return await reply.status(err.statusCode || 400).send({
    error: err.message
  })
}

async function notFoundHandler (request, reply) {
  return await reply.status(404).send()
}

module.exports = {
  init,
  start,
  stop
}
