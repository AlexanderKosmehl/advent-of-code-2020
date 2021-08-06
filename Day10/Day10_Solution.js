/*
    https://adventofcode.com/2020/day/10
*/

const { AdapterHelper } = require('./Day10_Helper')

const adapterHelper = new AdapterHelper('Day10_Input.txt')
const joltageDistribution = adapterHelper.getJoltageDistribution()

console.log('Solution to part 1: ', joltageDistribution[0] * joltageDistribution[2])
console.log('Solution to part 2:', adapterHelper.getNumberOfAdapterArrangements())
