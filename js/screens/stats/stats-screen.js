import StatsView from './stats-view.js';
import HeaderView from '../header/header.js';
import Router from '../../router.js';

export default class StatsScreen {
  constructor(data) {
    this.data = data.reverse();
    this.data.length = 4;
    this.header = new HeaderView();
    this.content = new StatsView(data);
    this.element = document.createElement(`div`);
    this.element.classList.add(`wrapper`);
    this.element.appendChild(this.header.element);
    this.element.appendChild(this.content.element);
  }

  changeScreen() {
    this.header.onBackButtonClick = () => Router.showGreeting();
  }
}
