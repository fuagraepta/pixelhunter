const INITIAL_GAME = Object.freeze({
  level: -1,
  lives: 3,
  time: 30,
});

const levels = [
  {
    type: `game-1`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        img: ``,
        type: `paint`
      },
      {
        img: ``,
        type: `paint`
      }
    ]
  },
  {
    type: `game-2`,
    question: `Угадай, фото или рисунок?`,
    answer: {
      img: ``,
      type: `paint`
    }
  },
  {
    type: `game-3`,
    question: `Найдите рисунок среди изображений`,
    answers: [
      {
        img: ``,
        type: `paint`
      },
      {
        img: ``,
        type: `photo`
      },
      {
        img: ``,
        type: `photo`
      }
    ]
  },
  {
    type: `game-1`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        img: ``,
        type: `paint`
      },
      {
        img: ``,
        type: `photo`
      }
    ]
  },
  {
    type: `game-2`,
    question: `Угадай, фото или рисунок?`,
    answer: {
      img: ``,
      type: `photo`
    }
  },
  {
    type: `game-3`,
    question: `Найдите рисунок среди изображений`,
    answers: [
      {
        img: ``,
        type: `photo`
      },
      {
        img: ``,
        type: `paint`
      },
      {
        img: ``,
        type: `photo`
      }
    ]
  },
  {
    type: `game-1`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        img: ``,
        type: `photo`
      },
      {
        img: ``,
        type: `paint`
      }
    ]
  },
  {
    type: `game-2`,
    question: `Угадай, фото или рисунок?`,
    answer: {
      img: ``,
      type: `photo`
    }
  },
  {
    type: `game-3`,
    question: `Найдите рисунок среди изображений`,
    answers: [
      {
        img: ``,
        type: `photo`
      },
      {
        img: ``,
        type: `photo`
      },
      {
        img: ``,
        type: `paint`
      }
    ]
  },
  {
    type: `game-1`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        img: ``,
        type: `photo`
      },
      {
        img: ``,
        type: `photo`
      }
    ]
  }
];

const answers = [];

const GAME_SETTING = {
  pointPerAnswer: 100,
  bonusPoint: 50,
  maxLevel: 10,
  minTime: 10,
  maxTime: 20,
  fail: -1,
};

export {INITIAL_GAME, levels, GAME_SETTING, answers};
