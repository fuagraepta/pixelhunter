import {assert} from 'chai';
import die from '../tools/life-counter.js';
import {INITIAL_GAME} from '../data/data.js';
import {GAME_SETTING} from '../tools/settings.js';

describe(`Counting the player live`, () => {
  it(`should return -1 if there is no lives left`, () => {
    const testGame = {
      lives: -1
    };
    assert.equal(die(testGame, GAME_SETTING), -1);
  });
  it(`should return lives -1 if the answer is't correct`, () => {
    const gamaOne = {
      lives: 2
    };
    const gameTwo = {
      lives: 1
    };
    assert.equal(die(INITIAL_GAME, GAME_SETTING).lives, 2);
    assert.equal(die(gamaOne, GAME_SETTING).lives, 1);
    assert.equal(die(gameTwo, GAME_SETTING).lives, 0);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => die({}).lives);
    assert.throws(() => die([]).lives);
  });
});
