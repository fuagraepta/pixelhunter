import {changeScreen} from '../js/util.js';
import greetingScreen from '../js/greeting.js';

// By pressing the button changes main screen on the greetino screen
const introAsteriskButton = document.querySelector(`.intro__asterisk`);

introAsteriskButton.addEventListener(`click`, () => {
  changeScreen(greetingScreen);
});
