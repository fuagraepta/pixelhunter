import {getElementFromTemplate, changeScreen, checkGameState} from '../util.js';
import {INITIAL_GAME, levels} from '../data/data.js';
import getThirdGameScreen from '../template/game-3.js';
import getStatScreen from '../template/stats.js';
import getHeader from '../template/header.js';
import progressBar from '../template/stats-bar.js';
import changeLevel from '../change-level.js';

const gameTwoTemplate = (data) =>
  `<section class="game">
  <p class="game__task">${data.question}</p>
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img src=${data.answer.img} alt="Option 1" width="705" height="455">
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
  ${progressBar(INITIAL_GAME)}
</section>`;

const getSecondGameScreen = (state) => {
  const gameTwo = getElementFromTemplate(gameTwoTemplate(state));

  // Switch the game-2 screen to the game-3 screen when you select any of the answers
  const gameAnswers = gameTwo.querySelectorAll(`.game__answer`);

  const gameAnswersClickHandler = () => {
    const levelNumber = changeLevel(INITIAL_GAME, levels.indexOf(state)).level;
    const nextLevel = (checkGameState(INITIAL_GAME)) ? [getStatScreen(INITIAL_GAME), getHeader()] : [getThirdGameScreen(levels[levelNumber]), getHeader(INITIAL_GAME)];
    changeScreen(...nextLevel);
  };


  for (const answer of gameAnswers) {
    answer.addEventListener(`click`, gameAnswersClickHandler);
  }

  return gameTwo;
};

export default getSecondGameScreen;
