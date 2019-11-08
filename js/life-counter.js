const die = (game) => {
  if (typeof game.lives !== `number`) {
    throw new Error(`Lives should be of type number`);
  }
  if (game.lives === 0) {
    return -1;
  }
  let lives = game.lives;
  --lives;
  const newGame = Object.assign({}, game, {lives});
  return newGame;
};

export default die;
