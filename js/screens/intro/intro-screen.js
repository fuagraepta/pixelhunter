import IntroView from './intro-view.js';
import Router from '../../router.js';
import {OPACITY_SETTING} from '../../tools/settings.js';

const LOAD_DURATION = 50;
const DEGREE_STEP = 10;

export default class IntroScreen {
  constructor() {
    this.content = new IntroView();
    this.element = this.content.element;
    this.elementOpacity = 100;
    this.loadSymbols = [``, `.`, `..`, `...`];
    this.loadingIndicator = document.createElement(`span`);
    this.loadingIndicator.style.cssText = `
      position: absolute;
      top: 50%;
      left: 49%;
    `;
    this.asterisk = this.element.querySelector(`.asterisk`);
    this.asterisk.style.transformOrigin = `50% 30%`;
    this.asteriskDegree = 0;
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
    this.content.onAsteriskButtonClick = () => {
      this.beginCrossfade();
    };
  }

  startLoad() {
    this.element.appendChild(this.loadingIndicator);
    this.loadingIndicator.textContent = `Loading`;
    this.asteriskDegree += DEGREE_STEP;
    this.asterisk.style.transform = `rotate(${this.asteriskDegree}deg)`;
    this.timeOut = setTimeout(() => this.startLoad(), LOAD_DURATION);
  }

  stopLoad() {
    clearTimeout(this.timeOut);
  }
}
