'use strict'

const iban = require('../services/iban')

module.exports = {
  schema: {
    query: {
      type: 'object',
      required: ['iban'],
      properties: {
        link: {
          type: 'string'
        }
      }
    }
  },

  async handler (req, reply) {
    try {
      iban.validate(req.query.iban)
      reply.send({
        result: 'valid'
      })
    } catch (err) {
      reply.send({
        result: 'invalid',
        reason: err.message
      })
    }
  }
}
