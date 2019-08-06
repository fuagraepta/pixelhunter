import {getElementFromTemplate, changeScreen, checkGameState} from '../util.js';
import {INITIAL_GAME, GAME_SETTING, levels} from '../data/data.js';
import getSecondGameScreen from '../template/game-2.js';
import getStatScreen from '../template/stats.js';
import getHeader from '../template/header.js';
import progressBar from '../template/stats-bar.js';
import changeLevel from '../change-level.js';

const questionTemplate = (data, index) =>
  `<div class="game__option">
    <img src=${data.img} alt="Option ${index + GAME_SETTING.INDEX_STEP}" width="468" height="458">
    <label class="game__answer game__answer--photo">
      <input class="visually-hidden" name="question${index + GAME_SETTING.INDEX_STEP}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question${index + GAME_SETTING.INDEX_STEP}" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`;

const gameOneTemplate = (data) =>
  `<section class="game">
  <p class="game__task">${data.question}</p>
  <form class="game__content">
    ${data.answers.map(questionTemplate).join(``)}
  </form>
  ${progressBar(INITIAL_GAME)}
</section>`;

const getFirstGameScreen = (state) => {
  const gameOne = getElementFromTemplate(gameOneTemplate(state));

  // Switch the game-1 screen to the game-2 screen when both answers are selected
  const gameContent = gameOne.querySelector(`.game__content`);
  const questions = gameOne.querySelectorAll(`input`);

  const gameContentChangeHandler = () => {
    const answerNumber = 2;
    const levelNumber = changeLevel(INITIAL_GAME, levels.indexOf(state)).level;
    const nextLevel = (checkGameState(INITIAL_GAME)) ? [getStatScreen(INITIAL_GAME), getHeader()] : [getSecondGameScreen(levels[levelNumber]), getHeader(INITIAL_GAME)];
    if (Array.from(questions).filter((question) => question.checked === true).length === answerNumber) {
      changeScreen(...nextLevel);
    }
  };

  gameContent.addEventListener(`change`, gameContentChangeHandler);

  return gameOne;
};

export default getFirstGameScreen;
