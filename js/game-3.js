import {getElementFromTemplate, changeScreen} from '../js/util.js';
import statsScreen from '../js/stats.js';

const gameThreeTemplate = `<section class="game">
  <p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
    <div class="game__option">
      <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option  game__option--selected">
      <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
    </div>
    <div class="game__option">
      <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
    </div>
  </form>
</section>`;


const gameThreeScreen = getElementFromTemplate(gameThreeTemplate);

// Switch the game-3 screen to the stats screen when you select any of the answers
const gameOptions = gameThreeScreen.querySelectorAll(`.game__option`);

for (const option of gameOptions) {
  option.addEventListener(`click`, () => {
    changeScreen(statsScreen);
  });
}

export default gameThreeScreen;
