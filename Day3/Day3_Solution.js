/*
https://adventofcode.com/2020/day/3
 */

const fs = require("fs")
let input = fs.readFileSync("Day3_Input.txt", "utf-8").split("\r\n")

/**
 * Counts trees on the path according to the parameters
 *
 * @param rightDistance - Steps to the right
 * @param downDistance - Steps down
 * @returns {number} - Number of trees along the way
 */
function treeChecker(rightDistance, downDistance) {
    let j = 0
    let trees = 0

    for (let i = 0; i < input.length; i += downDistance) {
        if (input[i][j] === "#") {
            trees += 1
        }

        // Simulate endless repeating pattern with module
        j = (j + rightDistance) % input[0].length
    }

    return trees
}

console.log(`Number of trees found in the first puzzle: ${treeChecker(3,1)}`)

let secondSolution = treeChecker(1,1)
    * treeChecker(3,1)
    * treeChecker(5,1)
    * treeChecker(7,1)
    * treeChecker(1,2)

console.log(`Second solution: ${secondSolution}`)

