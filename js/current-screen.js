import {renderScreen, addAnswer} from '../js/util.js';
import {levels, INITIAL_GAME, answers} from '../js/data/data.js';
import changeLevel from '../js/change-level.js';
import countingLives from '../js/life-counter.js';
import countPoints from '../js/count-score.js';
import IntroView from '../js/template/intro.js';
import HeaderView from '../js/template/header.js';
import RulesView from '../js/template/rules.js';
import GreetingView from '../js/template/greeting.js';
import StatsBarView from '../js/template/stats-bar.js';
import GameOneView from '../js/template/game-1.js';
import GameTwoView from '../js/template/game-2.js';
import GameThreeView from '../js/template/game-3.js';
import StatsView from '../js/template/stats.js';

const getCurrentScreen = () => {

  const getHeader = (progress, initialState) => {
    const currentState = (progress) ? countingLives(initialState, initialState.lives, progress) : null;
    const header = (currentState) ? new HeaderView(initialState, currentState) : new HeaderView();

    header.onBackButtonClick = () => renderScreen(greeting.element);

    return header.element;
  };

  const getProgressBar = (progress) => {
    const progressBar = new StatsBarView(progress);
    return progressBar.element;
  };

  const getStatsScreen = (initialState, progress) => {
    const endState = countingLives(initialState, initialState.lives, progress);
    const score = countPoints(progress, endState.lives);
    const statsScreen = new StatsView(endState, progress, score);

    return statsScreen.element;
  };

  const getNextScreen = (nextScreen, currentLevel, progress) => {
    const nextLevel = levels[changeLevel(INITIAL_GAME, currentLevel).level];
    const checkGameState = () => {
      const maxWrongAnswer = 3;
      return (progress.filter((value) => value.result === false).length === maxWrongAnswer || progress.length === levels.length) ? false : true;
    };
    return (checkGameState()) ? [nextScreen(nextLevel), getHeader(progress, INITIAL_GAME), getProgressBar(progress)] : [getStatsScreen(INITIAL_GAME, answers), getHeader()];
  };

  const intro = new IntroView();

  intro.onAsteriskButtonClick = () => renderScreen(greeting.element);
  renderScreen(intro.element);

  const greeting = new GreetingView();

  greeting.onContinueButtonClick = () => renderScreen(rules.element, getHeader());

  const rules = new RulesView();

  rules.onGoButtonClick = () => {
    renderScreen(...getNextScreen(getGameOneScreen, INITIAL_GAME.level, answers));
  };

  const getGameOneScreen = (level) => {
    const gameOne = new GameOneView(level);

    gameOne.onAnswer = () => {
      const checkedInputs = gameOne.element.querySelectorAll(`input:checked`);
      const validAnswer = [];
      checkedInputs.forEach((input, index) => {
        validAnswer[index] = (input.value === level.answers[index].type) ? true : false;
      });

      addAnswer(answers, (validAnswer.every((value) => value === true)));

      const nextScreen = getNextScreen(getGameTwoScreen, levels.indexOf(level), answers);

      renderScreen(...nextScreen);
    };

    return gameOne.element;
  };

  const getGameTwoScreen = (level) => {
    const gameTwo = new GameTwoView(level);

    gameTwo.onAnswer = (evt) => {
      addAnswer(answers, evt.target.value === level.answer.type);

      const nextScreen = getNextScreen(getGameThreeScreen, levels.indexOf(level), answers);

      renderScreen(...nextScreen);
    };

    return gameTwo.element;
  };

  const getGameThreeScreen = (level) => {
    const gameThree = new GameThreeView(level);

    gameThree.onAnswer = (evt) => {
      const gameOptions = gameThree.element.querySelector(`.game__content`);
      const answerIndex = [...gameOptions.children].indexOf(evt.target.closest(`.game__option`));
      addAnswer(answers, level.answers[answerIndex].type === `paint`);

      const nextScreen = getNextScreen(getGameOneScreen, levels.indexOf(level), answers);

      renderScreen(...nextScreen);
    };

    return gameThree.element;
  };
};

export default getCurrentScreen;
