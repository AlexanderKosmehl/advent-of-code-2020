const path = require('path')
const fs = require('fs')

class XmasDecoder {
  constructor (fileName, preambleSize) {
    const inputLines = fs.readFileSync(path.resolve(__dirname, fileName), 'utf-8').split('\r\n')

    /**
     * List of all transmitted numbers
     * @property {number[]} data
     */
    this.data = inputLines.map(line => Number(line))

    /**
     * Size of the preamble.
     * The preamble is the number of data entries leading up to a data entry containing transmitted data.
     * Two of the numbers in the preamble of each entry have to add up to this entry to make in a meaningful one.
     * @property {number} preambleSize
     */
    this.preambleSize = preambleSize
  }

  /**
   * Returns the preamble to an index
   * @param {number} index
   * @returns {number[]}
   */
  getPreambleTo (index) {
    return this.data.slice(index - (this.preambleSize), index)
  }

  /**
   * Checks whether a number at a given index is the sum of two different numbers in its preamble
   * @param {number} index
   * @returns {boolean}
   */
  isValidAt (index) {
    const preamble = this.getPreambleTo(index)
    const numberToCheck = this.data[index]

    for (const i of preamble) {
      for (const j of preamble) {
        if (i + j === numberToCheck && i !== j) return true
      }
    }
    return false
  }

  /**
   * Iterates through the data and returns the an object containing the index of and the number itself which is not a sum of two different numbers in its preamble
   * @param {number} index
   * @returns {{index: number, number: number}
   */
  findFirstInvalidNumber (index) {
    for (let i = this.preambleSize; i < this.data.length; i++) {
      if (!this.isValidAt(i)) return { index: i, number: this.data[i] }
    }
  }

  /**
   * Iterates through the data and returns the subset of contiguous numbers which add up to the passed number
   * @param {number} number
   * @returns {number[]}
   */
  findContiguousSet (number) {
    for (let end = 0; end < this.data.findIndex(element => element === number); end++) {
      for (let start = 0; start < end; start++) {
        const subset = this.data.slice(start, end)
        if (subset.reduce((cur, acc) => cur + acc, 0) === number) return subset
      }
    }
  }
}

module.exports = {
  XmasDecoder
}
