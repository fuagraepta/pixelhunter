import IntroView from './intro-view.js';
import Router from '../../router.js';
import {OPACITY_SETTING} from '../../data/data.js';

const LOAD_DURATION = 300;

export default class IntroScreen {
  constructor() {
    this.content = new IntroView();
    this.element = this.content.element;
    this.cursor = 0;
    this.elementOpacity = 100;
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

  beginCrossfade() {
    this.elementOpacity = this.elementOpacity <= OPACITY_SETTING.min ? OPACITY_SETTING.min : this.elementOpacity - OPACITY_SETTING.step;
    this.element.style.opacity = `${this.elementOpacity}%`;
    this.crossfadeTimeOut = setTimeout(() => this.beginCrossfade(), OPACITY_SETTING.duration);

    if (this.elementOpacity === OPACITY_SETTING.min) {
      clearTimeout(this.crossfadeTimeOut);
      Router.showGreeting();
    }
  }

  changeScreen() {
    this.content.onAsteriskButtonClick = () => Router.showGreeting();
  }

  startLoad() {
    this.element.appendChild(this.loadingIndicator);
    this.setloadingIndicatorStyle();
    this.cursor = ++this.cursor >= this.loadSymbols.length ? 0 : this.cursor;
    this.loadingIndicator.textContent = `Loading` + this.loadSymbols[this.cursor];
    this.timeOut = setTimeout(() => this.startLoad(), LOAD_DURATION);
  }

  stopLoad() {
    clearTimeout(this.timeOut);
  }
}
