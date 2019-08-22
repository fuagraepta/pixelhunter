import {getElementFromTemplate, renderScreen} from '../util.js';
import getGreetingScreen from '../template/greeting.js';
import countingLives from '../life-counter.js';

const headerTemplate = (data, progress) => `<header class="header">
  <button class="back">
    <span class="visually-hidden">Вернуться к началу</span>
    <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg>
  </button>
  ${data ? stateTemplate(data, progress) : ``}
</header>`;

const stateTemplate = (data, progress) => `
<div class="game__timer">${(data) ? data.time : ``}</div>
<div class="game__lives">
  ${(data) ? (new Array(data.lives - countingLives(data, data.lives, progress).lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`).join(``)) : ``}
  ${(data) ? new Array(countingLives(data, data.lives, progress).lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`).join(``) : ``}
</div>`;

// Create header
const getHeader = (state, progress) => {
  const header = getElementFromTemplate(headerTemplate(state, progress));

  // Switch the rules screen to the greeting screen by pressing the arrow-button
  const backButton = header.querySelector(`.back`);

  backButton.addEventListener(`click`, () => {
    renderScreen(getGreetingScreen());
  });
  return header;
};


export default getHeader;
