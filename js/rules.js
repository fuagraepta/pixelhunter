import {getElementFromTemplate, changeScreen} from '../js/util.js';
import greetingScreen from '../js/greeting.js';
import gameOneScreen from '../js/game-1.js';

const rulesTemplate = `<header class="header">
  <button class="back">
    <span class="visually-hidden">Вернуться к началу</span>
    <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg>
  </button>
</header>
<section class="rules">
  <h2 class="rules__title">Правила</h2>
  <ul class="rules__description">
    <li>Угадай 10 раз для каждого изображения фото
      <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
      <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
    <li>Фотографиями или рисунками могут быть оба изображения.</li>
    <li>На каждую попытку отводится 30 секунд.</li>
    <li>Ошибиться можно не более 3 раз.</li>
  </ul>
  <p class="rules__ready">Готовы?</p>
  <form class="rules__form">
    <input class="rules__input" type="text" placeholder="Ваше Имя">
    <button class="rules__button  continue" type="submit" disabled>Go!</button>
  </form>
</section>`;

const rulesScreen = getElementFromTemplate(rulesTemplate);

// Switch the rules screen to the greeting screen by pressing the arrow-button
const backButton = rulesScreen.querySelector(`.back`);

backButton.addEventListener(`click`, () => {
  changeScreen(greetingScreen);
});

// When entering data the button "GO" unlocks
const rulesInput = rulesScreen.querySelector(`.rules__input`);
const rulesButton = rulesScreen.querySelector(`.rules__button`);

const onRulesInputChange = (evt) => {
  evt.preventDefault();
  rulesButton.disabled = (rulesInput.value) ? false : true;
};

// Switch the rules screen to the game-1 screen by pressing "GO"
rulesInput.addEventListener(`input`, onRulesInputChange);
rulesButton.addEventListener(`click`, () => {
  changeScreen(gameOneScreen);
});

export default rulesScreen;
