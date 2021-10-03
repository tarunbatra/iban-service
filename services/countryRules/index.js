'use strict'

const list = require('./spec')

// Symbols picked up from https://www.iban.com/files/iban_registry.pdf
const symbolMap = {
  n: '\\d',
  a: '[A-Z]',
  c: '[A-Za-z0-9]',
  e: '\\s'
}

const rules = {}

for (const entry of list) {
  const country = entry[0]
  const bbanLength = entry[1]
  const bbanStructure = entry[2]

  rules[country] = {
    ibanLength: bbanLength + 4,
    ibanRegex: generateIbanRegex(country, bbanStructure)
  }
}

function generateIbanRegex (countryCode = '', bbanStructure = '') {
  // Defining the regex for IBAN prefix
  let regexString = `${countryCode}(\\d{2})`

  // We want to extract all combinations of "{digit}!{symbol}"
  while (bbanStructure.includes('!')) {
    const exclamation = bbanStructure.indexOf('!')
    const repeat = bbanStructure.slice(0, exclamation)
    const typeOfChars = bbanStructure.charAt(exclamation + 1)
    // IBAN Regex is added with regex of the symbol extracted
    regexString += `(${symbolMap[typeOfChars]}{${repeat}})`
    bbanStructure = bbanStructure.slice(exclamation + 2)
  }
  return new RegExp(regexString)
}

module.exports = rules
