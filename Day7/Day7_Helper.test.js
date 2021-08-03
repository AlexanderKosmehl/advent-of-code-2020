const { describe, it, beforeAll, expect } = require('@jest/globals')
const { RuleModel } = require('./Day7_Helper')

let ruleModel

describe('RuleModel', () => {
  beforeAll(() => {
    ruleModel = new RuleModel('Day7_Input_Example.txt')
  })
  describe('Model', () => {
    it('getsBuild', () => {
      expect(ruleModel).toBeTruthy()
    })
    it('has correct number of rules', () => {
      expect(ruleModel.rules.length).toBe(9)
    })
    it('contains correct colors', () => {
      expect(ruleModel.rules.filter(bag => bag.color === 'dotted black').length).toBe(1)
      expect(ruleModel.rules.filter(bag => bag.color === 'shiny gold').length).toBe(1)
      expect(ruleModel.rules.filter(bag => bag.color === 'light red').length).toBe(1)
    })
    it('has correct contents for each bag', () => {
      const lightRed = ruleModel.rules.find(bag => bag.color === 'light red')
      expect(lightRed.contents.find(content => content.color === 'bright white').amount).toBe(1)
      expect(lightRed.contents.find(content => content.color === 'muted yellow').amount).toBe(2)
      expect(lightRed.contents.find(content => content.color === 'dotted black')).toBeFalsy()
    })
  })

  describe('canContain', () => {
    it('returns true if a container directly contains a color', () => {
      expect(ruleModel.canContain('bright white', 'shiny gold')).toBe(true)
      expect(ruleModel.canContain('muted yellow', 'shiny gold')).toBe(true)
    })
    it('returns true if a container indirectly contains a color', () => {
      expect(ruleModel.canContain('dark orange', 'shiny gold')).toBe(true)
      expect(ruleModel.canContain('light red', 'shiny gold')).toBe(true)
    })
    it('returns false if a container does not contain a color at all', () => {
      expect(ruleModel.canContain('dotted black', 'shiny gold')).toBe(false)
      expect(ruleModel.canContain('dark olive', 'shiny gold')).toBe(false)
      expect(ruleModel.canContain('shiny gold', 'shiny gold')).toBe(false)
    })
  })

  describe('getAmountOfContainersContaining', () => {
    it('returns the correct number of bags', () => {
      expect(ruleModel.getAmountOfContainersContaining('shiny gold')).toBe(4)
    })
  })

  describe('getAmountOfSubContainers', () => {
    beforeAll(() => {
      ruleModel = new RuleModel('Day7_Input_Example2.txt')
    })
    it('returns 0 if container does not contain any bags', () => {
      expect(ruleModel.getAmountOfSubContainers('dark violet')).toBe(0)
    })
    it('returns correct amount of contained bags', () => {
      expect(ruleModel.getAmountOfSubContainers('dark blue')).toBe(2)
      expect(ruleModel.getAmountOfSubContainers('dark green')).toBe(6)
      expect(ruleModel.getAmountOfSubContainers('shiny gold')).toBe(126)
    })
  })
})
