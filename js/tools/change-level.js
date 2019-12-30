const changeLevel = (game, levelNumber, maxLevel) => {
  if (typeof levelNumber !== `number`) {
    throw new Error(`Level should be of type number`);
  }

  return {...game, level: (levelNumber >= maxLevel) ? maxLevel : ++levelNumber};
};

export default changeLevel;
