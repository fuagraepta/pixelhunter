import Answer from './data/answer.js';
import {INITIAL_GAME, GAME_SETTING, levels} from './data/data.js';
import changeLevel from './change-level.js';
import countPoint from './count-score.js';
import die from './life-counter.js';
import setTimer from './timer-setup.js';

export default class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.restart();
  }

  get state() {
    return Object.freeze(this._state);
  }

  get finalScore() {
    return countPoint(this._state.answers, this._state.lives, GAME_SETTING);
  }

  hasNextLevel() {
    return changeLevel(this._state, this._state.level, GAME_SETTING.maxLevel).level === GAME_SETTING.maxLevel;
  }

  nextLevel() {
    this._state = changeLevel(this._state, this._state.level, GAME_SETTING.maxLevel);
  }

  restart() {
    const answers = [];
    this._state = Object.assign({}, INITIAL_GAME, {answers});
  }

  looseLife() {
    this._state = die(this._state, GAME_SETTING);
  }

  isGameOver() {
    return this._state.lives === GAME_SETTING.dead;
  }

  tick() {
    this._state = setTimer(this._state, GAME_SETTING);
  }

  resetTimer() {
    const time = INITIAL_GAME.time;
    this._state = Object.assign({}, this._state, {time});
  }

  updateScore(condition) {
    const answer = (condition) ? new Answer(true, this._state.time) : new Answer(false, this._state.time);
    answer.countSpeedType();
    this._state.answers.push(answer);
  }

  getCurrentLevel() {
    return levels[this._state.level];
  }
}
