import {preloadImage} from './resize.js';

const adaptServerData = (data) => {
  const Server2TypeMapper = {
    'two-of-two': `game-1`,
    'tinder-like': `game-2`,
    'one-of-three': `game-3`
  };

  for (const value of data) {
    value.type = Server2TypeMapper[value.type];
    value.answers = value.answers.map(preloadImage);
  }
  return data;
};

export default adaptServerData;
