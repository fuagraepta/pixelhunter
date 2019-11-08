import AbstractView from '../../abstract-view.js';

export default class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section id="intro" class="intro">
      <button class="intro__asterisk asterisk" type="button"><span
      class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом
      нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      <button class="intro__top top" type="button">
        <img src="img/icon-top.svg" width="71" height="79" alt="Топ игроков">
      </button>
    </section>`;
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = IntroView.render(this.template);
    this.bind();
    return this._element;
  }

  onAsteriskButtonClick() {}

  bind() {
    // Do something when press the asterisk button
    const asteriskButton = this.element.querySelector(`.intro__asterisk`);

    asteriskButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onAsteriskButtonClick();
    });
  }
}
