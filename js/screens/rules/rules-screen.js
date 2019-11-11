import RulesView from './rules-view.js';
import HeaderView from '../header/header.js';
import Router from '../../router.js';

export default class RulesScreen {
  constructor() {
    this.header = new HeaderView();
    this.content = new RulesView();
    this.element = document.createElement(`div`);
    this.element.appendChild(this.header.element);
    this.element.appendChild(this.content.element);
  }

  get playerName() {
    return this.element.querySelector(`.rules__input`).value;
  }

  goPreviosScreen() {
    this.header.onBackButtonClick = () => Router.showGreeting();
  }

  goNextScreen() {
    this.content.onGoButtonClick = () => Router.showGame(this.playerName);
  }

  changeScreen() {
    this.goPreviosScreen();
    this.goNextScreen();
  }
}
