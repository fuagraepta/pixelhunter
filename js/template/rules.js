import {getElementFromTemplate, changeScreen} from '../util.js';
import {levels, INITIAL_GAME} from '../data/data.js';
import getFirstGameScreen from '../template/game-1.js';
import getHeader from '../template/header.js';

const rulesTemplate = () => `
<section class="rules">
  <h2 class="rules__title">Правила</h2>
  <ul class="rules__description">
    <li>Угадай 10 раз для каждого изображения фото
      <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
      <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
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

const getRulesScreen = () => {

  const rules = getElementFromTemplate(rulesTemplate);

  // When entering data the button "GO" is unlock
  const rulesInput = rules.querySelector(`.rules__input`);
  const rulesButton = rules.querySelector(`.rules__button`);

  const onRulesInputChange = (evt) => {
    evt.preventDefault();
    rulesButton.disabled = (rulesInput.value.trim()) ? false : true;
  };

  // Switch the rules screen to the game-1 screen by pressing "GO"
  rulesInput.addEventListener(`input`, onRulesInputChange);
  rulesButton.addEventListener(`click`, () => {
    changeScreen(getFirstGameScreen(levels[INITIAL_GAME.level]), getHeader(INITIAL_GAME));
  });

  return rules;
};

export default getRulesScreen;
