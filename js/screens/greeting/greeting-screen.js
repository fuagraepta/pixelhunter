import GreetingView from './greeting-view.js';
import Router from '../../router.js';

export default class GreetingScreen {
  constructor() {
    this.content = new GreetingView();
    this.element = this.content.element;
    this.continueButton = this.element.querySelector(`.greeting__continue`);
  }

  changeScreen() {
    this.content.onContinueButtonClick = () => {
      Router.showRules();
      this.content.removeContinueButtonListener();
    };
  }
}
