const { describe, test, expect, beforeAll } = require('@jest/globals')
const { AdapterHelper } = require('./Day10_Helper')

let adapterHelper

describe('AdapterHelper', () => {
  beforeAll(() => {
    adapterHelper = new AdapterHelper('Day10_Input_Example.txt')
  })

  test('should initialize correctly', () => {
    // All adapters are included
    expect(adapterHelper.adapters.length).toBe(33)
    // List of adapters is properly sorted
    expect(adapterHelper.adapters[0]).toBe(0)
  })

  test('should return correct joltage distribution', () => {
    expect(adapterHelper.getJoltageDistribution()).toStrictEqual([22, 0, 10])
  })

  test('should return correct number of possible adapter arrangements', () => {
    expect(adapterHelper.getNumberOfAdapterArrangements()).toBe(19208)
  })
})
