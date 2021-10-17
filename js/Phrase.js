/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * Displays the phrase with hidden litters on screen
     */
    addPhraseToDisplay() {
        const div = document.getElementById('phrase');
        const ul = div.firstElementChild;
        const letters = this.phrase.split('');
        for (let i=0; i < letters.length; i++) {
            const li = document.createElement('li');
            li.innerHTML = letters[i];
            (letters[i] !== ' ')? li.classList.add('letter') : li.classList.add('space');
            ul.appendChild(li);
        }
    }

    /**
     * Checks whether the phrase has the letter submitted by user.
     * @param {string} letter - user input
     * @returns {boolean} Boolean value indicating if the letter is in the phrase.
     */
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    /**
     * Opens the letter on the screen.
     * @param {string} letter - Letter to be revealed on the screen.
     */
    showMatchedLetter(letter) {
        const div = document.getElementById('phrase');
        const lis = div.getElementsByTagName('li');
        for (let i=0; i < lis.length; i++) {
            if(lis[i].textContent === letter) {
                lis[i].classList.add('show');
            }
        }
    }
}