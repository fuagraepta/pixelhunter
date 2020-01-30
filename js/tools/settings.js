const DEBUG = {
  state: false,
  firstStyleType: `style= "border: 5px solid rgba(0, 255, 0, 0.7)"`,
  secondStyleType: `style="border-color:rgba(0, 255, 0, 0.7)"`
};

const GAME_SETTING = {
  pointPerAnswer: 100,
  bonusPoint: 50,
  maxLevel: 10,
  criticalTime: 6,
  second: 1000,
  endTime: 0,
  minTime: 10,
  maxTime: 20,
  dead: -1,
  fail: -1,
  indexStep: 1,
};

const GAME_ANSWERS_FRAME = {
  'game-1': {
    width: 468,
    height: 458
  },
  'game-2': {
    width: 705,
    height: 455
  },
  'game-3': {
    width: 304,
    height: 455
  }
};

export {DEBUG, GAME_SETTING, GAME_ANSWERS_FRAME};
