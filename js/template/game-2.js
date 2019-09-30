import resize from '../resize.js';
import AbstractView from '../abstract-view.js';

export default class GameTwoView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    const gameTwoImageFrame = {
      width: 705,
      height: 455
    };

    return `<section class="game">
      <p class="game__task">${this.data.question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src=${this.data.answer.img} alt="Option 1" width=${resize(gameTwoImageFrame, this.data.answer).width} height=${resize(gameTwoImageFrame, this.data.answer).height}>
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
    </section>`;
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = GameTwoView.render(this.template);
    this.bind();
    return this._element;
  }

  onAnswer() {}

  bind() {
    // Do something when the user has selected one of the answers
    const inputs = this.element.querySelectorAll(`input`);

    for (const input of inputs) {
      input.addEventListener(`click`, (evt) => {
        this.onAnswer(evt);
      });
    }
  }
}
