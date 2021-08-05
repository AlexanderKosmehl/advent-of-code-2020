/*
    https://adventofcode.com/2020/day/9
*/

const { XmasDecoder } = require('./Day9_Helper')
const xmasDecoder = new XmasDecoder('Day9_Input.txt', 25)

const firstSolution = xmasDecoder.findFirstInvalidNumber().number

console.log('Solution to part 1: ', firstSolution)

const secondSolutionSet = xmasDecoder.findContiguousSet(firstSolution)
const secondSolution = Math.min(...secondSolutionSet) + Math.max(...secondSolutionSet)

console.log('Solution to part 2: ', secondSolution)
