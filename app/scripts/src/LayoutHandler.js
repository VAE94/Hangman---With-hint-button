class LayoutHandler {
	constructor() {
		this.init();
		this.handleDOM();
		this.handleEvents();
		this.randomWord();
		this.generateButtons();
		this.guessedWord();
		this.updateMistakes();
		this.showHint();
		this.canvasCreator();
		this.drawMan();
	}

	/**
	 * Declare global variables
	 */
	init() {}

	/**
	 * Handle DOM queries
	 */
	handleDOM() {
		this.gameWrapper = document.querySelector('.wrapper');
		this.alphabetContainer = document.querySelector('.alphabet-container');
		this.answerDisplay = document.querySelector('.word-display');
		this.maxLives = document.getElementById('maxLives');
		this.remainingLives = document.getElementById('mistakes');
		this.clueContainer = document.querySelector('.clue');
		this.resetButton = document.querySelector('.reset-button');
		this.hintButton = document.querySelector('.hint-button');
		this.canvas = document.getElementById('myCanvas');
		this.categoryDisplay = [
			'The Chosen Category is Fruits',
			'The Chosen Category is Animals',
			'The Chosen Category is Countries',
		];

		this.hints = [
			[
				'Keeps the doctor away',
				'Related to a berry',
				'It reminds you of winter',
				'Related to an apple',
				'Sometimes sour',
				'We eat it a lot in the summer',
			],
			[
				'I have spines',
				'I have horns',
				'I am a rodent',
				'A movie is named after me',
				'I have  some nice stripes',
			],
			[
				'A country where dancing and spices combine',
				'Our not so liked neighbours',
				'Related to Russia',
				'An impartial country',
				'Fiesta all day',
				'A lot of people, they eat weird stuff',
			],
		];
		this.categories = [
			[
				'apple',
				'blueberry',
				'mandarin',
				'pineapple',
				'pomegranate',
				'watermelon',
			],
			['hedgehog', 'rhinoceros', 'squirrel', 'panther', 'zebra'],
			['india', 'hungary', 'kyrgyzstan', 'switzerland', 'spain', 'china'],
		];
		this.answer = '';
		this.hint = '';
		this.myLives = 3;
		this.mistakes = 0;
		this.guessed = [];
		this.wordStatus = '';
	}

	/**
	 * Listen for events
	 */
	handleEvents() {
		// Used for functions closures
		const self = this;
	}

	/**
	 * Functions
	 */

	// Generate random categories, words, hints
	randomWord = () => {
		const categoryOrder = Math.floor(Math.random() * this.categories.length);
		const chosenCategory = this.categories[categoryOrder];
		const wordOrder = Math.floor(Math.random() * chosenCategory.length);
		const chosenWord = chosenCategory[wordOrder];
		const categoryName = document.querySelector('.category-name');
		categoryName.innerHTML = this.categoryDisplay[categoryOrder];
		this.answer = chosenWord;
		this.hint = this.hints[categoryOrder][wordOrder];

		// Words input
		this.guessedWord = () => {
			this.wordStatus = this.answer
				.split('')
				.map((letter) => (this.guessed.indexOf(letter) >= 0 ? letter : ' _ '))
				.join('');
			this.answerDisplay.innerHTML = this.wordStatus;
		};
	};

	// Display alphabet buttons
	generateButtons = () => {
		let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'
			.split('')
			.map(
				(letter) =>
					`<button
			 class ='alphabet-button'
			 id=${letter}
			 >
			${letter}

			</button>`
			)

			.join('');

		this.alphabetContainer.innerHTML = buttonsHTML;

		// Handle guess
		const buttons = document.querySelectorAll('.alphabet-button');
		buttons.forEach((button) => {
			button.onclick = () => {
				let chosenLetter = button.id;
				this.guessed.indexOf(chosenLetter) === -1
					? this.guessed.push(chosenLetter)
					: '';
				button.classList.add('selected');
				button.disabled = true;
				if (this.answer.indexOf(chosenLetter) >= 0) {
					this.guessedWord();
					this.gameWon();
				} else if (this.answer.indexOf(chosenLetter) === -1) {
					button.style.backgroundColor = 'red';
					this.mistakes++;
					this.drawMan(this.mistakes);
					this.updateMistakes();
					this.gameLost();
				}
			};
		});

		// Reset button
		this.resetButton.onclick = () => {
			location.reload();
		};

		//Call to canvasCreator (for clearing previous canvas and creating initial canvas)
		let { initialDrawing } = this.canvasCreator();
		//initialDrawing would draw the frame
		initialDrawing();
	};

	// Update mistakes
	updateMistakes = () => {
		this.remainingLives.innerHTML = this.mistakes;
		this.maxLives.innerHTML = this.myLives;
	};

	// Show hint

	showHint = () => {
		this.hintButton.onclick = () => {
			this.clueContainer.innerHTML = `Clue - ${this.hint}`;
		};
	};

	// Check for won game
	gameWon = () => {
		if (this.wordStatus === this.answer) {
			this.gameWrapper.innerHTML = '';
			const newGameContainer = document.createElement('div');
			newGameContainer.classList.add('new-game');
			newGameContainer.innerHTML = `
			<div class="alert alert-success mt-3" role="alert">
 				<p>You Won!</p>
				<iframe src="https://giphy.com/embed/lMameLIF8voLu8HxWV" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/booksmart-booksmartmovie-lMameLIF8voLu8HxWV">via GIPHY</a></p>
				<button class="btn btn-success game-button">Play again</button>
			</div>
			`;
			this.gameWrapper.appendChild(newGameContainer);

			// Reload game
			let gameButton = document.querySelector('.game-button');
			gameButton.onclick = () => {
				location.reload();
			};
		}
	};

	// Check for lost game
	gameLost = () => {
		if (this.mistakes === this.myLives) {
			this.gameWrapper.innerHTML = '';
			const newGameContainer = document.createElement('div');
			newGameContainer.classList.add('new-game');
			newGameContainer.innerHTML = `
			<div class="alert alert-danger mt-3" role="alert">
 				<p>You Lost!</p>
				 <iframe src="https://giphy.com/embed/yoJC2Olx0ekMy2nX7W" width="480" height="264" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/wetv-sad-rain-yoJC2Olx0ekMy2nX7W">via GIPHY</a></p>
				<button class="btn btn-danger game-button">Play again</button>
			</div>
			`;
			this.gameWrapper.appendChild(newGameContainer);
			// Reload game
			let gameButton = document.querySelector('.game-button');
			gameButton.onclick = () => {
				location.reload();
			};
		}
	};

	//Canvas
	canvasCreator = () => {
		let context = this.canvas.getContext('2d');
		context.beginPath();
		context.strokeStyle = '#000';
		context.lineWidth = 2;

		//For drawing lines
		const drawLine = (fromX, fromY, toX, toY) => {
			context.moveTo(fromX, fromY);
			context.lineTo(toX, toY);
			context.stroke();
		};

		const head = () => {
			context.beginPath();
			context.arc(70, 30, 10, 0, Math.PI * 2, true);
			context.stroke();
		};

		// Drawing body
		const body = () => {
			drawLine(70, 40, 70, 80);
		};

		const leftArm = () => {
			drawLine(70, 50, 50, 70);
		};

		const rightArm = () => {
			drawLine(70, 50, 90, 70);
		};

		const leftLeg = () => {
			drawLine(70, 80, 50, 110);
		};

		const rightLeg = () => {
			drawLine(70, 80, 90, 110);
		};

		//initial frame
		const initialDrawing = () => {
			//clear canvas
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);
			//bottom line
			drawLine(10, 130, 130, 130);
			//left line
			drawLine(10, 10, 10, 131);
			//top line
			drawLine(10, 10, 70, 10);
			//small top line
			drawLine(70, 10, 70, 20);
		};

		return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
	};

	// Hangman display
	drawMan = (mistakes) => {
		let { head, body, leftArm, rightArm, leftLeg, rightLeg } =
			this.canvasCreator();
		switch (mistakes) {
			case 1:
				head();
				body();
				break;
			case 2:
				leftArm();
				rightArm();
				break;
			case 3:
				leftLeg();
				rightLeg();
				break;
			default:
				break;
		}
	};
}
