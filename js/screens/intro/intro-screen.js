import IntroView from './intro-view.js';
import Router from '../../router.js';
import {GAME_SETTING} from '../../data/data.js';

export default class IntroScreen {
  constructor() {
    this.content = new IntroView();
    this.element = this.content.element;
    this.cursor = 0;
    this.loadSymbols = [``, `.`, `..`, `...`];
    this.loadingIndicator = document.createElement(`span`);
  }

  setloadingIndicatorStyle() {
    this.loadingIndicator.style.cssText = `
      position: absolute;
      top: 50%;
      left: 49%;
    `;
  }

  changeScreen() {
    this.content.onAsteriskButtonClick = () => Router.showGreeting();
  }

  start() {
    this.element.appendChild(this.loadingIndicator);
    this.setloadingIndicatorStyle();
    this.cursor = ++this.cursor >= this.loadSymbols.length ? 0 : this.cursor;
    this.loadingIndicator.textContent = `Loading` + this.loadSymbols[this.cursor];
    this.timeOut = setTimeout(() => this.start(), GAME_SETTING.second);
  }

  stop() {
    clearTimeout(this.timeOut);
  }
}
