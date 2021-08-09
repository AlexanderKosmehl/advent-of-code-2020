import { describe, test, beforeEach, expect } from '@jest/globals'
import { SeatSimulation } from './Day11_Helper'

let seatSimulation: SeatSimulation

describe('SeatSimulation', () => {
  beforeEach(() => {
    seatSimulation = new SeatSimulation('Day11_Input_Example.txt')
  })

  test('was correctly initialized', () => {
    expect(seatSimulation.seats[0].join('')).toBe('L.LL.LL.LL')
    expect(seatSimulation.seats.length).toBe(10)
  })

  test('should identify suitable seat to occupy', () => {
    expect(seatSimulation.seatShouldBecomeOccupied(0, 0)).toBe(true)
    expect(seatSimulation.seatShouldBecomeOccupied(0, 1)).toBe(false)
    expect(seatSimulation.seatShouldBecomeOccupied(3, 3)).toBe(true)
  })

  test('should identify insuitable seats for occupation', () => {
    seatSimulation.calculateSimulationResult()
    expect(seatSimulation.seatShouldBecomeEmpty(0, 0)).toBe(false)
    expect(seatSimulation.seatShouldBecomeEmpty(0, 2)).toBe(true)
  })

  test('should calculate new occupations', () => {
    seatSimulation.calculateSimulationResult()
    expect(seatSimulation.seats[0].join('')).toEqual('#.##.##.##')
  })

  test('should calculate stable seat occupation', () => {
    seatSimulation.calculateStableOccupation()
    expect(seatSimulation.seats[0].join('')).toBe('#.#L.L#.##')
  })

  test('should calculate correct amount of occupied seats in stable occupation', () => {
    seatSimulation.calculateStableOccupation()
    expect(seatSimulation.countOccupiedSeats()).toBe(37)
  })
})
