const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  time: 30,
  answers: [
    {result: true,
      type: `correct`,
      time: 15
    },
    {
      result: false,
      type: `wrong`,
      time: 15
    },
    {
      result: false,
      type: `wrong`,
      time: 9
    },
    {
      result: true,
      type: `wrong`,
      time: 21
    },
  ],
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
  POINT_PER_ANSWER: 100,
  BONUS_POINT: 50,
  MAX_LEVEL: 10,
  MIN_TIME: 10,
  MAX_TIME: 20,
  INDEX_STEP: 1,
  FAIL: -1,
};

export {INITIAL_GAME, levels, GAME_SETTING};
