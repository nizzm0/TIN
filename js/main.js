import { Game } from './game.js';

window.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    requestAnimationFrame((time) => game.loop(time));
});
