import {getElementFromTemplate} from '../util.js';
import progressBar from '../template/stats-bar.js';
import countPoints from '../count-score.js';
import {GAME_SETTING} from '../data/data.js';

const speedBonusTemplate = (data, filterSetting) => `<tr>
  <td></td>
  <td class="result__extra">Бонус за скорость:</td>
  <td class="result__extra">${data.answers.filter(filterSetting).length}<span class="stats__result stats__result--fast"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">${data.answers.filter(filterSetting).length * GAME_SETTING.BONUS_POINT}</td>
</tr>`;

const liveBonusTemplate = (data) => `<tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${data.lives} <span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">${data.lives * GAME_SETTING.BONUS_POINT}</td>
  </tr>`;

const slowFineTemplate = (data, filterSetting) => `<tr>
  <td></td>
  <td class="result__extra">Штраф за медлительность:</td>
  <td class="result__extra">${data.answers.filter(filterSetting).length}<span class="stats__result stats__result--slow"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">${data.answers.filter(filterSetting).length * -GAME_SETTING.BONUS_POINT}</td>
</tr>`;

const resultTemplate = (data) => {
  const speedBonusFilter = (value) => value.time < GAME_SETTING.MIN_TIME;
  const slowFineFilter = (value) => value.time > GAME_SETTING.MAX_TIME;
  const correctAnswerFilter = (value) => value.result === true;

  return `<td class="result__points">× 100</td>
  <td class="result__total">${data.answers.filter(correctAnswerFilter).length * GAME_SETTING.POINT_PER_ANSWER}</td>
  </tr>
    ${data.answers.some(speedBonusFilter) ? speedBonusTemplate(data, speedBonusFilter) : ``}
    ${liveBonusTemplate(data)}
    ${data.answers.some(slowFineFilter) ? slowFineTemplate(data, slowFineFilter) : ``}
  <tr>
    <td colspan="5" class="result__total  result__total--final">${countPoints(data.answers, data.lives)}</td>
  </tr>`;
};

const statScreenTemplate = (data) => `
<section class="result">
  <h2 class="result__title">Победа!</h2>
  <table class="result__table">
    <tr>
      <td class="result__number">1.</td>
      <td colspan="2">
      ${progressBar(data)}
      </td>
      ${countPoints(data.answers) === GAME_SETTING.FAIL ? `<td class="result__total"></td>
      <td colspan="5" class="result__total  result__total--final">fail</td>` : resultTemplate(data)}
  </table>
</section>`;

const getStatScreen = (state) => {
  const stats = getElementFromTemplate(statScreenTemplate(state));
  return stats;
};

export default getStatScreen;
