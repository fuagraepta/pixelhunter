import Answer from './data/answer.js';
import {INITIAL_GAME} from './data/data.js';
import {GAME_SETTING} from './tools/settings.js';
import changeLevel from './tools/change-level.js';
import countPoint from './tools/count-score.js';
import die from './tools/life-counter.js';
import setTimer from './tools/timer-setup.js';

export default class GameModel {
  constructor(playerName, levels) {
    this.playerName = playerName;
    this.levels = levels;
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
    this._state = {...INITIAL_GAME, answers};
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
    this._state = {...this._state, time};
  }

  updateScore(condition) {
    const answer = (condition) ? new Answer(true, this._state.time) : new Answer(false, this._state.time);
    answer.countSpeedType();
    this._state.answers.push(answer);
  }

  getCurrentLevel() {
    return this.levels[this._state.level];
  }
}
