import IntroScreen from './screens/intro/intro-screen.js';
import GreetingScreen from './screens/greeting/greeting-screen.js';
import RulesScreen from './screens/rules/rules-screen.js';
import GameScreen from './screens/game/game-screen.js';
import StatsScreen from './screens/stats/stats-screen.js';
import ErrorScreen from './screens/modal/error-screen.js';
import GameModel from './game-model.js';
import Loader from './loader.js';
import {DEBUG} from './tools/settings.js';

// Show created screen on main screen
const central = document.querySelector(`.central`);
const mainScreen = central.querySelector(`#main`);
const renderScreen = (element) => {
  mainScreen.innerHTML = ``;
  mainScreen.appendChild(element);
};

let questionData;

export default class Router {
  static start() {
    Router.load().catch(Router.showError);
  }

  static async load() {
    const intro = new IntroScreen();
    renderScreen(intro.element);
    intro.startLoad();
    try {
      questionData = await Loader.loadData();
      Router.showGreeting();
    } finally {
      intro.stopLoad();
    }
  }

  // Rendering greeting screen using cross fade;
  static showGreeting() {
    const currentScreen = mainScreen.firstElementChild;
    const greeting = new GreetingScreen();
    const onElementAnimationEnd = () => {
      central.classList.remove(`central--animate-screens`);
      central.classList.remove(`central--stack-screens`);

      currentScreen.removeEventListener(`animationend`, onElementAnimationEnd);
      mainScreen.removeChild(currentScreen);
      greeting.changeScreen();
    };

    central.classList.add(`central--stack-screens`);
    currentScreen.addEventListener(`animationend`, onElementAnimationEnd);
    mainScreen.appendChild(greeting.element);
    central.classList.add(`central--animate-screens`);

  }

  static showRules() {
    const rules = new RulesScreen();
    rules.changeScreen();
    renderScreen(rules.element);
  }

  static showGame(playerName) {
    DEBUG.state = (playerName === `debug`) ? true : false;
    const gameScreen = new GameScreen(new GameModel(playerName, questionData));
    renderScreen(gameScreen.root);
    gameScreen.startGame();
  }

  static async showStats(model) {
    try {
      await Loader.saveResults(model, model.playerName);
      const statistics = new StatsScreen(await Loader.loadResults(model.playerName));
      statistics.changeScreen();
      renderScreen(statistics.element);
    } catch (e) {
      Router.showError(e);
    }
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    mainScreen.appendChild(errorScreen.element);
  }
}
