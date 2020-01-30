const countPoints = (answers, lives, variables) => {
  if (!Array.isArray(answers)) {
    throw new Error(`answers should be of type array`);
  }
  if (answers.length < variables.maxLevel) {
    return variables.fail;
  }
  const correctAnswers = answers.filter((answer) => answer.result === true);
  let score = 0;
  for (const answer of correctAnswers) {
    if (answer.time > variables.maxTime) {
      score += variables.bonusPoint;
    }
    score += (answer.time < variables.minTime) ? variables.bonusPoint :
      variables.pointPerAnswer;
  }
  return score + lives * variables.bonusPoint;
};

export default countPoints;
