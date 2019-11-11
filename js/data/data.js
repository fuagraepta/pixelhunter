const INITIAL_GAME = Object.freeze({
  level: 0,
  lives: 3,
  time: 30,
  answers: Object.freeze([])
});

const levels = [
  {
    type: `game-1`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        img: `https://k42.kn3.net/CF42609C8.jpg`,
        width: 600,
        height: 831,
        type: `paint`
      },
      {
        img: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 468,
        height: 354,
        type: `paint`
      }
    ]
  },
  {
    type: `game-2`,
    question: `Угадай, фото или рисунок?`,
    answer: {
      img: `https://k32.kn3.net/5C7060EC5.jpg`,
      width: 1200,
      height: 800,
      type: `paint`
    }
  },
  {
    type: `game-3`,
    question: `Найдите рисунок среди изображений`,
    answers: [
      {
        img: `https://k32.kn3.net/5C7060EC5.jpg`,
        width: 1200,
        height: 900,
        type: `paint`
      },
      {
        img: `http://i.imgur.com/1KegWPz.jpg`,
        width: 1080,
        height: 720,
        type: `photo`
      },
      {
        img: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 1264,
        height: 1864,
        type: `photo`
      }
    ]
  },
  {
    type: `game-1`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        img: `https://k42.kn3.net/CF42609C8.jpg`,
        width: 600,
        height: 831,
        type: `paint`
      },
      {
        img: `http://i.imgur.com/DKR1HtB.jpg`,
        width: 1120,
        height: 2965,
        type: `photo`
      }
    ]
  },
  {
    type: `game-2`,
    question: `Угадай, фото или рисунок?`,
    answer: {
      img: `http://i.imgur.com/1KegWPz.jpg`,
      width: 1080,
      height: 720,
      type: `photo`
    }
  },
  {
    type: `game-3`,
    question: `Найдите рисунок среди изображений`,
    answers: [
      {
        img: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 1264,
        height: 1864,
        type: `photo`
      },
      {
        img: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 468,
        height: 354,
        type: `paint`
      },
      {
        img: `http://i.imgur.com/DKR1HtB.jpg`,
        width: 1120,
        height: 2965,
        type: `photo`
      }
    ]
  },
  {
    type: `game-1`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        img: `http://i.imgur.com/1KegWPz.jpg`,
        width: 1080,
        height: 720,
        type: `photo`
      },
      {
        img: `https://k32.kn3.net/5C7060EC5.jpg`,
        width: 1200,
        height: 900,
        type: `paint`
      }
    ]
  },
  {
    type: `game-2`,
    question: `Угадай, фото или рисунок?`,
    answer: {
      img: `https://i.imgur.com/DiHM5Zb.jpg`,
      width: 1264,
      height: 1864,
      type: `photo`
    }
  },
  {
    type: `game-3`,
    question: `Найдите рисунок среди изображений`,
    answers: [
      {
        img: `http://i.imgur.com/DKR1HtB.jpg`,
        width: 1120,
        height: 2965,
        type: `photo`
      },
      {
        img: `http://i.imgur.com/1KegWPz.jpg`,
        width: 1080,
        height: 720,
        type: `photo`
      },
      {
        img: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 468,
        height: 354,
        type: `paint`
      }
    ]
  },
  {
    type: `game-1`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        img: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 1264,
        height: 1864,
        type: `photo`
      },
      {
        img: `http://i.imgur.com/DKR1HtB.jpg`,
        width: 1120,
        height: 2965,
        type: `photo`
      }
    ]
  }
];

const GAME_SETTING = {
  pointPerAnswer: 100,
  bonusPoint: 50,
  maxLevel: 10,
  second: 1000,
  endTime: 0,
  minTime: 10,
  maxTime: 20,
  dead: 0,
  fail: -1,
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

export {INITIAL_GAME, GAME_ANSWERS_FRAME, GAME_SETTING, levels};
