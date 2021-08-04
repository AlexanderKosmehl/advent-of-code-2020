/*
    https://adventofcode.com/2020/day/7
*/

const { RuleModel } = require('./Day7_Helper')
const solutionRuleModel = new RuleModel('Day7_Input.txt')

console.log('Solution to part 1: ', solutionRuleModel.getAmountOfContainersContaining('shiny gold'))
console.log('Solution to part 2: ', solutionRuleModel.getAmountOfSubContainers('shiny gold'))
