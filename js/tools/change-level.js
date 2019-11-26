const changeLevel = (game, levelNumber, maxLevel) => {
  if (typeof levelNumber !== `number`) {
    throw new Error(`Level should be of type number`);
  }
  let level = (levelNumber >= maxLevel) ? maxLevel : ++levelNumber;
  const newGame = Object.assign({}, game, {level});
  return newGame;
};

export default changeLevel;
