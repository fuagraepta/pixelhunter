import IntroScreen from './screens/intro/intro-screen.js';
import GreetingScreen from './screens/greeting/greeting-screen.js';
import RulesScreen from './screens/rules/rules-screen.js';
import GameScreen from './screens/game/game-screen.js';
import StatsScreen from './screens/stats/stats-screen.js';
import ErrorScreen from './screens/error-screen.js';
import GameModel from './game-model.js';
import Loader from './loader.js';
import DEBUG from './tools/settings.js';
import {GAME_SETTING} from './data/data.js';

// Show created screen on main screen
const mainScreen = document.querySelector(`#main`);
const renderScreen = (element) => {
  mainScreen.innerHTML = ``;
  mainScreen.appendChild(element);
};

let questionData;

export default class Router {

  static showIntro() {
    const intro = new IntroScreen();
    renderScreen(intro.element);
    intro.changeScreen();
    intro.start();
    Loader.loadData().
    then((data) => {
      questionData = data;
      return questionData;
    }).
    then(() => setTimeout(() => Router.showGreeting(), GAME_SETTING.loadingTime)).
    catch(Router.showError).
    then(() => setTimeout(() => intro.stop(), GAME_SETTING.loadingTime));
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    greeting.changeScreen();
    renderScreen(greeting.element);
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

  static showStats(model) {
    Loader.saveResults(model, model.playerName).
    then(() => Loader.loadResults(model.playerName)).
    then((data) => {
      const statistics = new StatsScreen(data);
      statistics.changeScreen();
      renderScreen(statistics.element);
    }).
    catch(Router.showError);
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    renderScreen(errorScreen.element);
  }
}
