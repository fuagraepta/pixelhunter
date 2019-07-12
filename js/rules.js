import {getElementFromTemplate, changeScreen} from '../js/util.js';
import gameOneScreen from '../js/game-1.js';
import header from '../js/header.js';
import INITIAL_GAME from '../js/data.js';
import progressBar from '../js/stats-bar.js';

const rulesTemplate = `<section class="rules">
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

// When entering data the button "GO" is unlock
const rulesInput = rulesScreen.querySelector(`.rules__input`);
const rulesButton = rulesScreen.querySelector(`.rules__button`);

const onRulesInputChange = (evt) => {
  evt.preventDefault();
  rulesButton.disabled = (rulesInput.value) ? false : true;
};

// Switch the rules screen to the game-1 screen by pressing "GO"
rulesInput.addEventListener(`input`, onRulesInputChange);
rulesButton.addEventListener(`click`, () => {
  changeScreen(gameOneScreen, header(INITIAL_GAME), progressBar);
});

export default rulesScreen;
