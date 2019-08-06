import {getElementFromTemplate, changeScreen} from '../util.js';
import getGreetingScreen from '../template/greeting.js';

const introTemplete = `<section id="intro" class="intro">
  <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  <button class="intro__top top" type="button">
    <img src="img/icon-top.svg" width="71" height="79" alt="Топ игроков">
  </button>
</section>`;

const getIntroScreen = () => {
  const intro = getElementFromTemplate(introTemplete);

  // By pressing the button changes main screen on the greetino screen
  const introAsteriskButton = document.querySelector(`.intro__asterisk`);

  introAsteriskButton.addEventListener(`click`, () => {
    changeScreen(getGreetingScreen());
  });

  return intro;
};

export default getIntroScreen;
