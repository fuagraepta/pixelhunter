import AbstractView from '../../abstract-view.js';
import {GAME_SETTING, DEBUG} from '../../tools/settings.js';

export default class GameView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
    this.questionClass = {
      'game-1': ``,
      'game-2': `game__content--wide`,
      'game-3': `game__content--triple`
    };
  }

  get template() {
    const questionTemplate = {
      'game-1': (data, index) => {
        return `<div class="game__option">
          <img src=${data.img.src} alt="Option ${index + GAME_SETTING.indexStep}" width="${data.img.width}" height="${data.img.height}">
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name="question${index + GAME_SETTING.indexStep}"
            type="radio" value="photo">
            <span ${DEBUG.state && data.type === `photo` ? DEBUG.firstStyleType : ``}>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name="question${index + GAME_SETTING.indexStep}"
            type="radio" value="paint">
            <span ${DEBUG.state && data.type === `paint` ? DEBUG.firstStyleType : ``}>Рисунок</span>
          </label>
        </div>`;
      },
      'game-2': (data) => {
        return `<div class="game__option">
            <img src=${data.img.src} alt="Option 1" width="${data.img.width}" height="${data.img.height}">
            <label class="game__answer  game__answer--photo">
              <input class="visually-hidden" name="question1" type="radio" value="photo">
              <span ${DEBUG.state && data.type === `photo` ? DEBUG.firstStyleType : ``}>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input class="visually-hidden" name="question1" type="radio" value="paint">
              <span ${DEBUG.state && data.type === `paint` ? DEBUG.firstStyleType : ``}>Рисунок</span>
            </label>
          </div>`;
      },
      'game-3': (data) => {
        const uniqueElementLength = 1;
        return `<div class="game__option" ${DEBUG.state &&
          this.data.answers.filter((value) => value.type === data.type).length === uniqueElementLength ?
          DEBUG.secondStyleType : ``}>
          <img src=${data.img.src} alt="Option 1" width="${data.img.width}" height="${data.img.height}">
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
