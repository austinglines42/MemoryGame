const gameContainer = document.getElementById('game');
const resetButton = document.querySelector('#reset');
const scoreNum = document.querySelector('#score');
const maxScoreNum = document.querySelector('#max-score');
const startGame = document.querySelector('#start-game');
const cardCount = document.querySelector('#card-count');

let cardsSelected = 0;
let firstCard;
let secondCard;
let score = 0;
let maxScore = localStorage.getItem('maxScore');
let correctMatches = 0;
let numCards = 5;

let COLORS = [];

// Setting localStorage
if (maxScore == "null") {
	localStorage.setItem('maxScore', 0);
	maxScore = 0;
}
updateMaxScore();

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

//let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	let i = 0;
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);
		newDiv.dataset.id = i;

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
		i++;
	}
}

// TODO: Implement this function!
function handleCardClick(event) {
	// you can use event.target to see which element was clicked
	if (!(event.target === firstCard) && event.target.classList.item(1) !== 'matched') {
		if (cardsSelected == 0) {
			event.target.style.backgroundColor = event.target.classList.item(0);
			firstCard = event.target;
			cardsSelected++;
		} else if (cardsSelected == 1) {
			score++;
			updateScore();
			event.target.style.backgroundColor = event.target.classList.item(0);
			secondCard = event.target;
			cardsSelected++;
			if (firstCard.classList.item(0) === secondCard.classList.item(0)) {
				firstCard.classList.add('matched');
				secondCard.classList.add('matched');
				correctMatches++;
				if (correctMatches === numCards) {
					if (maxScore === 0) {
						maxScore = score;
						updateMaxScore();
					} else if (maxScore > score) {
						maxScore = score;
						updateMaxScore();
					}
				}
				firstCard = null;
				secondCard = null;
				cardsSelected = 0;
			} else {
				setTimeout(function() {
					firstCard.style.backgroundColor = 'white';
					secondCard.style.backgroundColor = 'white';
					firstCard = null;
					secondCard = null;
					cardsSelected = 0;
				}, 1000);
			}
		}
	}
}

// when the DOM loads
//createDivsForColors(shuffledColors);

startGame.addEventListener('click', function(e) {
	e.preventDefault();
	cardsSelected = 0;
	firstCard = null;
	secondCard = null;
	numCards = parseInt(cardCount.value);
	COLORS = generateArray(numCards);
	score = 0;
	updateScore();
	correctMatches = 0;
	gameContainer.innerHTML = '';
	createDivsForColors(shuffle(COLORS));
});

// Resets the game
resetButton.addEventListener('click', function() {
	cardsSelected = 0;
	firstCard = null;
	secondCard = null;
	score = 0;
	updateScore();
	correctMatches = 0;
	gameContainer.innerHTML = '';
	createDivsForColors(shuffle(COLORS));
});

function updateScore() {
	scoreNum.textContent = score;
}
function updateMaxScore() {
	maxScoreNum.textContent = maxScore;
	localStorage.setItem('maxScore', maxScore);
}

function generateArray(num) {
	let tempArr = [];
	for (let i = 0; i < num * 2; i += 2) {
		let r = Math.floor(Math.random() * 256);
		let g = Math.floor(Math.random() * 256);
		let b = Math.floor(Math.random() * 256);
		tempArr[i] = `rgb(${r},${g},${b})`;
		tempArr[i + 1] = `rgb(${r},${g},${b})`;
	}
	return tempArr;
}
