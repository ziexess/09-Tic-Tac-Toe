// Create gameBoard array
const board = [];
let playerOne;
let playerTwo;
const inputField = document.querySelector(".input-field");
function gameBoard () {
    const announcment = document.querySelector(".announcment");
    const container = document.getElementById("game-board");
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
        let value = '';
        for (let rowIndex=0; rowIndex < board.length; rowIndex++) {
            
            if (board[rowIndex].every(cell => cell === board[rowIndex][0] ) && board[rowIndex][0] !== "") {
                value = board[rowIndex][0];
                break;
            }
        }
        for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
            if (board.every(row => row[colIndex] === board[0][colIndex] ) && board[0][colIndex] !== "" ) {
                value = board[0][colIndex];
                break;
            }
        }
        // check for tie
        if (checkTie()){
            value = "tie";
            handleWinner("", value)}
        if (playerOne.value === value) {
            handleWinner(playerOne, value);
        } else
        if (playerTwo.value === value) {
            handleWinner(playerTwo, value);
        } else {return value}
        }

    function handleWinner(player, value) {
        if (value !== "tie") {
            player.addScore();
            reset();
            announcment.textContent = `The Winner is ${player.name} with score of ${player.getScore()}!`
        } else {
            reset();
            announcment.textContent = `it's a TIE!`
        }
        const newRound = document.createElement("button");
        newRound.textContent = "New Round!"
        inputField.appendChild(newRound);
        newRound.addEventListener("click", () => {
            announcment.textContent = ""
            createBoard();
            render();
            inputField.removeChild(newRound);
        })
    }
    const render = () => {        
        board.map((row, rowIndex) => {
            return row.map((item, colIndex) => {
            const newDiv = document.createElement("div");
            newDiv.textContent = item;
            newDiv.setAttribute("data-index", `${rowIndex}-${colIndex}`);
            newDiv.addEventListener("click", (event) => {
                if (!winner() && event.target.textContent === "") {
                    event.target.textContent = current;
                    board[rowIndex][colIndex] = current;
                    alternate()();
                    if (current === playerOne.value) {announcment.textContent = `${playerOne.name}'s turn`} else 
                    if (current === playerTwo.value) {announcment.textContent = `${playerTwo.name}'s turn`}
                    winner();
                }
            });
            container.appendChild(newDiv);
            });
        });
        if (current === playerOne.value) {announcment.textContent = `${playerOne.name}'s turn`} else 
        if (current === playerTwo.value) {announcment.textContent = `${playerTwo.name}'s turn`}
    }
    const reset = () => {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
    }
        return {createBoard, getBoard, winner, render, reset}
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
            if (gameBoard().getBoard()[i][j] === "") {
                allNonZero = false;
                break;
            }
        }
        if (!allNonZero) {
            break;
        }
    }
return allNonZero}

function newRound () {
    announcment.textContent = ""
    gameBoard().createBoard();
    gameBoard().render();
}
// DOM methods
function playerNames() {
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

let current = "X";
function alternate() {
  
    return function() {
      const temp = current;
      current = current === playerOne.value ? playerTwo.value : playerOne.value;
      return temp;
    };
  }