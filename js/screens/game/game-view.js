import AbstractView from '../../abstract-view.js';
import {GAME_ANSWERS_FRAME} from '../../data/data.js';
import resize from '../../resize.js';

export default class GameView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    const questionOneTemplate = () => {
      const indexStep = 1;
      const questionTemplate = (data, index) => `<div class="game__option">
        <img src=${data.img} alt="Option ${index + indexStep}"
        width=${resize(GAME_ANSWERS_FRAME[this.data.type], data).width}
        height=${resize(GAME_ANSWERS_FRAME[this.data.type], data).height}>
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question${index + indexStep}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question${index + indexStep}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`;

      return `<form class="game__content">
        ${this.data.answers.map(questionTemplate).join(``)}
      </form>`;
    };

    const questionTwoTemplate = () => {

      return `<form class="game__content  game__content--wide">
        <div class="game__option">
          <img src=${this.data.answer.img} alt="Option 1"
          width=${resize(GAME_ANSWERS_FRAME[this.data.type], this.data.answer).width}
          height=${resize(GAME_ANSWERS_FRAME[this.data.type], this.data.answer).height}>
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>`;
    };

    const questionThreeTemplate = () => {
      const questionTempate = (data) => `<div class="game__option">
        <img src=${data.img} alt="Option 1"
        width=${resize(GAME_ANSWERS_FRAME[this.data.type], data).width}
        height=${resize(GAME_ANSWERS_FRAME[this.data.type], data).height}>
      </div>`;

      return `<form class="game__content  game__content--triple">
        ${this.data.answers.map(questionTempate).join(``)}
      </form>`;
    };

    let currentQuestion = null;

    switch (this.data.type) {
      case `game-1`:
        currentQuestion = questionOneTemplate(this.data);
        break;
      case `game-2`:
        currentQuestion = questionTwoTemplate();
        break;
      case `game-3`:
        currentQuestion = questionThreeTemplate(this.data);
        break;
    }

    return `<section class="game">
      <p class="game__task">${this.data.question}</p>
      ${currentQuestion}
    </section>`;
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = AbstractView.render(this.template);
    this.bind();
    return this._element;
  }

  onAnswer() {}

  bind() {
    switch (this.data.type) {
      case `game-1`:
        const gameOneAnswers = this._element.querySelectorAll(`input`);

        for (const answer of gameOneAnswers) {
          answer.addEventListener(`change`, () => {
            const checkedInputs = this._element.querySelectorAll(`input:checked`);
            const answerNumber = 2;
            if (checkedInputs.length === answerNumber) {
              this.onAnswer();
            }
          });
        }
        break;
      case `game-2`:
        const inputs = this._element.querySelectorAll(`input`);

        for (const input of inputs) {
          input.addEventListener(`click`, (evt) => {
            this.onAnswer(evt);
          });
        }
        break;
      case `game-3`:
        const gameOptions = this._element.querySelectorAll(`.game__option`);

        for (const option of gameOptions) {
          option.addEventListener(`click`, (evt) => {
            this.onAnswer(evt);
          });
        }
        break;
    }
  }
}
