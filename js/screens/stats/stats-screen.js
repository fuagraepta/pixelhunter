import StatsView from './stats-view.js';
import HeaderView from '../header/header.js';
import Router from '../../router.js';

export default class StatsScreen {
  constructor(model) {
    this.model = model;
    this.header = new HeaderView();
    this.content = new StatsView(this.model.state, this.model.finalScore);
    this.element = document.createElement(`div`);
    this.element.appendChild(this.header.element);
    this.element.appendChild(this.content.element);
  }

  changeScreen() {
    this.header.onBackButtonClick = () => Router.showGreeting();
  }
}
