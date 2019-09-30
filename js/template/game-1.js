import resize from '../resize.js';
import AbstractView from '../abstract-view.js';

export default class GameOneView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    const indexStep = 1;
    const gameOneImageFrame = {
      width: 468,
      height: 458
    };

    const questionTemplate = (data, index) =>
      `<div class="game__option">
        <img src=${data.img} alt="Option ${index + indexStep}" width=${resize(gameOneImageFrame, data).width} height=${resize(gameOneImageFrame, data).height}>
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question${index + indexStep}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question${index + indexStep}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`;

    return `<section class="game">
      <p class="game__task">${this.data.question}</p>
      <form class="game__content">
        ${this.data.answers.map(questionTemplate).join(``)}
      </form>
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
    // Do something when both answers are selected
    const gameOneAnswers = this.element.querySelectorAll(`input`);

    for (const answer of gameOneAnswers) {
      answer.addEventListener(`change`, () => {
        const checkedInputs = this.element.querySelectorAll(`input:checked`);
        const answerNumber = 2;
        if (checkedInputs.length === answerNumber) {
          this.onAnswer();
        }
      });
    }
  }
}
