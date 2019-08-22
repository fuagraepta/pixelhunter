import {assert} from 'chai';
import setTimer from '../timer-setup.js';

describe(`Setup game timer`, () => {
  it(`should reduce the timer by 1 second`, () => {
    const timer = setTimer(30);
    timer.tick();
    assert.equal(timer.timeLeft, 29);
    timer.tick();
    assert.equal(timer.timeLeft, 28);
  });
  it(`the timer should stop if there is no time left`, () => {
    const timer = setTimer(1);
    timer.tick();
    assert.equal(timer.breakPoint, false);
  });
  it(`time can't have a negative value`, () => {
    const timer = setTimer(-1);
    timer.tick();
    assert.equal(timer.timeLeft, 0);
  });
});
