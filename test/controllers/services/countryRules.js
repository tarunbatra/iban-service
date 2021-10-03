const t = require('tap')

const countryRules = require('../../../services/countryRules')

t.test('countryRules', async (t) => {
  t.test('should have correct regex for Swedish IBAN', async t => {
    t.equal(countryRules.SE.ibanLength, 24, 'length is correct')
    t.same(countryRules.SE.ibanRegex, /SE(\d{2})(\d{3})(\d{16})(\d{1})/, 'regex is correct')
  })

  t.test('should have correct regex for British IBAN', async t => {
    t.equal(countryRules.GB.ibanLength, 22, 'length is correct')
    t.same(countryRules.GB.ibanRegex, /GB(\d{2})([A-Z]{4})(\d{6})(\d{8})/, 'regex is correct')
  })
})
