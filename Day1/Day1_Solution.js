/*
Find two entries in the input file that add up to 2020 and multiply them together
 */

const fs = require("fs")

const input = fs.readFileSync("Day1_Input.txt", "utf-8").split("\n").map(x => parseInt(x))

// Part 1
loop_breaker:
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
        if (i === j) continue
        if (input[i] + input[j] === 2020) {
            console.log(`Solution found at ${ input[i] } + ${ input[j] }! The solution is ${ input[i] * input[j] }`)
            break loop_breaker
        }
    }
}

// Part 2
loop_breaker:
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
        for (let k = 0; k < input.length; k++) {
            if (i === j || i === k || j === k) continue
            if (input[i] + input[j] + input[k] === 2020) {
                console.log(`Solution found at ${ input[i] } + ${ input[j] } + ${ input[k] }! The solution is ${ input[i] * input[j] * input[k] }`)
                break loop_breaker
            }
        }
    }
}