const die = (game, variables) => {
  if (typeof game.lives !== `number`) {
    throw new Error(`Lives should be of type number`);
  }
  if (game.lives === variables.dead) {
    return variables.fail;
  }
  let lives = game.lives;
  --lives;
  const newGame = Object.assign({}, game, {lives});
  return newGame;
};

export default die;
