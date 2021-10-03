'use strict'

const countryRules = require('./countryRules')

module.exports = {
  validate (iban) {
    const formattedIban = formatIban(iban)
    const ibanCountry = extractCountry(formattedIban)

    // iban is invalid if the country does not exist in our list, yeah we swift now
    if (!countryRules[ibanCountry]) {
      throw new Error('Unknown country')
    }
    // iban is invalid if its length does not match the length specified in country spec
    if (countryRules[ibanCountry].ibanLength !== formattedIban.length) {
      throw new Error('Provided length does not match the country length')
    }
    // iban is invalid if its structure does not math the structure specified in country spec
    if (!countryRules[ibanCountry].ibanRegex.test(formattedIban)) {
      throw new Error('Provided string does not match the country structure')
    }
    // iban is invalid if check digits are errornous
    if (mod97(prepareIbanForMod(formattedIban)) !== 1) {
      throw new Error('Check digits are errornous')
    }
    return true
  }
}

/**
 * Extract country code out of iban
 * @param {string} iban
 * @returns
 */
function extractCountry (iban) {
  return iban.slice(0, 2)
}

const CODE = {
  A: 'A'.charCodeAt(0),
  Z: 'Z'.charCodeAt(0)
}

/**
 * Removes spaces from IBAN string
 * @param {string} iban
 * @returns {string} formattedIban
 */
function formatIban (iban = '') {
  return iban.toUpperCase().split(' ').join('')
}

/**
 * Converts IBAN to integer
 * @param {string} iban
 * @returns {string} integerIban
 */
function prepareIbanForMod (iban = '') {
  // Move the first 4 characters to the last
  const swappedIban = iban.slice(4) + iban.slice(0, 4)

  const integerIban = swappedIban.split('').map(char => {
    const charCode = char.charCodeAt(0)
    if (charCode >= CODE.A && charCode <= CODE.Z) {
      // Substitute alphabetical characters for digits
      return charCode - CODE.A + 10
    } else {
      // Return digits as is
      return char
    }
  }).join('')

  return integerIban
}

/**
 * Does mod operation on integer form of iban
 * @param {string} iban
 * @returns
 */
function mod97 (iban) {
  return parseInt(BigInt(iban) % 97n)
}
