import AbstractView from '../../abstract-view.js';
import {INITIAL_GAME} from '../../data/data.js';

const OPACITY_SETTING = {
  maxOpacity: 100,
  minOpacity: 0,
  blinkStep: 10,
  duration: 80
};

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.timer = this.element.querySelector(`.game__timer`);
    this.timerOpacity = 100;
  }

  get template() {
    const stateTemplate = (state) => `
    <div class="game__timer">${(state)
    ? `<span class="timer__wrapper">${state.time}</span>` : ``}</div>
    <div class="game__lives">
      ${(state)
    ? (new Array(INITIAL_GAME.lives - state.lives).fill(`<img src="img/heart__empty.svg"
      class="game__heart" alt=" Missed Life" width="31" height="27">`).join(``)) : ``}
      ${(state) ? new Array(state.lives).fill(`<img src="img/heart__full.svg"
      class="game__heart" alt="Life" width="31" height="27">`).join(``) : ``}
    </div>`;

    return `<header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
      ${this.state ? stateTemplate(this.state) : ``}
    </header>`;
  }

  onBackButtonClick() {}

  bind() {
    const backButton = this.element.querySelector(`.back`);

    backButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onBackButtonClick();
    });
  }

  blink() {
    this.timerOpacity = this.timerOpacity - OPACITY_SETTING.blinkStep;
    this.timer.style.opacity = `${this.timerOpacity}%`;
    this.blinkTimeOut = setTimeout(() => this.blink(), OPACITY_SETTING.duration);
    if (this.timerOpacity === OPACITY_SETTING.minOpacity) {
      clearTimeout(this.blinkTimeOut);
      this.timerOpacity = OPACITY_SETTING.maxOpacity;
    }
  }
}
