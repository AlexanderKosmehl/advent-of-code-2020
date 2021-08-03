/*
    https://adventofcode.com/2020/day/6
*/

const { RuleModel } = require('./Day7_Helper')

/*
  Solution Code
*/

const solutionRuleModel = new RuleModel('Day7_Input.txt')

console.log('Solution to part 1: ', solutionRuleModel.getAmountOfContainersContaining('shiny gold'))
console.log('Solution to part 2: ', solutionRuleModel.getAmountOfSubContainers('shiny gold'))
