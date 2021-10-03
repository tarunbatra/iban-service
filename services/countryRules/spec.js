/**
 * @file Maintains a list of country IBAN formats
 * Source: https://www.iban.com/files/iban_registry.pdf
 * Format: [ "COUNTRY_CODE", "BBAN_LENGTH", "BBAN_STRUCTURE" ]
 */

module.exports = [
  ['SE', 20, '3!n16!n1!n'], // Sweden
  ['CH', 17, '5!n12!c'], // Switzerland
  ['GB', 18, '4!a6!n8!n'], // United Kingdom
  ['DE', 18, '8!n10!n'], // Germany
  ['DK', 14, '4!n9!n1!n'], // Denmark
  ['FO', 14, '4!n9!n1!n'], // Faroe Islands
  ['GL', 14, '4!n9!n1!n'], // Greenland
  ['NO', 11, '4!n6!n1!n '], // Norway
  ['FI', 14, '6!n7!n1!n'], // Finland
  ['IS', 22, '4!n2!n6!n10!n'], // Iceland
  ['FR', 23, '5!n5!n11!c2!n'] // France
]
