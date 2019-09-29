import AbstractView from '../abstract-view.js';

export default class HeaderView extends AbstractView {
  constructor(state, progress) {
    super();
    this.state = state;
    this.progress = progress;
  }

  get template() {
    const stateTemplate = (state, progress) => `
    <div class="game__timer">${(state) ? state.time : ``}</div>
    <div class="game__lives">
      ${(state) ? (new Array(state.lives - progress.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`).join(``)) : ``}
      ${(state) ? new Array(progress.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``) : ``}
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
      ${this.state ? stateTemplate(this.state, this.progress) : ``}
    </header>`;
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = AbstractView.render(this.template);
    this.bind();
    return this._element;
  }

  onBackButtonClick() {}

  bind() {
    // Do something when you press the arrow-button
    const backButton = this.element.querySelector(`.back`);

    backButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onBackButtonClick();
    });
  }
}
