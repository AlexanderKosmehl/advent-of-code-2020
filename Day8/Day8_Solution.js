/*
    https://adventofcode.com/2020/day/8
*/

const { BootCodeInterpreter } = require('./Day8_Helper')
const bootCodeInterpreter = new BootCodeInterpreter('Day8_Input.txt')

console.log('Solution to part 1: ', bootCodeInterpreter.executeBootCode().accumulator)
console.log('Solution to part 2: ', bootCodeInterpreter.fixLoop().accumulator)
