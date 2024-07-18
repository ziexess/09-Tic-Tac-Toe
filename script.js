// Create gameBoard array
const board = [];
let playerOne;
let playerTwo;
const inputField = document.querySelector(".input-field");
function gameBoard () {
    let gameWon = false;
    const result = () => gameWon;
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
        // check for rows
        for (let rowIndex=0; rowIndex < board.length; rowIndex++) {
            
            if (board[rowIndex].every(cell => cell === board[rowIndex][0] ) && board[rowIndex][0] !== "") {
                value = board[rowIndex][0];
                gameWon= true;
                break;
            }
        }
        // check for cols
        for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
            if (board.every(row => row[colIndex] === board[0][colIndex] ) && board[0][colIndex] !== "" ) {
                value = board[0][colIndex];
                gameWon= true;
                break;
            }
        }
        let diags1 = [];
        let diags2 = [];
        for (i=0; i<board.length; i++) {
            diags1[i] = board[i][i];
            diags2[i] = board[i][2-i];
        }
        if(diags1.every(cell => cell === diags1[0]) && diags1[0] !== "" ) {
            value = diags1[0];
            gameWon = true;
        }
        if (diags2.every(cell => cell === diags2[0]) && diags2[0] !== "") {
            value = diags2[0];
            gameWon = true;
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

        const checkTie = () => {
            let allNonZero = true;
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === "") {
                        allNonZero = false;
                        break;
                    }
                }
                if (!allNonZero) {
                    break;
                }
            }
        return allNonZero}

    const handleWinner = (player, value) => {
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
            gameWon = false;
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
                if (!result() && event.target.textContent === "") {
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
        return {createBoard, getBoard, winner, render, reset, result}
    };

// Create players factory function
function GenPlayer (name, value) {
    let score = 0;
    const getScore = () => score;
    const addScore = () => score++;
    return {name, value, getScore, addScore};
};
   


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