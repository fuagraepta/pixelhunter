import AbstractView from '../../abstract-view.js';
import {GAME_SETTING, DEBUG} from '../../tools/settings.js';

export default class GameView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
    this._onAnswerClickHandler = this._onAnswerClickHandler.bind(this);
    this.questionClass = {
      'game-1': ``,
      'game-2': `game__content--wide`,
      'game-3': `game__content--triple`
    };
    this.gameAnswerElement = {
      'game-1': `input`,
      'game-2': `input`,
      'game-3': `.game__option`
    };
    this.answers = null;
  }

  get template() {
    const questionTemplate = {
      'game-1': (data, index) => {
        return `<div class="game__option">
          <img src=${data.img.src} alt="Option ${index + GAME_SETTING.indexStep}"
          width="${data.img.width}" height="${data.img.height}">
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name="question${index +
              GAME_SETTING.indexStep}"
            type="radio" value="photo">
            <span ${DEBUG.state && data.type === `photo` ? DEBUG.firstStyleType : ``}>
            Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name="question${index + GAME_SETTING.indexStep}"
            type="radio" value="paint">
            <span ${DEBUG.state && data.type === `paint` ? DEBUG.firstStyleType : ``}>
            Рисунок</span>
          </label>
        </div>`;
      },
      'game-2': (data) => {
        return `<div class="game__option">
            <img src=${data.img.src} alt="Option 1" width="${data.img.width}"
             height="${data.img.height}">
            <label class="game__answer  game__answer--photo">
              <input class="visually-hidden" name="question1" type="radio"
              value="photo">
              <span ${DEBUG.state && data.type === `photo` ? DEBUG.firstStyleType : ``}>
              Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input class="visually-hidden" name="question1"
              type="radio" value="paint">
              <span ${DEBUG.state && data.type === `paint` ? DEBUG.firstStyleType : ``}>
              Рисунок</span>
            </label>
          </div>`;
      },
      'game-3': (data) => {
        const uniqueElementLength = 1;
        return `<div class="game__option" ${DEBUG.state &&
          this.data.answers.filter((value) => value.type === data.type).length === uniqueElementLength ?
          DEBUG.secondStyleType : ``}>
          <img src=${data.img.src} alt="Option 1" width="${data.img.width}"
          height="${data.img.height}">
        </div>`;
      }
    };

    return `<section class="game">
      <p class="game__task">${this.data.question}</p>
      <form class="game__content  ${this.questionClass[this.data.type]}">
        ${this.data.answers.map(questionTemplate[this.data.type]).join(``)}
      </form>
    </section>`;
  }

  _onAnswerClickHandler(evt) {
    if (this.data.type === `game-1`) {
      const checkedInputs = this._element.querySelectorAll(`input:checked`);
      const answerNumber = 2;
      if (checkedInputs.length === answerNumber) {
        this.onAnswer();
      }
    } else {
      this.onAnswer(evt);
    }
  }

  removeAnswerEventListener() {
    for (const answer of this.answers) {
      answer.removeEventListener(`click`, this._onAnswerClickHandler);
    }
  }

  onAnswer() {}

  bind() {
    this.answers = this._element.querySelectorAll(this.gameAnswerElement[this.data.type]);
    for (const answer of this.answers) {
      answer.addEventListener(`click`, this._onAnswerClickHandler);
    }
  }
}
