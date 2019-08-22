import {levels, INITIAL_GAME} from '../js/data/data.js';
import getHeader from '../js/template/header.js';
import getStatScreen from '../js/template/stats.js';
import getFirstGameScreen from '../js/template/game-1.js';
import getSecondGameScreen from '../js/template/game-2.js';
import getThirdGameScreen from '../js/template/game-3.js';
import changeLevel from '../js/change-level.js';

const routeScreen = {
  'game-1': getFirstGameScreen,
  'game-2': getSecondGameScreen,
  'game-3': getThirdGameScreen
};

const getCurrentGameScreen = (state, progress) => {
  const lastScreen = [getStatScreen(INITIAL_GAME, progress), getHeader()];

  const getNextScreen = () => {
    const nextLevel = (levels[changeLevel(state, levels.indexOf(state)).level]);
    return [routeScreen[nextLevel.type](nextLevel, progress), getHeader(INITIAL_GAME, progress)];
  };

  const continueGame = () => {
    const maxWrongAnswer = 3;
    return (progress.filter((value) => value.result === false).length === maxWrongAnswer || progress.length === levels.length) ? false : true;
  };
  return continueGame() ? getNextScreen() : lastScreen;
};

export default getCurrentGameScreen;
