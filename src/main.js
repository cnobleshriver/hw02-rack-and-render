import { Game } from "./game.js";

// UI Components
const boardGridElement = document.getElementById("board");
const playButtonElement = document.getElementById("play");

// Game Board
const game = new Game();

window.Game = Game;

window.addEventListener("DOMContentLoaded", () => {
  // Initialize the game board
  game.render(boardGridElement);
});

// We check to make sure the play button exists before adding the event
// listener. You are to add the play button as part of this homework. If we do
// not test if it exists, the code will break when running the tests. You can
// safely remove this conditional after you add the play button.
if (playButtonElement) {
  playButtonElement.addEventListener("click", () => {
    let word = document.getElementById("word").value;
    let xInput = document.getElementById("x").value;
    let yInput = document.getElementById("y").value;
    let direction = document.getElementById("direction").value;
    let isHorizontal = direction === 'horizontal';

    let position = {x: parseInt(xInput), y: parseInt(yInput)};

    game.playAt(word, position, isHorizontal);
    game.render(document.getElementById("board"));
  });
}
