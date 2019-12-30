import {GAME_SETTING} from '../tools/settings.js';

export default class Answer {
  constructor(result, time) {
    this.result = result;
    this.type = (this.result) ? `correct` : `wrong`;
    this.time = time;
  }

  countSpeedType() {
    if (this.result && this.time > GAME_SETTING.maxTime) {
      this.type = `fast`;
    }
    if (this.result && this.time < GAME_SETTING.minTime) {
      this.type = `slow`;
    }
  }
}
