/*
    https://adventofcode.com/2020/day/4
*/

const path = require('path')
const fs = require('fs')
const input = fs.readFileSync(path.resolve(__dirname, 'Day4_Input.txt'), 'utf-8')
const { checkPassportString, validatePassportString } = require('./Day4_Helper')

/*
    Solution Code
*/

// Splits input into seperate passports and cleans them
const inputLines = input.split('\r\n\r\n').map(line => line.replace(/\r\n/g, ' '))

console.log('Solution to part 1:', inputLines.filter(checkPassportString).length)
console.log('Solution to part 2:', inputLines.filter(validatePassportString).length)
