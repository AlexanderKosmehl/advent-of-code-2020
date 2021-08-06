const path = require('path')
const fs = require('fs')

class AdapterHelper {
  constructor (fileName) {
    const inputLines = fs.readFileSync(path.resolve(__dirname, fileName), 'utf-8').split('\r\n')

    /**
     * List of adapters
     * @property {number[]} adapters
     */
    this.adapters = inputLines.map(line => Number(line)).sort((x, y) => x - y)

    // add device adapter (max + 3) as well as the wall plug (0)
    this.adapters.push(Math.max(...this.adapters) + 3)
    this.adapters.unshift(0)
  }

  /**
   * Returns an array containing the different joltage Differences
   * @returns {number[]}
   */
  getJoltageDistribution () {
    let lastJoltage = 0
    const joltageDistribution = [0, 0, 0]
    // skip wall plug
    for (let i = 1; i < this.adapters.length; i++) {
      const joltageDifference = this.adapters[i] - lastJoltage
      lastJoltage = this.adapters[i]
      // Increment the occurence for this difference
      joltageDistribution[joltageDifference - 1] += 1
    }
    return joltageDistribution
  }

  /**
   * Returns the number of all possible adapter arrangements
   * @param {number[]} adapters
   * @param {object} memory
   * @returns {number}
   */
  getNumberOfSubArrangements (adapters, memory) {
    const currentAdapter = adapters.pop()
    // If the arrangement was calculated before just return the result from memory
    if (currentAdapter in memory) return memory[currentAdapter]
    // Recursion base
    if (adapters.length === 0 || adapters.length === 1) return 1
    const possibleConnections = adapters.filter(adapter => currentAdapter - adapter <= 3)
    const possibleSubConnections = []
    for (const adapter of possibleConnections) {
      const remainingAdapters = adapters.slice(0, adapters.findIndex(currentAdapter => currentAdapter === adapter) + 1)
      possibleSubConnections.push(this.getNumberOfSubArrangements(remainingAdapters, memory))
    }
    const sumOfSubConnections = possibleSubConnections.reduce((cur, acc) => cur + acc, 0)
    // Add result to memory
    memory[currentAdapter] = sumOfSubConnections
    return sumOfSubConnections
  }

  /**
   * Wrapper for SubArrangements to enable memoization
   * @returns {number}
   */
  getNumberOfAdapterArrangements () {
    const memory = {}
    return this.getNumberOfSubArrangements(this.adapters, memory)
  }
}

module.exports = {
  AdapterHelper
}
