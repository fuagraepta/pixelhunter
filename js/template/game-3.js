import resize from '../resize.js';
import AbstractView from '../abstract-view.js';

export default class GameThree extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    const gameThreeImageFrame = {
      width: 304,
      height: 455
    };

    const questionTemplate = (data) => `<div class="game__option">
      <img src=${data.img} alt="Option 1" width=${resize(gameThreeImageFrame, data).width} height=${resize(gameThreeImageFrame, data).height}>
    </div>`;

    return `<section class="game">
      <p class="game__task">Найдите рисунок среди изображений</p>
      <form class="game__content  game__content--triple">
        ${this.data.answers.map(questionTemplate).join(``)}
      </form>
    </section>`;
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = GameThree.render(this.template);
    this.bind();
    return this._element;
  }

  onAnswer() {}

  bind() {
    // Do something when user has selected any of the answers
    const gameOptions = this._element.querySelectorAll(`.game__option`);

    for (const option of gameOptions) {
      option.addEventListener(`click`, (evt) => {
        this.onAnswer(evt);
      });
    }
  }
}
