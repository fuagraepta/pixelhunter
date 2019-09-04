import {getElementFromTemplate, renderScreen, addAnswer} from '../util.js';
import progressBar from '../template/stats-bar';
import getCurrentGameScreen from '../current-screen.js';
import resize from '../resize.js';

const gameThreeImageFrame = {
  width: 304,
  height: 455
};

const questionTemplate = (data) => `<div class="game__option">
  <img src=${data.img} alt="Option 1" width=${resize(gameThreeImageFrame, data).width} height=${resize(gameThreeImageFrame, data).height}>
</div>`;

const gameThreeTemplate = (data, progress) => `<section class="game">
  <p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
    ${data.answers.map(questionTemplate).join(``)}
  </form>
  ${progressBar(progress)}
</section>`;

// Create third game screen
const getThirdGameScreen = (state, progressState) => {
  const gameThree = getElementFromTemplate(gameThreeTemplate(state, progressState));

  // Switch the third game screen to the next game screen when you select any of the answers
  const gameOptions = gameThree.querySelectorAll(`.game__option`);

  for (const option of gameOptions) {
    option.addEventListener(`click`, () => {
      const answerIndex = [...gameOptions].indexOf(option);
      addAnswer(progressState, state.answers[answerIndex].type === `paint`);
      renderScreen(...getCurrentGameScreen(state, progressState));
    });
  }

  return gameThree;
};

export default getThirdGameScreen;
