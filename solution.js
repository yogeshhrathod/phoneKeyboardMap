const readline = require('readline');

/**
 * Keyboard keys grid
 */
const KEYBOARD_GRID = [
    "1,2", "1,2", "1,2",
    "1,3", "1,3", "1,3",
    "2,1", "2,1", "2,1",
    "2,2", "2,2", "2,2",
    "2,3", "2,3", "2,3",
    "3,1", "3,1", "3,1", "3,4",
    "3,2", "3,2", "3,2",
    "3,3", "3,3", "3,3", "3,4",
]

/**
 * Symbol
 */
const SYMBOLS = {
    '*': [4, 1],
    ' ': [4, 2],
    '#': [4, 3],
    '0': [4, 2]
}

/**
 * read user input
 * @param {string} question 
 * @returns void
 */
function readInput(question) {
    const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve => reader.question(question, input => {
        reader.close();
        resolve(input);
    }))
}

/**
 * Calculate position of of character on keypad
 * @param {string} character 
 * @returns Array(Number,Number)
 */
function calculateKeyPosition(character) {
    validateInput(character)
    if (SYMBOLS[character])
        return SYMBOLS[character]

    if (!isNaN(character)) {
        const tempKeyBoardGrid = ["1,1", "1,1", "1,1", ...KEYBOARD_GRID]
        return tempKeyBoardGrid[(Number(character) * 3) - 1]?.split(',').map((pos) => Number(pos))
    }

    const characterPositionInGrid = character.toLowerCase().charCodeAt(0) - 'a'.toLowerCase().charCodeAt(0)
    return KEYBOARD_GRID[characterPositionInGrid]?.split(',').map((pos) => Number(pos))

}

/**
 * validate string 
 * string must contains Alphabet,Numbers and length of 1 else throw error
 * @param {string} input 
 */
function validateInput(input) {
    if (!/^[a-zA-z0-9\s*#]{1}$/.test(input))
        throw new Error("Please insert valid input");
}

/**
 * Main of application
 * @returns void
 */
async function start() {
    try {
        const input = await readInput("user input: ");
        if (input === "exit") {
            console.log("Good bye <3")
            return
        }

        const keyPosition = calculateKeyPosition(input);
        console.log(keyPosition);

        start();
    } catch (error) {
        console.error(error.message);
        start();
    }

}

start()