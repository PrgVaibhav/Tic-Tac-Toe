const boxes = document.querySelectorAll(".box");
const player1Score = document.querySelector(".player1-score");
const player2Score = document.querySelector(".player2-score");

const playerOneName = document.getElementById("player-one-name");
const playerTwoName = document.getElementById("player-two-name");

const startBtn = document.getElementById("start");

const player1Name = document.getElementById("player1");
const player2Name = document.getElementById("player2");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const restart = document.getElementById("restart-btn");

let count = true;
let playerOneScore = 0;
let playerTwoScore = 0;

const successAudio = new Audio("winner.mp3");

startBtn.addEventListener("click", getNames);

function getNames(e) {
  e.preventDefault();

  if (playerOneName.value === "" || playerTwoName.value === "") {
    alert("Please enter player names");
    return;
  }

  const playerOne = playerOneName.value;
  const playerTwo = playerTwoName.value;

  player1Name.innerHTML = playerOne;
  player2Name.innerHTML = playerTwo;

  playerOneName.value = "";
  playerTwoName.value = "";

  modal.classList.add("remove");
  overlay.classList.add("remove");
}

const winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

for (const box of boxes) {
  box.addEventListener("click", () => {
    if (count) {
      box.innerHTML = "X";
      box.classList.add("x");
      count = false;
    } else {
      box.innerHTML = "O";
      box.classList.add("o");
      count = true;
    }
    box.disabled = true;
    winner();
  });
}

function winner() {
  for (const pattern of winningPattern) {
    let p1 = boxes[pattern[0]].innerHTML;
    let p2 = boxes[pattern[1]].innerHTML;
    let p3 = boxes[pattern[2]].innerHTML;

    if (p1 !== "" && p1 === p2 && p2 === p3) {
      if (p1 === p2 && p2 === p3) {
        boxes[pattern[0]].classList.add("winner");
        boxes[pattern[1]].classList.add("winner");
        boxes[pattern[2]].classList.add("winner");
        successAudio.play();

        if (p1 === "X") {
          playerOneScore++;
          player1Score.innerHTML = playerOneScore;
        } else {
          playerTwoScore++;
          player2Score.innerHTML = playerTwoScore;
        }

        for (const box of boxes) {
          box.disabled = true;
        }
      }
    }
  }
}

restart.addEventListener("click", () => {
  for (const box of boxes) {
    box.innerHTML = "";
    box.classList.remove("x");
    box.classList.remove("o");
    box.classList.remove("winner");
    box.disabled = false;
  }
});
