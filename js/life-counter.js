const countingLives = (game, liveNumber, answerType) => {
  if (typeof liveNumber !== `number`) {
    throw new Error(`Lives should be of type number`);
  }
  if (liveNumber === 0) {
    return -1;
  }
  let lives = (answerType) ? liveNumber : --liveNumber;
  const newGame = Object.assign({}, game, {
    lives
  });
  return newGame;
};

export default countingLives;
