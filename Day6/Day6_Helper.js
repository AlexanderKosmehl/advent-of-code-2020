/**
 * Counts all unique answers in a group
 * @param {string} answerGroup
 * @returns {number}
 */
function countAnswersPerGroup (answerGroup) {
  const answers = new Set()
  answerGroup = answerGroup.replace(/\n|\r\n/g, '')
  for (const letter of answerGroup) {
    answers.add(letter)
  }
  return answers.size
}

/**
 * Counts all unanimous answers in a group
 * @param {string} answerGroup
 * @returns {number}
 */
function countUnanimousAnswersPerGroup (answerGroup) {
  const answers = new Set()
  const individualResponses = answerGroup.split(/\n|\r\n/g)
  for (const letter of individualResponses[0]) {
    if (individualResponses.every(response => response.includes(letter))) answers.add(letter)
  }
  return answers.size
}

module.exports = {
  countAnswersPerGroup,
  countUnanimousAnswersPerGroup
}
