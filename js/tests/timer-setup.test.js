import {assert} from 'chai';
import setTimer from '../timer-setup.js';
import {INITIAL_GAME, GAME_SETTING} from '../data/data.js';

describe(`Setup game timer`, () => {
  it(`should reduce the timer by 1 second`, () => {
    const testGame = {
      time: 29
    };

    assert.equal(setTimer(INITIAL_GAME, GAME_SETTING).time, 29);
    assert.equal(setTimer(testGame, GAME_SETTING).time, 28);
  });
  it(`the timer should stop if there is no time left`, () => {
    const testGame = {
      time: 0
    };

    assert.equal(setTimer(testGame, GAME_SETTING).time, 0);
  });
  it(`time can't have a negative value`, () => {
    const testGame = {
      time: -1
    };

    assert.equal(setTimer(testGame, GAME_SETTING).time, 0);
  });
});
