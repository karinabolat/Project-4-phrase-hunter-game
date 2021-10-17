/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
     * Creates new phrases.
     * @returns {array} an array of 5 new phrase objects.
     */
    createPhrases() {
        const array1 = ['The Shawshank Redemption', 'No Country for Old Men', 'Dead Poets Society', 'Catch Me If You Can', 'Pulp Fiction'];
        const array2 = [];
        array1.forEach(phrase => array2.push(new Phrase(phrase)));
        return array2;
    }

    /**
     * Initializes game.
     */
    startGame() {
        document.getElementById('overlay').style.display = 'none';
        const phrase = this.getRandomPhrase();
        phrase.addPhraseToDisplay();
        this.activePhrase = phrase;
    }

    /**
     * Randomly choses a phrase object.
     * @returns {Object} One phrase object.
     */
    getRandomPhrase() {
        const random = Math.floor(Math.random()*5);
        return this.phrases[random];
    }

    /**
     * Checks if a letter was already submitted by user
     * @param {string} letter - user input
     * @returns {boolean} Returns true if the letter was used
     */
    isLetterRepeated(letter) {
        const keyboard = document.getElementById('qwerty');
        const allButtons = keyboard.getElementsByTagName('button');
        
        for (let i=0; i < allButtons.length; i++) {
            if (allButtons[i].textContent === letter && allButtons[i].disabled === true) {
                return true;
            }
        }
    }

    /**
     * Handles the game logic once user provides a letter
     * @param {string} letter - user input
     */
    handleInteraction(letter) {
        const keyboard = document.getElementById('qwerty');
        const allButtons = keyboard.getElementsByTagName('button');
            
        if (this.activePhrase.checkLetter(letter)) {
           
            for (let i=0; i < allButtons.length; i++) {
                if (allButtons[i].textContent === letter) {
                    allButtons[i].disabled = true;
                    allButtons[i].classList.add('chosen');
                }
            }

            this.activePhrase.showMatchedLetter(letter);
            this.checkForWin();
            if (this.checkForWin()) {
                this.gameOver(true);
            }   
        } else {

            for (let i=0; i < allButtons.length; i++) {
                if (allButtons[i].textContent === letter) {
                    allButtons[i].disabled = true;
                    allButtons[i].classList.add('wrong');
                }
            }

            this.removeLife();
        }
    }

    /**
     * Removes a live when user provides incorrect letter.
     */
    removeLife() {
        const scoreboard = document.getElementById('scoreboard');
        const images = scoreboard.getElementsByTagName('img');
        const src = images[images.length - 1].src;
               
        for (let i=0; i < images.length; i++) {
               
            if (images[i].src === src) {
                images[i].src = "images/lostHeart.png";
                this.missed +=1;
                if (this.missed === images.length) {
                    this.gameOver();
                }
                break;
            }
        }
    }

    /**
     * Checks if user has won the game by guessing the phrase
     * @returns {boolean} Boolean value showing whether the game has been won (true) or not (false).
     */
    checkForWin() {
        const div = document.getElementById('phrase');
        const lis = div.getElementsByTagName('li');
        let countSpace = 0;
        let countDisplayedLetters = 0;

        for (let i=0; i < lis.length; i++) {
            if (lis[i].textContent === ' ') {
                countSpace += 1;
            } else if (lis[i].className === 'letter show') {
                countDisplayedLetters += 1;
            }
        }
        
        const totalCount = lis.length - countSpace - countDisplayedLetters;
        
        return (totalCount === 0)? true : false;
    }

    /**
     * Displays game result and resets the board.
     * @param {boolean} gameWon - boolean value indicating if there is a win
     */
    gameOver(gameWon) {
        document.getElementById('overlay').style.display = '';

        if (gameWon) {
            document.getElementById('game-over-message').innerHTML = 'Congratulations, you won!';
            document.getElementById('overlay').className = 'win';
        } else {
            document.getElementById('game-over-message').innerHTML = 'Better luck next time :)';
            document.getElementById('overlay').className = 'lose';
        }

        const div = document.getElementById('phrase');
        const ul = div.firstElementChild;
        while (ul.firstChild) {
            ul.firstChild.remove();
        }

        const keyboard = document.getElementById('qwerty');
        const allButtons = keyboard.getElementsByTagName('button');
        for (let i=0; i < allButtons.length; i++) {
            allButtons[i].disabled = false;
            allButtons[i].className = 'key';
        }

        const scoreboard = document.getElementById('scoreboard');
        const images = scoreboard.getElementsByTagName('img');
        for (let k=0; k < images.length; k++) {
            images[k].src = "images/liveHeart.png";
        }
    }
}