import IntroScreen from './screens/intro/intro-screen.js';
import GreetingScreen from './screens/greeting/greeting-screen.js';
import RulesScreen from './screens/rules/rules-screen.js';
import GameScreen from './screens/game/game-screen.js';
import StatsScreen from './screens/stats/stats-screen.js';
import GameModel from './game-model.js';
import DEBUG from './settings.js';

// Show created screen on main screen
const mainScreen = document.querySelector(`#main`);
const renderScreen = (element) => {
  mainScreen.innerHTML = ``;
  mainScreen.appendChild(element);
};

export default class Router {

  static showIntro() {
    const intro = new IntroScreen();
    intro.changeScreen();
    renderScreen(intro.element);
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
    const gameScreen = new GameScreen(new GameModel(playerName));
    renderScreen(gameScreen.root);
    gameScreen.startGame();
  }

  static showStats(model, result) {
    const statistics = new StatsScreen(model, result);
    statistics.changeScreen();
    renderScreen(statistics.element);
  }
}
