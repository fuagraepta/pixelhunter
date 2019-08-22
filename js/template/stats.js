import {getElementFromTemplate} from '../util.js';
import progressBar from '../template/stats-bar.js';
import countPoints from '../count-score.js';
import {GAME_SETTING} from '../data/data.js';
import countingLives from '../life-counter.js';

const speedBonusTemplate = (data, filterSetting) => `<tr>
  <td></td>
  <td class="result__extra">Бонус за скорость:</td>
  <td class="result__extra">${data.filter(filterSetting).length}<span class="stats__result stats__result--fast"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">${data.filter(filterSetting).length * GAME_SETTING.bonusPoint}</td>
</tr>`;

const liveBonusTemplate = (data, progress) => `<tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${countingLives(data, data.lives, progress).lives} <span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">${countingLives(data, data.lives, progress).lives * GAME_SETTING.bonusPoint}</td>
  </tr>`;

const slowFineTemplate = (data, filterSetting) => `<tr>
  <td></td>
  <td class="result__extra">Штраф за медлительность:</td>
  <td class="result__extra">${data.filter(filterSetting).length}<span class="stats__result stats__result--slow"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">${data.filter(filterSetting).length * -GAME_SETTING.bonusPoint}</td>
</tr>`;

const resultTemplate = (data, progress) => {
  const speedBonusFilter = (value) => value.time < GAME_SETTING.minTime;
  const slowFineFilter = (value) => value.time > GAME_SETTING.maxTime;
  const correctAnswerFilter = (value) => value.result === true;

  return `<td class="result__points">× 100</td>
  <td class="result__total">${progress.filter(correctAnswerFilter).length * GAME_SETTING.pointPerAnswer}</td>
  </tr>
    ${progress.some(speedBonusFilter) ? speedBonusTemplate(progress, speedBonusFilter) : ``}
    ${liveBonusTemplate(data, progress)}
    ${progress.some(slowFineFilter) ? slowFineTemplate(progress, slowFineFilter) : ``}
  <tr>
    <td colspan="5" class="result__total  result__total--final">${countPoints(progress, countingLives(data, data.lives, progress).lives)}</td>
  </tr>`;
};

const statScreenTemplate = (data, progress) => `
<section class="result">
  <h2 class="result__title">Победа!</h2>
  <table class="result__table">
    <tr>
      <td class="result__number">1.</td>
      <td colspan="2">
      ${progressBar(progress)}
      </td>
      ${countPoints(progress) === GAME_SETTING.fail ? `<td class="result__total"></td>
      <td colspan="5" class="result__total  result__total--final">fail</td>` : resultTemplate(data, progress)}
  </table>
</section>`;

// Create statistics screen
const getStatScreen = (state, progress) => {
  const stats = getElementFromTemplate(statScreenTemplate(state, progress));
  return stats;
};

export default getStatScreen;
