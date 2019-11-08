import {assert} from 'chai';
import die from '../life-counter.js';
import {INITIAL_GAME} from '../data/data.js';

describe(`Counting the player life`, () => {
  it(`should return -1 if there is no lifes left`, () => {
    const testGame = {
      lives: 0
    };
    assert.equal(die(testGame), -1);
  });
  it(`should return lifes -1 if the answer is't correct`, () => {
    const gamaOne = {
      lives: 2
    };
    const gameTwo = {
      lives: 1
    };
    assert.equal(die(INITIAL_GAME).lives, 2);
    assert.equal(die(gamaOne).lives, 1);
    assert.equal(die(gameTwo).lives, 0);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => die({}).lives);
    assert.throws(() => die([]).lives);
  });
});
