const { expect, describe, it, beforeAll } = require('@jest/globals')
const { BootCodeInterpreter } = require('./Day8_Helper')

let bootCodeInterpreter

describe('BootCodeInterpreter', () => {
  beforeAll(() => {
    bootCodeInterpreter = new BootCodeInterpreter('Day8_Input_Example.txt')
  })

  describe('Initialization', () => {
    it('has correct number of statements', () => {
      expect(bootCodeInterpreter.statements.length).toBe(9)
    })

    it('statements contain correct values', () => {
      expect('operation' in bootCodeInterpreter.statements[0]).toBe(true)
      expect(bootCodeInterpreter.statements[0].operation).toBe('nop')

      expect('argument' in bootCodeInterpreter.statements[0]).toBe(true)
      expect(bootCodeInterpreter.statements[0].argument).toBe(0)
    })
  })

  describe('loopDetection', () => {
    it('detects the loop correctly', () => {
      expect(bootCodeInterpreter.executeBootCode().loop).toBe(true)
    })
    it('returns correct accumulator value', () => {
      expect(bootCodeInterpreter.executeBootCode().accumulator).toBe(5)
    })
  })

  describe('loopFix', () => {
    it('returns position of corrupted statement', () => {
      expect(bootCodeInterpreter.fixLoop().position).toBe(7)
    })

    it('returns correct value of accumulator after fixing the code', () => {
      expect(bootCodeInterpreter.fixLoop().accumulator).toBe(8)
    })
  })
})
