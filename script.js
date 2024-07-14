// Create gameBoard array
const board = [];
function gameBoard () {
    const createBoard = () => {
    let rows = 3;
    let columns = 3;
    for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
        board[i][j] = "";
    }
    }
    }
    
    const getBoard = () => board;
    // Check win condition
    const winner = () => {
        let i = 0;
        let value = '';
        if (board[i][i] === board[i][i+1] && board[i][i+1] === board[i][i+2] && board[i][i] !== "") {value = board[i][i]}  else
        if (board[i+1][i] === board[i+1][i+1] && board[i+1][i+1] === board[i+1][i+2] && board[i+1][i+2] !== "") {value = board[i+1][i]} else
        if (board[i+2][i] === board[i+2][i+1] && board[i+2][i+1] === board[i+2][i+2] && board[i+2][i+2] !== "") {value = board[i+2][i]} else
        if (board[i][i] === board[i+1][i] && board[i+1][i] === board[i+2][i] && board[i+2][i] !== "") {value = board[i][i]} else
        if (board[i][i+1] === board[i+1][i+1] && board[i+1][i+1] === board[i+2][i+1] && board[i+2][i+1] !== "") {value = board[i][i+1]} else
        if (board[i][i+2] === board[i+1][i+2] && board[i+1][i+2] === board[i+2][i+2] && board[i+2][i+2] !== "") {value = board[i][i+2]} else
        if (board[i][i] === board[i+1][i+1] && board[i+1][i+1] === board[i+2][i+2] && board[i+2][i+2] !== "") {value = board[i][i]} else
        if (board[i][i+2] === board[i+1][i+1] && board[i+1][i+1] === board[i+2][i] && board[i+2][i] !== "") {value = board[i][i+2]} else
        if (checkTie()){
            value = "tie";
            return value;}
        if (playerOne.value === value) {
            playerOne.addScore();
            return playerOne.name;
        } else
        if (playerTwo.value === value) {
            playerTwo.addScore();
            return playerTwo.name;} else {return value}
        }
    const render = () => {
        const container = document.getElementById("game-board");
        
        board.map((row, rowIndex) => {
            return row.map((item, colIndex) => {
            const newDiv = document.createElement("div");
            newDiv.textContent = item;
            newDiv.setAttribute("data-index", `${rowIndex}-${colIndex}`);
        
            newDiv.addEventListener("click", (event) => {
                // shall alternate between players
                const updatedValue = "X"; 
        
                event.target.textContent = updatedValue;
        
                board[rowIndex][colIndex] = updatedValue;
            });
        
            container.appendChild(newDiv);
        
            });
        });
        }
        return {createBoard, getBoard, winner, render}
    };

// Create players factory function
function GenPlayer (name, value) {
    let score = 0;
    const getScore = () => score;
    const addScore = () => score++;
    return {name, value, getScore, addScore};
};
// Check tie condition
function checkTie () {
    let allNonZero = true;
    for (let i = 0; i < gameBoard().getBoard().length; i++) {
        for (let j = 0; j < gameBoard().getBoard()[i].length; j++) {
            if (gameBoard().getBoard()[i][j] === 0) {
                allNonZero = false;
                break;
            }
        }
        if (!allNonZero) {
            break;
        }
    }
return allNonZero}
// DOM methods
let playerOne;
let playerTwo;
function playerNames() {
    const inputField = document.querySelector(".input-field");
    const firstInput = document.querySelector(".first-input");
    const secondInput = document.querySelector(".second-input");
    const label1 = document.createElement("label");
    label1.textContent = "Player 1 (X) name:"
    const input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    const label2 = document.createElement("label");
    label2.textContent = "Player 2 (O) name:"
    const input2 = document.createElement("input");
    input2.setAttribute("type", "text");
    const button = document.createElement("button");
    button.textContent = "START";
    firstInput.appendChild(label1);
    firstInput.appendChild(input1);
    secondInput.appendChild(label2);
    secondInput.appendChild(input2);
    inputField.appendChild(button);
    // click handler to take each name
    button.addEventListener("click", () => {
        if (input1.value !== "" && input2.value !== "") {
            playerOne = GenPlayer(input1.value, "X");
            playerTwo = GenPlayer(input2.value, "O");
            firstInput.removeChild(label1);
            firstInput.removeChild(input1);
            secondInput.removeChild(label2);
            secondInput.removeChild(input2);
            inputField.removeChild(button);
            gameBoard().createBoard();
            gameBoard().render();
            }
    })  };
playerNames();