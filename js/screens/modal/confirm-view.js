import AbstractView from '../../abstract-view.js';

export default class ConfirmView extends AbstractView {
  constructor() {
    super();
    this._onOkButtonClickHandler = this._onOkButtonClickHandler.bind(this);
    this._onCancelButtonClickHandler = this._onCancelButtonClickHandler.bind(this);
  }

  get template() {
    return `<section class="modal">
      <form class="modal__inner">
        <button class="modal__close" type="button">
          <span class="visually-hidden">Закрыть</span>
        </button>
        <h2 class="modal__title">Подтверждение</h2>
        <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
        <div class="modal__button-wrapper">
          <button class="modal__btn">Ок</button>
          <button class="modal__btn">Отмена</button>
        </div>
      </form>
    </section>`;
  }

  _onOkButtonClickHandler(evt) {
    evt.preventDefault();
    this.onOkButtonClick();
    evt.target.removeEventListener(`click`, this._onOkButtonClickHandler);
    evt.target.closest(`.modal__inner`).removeEventListener(`click`,
        this._onCancelButtonClickHandler);
  }

  _onCancelButtonClickHandler(evt) {
    const modalClose = this.element.querySelector(`.modal__close`);
    const cancelButton = this.element.querySelectorAll(`.modal__btn`)[1];
    if (evt.target === modalClose || evt.target === cancelButton) {
      evt.preventDefault();
      this.onCancelButtonClick();
    }
  }

  onOkButtonClick() {}

  onCancelButtonClick() {}

  bind() {
    const okButton = this.element.querySelectorAll(`.modal__btn`)[0];
    const modalInner = this.element.querySelector(`.modal__inner`);

    okButton.addEventListener(`click`, this._onOkButtonClickHandler);
    modalInner.addEventListener(`click`, this._onCancelButtonClickHandler);
  }
}
