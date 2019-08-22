import {getElementFromTemplate, renderScreen, addAnswer} from '../util.js';
import progressBar from '../template/stats-bar.js';
import getCurrentGameScreen from '../current-screen.js';

const gameTwoTemplate = (data, progress) =>
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
  ${progressBar(progress)}
</section>`;

// Create second game screen
const getSecondGameScreen = (state, progressState) => {
  const gameTwo = getElementFromTemplate(gameTwoTemplate(state, progressState));

  // Switch the second game screen to the next game screen when you select any of the answers
  const inputs = gameTwo.querySelectorAll(`input`);

  for (const input of inputs) {
    input.addEventListener(`click`, () => {
      addAnswer(progressState, input.value === state.answer.type);
      renderScreen(...getCurrentGameScreen(state, progressState));
    });
  }

  return gameTwo;
};

export default getSecondGameScreen;
