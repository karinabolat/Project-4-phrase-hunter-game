/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;
const button = document.getElementById('btn__reset');

button.addEventListener('click', e => {
    game = new Game;
    game.startGame();
})

const keyboard = document.getElementById('qwerty');

keyboard.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        game.handleInteraction(e.target.textContent);
    }
});

document.addEventListener('keyup', e => {
    const regex = /^[a-z]$/i;
    if (regex.test(e.key)) {
        const letter = e.key.toLowerCase();
        game.handleInteraction(letter);
    }
});