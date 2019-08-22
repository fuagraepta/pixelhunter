const countingLives = (game, liveNumber, answers) => {
  if (typeof liveNumber !== `number`) {
    throw new Error(`Lives should be of type number`);
  }
  if (liveNumber === 0) {
    return -1;
  }
  const wrondAnswer = answers.filter((answer) => answer.result === false);
  let lives = (wrondAnswer) ? liveNumber - wrondAnswer.length : liveNumber;
  const newGame = Object.assign({}, game, {lives});
  return newGame;
};

export default countingLives;
