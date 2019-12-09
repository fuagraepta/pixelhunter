import AbstractView from '../../abstract-view.js';

export default class ConfirmView extends AbstractView {
  constructor() {
    super();
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

  onOkButtonClick() {}

  onCancelButtonClick() {}

  bind() {
    const [okButton, cancelButton] = this.element.querySelectorAll(`.modal__btn`);
    const modalClose = this.element.querySelector(`.modal__close`);

    okButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onOkButtonClick();
    });

    cancelButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onCancelButtonClick();
    });

    modalClose.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onCancelButtonClick();
    });
  }
}
