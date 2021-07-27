/*
    https://adventofcode.com/2020/day/6
*/

const path = require('path')
const fs = require('fs')
const input = fs.readFileSync(path.resolve(__dirname, 'Day6_Input.txt'), 'utf-8')
const { countAnswersPerGroup, countUnanimousAnswersPerGroup } = require('./Day6_Helper')

/*
    Solution Code
*/

const answerGroups = input.split('\r\n\r\n')
const answersPerGroup = answerGroups.map(group => countAnswersPerGroup(group))
const sumOfAnswers = answersPerGroup.reduce((sum, cur) => sum + cur, 0)

console.log('Solution to part 1:', sumOfAnswers)

const unanimousAnswersPerGroup = answerGroups.map(group => countUnanimousAnswersPerGroup(group))
const sumOfUnanimousAnswers = unanimousAnswersPerGroup.reduce((sum, cur) => sum + cur, 0)

console.log('Solution to part 2:', sumOfUnanimousAnswers)
