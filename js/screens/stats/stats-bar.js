import AbstractView from '../../abstract-view.js';
import {GAME_SETTING} from '../../tools/settings.js';

export default class StatsBarView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const resultTemplate = (answer) => `<li class="stats__result stats__result--${answer.type}">
    </li>`;

    return `<ul class="stats">
    ${[...this.state.answers.map(resultTemplate), ...new Array(GAME_SETTING.maxLevel -
      this.state.answers.length).fill(`<li class="stats__result stats__result--unknown">
      </li>`)].join(``)}
  </ul>`;
  }
}
