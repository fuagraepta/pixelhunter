import {getElementFromTemplate, changeScreen} from '../util.js';
import gameThreeScreen from '../template/game-3.js';
import progressBar from '../template/stats-bar.js';
import header from '../template/header.js';
import {INITIAL_GAME, levels} from '../data/data.js';

const gameTwoTemplate = (data) =>
  `<section class="game">
  <p class="game__task">${data[1].question}</p>
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img src=${data[1].answer.img} alt="Option ${data.questionNumber}" width="705" height="455">
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

const gameTwoScreen = (data) => {
  const gameTwo = getElementFromTemplate(gameTwoTemplate(data));

  // Switch the game-2 screen to the game-3 screen when you select any of the answers
  const gameAnswers = gameTwo.querySelectorAll(`.game__answer`);

  for (const answer of gameAnswers) {
    answer.addEventListener(`click`, () => {
      gameThreeScreen(levels);
    });
  }
  changeScreen(gameTwo, header(INITIAL_GAME));
};

export default gameTwoScreen;
