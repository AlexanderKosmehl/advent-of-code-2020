const { expect, describe, it } = require('@jest/globals')
const { calculateSeatID, calculateRow, calculateColumn } = require('./Day5_Helper')

describe('helper Functions', () => {
  describe('calculateSeatID', () => {
    it('correctly calculates seatIDs based on a seatString', () => {
      expect(calculateSeatID('BFFFBBFRRR')).toBe(567)
      expect(calculateSeatID('FFFBBBFRRR')).toBe(119)
      expect(calculateSeatID('BBFFBBFRLL')).toBe(820)
    })
  })

  describe('calculateRow', () => {
    it('returns the correct row for a given rowString', () => {
      expect(calculateRow('FBFBBFF')).toBe(44)
      expect(calculateRow('BFFFBBF')).toBe(70)
      expect(calculateRow('FFFBBBF')).toBe(14)
      expect(calculateRow('BBFFBBF')).toBe(102)
    })
  })

  describe('calculateColumn', () => {
    it('returns the correct column for a given columnString', () => {
      expect(calculateColumn('RRR')).toBe(7)
      expect(calculateColumn('RLL')).toBe(4)
      expect(calculateColumn('RLR')).toBe(5)
    })
  })
})
