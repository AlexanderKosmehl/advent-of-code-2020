/*
    https://adventofcode.com/2020/day/5
*/

const path = require('path')
const fs = require('fs')
const input = fs.readFileSync(path.resolve(__dirname, 'Day5_Input.txt'), 'utf-8')
const { calculateSeatID } = require('./Day5_Helper')

/*
    Solution Code
*/
const inputLines = input.split('\r\n')
const seatIDs = inputLines.map(line => calculateSeatID(line))

// Iterates over the list of inputLines and prints the highest seatID
let max = seatIDs[0]
for (const seatID of seatIDs) {
  if (seatID > max) max = seatID
}
