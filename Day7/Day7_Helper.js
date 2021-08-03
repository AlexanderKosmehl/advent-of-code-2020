const path = require('path')
const fs = require('fs')

/**
 * An object representing content relations
 * @typedef {{color: string, contents: Content[]}} ContentRule
 */

/**
 * An object representing possible contents
 * @typedef {{amount: number, color: string}} Content
 */

class RuleModel {
  constructor (fileName) {
    this.rules = this.getRuleModelFromFile(fileName)
  }

  /**
   * Reads all lines form the input file and parses them into a list of rules
   * @param {string} fileName
   * @returns {ContentRule[]}
   */
  getRuleModelFromFile (fileName) {
    const input = fs.readFileSync(path.resolve(__dirname, fileName), 'utf-8').split('\r\n')
    const ruleModel = []

    for (const line of input) {
      const containerMatch = line.match(/(\w* \w*)(?= bags contain )/)
      const containerColor = containerMatch[0]

      const listOfContents = []
      const contentsMatch = line.match(/(\d+) (\w* \w*)/g)
      if (contentsMatch !== null) {
        for (const content of contentsMatch) {
          const contentAmount = Number(content.substring(0, 1))
          const contentColor = content.substring(2)

          const newContent = {
            amount: contentAmount,
            color: contentColor
          }
          listOfContents.push(newContent)
        }
      }

      const newRule = {
        color: containerColor,
        contents: listOfContents
      }
      ruleModel.push(newRule)
    }

    return ruleModel
  }

  /**
   * Uses the the model to check whether a container contains a given content
   * @param {string} containerColor
   * @param {string} contentColor
   * @returns {boolean}
   */
  canContain (containerColor, contentColor) {
    const containerRule = this.rules.find(rule => rule.color === containerColor)
    // Contains no items
    if (containerRule.contents.length === 0) return false
    // Contains item
    if (containerRule.contents.some(content => content.color === contentColor)) return true
    // Check for contents recursively
    for (const content of containerRule.contents) {
      if (this.canContain(content.color, contentColor)) return true
    }
    // Recursion does not find the item
    return false
  }

  /**
   * Returns the amount of containers containing a given color
   * @param {string} color
   * @returns {number}
   */
  getAmountOfContainersContaining (color) {
    let amount = 0
    for (const rule of this.rules) {
      if (this.canContain(rule.color, 'shiny gold')) amount++
    }
    return amount
  }

  getAmountOfSubContainers (color) {
    let amount = 0
    const container = this.rules.find(rule => rule.color === color)
    if (container.contents.length === 0) return 0
    for (const content of container.contents) {
      amount += content.amount + content.amount * this.getAmountOfSubContainers(content.color)
    }
    return amount
  }
}

module.exports = {
  RuleModel
}
