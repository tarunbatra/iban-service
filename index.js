'use strict'

const server = require('./server')
const logger = require('pino')()

server.init()
server.start()

// Process event handlers
process.once('SIGINT', async () => {
  await server.stop()
  process.exit()
})
process.on('uncaughtException', error => {
  logger.error('Got uncaught exception', { error })
  process.exit(1)
})
