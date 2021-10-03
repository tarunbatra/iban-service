'use strict'

const t = require('tap')
const config = require('../../config')
const server = require('../../server')
const app = server.init()

t.test('/verify', async (t) => {
  app.logger = false
  t.before(async () => {
    t.context.authHeader = 'Basic ' + Buffer.from(`${config.server.auth.username}:${config.server.auth.password}`).toString('base64')
  })
  t.test('should return 401 if no auth is provided', async t => {
    const res = await app.inject({
      method: 'GET',
      url: '/verify'
    })
    t.equal(res.statusCode, 401, 'status is 401')
  })

  t.test('should return 400 if no iban provided', async t => {
    const res = await app.inject({
      method: 'GET',
      url: '/verify',
      headers: { authorization: t.context.authHeader }
    })
    t.equal(res.statusCode, 400, 'status is 400')
    t.equal(res.json().error, 'querystring should have required property \'.iban\'', 'correct error message returned')
  })

  t.test('should return invalid if invalid iban is provided', async t => {
    const res = await app.inject({
      method: 'GET',
      url: '/verify',
      headers: { authorization: t.context.authHeader },
      query: { iban: 'xyz' }
    })
    t.equal(res.statusCode, 200, 'status is 200')
    t.equal(res.json().result, 'invalid', 'result is "invalid"')
    t.equal(res.json().reason, 'Unknown country', 'reason is unknown country')
  })

  t.test('should return invalid if length of iban is invalid', async t => {
    const res = await app.inject({
      method: 'GET',
      url: '/verify',
      headers: { authorization: t.context.authHeader },
      query: { iban: 'GB82WEST123456987' }
    })
    t.equal(res.statusCode, 200, 'status is 200')
    t.equal(res.json().result, 'invalid', 'result is "invalid"')
    t.equal(res.json().reason, 'Provided length does not match the country length', 'reason is invalid length')
  })

  t.test('should return invalid if structure of iban is invalid', async t => {
    const res = await app.inject({
      method: 'GET',
      url: '/verify',
      headers: { authorization: t.context.authHeader },
      query: { iban: 'GB82000012345698765432' }
    })
    t.equal(res.statusCode, 200, 'status is 200')
    t.equal(res.json().result, 'invalid', 'result is "invalid"')
    t.equal(res.json().reason, 'Provided string does not match the country structure', 'reason is invalid structure')
  })

  t.test('should return invalid if check digits of iban are invalid', async t => {
    const res = await app.inject({
      method: 'GET',
      url: '/verify',
      headers: { authorization: t.context.authHeader },
      query: { iban: 'GB82WEST12345698765431' }
    })
    t.equal(res.statusCode, 200, 'status is 200')
    t.equal(res.json().result, 'invalid', 'result is "invalid"')
    t.equal(res.json().reason, 'Check digits are errornous', 'reason is invalid check digts')
  })

  t.test('should return 200 if valid iban provided', async t => {
    const res = await app.inject({
      method: 'GET',
      url: '/verify',
      headers: { authorization: t.context.authHeader },
      query: { iban: 'GB82WEST12345698765432' }
    })
    t.equal(res.statusCode, 200, 'status is 200')
    t.equal(res.json().result, 'valid', 'result is "valid"')
  })

  t.test('should return 200 if valid iban with spaces is provided', async t => {
    const res = await app.inject({
      method: 'GET',
      url: '/verify',
      headers: { authorization: t.context.authHeader },
      query: { iban: 'GB82 WEST 1234 5698 7654 32' }
    })
    t.equal(res.statusCode, 200, 'status is 200')
    t.equal(res.json().result, 'valid', 'result is "valid"')
  })
})
