import { scoring } from "./scoring.js";

// Given shuffle algorithm for picking words in a bag
function shuffle(array) {
  // Fisher-Yates shuffle, used for random decoder cipher below
  let m = array.length;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    let i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    let t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

export class Game {
  // Private fields
  #bag; // The bag of tiles
  #grid; // The game board

  constructor() {
    this.#bag = this.#initBag();
    this.#grid = this.#initGrid();
  }

  #initBag() {
    // TASK #1: Implement the initBag method
    const bag = [];
    const freq = {
      'e': 12, 'a': 9, 'i': 9, 'o': 8, 'n': 6, 'r': 6, 't': 6, 
      'd': 4, 'l': 4, 's': 4, 'u': 4, 'g': 3, 'b': 2, 'c': 2, 
      'f': 2, 'h': 2, 'm': 2, 'p': 2, 'v': 2, 'w': 2, 'y': 2, 
      'j': 1, 'k': 1, 'q': 1, 'x': 1, 'z': 1, '*': 2
    }
    for (let letter in freq) {
      for (let i = 0; i < freq[letter]; i++) {
        bag.push(letter);
      }
    }
    return shuffle(bag);
  }

  #initGrid() {
    // TASK #3: Implement the initGrid method
    const grid = [];
    grid.push(undefined)
    for (let j = 1; j < 16; j++) {
      let row = [];
      for (let i = 0; i < 16; i++) {
        if (i === 0) {
          row.push(undefined);
        } else {
          row.push(null);
        }
      }
      grid.push(row);
    }
    return grid;
  }

  /**
   * This function removes the first n tiles from the bag and returns them. If n
   * is greater than the number of remaining tiles, this removes and returns all
   * the tiles from the bag. If the bag is empty, this returns an empty array.
   * @param {number} n The number of tiles to take from the bag.
   * @returns {Array<string>} The first n tiles removed from the bag.
   */
  takeFromBag(n) {
    // TASK #5: Implement the takeFromBag method
    let k = Math.min(n, this.#bag.length);
    res = [];
    for (let i = 0; i < k; i++) {
      res.push(n.shift());
    }
    return res;
  }

  #canBePlacedOnBoard(word, position, direction) {
    // TASK #4.1: Implement the #canBePlacedOnBoard method
    let x = position.x;
    let y = position.y;
    if (direction) {
      if (x + word.length - 1 > 15 || x < 1) {
        return false
      }
    } else {
      if (y + word.length - 1 > 15 || y < 1) {
        return false
      }
    }
    for (let i = 0; i < word.length; i++) {
      let char = direction ? this.#grid[y][x + i] : this.#grid[y + i][x];
      if (char !== null && char !== word[i]) {
        return false
      }
    }
    return true;
  }

  #placeOnBoard(word, position, direction) {
    // TASK #4.2: Implement the #placeOnBoard method
    let x = position.x;
    let y = position.y;
    for (let i = 0; i < word.length; i++) {
      if (direction) {
        this.#grid[y][x + i] = word[i]
      } else {
        this.#grid[y + i][x] = word[i]
      }
    }
    console.log(this.#grid);
  }

  /**
   * This function will be called when a player takes a turn and attempts to
   * place a word on the board. It will check whether the word can be placed at
   * the given position. If not, it'll return -1. It will then compute the score
   * that the word will receive and return it, taking into account special
   * positions.
   *
   * @param {string} word The word to be placed.
   * @param {Object<x|y, number>} position The position, an object with
   * properties x and y. Example: { x: 2, y: 3 }.
   * @param {boolean} direction Set to true if horizontal, false if vertical.
   * @returns {number} The score the word will obtain (including special tiles),
   * or -1 if the word cannot be placed.
   */
  playAt(word, position, direction) {
    // We first check if the word can be placed
    if (!this.#canBePlacedOnBoard(word, position, direction)) {
      return -1;
    }

    // Place the word on the board
    this.#placeOnBoard(word, position, direction);

    // Compute the score
    return scoring.score(word, position, direction);
  }

  render(element) {
    // TASK #7: Implement the render method
    element.innerHTML = "";
    for (let i = 1; i <= 15; i++) {
      for (let j = 1; j <= 15; j++) {
        let div = document.createElement("div");
        let cell = this.#grid[j][i];
        if (cell) {
          div.innerText = cell;
        } else {
          div.innerText = "";
        }
        div.classList.add("grid-item");
        let scoringClass = scoring.label(i, j);
        if (scoringClass) {
          div.classList.add(scoringClass);
        }
        element.appendChild(div);
      }
    }
  }

  // These functions are used by the auto-grader to check your implementation.
  // You can ignore them as part of the rest of the implementation, but feel
  // free to use them for your own testing purposes.
  testGetBag() {
    return this.#bag;
  }

  testGetGrid() {
    return this.#grid;
  }

  testCanBePlacedOnBoard(word, position, direction) {
    return this.#canBePlacedOnBoard(word, position, direction);
  }

  testPlaceOnBoard(word, position, direction) {
    this.#placeOnBoard(word, position, direction);
  }
}
