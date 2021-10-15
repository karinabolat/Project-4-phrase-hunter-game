/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = 0;
    }

    createPhrases() {
        const array1 = ['The Shawshank Redemption', 'No Country for Old Men', 'Dead Poets Society', 'Catch Me If You Can', 'Pulp Fiction'];
        const array2 = [];
        array1.forEach(phrase => array2.push(new Phrase(phrase)));
        return array2;
    }

    startGame() {
        document.getElementById('overlay').style.display = 'none';
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

        const phrase = this.getRandomPhrase();
        phrase.addPhraseToDisplay();
        this.activePhrase = phrase;
    }

    getRandomPhrase() {
        const random = Math.floor(Math.random()*5);
        return this.phrases[random];
    }

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
            this.removeLife();

            for (let i=0; i < allButtons.length; i++) {
                if (allButtons[i].textContent === letter) {
                    allButtons[i].disabled = true;
                    allButtons[i].classList.add('wrong');
                }
            }
        }   
    }

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

    gameOver(gameWon) {
        document.getElementById('overlay').style.display = '';

        if (gameWon) {
            document.getElementById('game-over-message').innerHTML = 'Congratulations, you won!';
            document.getElementById('overlay').className = 'win';
        } else {
            document.getElementById('game-over-message').innerHTML = 'Better luck next time :)';
            document.getElementById('overlay').className = 'lose';
        }
    }
}