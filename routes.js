'use strict'

const { server: { auth } } = require('./config')
const fp = require('fastify-plugin')
const swagger = require('fastify-swagger')

module.exports = async function (fastify, options) {
  fastify
    .register(fp(docs))
    .get('/', (req, reply) => reply.send('OK'))
    .register(routes)
}

async function routes (fastify) {
  registerBasicAuth(fastify)
  fastify.get('/verify', require('./controllers/verify'))
}

function registerBasicAuth (fastify) {
  fastify.register(require('fastify-basic-auth'), {
    authenticate: { realm: 'iban-service' },
    validate: async function (username, password) {
      if (username !== auth.username || password !== auth.password) {
        throw new Error('Unauthorized')
      }
    }
  })

  fastify.after(() => {
    fastify.addHook('onRequest', fastify.basicAuth)
  })
}

async function docs (fastify) {
  fastify.register(swagger, {
    routePrefix: '/docs',
    exposeRoute: true,
    openapi: {
      info: {
        title: 'IBAN service',
        version: '0.1.0'
      },
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      components: {
        securitySchemes: {
          basicAuth: {
            type: 'http',
            name: 'basicAuth',
            scheme: 'basic'
          }
        }
      },
      security: [{
        basicAuth: []
      }]
    }
  })
}
