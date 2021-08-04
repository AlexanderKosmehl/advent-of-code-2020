/*
    https://adventofcode.com/2020/day/6
*/

const { BootCodeInterpreter } = require('./Day8_Helper')
const bootCodeInterpreter = new BootCodeInterpreter('Day8_Input.txt')

console.log('Part 1 solution: ', bootCodeInterpreter.executeBootCode().accumulator)
console.log('Part 2 solution: ', bootCodeInterpreter.fixLoop().accumulator)
