const { expect, describe, it, beforeAll } = require('@jest/globals')
const { XmasDecoder } = require('./Day9_Helper')

let xmasDecoder

describe('XMAS Decoder', () => {
  beforeAll(() => {
    xmasDecoder = new XmasDecoder('Day9_Input_Example.txt', 5)
  })

  it('initializes correctly', () => {
    expect(xmasDecoder.data[0]).toBe(35)
    expect(xmasDecoder.data.length).toBe(20)
    expect(xmasDecoder.preambleSize).toBe(5)
  })

  describe('getPreamble', () => {
    it('returns correct size of preamble', () => {
      expect(xmasDecoder.getPreambleTo(5).length).toBe(5)
    })

    it('returns correct elements in the preamble', () => {
      expect(xmasDecoder.getPreambleTo(5)[0]).toBe(35)
    })
  })

  describe('isValidAt', () => {
    it('identifies correct numbers', () => {
      expect(xmasDecoder.isValidAt(6)).toBe(true)
    })

    it('identifies incorrect numbers', () => {
      expect(xmasDecoder.isValidAt(14)).toBe(false)
    })
  })

  describe('findFirstInvalidNumber', () => {
    it('finds the correct number', () => {
      expect(xmasDecoder.findFirstInvalidNumber().number).toBe(127)
      expect(xmasDecoder.findFirstInvalidNumber().index).toBe(14)
    })
  })

  describe('findContiguousSet', () => {
    it('returns a set adding up to the given number', () => {
      expect(xmasDecoder.findContiguousSet(127).reduce((cur, acc) => cur + acc, 0)).toBe(127)
    })
    it('returns the correct numbers', () => {
      expect(xmasDecoder.findContiguousSet(127)).toStrictEqual([15, 25, 47, 40])
    })
  })
})
