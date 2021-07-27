const { expect, describe, it } = require('@jest/globals')
const { countAnswersPerGroup, countUnanimousAnswersPerGroup } = require('./Day6_Helper')

describe('Helper Functions', () => {
  describe('countAnswersPerGroup', () => {
    it('returns the number of unique answers of a single person', () => {
      expect(countAnswersPerGroup('abc')).toBe(3)
    })
    it('can multiple people / line breaks', () => {
      expect(countAnswersPerGroup('a\nb\nc')).toBe(3)
    })
    it('can handle duplicate answers', () => {
      expect(countAnswersPerGroup('ab\nac')).toBe(3)
      expect(countAnswersPerGroup('a\na\na\na')).toBe(1)
    })
  })
  describe('countUnanimousAnswersPerGroup', () => {
    it('returns the number of unanimous and unique answers of a single person', () => {
      expect(countUnanimousAnswersPerGroup('abc')).toBe(3)
    })
    it('can handle multiple people / line breaks', () => {
      expect(countUnanimousAnswersPerGroup('a\nb\nc')).toBe(0)
    })
    it('can handle duplicate answers', () => {
      expect(countUnanimousAnswersPerGroup('ab\nac')).toBe(1)
      expect(countUnanimousAnswersPerGroup('a\na\na\na')).toBe(1)
    })
  })
})
