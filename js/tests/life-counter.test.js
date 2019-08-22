import {assert} from 'chai';
import countingLives from '../life-counter.js';
import {INITIAL_GAME} from '../data/data.js';

describe(`Counting the player life`, () => {
  it(`should return -1 if there is no lifes left`, () => {
    assert.equal(countingLives(INITIAL_GAME, 0, false), -1);
  });
  it(`should return all remaining lifes if the answer is correct`, () => {
    const answer = [{
      result: true
    }];
    assert.equal(countingLives(INITIAL_GAME, 3, answer).lives, 3);
    assert.equal(countingLives(INITIAL_GAME, 2, answer).lives, 2);
    assert.equal(countingLives(INITIAL_GAME, 1, answer).lives, 1);
  });
  it(`should return lifes - 1 if the answer is't correct`, () => {
    const answer = [{
      result: false
    }];
    assert.equal(countingLives(INITIAL_GAME, 3, answer).lives, 2);
    assert.equal(countingLives(INITIAL_GAME, 2, answer).lives, 1);
    assert.equal(countingLives(INITIAL_GAME, 1, answer).lives, 0);
  });
  it(`should not allow set non number value`, () => {
    const answer = true;
    assert.throws(() => countingLives(INITIAL_GAME, {}, answer).lives);
  });
});
