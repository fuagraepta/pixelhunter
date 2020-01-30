import {assert} from 'chai';
import countPoints from '../tools/count-score.js';
import {GAME_SETTING} from '../tools/settings.js';

describe(`Counting of points`, () => {
  it(`should return -1 if the number of correct answers is less than 10`, () => {
    assert.equal(countPoints(new Array(9), 3, GAME_SETTING), -1);
    assert.equal(countPoints(new Array(6), 2, GAME_SETTING), -1);
    assert.equal(countPoints(new Array(1), 1, GAME_SETTING), -1);
  });
  it(`should return 1150 points if the player answered all questions in the
    cordial amount of time`, () => {
    const playerAnswers = [
      {
        result: true,
        time: 15
      },
      {
        result: true,
        time: 15
      },
      {
        result: true,
        time: 15
      },
      {
        result: true,
        time: 15
      },
      {
        result: true,
        time: 15
      },
      {
        result: true,
        time: 15
      },
      {
        result: true,
        time: 15
      },
      {
        result: true,
        time: 15
      },
      {
        result: true,
        time: 15
      },
      {
        result: true,
        time: 15
      }
    ];
    assert.equal(countPoints(playerAnswers, 3, GAME_SETTING), 1150);
  });
  it(`should return lower than 1150 points if the player answered the questions
    slowly and have one or two lifes`, () => {
    const playerAnswers = [
      {
        result: true,
        time: 9
      },
      {
        result: true,
        time: 9
      },
      {
        result: true,
        time: 9
      },
      {
        result: true,
        time: 9
      },
      {
        result: true,
        time: 9
      },
      {
        result: true,
        time: 9
      },
      {
        result: true,
        time: 9
      },
      {
        result: true,
        time: 9
      },
      {
        result: true,
        time: 9
      },
      {
        result: true,
        time: 9
      }
    ];
    assert.equal(countPoints(playerAnswers, 3, GAME_SETTING), 650);
    assert.equal(countPoints(playerAnswers, 2, GAME_SETTING), 600);
    assert.equal(countPoints(playerAnswers, 1, GAME_SETTING), 550);
  });
  it(`should return more than 1150 points if the player answered the questions
    quickly`, () => {
    const playerAnswers = [
      {
        result: true,
        time: 23
      },
      {
        result: true,
        time: 23
      },
      {
        result: true,
        time: 23
      },
      {
        result: true,
        time: 23
      },
      {
        result: true,
        time: 23
      },
      {
        result: true,
        time: 23
      },
      {
        result: true,
        time: 23
      },
      {
        result: true,
        time: 23
      },
      {
        result: true,
        time: 23
      },
      {
        result: true,
        time: 23
      }
    ];
    assert.equal(countPoints(playerAnswers, 3, GAME_SETTING), 1650);
    assert.equal(countPoints(playerAnswers, 2, GAME_SETTING), 1600);
    assert.equal(countPoints(playerAnswers, 1, GAME_SETTING), 1550);
  });
  it(`should not allow set non array value`, () => {
    assert.throws(() => countPoints({}, 3));
  });
});
