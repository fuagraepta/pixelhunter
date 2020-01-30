import GreetingView from './greeting-view.js';
import Router from '../../router.js';

export default class GreetingScreen {
  constructor() {
    this.content = new GreetingView();
    this.element = this.content.element;
  }

  changeScreen() {
    this.content.onContinueButtonClick = () => Router.showRules();
  }
}
