import {getElementFromTemplate, changeScreen} from '../util.js';
import gameTwoScreen from '../template/game-2.js';
import progressBar from '../template/stats-bar.js';
import header from '../template/header.js';
import {INITIAL_GAME, levels} from '../data/data.js';


const questionTemplate = (data, index) =>
  `<div class="game__option">
    <img src=${data.img} alt="Option ${index}" width="468" height="458">
    <label class="game__answer game__answer--photo">
      <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question${index + 1}" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`;

const gameOneTemplate = (data) =>
  `<section class="game">
  <p class="game__task">${data[INITIAL_GAME.level].question}</p>
  <form class="game__content">
    ${data[INITIAL_GAME.level].answers.map(questionTemplate).join(``)}
  </form>
  ${progressBar(INITIAL_GAME)}
</section>`;

const gameOneScreen = (state) => {
  const gameOne = getElementFromTemplate(gameOneTemplate(state));

  // Switch the game-1 screen to the game-2 screen when both answers are selected
  const gameContent = gameOne.querySelector(`.game__content`);

  const ongameContentChange = () => {
    const answerNumber = 2;
    const questions = gameOne.querySelectorAll(`input`);
    if (Array.from(questions).filter((question) => question.checked === true).length === answerNumber) {
      gameTwoScreen(levels);
    }
  };

  gameContent.addEventListener(`change`, ongameContentChange);

  changeScreen(gameOne, header(INITIAL_GAME));
};

export default gameOneScreen;
