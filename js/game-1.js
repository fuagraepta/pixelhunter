import {getElementFromTemplate, changeScreen} from '../js/util.js';
import gameTwoScreen from '../js/game-2.js';
import header from '../js/header.js';
import INITIAL_GAME from '../js/data.js';
import statsBar from '../js/stats-bar.js';


const gameOneTemplate = `
<section class="game">
  <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
  <form class="game__content">
    <div class="game__option">
      <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
    <div class="game__option">
      <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question2" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question2" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
</section>`;

const gameOneScreen = getElementFromTemplate(gameOneTemplate);

// Switch the game-1 screen to the game-2 screen when both answers are selected
const gameContent = gameOneScreen.querySelector(`.game__content`);

const ongameContentChange = () => {
  const answerNumber = 2;
  const questions = gameOneScreen.querySelectorAll(`input`);
  if (Array.from(questions).filter((question) => question.checked === true).length === answerNumber) {
    changeScreen(gameTwoScreen, header(INITIAL_GAME), statsBar);
  }
};

gameContent.addEventListener(`change`, ongameContentChange);


export default gameOneScreen;
