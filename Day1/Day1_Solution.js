/*
Find two entries in the input file that add up to 2020 and multiply them together
 */

const fs = require("fs")

const input = fs.readFileSync("Day1_Input.txt", "utf-8").split("\n").map(x => parseInt(x))

// Part 1
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
        if (i === j) continue
        if (input[i] + input[j] === 2020) {
            console.log(`Solution found at ${input[i]} + ${input[j]}! The solution is ${input[i]*input[j]}`)
            return
        }
    }
}
