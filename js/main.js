const body = document.querySelector(`body`);
// const greeting = body.querySelector(`#greeting`).content;
// const rules = body.querySelector(`#rules`).content;
// const gameOne = body.querySelector(`#game-1`).content;
// const gameTwo = body.querySelector(`#game-2`).content;
// const gameThree = body.querySelector(`#game-3`).content;
// const stats = body.querySelector(`#stats`).content;
// const statsMore = body.querySelector(`#stats-more`).content;
// const statsSingle = body.querySelector(`#stats-single`).content;
// const modalError = body.querySelector(`#modal-error`).content;
// const modalConfirm = body.querySelector(`#modal-confirm`).content;

// Управление переключением экранов
const screenControl = {
  _screens: [`#greeting`, `#rules`, `#game-1`, `#game-2`, `#game-3`, `#stats`, `#stats-more`, `#stats-single`, `#modal-error`, `#modal-confirm`],
  _index: 0,
  _increaseIndex() {
    return (this._index >= this._screens.length - 1) ? this._index : this._index++;
  },
  _reduceIndex() {
    return (this._index <= 0) ? this._index : this._index--;
  },
  _switchScreen() {
    const mainScreen = body.querySelector(`#main`);
    const element = body.querySelector(this._screens[this._index]).content.cloneNode(true);
    mainScreen.innerHTML = ``;
    mainScreen.append(element);
  }
};

screenControl._switchScreen(screenControl._index);

// Переключение экранов с помощью стрелок на клавиатуре
document.addEventListener(`keydown`, (evt) => {
  if (evt.code === `ArrowRight`) {
    screenControl._increaseIndex();
  }
  if (evt.code === `ArrowLeft`) {
    screenControl._reduceIndex();
  }
  screenControl._switchScreen(screenControl._index);
});

// Добавление стрелок на страницу для переключения экранов
const addArrowsForSwitch = () => {
  const fragment = document.createDocumentFragment();
  const arrowsWrap = document.createElement(`div`);
  arrowsWrap.style.cssText = `position: absolute; top: 95px; left: 50%; margin-left: -56px;`;
  arrowsWrap.classList.add(`arrows__wrap`);
  const arrowLeft = document.createElement(`button`);
  arrowLeft.style.cssText = `background: none; border: 2px solid black; padding: 5px 20px;`;
  arrowLeft.classList.add(`arrows__btn`);
  arrowLeft.textContent = `<-`;
  const arrowRight = arrowLeft.cloneNode(true);
  arrowRight.textContent = `->`;
  arrowsWrap.append(arrowLeft);
  arrowsWrap.append(arrowRight);
  fragment.append(arrowsWrap);
  body.append(fragment);
};

addArrowsForSwitch();

// Добавление обработчиков событий на стрелки для переключения экранов
const arrowsBtn = body.querySelectorAll(`.arrows__btn`);

arrowsBtn[0].addEventListener(`click`, () => {
  screenControl._reduceIndex();
  screenControl._switchScreen();
});

arrowsBtn[1].addEventListener(`click`, () => {
  screenControl._increaseIndex();
  screenControl._switchScreen();
});
