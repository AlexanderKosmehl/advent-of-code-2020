/*
https://adventofcode.com/2020/day/2
*/

// Read Input file
const fs = require('fs')
const path = require('path')
const input = fs.readFileSync(path.resolve(__dirname, 'Day2_Input.txt'), 'utf-8')
  .split('\r\n')

/*
Helper Functions
 */

/**
 * Replaces all spacing-symbols with spaces and uses them to split the string into its puzzle-components.
 *
 * Components by their index:
 * 0 - min count OR first position of symbol
 * 1 - max count OR second position of symbol
 * 2 - the limiting symbol
 * 3 - the password
 *
 * @param line - A single line from the input file
 * @returns {string[]} - The list of components
 */
function parseLine (line) {
  return line
    .replace('-', ' ')
    .replace(': ', ' ')
    .split(' ')
}

/**
 * Counts all occurrences of a symbol in a string.
 *
 * @param string - Checked string
 * @param symbol - Symbol that is searched for
 * @returns {*} - Number of occurrences
 */
function countChar (string, symbol) {
  return string
    .split('')
    .filter(char => char === symbol)
    .length
}

/**
 * Validates the password based on the old rule:
 * "The symbol has to occur at least min times but at most max times."
 *
 * @param min - minimum number of occurrences
 * @param max - maximum number of occurrences
 * @param symbol - Symbol that is searched for
 * @param password - Password that is checked
 * @returns {boolean} - Whether the password is valid
 */
function validatePasswordOld (min, max, symbol, password) {
  const numberOfChars = countChar(password, symbol)
  return (min <= numberOfChars && numberOfChars <= max)
}

/**
 * Validates the password based on the new rule:
 * "The symbol has to occur at the first OR the second place, but not at both of them."
 *
 * @param first First possible position of the symbol
 * @param second Second possible position of the symbol
 * @param symbol Symbol that is searched for at the positions
 * @param password Password that is checked
 * @returns {boolean} Whether the password is valid
 */
function validatePasswordNew (first, second, symbol, password) {
  // Positions are offset by one
  const firstPosEqual = (password[first - 1] === symbol)
  const secondPosEqual = (password[second - 1] === symbol)

  // Logical XOR
  return (!firstPosEqual && secondPosEqual) || (firstPosEqual && !secondPosEqual)
}

/*
Solution Code
 */

let counterOld = 0
let counterNew = 0

for (const line of input) {
  const parsedLine = parseLine(line)

  const firstParam = parseInt(parsedLine[0])
  const secondParam = parseInt(parsedLine[1])
  const symbol = parsedLine[2]
  const password = parsedLine[3]

  if (validatePasswordOld(firstParam, secondParam, symbol, password)) { counterOld += 1 }

  if (validatePasswordNew(firstParam, secondParam, symbol, password)) { counterNew += 1 }
}

console.log(`Number of correct OLD-passwords: ${counterOld}`)
console.log(`Number of correct NEW-passwords: ${counterNew}`)
