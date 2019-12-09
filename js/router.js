import IntroScreen from './screens/intro/intro-screen.js';
import GreetingScreen from './screens/greeting/greeting-screen.js';
import RulesScreen from './screens/rules/rules-screen.js';
import GameScreen from './screens/game/game-screen.js';
import StatsScreen from './screens/stats/stats-screen.js';
import ErrorScreen from './screens/modal/error-screen.js';
import GameModel from './game-model.js';
import Loader from './loader.js';
import DEBUG from './tools/settings.js';

// Show created screen on main screen
const mainScreen = document.querySelector(`#main`);
mainScreen.style.position = `relative`;
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
    intro.startLoad();
    Loader.loadData().
    then((data) => {
      questionData = data;
      return questionData;
    }).
    then(() => intro.beginCrossfade()).
    catch(Router.showError).
    then(() => intro.stopLoad());
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    greeting.changeScreen();
    renderScreen(greeting.element);
    // greeting.beginCrossfade();
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
    console.log(error);
    mainScreen.appendChild(errorScreen.element);
  }
}
