import GreetingView from './greeting-view.js';
import Router from '../../router.js';
import {OPACITY_SETTING} from '../../tools/settings.js';

export default class GreetingScreen {
  constructor() {
    this.content = new GreetingView();
    this.element = this.content.element;
    this.elementOpacity = 20;
  }

  beginCrossfade() {
    this.elementOpacity = this.elementOpacity >= OPACITY_SETTING.max ? OPACITY_SETTING.max : this.elementOpacity + OPACITY_SETTING.step;
    this.element.style.opacity = `${this.elementOpacity}%`;
    this.crossfadeTimeOut = setTimeout(() => this.beginCrossfade(), OPACITY_SETTING.duration);

    if (this.elementOpacity === OPACITY_SETTING.max) {
      clearTimeout(this.crossfadeTimeOut);
    }
  }

  changeScreen() {
    this.content.onContinueButtonClick = () => Router.showRules();
  }
}
