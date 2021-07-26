const rows = 128
const columns = 8

/**
 * Calculates a seats row based on a given rowString
 * @param {string} rowString
 * @returns {number}
 */
function calculateRow (rowString) {
  let low = 0
  let high = rows - 1
  for (const char of rowString) {
    if (char === 'F') {
      high = high - Math.ceil((high - low) / 2)
    } else { // Assume 'B'
      low = low + Math.ceil((high - low) / 2)
    }
  }
  return low
}

/**
 * Calculates a seats row based on a given rowString
 * @param {string} columnString
 * @returns {number}
 */
function calculateColumn (columnString) {
  let low = 0
  let high = columns - 1
  for (const char of columnString) {
    if (char === 'L') {
      high = high - Math.ceil((high - low) / 2)
    } else { // Assume 'R'
      low = low + Math.ceil((high - low) / 2)
    }
  }
  return low
}

/**
 * Calculates a seats ID based on the seatString on a passport
 * @param {string} seatString
 * @returns {number}
 */
function calculateSeatID (seatString) {
  const rowString = seatString.substring(0, 8)
  const columnString = seatString.substring(7)
  const row = calculateRow(rowString)
  const column = calculateColumn(columnString)
  return row * 8 + column
}

module.exports = {
  calculateRow,
  calculateColumn,
  calculateSeatID
}
