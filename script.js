// Create gameBoard array
const gameBoard = (function createGameBoard () {
    const board = [];
    let rows = 3;
    let columns = 3;
for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
        board[i][j] = 0;
    }
}
return board;})();

// Create player one object
const PlayerOne = (function createPlayerOne() {
    let name = "a"
    let value = "X"
    let score = 0
    return {name, value, score};
})();
// Create player two object
const PlayerTwo = (function createPlayerTwo() {
    let name = "b"
    let value = "O"
    let score = 0
    return {name, value, score};
})();
// Check tie condition
function checkTie () {
    let allNonZero = true;
for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
        if (gameBoard[i][j] === 0) {
            allNonZero = false;
            break;
        }
    }
    if (!allNonZero) {
        break;
    }
}
return allNonZero}
// Check win condition
function checkWinner(){
let i = 0;
let value = '';
if (gameBoard[i][i] === gameBoard[i][i+1] && gameBoard[i][i+1] === gameBoard[i][i+2] && gameBoard[i][i] !== 0) {value = gameBoard[i][i]} else
if (gameBoard[i+1][i] === gameBoard[i+1][i+1] && gameBoard[i+1][i+1] === gameBoard[i+1][i+2] && gameBoard[i+1][i+2] !== 0) {value = gameBoard[i+1][i]} else
if (gameBoard[i+2][i] === gameBoard[i+2][i+1] && gameBoard[i+2][i+1] === gameBoard[i+2][i+2] && gameBoard[i+2][i+2] !== 0) {value = gameBoard[i+2][i]} else
if (gameBoard[i][i] === gameBoard[i+1][i] && gameBoard[i+1][i] === gameBoard[i+2][i] && gameBoard[i+2][i] !== 0) {value = gameBoard[i][i]} else
if (gameBoard[i][i+1] === gameBoard[i+1][i+1] && gameBoard[i+1][i+1] === gameBoard[i+2][i+1] && gameBoard[i+2][i+1] !== 0) {value = gameBoard[i][i+1]} else
if (gameBoard[i][i+2] === gameBoard[i+1][i+2] && gameBoard[i+1][i+2] === gameBoard[i+2][i+2] && gameBoard[i+2][i+2] !== 0) {value = gameBoard[i][i+2]} else
if (gameBoard[i][i] === gameBoard[i+1][i+1] && gameBoard[i+1][i+1] === gameBoard[i+2][i+2] && gameBoard[i+2][i+2] !== 0) {value = gameBoard[i][i]} else
if (gameBoard[i][i+2] === gameBoard[i+1][i+1] && gameBoard[i+1][i+1] === gameBoard[i+2][i] && gameBoard[i+2][i] !== 0) {value = gameBoard[i][i+2]} else
if (checkTie()){ value = "tie"}
if (PlayerOne.value === value) {
    PlayerOne.score ++;
} else
if (PlayerTwo.value === value) {
    PlayerTwo.score ++;
}}