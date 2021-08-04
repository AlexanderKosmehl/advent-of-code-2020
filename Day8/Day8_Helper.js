const path = require('path')
const fs = require('fs')

/**
 * A BootCodeInterpreter capable of handling code files and executing certain operations over them.
 */
class BootCodeInterpreter {
  constructor (fileName) {
    const inputLines = fs.readFileSync(path.resolve(__dirname, fileName), 'utf-8').split('\r\n')

    /**
     * List of all statements in the BootCode formatted as objects
     * @property { { operation: string, argument: number }[] } statement
     * */
    this.statements = inputLines.map(line => {
      const lineParts = line.split(' ')
      return {
        operation: lineParts[0],
        argument: Number(lineParts[1])
      }
    })
  }

  /**
   * Executes the Interpreter Statements and returns the accumulator value
   * if a loop is detected or the program terminates successfully
   * @returns {number}
   */
  executeBootCode () {
    let nextOp = 0
    let accumulator = 0
    const pastOps = []

    while (true) {
      // Detect loop
      if (pastOps.includes(nextOp)) {
        return {
          loop: true,
          accumulator
        }
      }

      // Detect successful termination
      if (nextOp === this.statements.length) {
        return {
          loop: false,
          accumulator
        }
      }

      // Handle Code Interpretation
      const todo = this.statements[nextOp]
      pastOps.push(nextOp)

      if (todo.operation === 'nop') {
        nextOp++
      } else if (todo.operation === 'acc') {
        accumulator += todo.argument
        nextOp++
      } else if (todo.operation === 'jmp') {
        nextOp += todo.argument
      }
    }
  }

  fixLoop () {
    for (let index = 0; index < this.statements.length; index++) {
      if (this.statements[index].operation === 'nop' || this.statements[index].operation === 'jmp') {
        /*
          Safe the original code for later trials by creating a 'deep' copy of the array in which every object gets recreated.
          This has to be done because an array COPY contains the same OBJECT references even though it is a new array
          in which case the objects would still be changed in both arrays which is what we want to avoid.
         */
        const originalStatements = this.statements.map(object => ({ ...object }))

        // Attempt fix
        if (this.statements[index].operation === 'nop') {
          this.statements[index].operation = 'jmp'
        } else {
          this.statements[index].operation = 'nop'
        }

        // Evaluate fix
        const results = this.executeBootCode()
        if (!results.loop) {
          // Return the position and results of the fix
          return {
            position: index,
            accumulator: results.accumulator
          }
        } else {
          // Restore the original statements and continue
          this.statements = originalStatements
        }
      }
    }
  }
}

module.exports = {
  BootCodeInterpreter
}
