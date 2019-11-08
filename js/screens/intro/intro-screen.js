import IntroView from './intro-view.js';
import Router from '../../router.js';

export default class IntroScreen {
  constructor() {
    this.content = new IntroView();
    this.element = this.content.element;
  }

  changeScreen() {
    this.content.onAsteriskButtonClick = () => Router.showGreeting();
  }
}
