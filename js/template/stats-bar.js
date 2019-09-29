import AbstractView from '../abstract-view.js';

export default class StatsBarView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const resultTemplate = (state) => `<li class="stats__result stats__result--${state.type}"></li>`;

    return `<ul class="stats">
    ${[...this.state.map(resultTemplate), ...new Array(10 - this.state.length).fill(`<li class="stats__result stats__result--unknown"></li>`)].join(``)}
  </ul>`;
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = StatsBarView.render(this.template);
    return this._element;
  }
}
