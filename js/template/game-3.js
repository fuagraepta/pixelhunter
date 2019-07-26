import {getElementFromTemplate, changeScreen} from '../util.js';
import header from '../template/header.js';
import progressBar from '../template/stats-bar';
import statsScreen from '../template/stats.js';
import {INITIAL_GAME} from '../data/data.js';

const questionTemplate = (data, index) => `<div class="game__option">
  <img src=${data.img} alt="Option ${index}" width="304" height="455">
</div>`;

const gameThreeTemplate = (data) => `<section class="game">
  <p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
    ${data[2].answers.map(questionTemplate).join(``)}
  </form>
  ${progressBar(INITIAL_GAME)}
</section>`;


const gameThreeScreen = (state) => {
  const gameThree = getElementFromTemplate(gameThreeTemplate(state));

  // Switch the game-3 screen to the stats screen when you select any of the answers
  const gameOptions = gameThree.querySelectorAll(`.game__option`);

  for (const option of gameOptions) {
    option.addEventListener(`click`, () => {
      statsScreen(INITIAL_GAME);
    });
  }
  changeScreen(gameThree, header(INITIAL_GAME));
};

export default gameThreeScreen;
