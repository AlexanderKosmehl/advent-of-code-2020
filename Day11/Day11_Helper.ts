import { readFileSync } from 'fs'
import { resolve } from 'path'

export class SeatSimulation {
  seats: string[][]

  constructor (fileName: string) {
    const inputLines: string[] = readFileSync(resolve(__dirname, fileName), 'utf-8').split('\r\n')

    this.seats = inputLines.map(line => line.split(''))
  }

  seatShouldBecomeOccupied (row: number, column: number): boolean {
    if (this.seats[row][column] === '.' || this.seats[row][column] === '#') return false

    let occupiedSeats = 0
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = column - 1; j <= column + 1; j++) {
        // Out of bounds
        if (i < 0 || i >= this.seats[row].length || j < 0 || j >= this.seats.length) continue

        // The seat itself
        if (i === row && j === column) continue

        // Adjacent seat is empty
        if (this.seats[i][j] === '#') occupiedSeats++
      }
    }

    if (occupiedSeats === 0) return true
    else return false
  }

  seatShouldBecomeEmpty (row: number, column: number): boolean {
    if (this.seats[row][column] === '.' || this.seats[row][column] === 'L') return false

    let occupiedSeats = 0
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = column - 1; j <= column + 1; j++) {
        // Out of bounds
        if (i < 0 || i >= this.seats[row].length || j < 0 || j >= this.seats.length) continue

        // The seat itself
        if (i === row && j === column) continue

        // Adjacent seat is empty
        if (this.seats[i][j] === '#') occupiedSeats++
      }
    }

    if (occupiedSeats >= 4) return true
    else return false
  }

  calculateSimulationResult () {
    const simulatedSeats = this.seats.map(lines => lines.slice())
    for (let row = 0; row < this.seats.length; row++) {
      for (let column = 0; column < this.seats[row].length; column++) {
        // Replacement makes sure that the seat is unoccupied before filling it or vice versa
        if (this.seatShouldBecomeOccupied(row, column)) {
          simulatedSeats[row][column] = '#'
        } else if (this.seatShouldBecomeEmpty(row, column)) {
          simulatedSeats[row][column] = 'L'
        }
      }
    }
    this.seats = simulatedSeats
  }

  calculateStableOccupation () {
    let oldSeatOccupation = this.seats.map(lines => lines.slice())
    this.calculateSimulationResult()
    while (!equals(oldSeatOccupation, this.seats)) {
      oldSeatOccupation = this.seats.map(lines => lines.slice())
      this.calculateSimulationResult()
    }
  }

  countOccupiedSeats (): number {
    let emptySeats = 0
    for (const line of this.seats) {
      for (const seat of line) {
        if (seat === '#') emptySeats++
      }
    }
    return emptySeats
  }
}

function equals (a: string[][], b: string[][]): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}
