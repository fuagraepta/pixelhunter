import {assert} from 'chai';
import changeLevel from '../tools/change-level.js';
import {INITIAL_GAME} from '../data/data.js';
import {GAME_SETTING} from '../tools/settings.js';

describe(`Change level`, () => {
  it(`should change the level when the player answered the question`, () => {
    assert.equal(changeLevel(INITIAL_GAME, 0, GAME_SETTING.maxLevel).level, 1);
    assert.equal(changeLevel(INITIAL_GAME, 1, GAME_SETTING.maxLevel).level, 2);
    assert.equal(changeLevel(INITIAL_GAME, 2, GAME_SETTING.maxLevel).level, 3);
  });
  it(`level can't be more than 10`, () => {
    assert.equal(changeLevel(INITIAL_GAME, 11, GAME_SETTING.maxLevel).level, 10);
    assert.equal(changeLevel(INITIAL_GAME, 12, GAME_SETTING.maxLevel).level, 10);
  });
  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, [], GAME_SETTING.maxLevel).level);
  });
});
