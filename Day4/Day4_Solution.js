/*
    https://adventofcode.com/2020/day/4
*/

const path = require('path')
const fs = require('fs')
const input = fs.readFileSync(path.resolve(__dirname, 'Day4_Input.txt'), 'utf-8')

/*
    Helper Functions
*/

/**
 * Checks whether the given passport String is valid
 * @param {string} passportString
 * @returns {boolean}
 */
function checkPassportString (passportString) {
  const passportValidation = {
    byr: false,
    iyr: false,
    eyr: false,
    hgt: false,
    hcl: false,
    ecl: false,
    pid: false,
    cid: false
  }

  const passportFields = passportString.split(' ')
  for (const field of passportFields) {
    // Regex magic: matches anything that is preceeded by 3 characters and starts with :
    const strippedField = field.replace(/(?<=(...)):.*/, '')
    if (strippedField in passportValidation) {
      passportValidation[strippedField] = true
    }
  }

  // Checks all fields in the validation object
  // Returns false if any props besides cid are false and true otherwise
  for (const prop in passportValidation) {
    if (prop !== 'cid' && passportValidation[prop] !== true) return false
  }
  return true
}

/*
    Solution Code
*/

// Splits input into seperate passports and cleans them
const inputLines = input.split('\r\n\r\n').map(line => line.replace(/\r\n/g, ' '))

console.log('Solution to part 1:', inputLines.filter(checkPassportString).length)
