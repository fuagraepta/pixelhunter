import {getElementFromTemplate, changeScreen, checkGameState} from '../util.js';
import {INITIAL_GAME, levels} from '../data/data.js';
import getFIrstGameScreen from '../template/game-1.js';
import getStatScreen from '../template/stats.js';
import getHeader from '../template/header.js';
import progressBar from '../template/stats-bar';
import changeLevel from '../change-level.js';

const questionTemplate = (data) => `<div class="game__option">
  <img src=${data.img} alt="Option 1" width="304" height="455">
</div>`;

const gameThreeTemplate = (data) => `<section class="game">
  <p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
    ${data.answers.map(questionTemplate).join(``)}
  </form>
  ${progressBar(INITIAL_GAME)}
</section>`;


const getThirdGameScreen = (state) => {
  const gameThree = getElementFromTemplate(gameThreeTemplate(state));

  // Switch the game-3 screen to the stats screen when you select any of the answers
  const gameOptions = gameThree.querySelectorAll(`.game__option`);

  const gameOptionsClickHandler = () => {
    const levelNumber = changeLevel(INITIAL_GAME, levels.indexOf(state)).level;
    const nextLevel = (checkGameState(INITIAL_GAME)) ? [getStatScreen(INITIAL_GAME), getHeader()] : [getFIrstGameScreen(levels[levelNumber]), getHeader(INITIAL_GAME)];
    changeScreen(...nextLevel);
  };

  for (const option of gameOptions) {
    option.addEventListener(`click`, gameOptionsClickHandler);
  }

  return gameThree;
};

export default getThirdGameScreen;
