import AbstractView from '../../abstract-view.js';

export default class RulesView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="rules">
      <h2 class="rules__title">Правила</h2>
      <ul class="rules__description">
        <li>Угадай 10 раз для каждого изображения фото
          <img class="rules__icon" src="img/icon-photo.png" width="32" height="31"
          alt="Фото"> или рисунок
          <img class="rules__icon" src="img/icon-paint.png" width="32" height="31"
          alt="Рисунок"></li>
        <li>Фотографиями или рисунками могут быть оба изображения.</li>
        <li>На каждую попытку отводится 30 секунд.</li>
        <li>{Ошибиться можно не более 3 раз.}</li>
      </ul>
      <p class="rules__ready">Готовы?</p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </section>`;
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = RulesView.render(this.template);
    this.bind();
    return this._element;
  }

  onGoButtonClick() {}

  bind() {
    // When entering data the button "GO" is unlock
    const rulesInput = this.element.querySelector(`.rules__input`);

    rulesInput.addEventListener(`input`, (evt) => {
      evt.preventDefault();
      goButton.disabled = (rulesInput.value.trim()) ? false : true;
    });

    // Do something when you press "GO"
    const goButton = this.element.querySelector(`.rules__button`);

    goButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onGoButtonClick();
    });
  }
}