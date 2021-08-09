import { SeatSimulation } from './Day11_Helper'

const seatSimulation = new SeatSimulation('Day11_Input.txt')
seatSimulation.calculateStableOccupation()

console.log('Solution to part 1: ', seatSimulation.countOccupiedSeats())
