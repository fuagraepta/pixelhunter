import {getElementFromTemplate, changeScreen} from '../js/util.js';
import gameThreeScreen from '../js/game-3.js';
import header from '../js/header.js';
import INITIAL_GAME from '../js/data.js';
import progressBar from '../js/stats-bar.js';

const gameTwoTemplate = `<section class="game">
  <p class="game__task">Угадай, фото или рисунок?</p>
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
</section>`;

const gameTwoScreen = getElementFromTemplate(gameTwoTemplate);

// Switch the game-2 screen to the game-3 screen when you select any of the answers
const gameAnswers = gameTwoScreen.querySelectorAll(`.game__answer`);

for (const answer of gameAnswers) {
  answer.addEventListener(`click`, () => {
    changeScreen(gameThreeScreen, header(INITIAL_GAME), progressBar);
  });
}

export default gameTwoScreen;
