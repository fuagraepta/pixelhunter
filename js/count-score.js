const countPoints = (answers, lives) => {
  const correctAnswersLength = 10;
  if (!Array.isArray(answers)) {
    throw new Error(`answers should be of type array`);
  }
  if (answers.length < correctAnswersLength) {
    return -1;
  }
  const correctAnswers = answers.filter((answer) => answer.result === true);
  const [bonusPoint, pointPerAnswer] = [50, 100];
  const [minTime, maxTime] = [10, 20];
  let score = 0;
  for (const answer of correctAnswers) {
    if (answer.time < minTime) {
      score += bonusPoint;
    }
    score += (answer.time > maxTime) ? bonusPoint : pointPerAnswer;
  }
  return score + lives * bonusPoint;
};

export default countPoints;
