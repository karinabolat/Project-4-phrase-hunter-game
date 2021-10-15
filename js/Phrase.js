/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

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

    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

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