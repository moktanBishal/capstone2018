let deck2 = [13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 
  9, 10, 11, 12, 13,1, 2, 3, 4, 5, 6, 7, 8, 
  5, 6, 7, 8, 9, 1, 2, 3, 11, 12, 13, 4, 10,
  1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9];

for (let k = 0; k < 4; k++) {
  // Shuffle the deck of cards using Fisher-Yates algorithm
  for (let i = deck2.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck2[i], deck2[j]] = [deck2[j], deck2[i]];
  }

}

const game = document.getElementById("game");

const pickedCard = document.createElement('h3');

// Pick a random card from the shuffled deck
let pickedIndex = Math.floor(Math.random() * deck2.length);
let picked = deck2[pickedIndex];

pickedCard.textContent = `You picked ${picked}`;
game.appendChild(pickedCard);

console.log(`Deck: ${deck2}`);
console.log(`You picked ${picked} which has index of ${pickedIndex}`);
deck2.splice(pickedIndex,1);
// Rearrange the deck in a new array
let deck = deck2.slice(pickedIndex).concat(deck2.slice(0, pickedIndex));
console.log(`Deck: ${deck.length}`);

const test = document.createElement('p');
test.textContent = `Deck: ${deck2.slice(pickedIndex).concat(deck2.slice(0, pickedIndex))}`;
game.appendChild(test);

// Split the deck into two arrays, a and b
let a = [];
let b = [];

for (let i = 0; i < deck.length; i++) {
  i % 2 === 0 ? a.push(deck[i]) : b.push(deck[i]);
}

// Initialize the index counter
let k = 0;

// Use setInterval for a delayed loop with 1-second intervals
const intervalId = setInterval(() => {
  const round = document.getElementById("round");
  const result = document.getElementById("result");

  const play = document.createElement('p');
  const winner = document.createElement('h3');
  if (k < deck.length) {
    play.innerHTML = `<h5>Round ${k+1}</h5>  ${a[k]} vs ${b[k]}`;
    round.appendChild(play);
    console.log(`${a[k]} vs ${b[k]}`);
    // Check if the picked card matches with player A's card
    if (picked === a[k]) {
      winner.textContent = `A wins!`;
      result.appendChild(winner);
      console.log(`A wins!`);
      clearInterval(intervalId); // Stop the interval when A wins
    }
    // Check if the picked card matches with player B's card
    else if (picked === b[k]) {
      winner.textContent = `B wins!`;
      result.appendChild(winner);
      console.log(`B wins!`);
      clearInterval(intervalId); // Stop the interval when B wins
    }
    k++;
  } else {
    winner.textContent = `No winner in this round.`;
    result.appendChild(winner);
    console.log("No winner in this round.");
    clearInterval(intervalId); // Stop the interval when the loop completes
  }
}, 1500); // Delay each iteration by 1 second
