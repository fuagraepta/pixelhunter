import IntroView from './intro-view.js';

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
