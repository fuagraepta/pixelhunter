import adaptSeverData from '../data-adapter.js';
import {assert} from 'chai';

const localData = [{
  type: `game-1`,
  question: `Угадайте для каждого изображения фото или рисунок?`,
  answers: [
    {
      img: `http://placehold.it/468x458`,
      width: 468,
      height: 458,
      type: `photo`
    },
    {
      img: `http://placehold.it/468x458`,
      width: 468,
      height: 458,
      type: `paint`
    }
  ]
}];

const serverData = [{
  "type": `two-of-two`,
  "question": `Угадайте для каждого изображения фото или рисунок?`,
  "answers": [
    {
      "image": {
        "url": `http://placehold.it/468x458`,
        "width": 468,
        "height": 458
      },
      "type": `photo`
    },
    {
      "image": {
        "url": `http://placehold.it/468x458`,
        "width": 468,
        "height": 458
      },
      "type": `painting`
    }
  ]
}];

describe(`Adapt server data`, () => {
  it(`should have several format remote and local data`, () => {
    assert.deepEqual(localData, adaptSeverData(serverData));
  });
});
