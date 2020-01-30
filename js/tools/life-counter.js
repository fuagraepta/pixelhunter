const die = (game, variables) => {
  if (typeof game.lives !== `number`) {
    throw new Error(`Lives should be of type number`);
  }
  if (game.lives === variables.dead) {
    return variables.fail;
  }

  return {...game, lives: game.lives - 1};
};

export default die;
