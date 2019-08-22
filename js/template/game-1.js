import {getElementFromTemplate, renderScreen, addAnswer} from '../util.js';
import progressBar from '../template/stats-bar.js';
import getCurrentGameScreen from '../current-screen.js';

const questionTemplate = (data, index) => {
  const indexStep = 1;

  return `<div class="game__option">
    <img src=${data.img} alt="Option ${index + indexStep}" width="468" height="458">
    <label class="game__answer game__answer--photo">
      <input class="visually-hidden" name="question${index + indexStep}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question${index + indexStep}" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`;
};

const gameOneTemplate = (data, progress) =>
  `<section class="game">
  <p class="game__task">${data.question}</p>
  <form class="game__content">
    ${data.answers.map(questionTemplate).join(``)}
  </form>
  ${progressBar(progress)}
</section>`;

// Сreate first game screen
const getFirstGameScreen = (state, progressState) => {
  const gameOne = getElementFromTemplate(gameOneTemplate(state, progressState));

  // Switch the first game screen to the next game screen if both answers are selected
  const gameOneAnswers = gameOne.querySelectorAll(`input`);

  for (const answer of gameOneAnswers) {
    answer.addEventListener(`change`, () => {
      const answerNumber = 2;
      const checkedInputs = Array.from(gameOneAnswers).filter((value) => value.checked === true);
      if (checkedInputs.length === answerNumber) {
        const validAnswer = [];
        checkedInputs.forEach((input, index) => {
          validAnswer[index] = (input.value === state.answers[index].type) ? true : false;
        });
        addAnswer(progressState, validAnswer.every((value) => value === true));
        renderScreen(...getCurrentGameScreen(state, progressState));
      }
    });
  }

  return gameOne;
};

export default getFirstGameScreen;
