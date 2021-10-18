/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;
const button = document.getElementById('btn__reset');

/**
 * Listens for click on `#btn_reset` and calls startGame() on game object.
 */
button.addEventListener('click', e => {
    game = new Game();
    game.startGame();
})

const keyboard = document.getElementById('qwerty');

/**
 * Listens for user input from onscreen keyboard.
 */
keyboard.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        game.handleInteraction(e.target.textContent);
    }
});

/**
 * Listens for user input from physical keyboard.
 */
document.addEventListener('keydown', e => {
    if (document.getElementById('overlay').style.display === '') {
        e.preventDefault();
    } else {
        const regex = /^[a-z]$/i;
        if (regex.test(e.key)) {
            const letter = e.key.toLowerCase();
            if (!game.isLetterRepeated(letter)) {
                game.handleInteraction(letter);
            }
        }
    }
});