const adaptServerData = (data) => {
  const Server2TypeMapper = {
    'two-of-two': `game-1`,
    'tinder-like': `game-2`,
    'one-of-three': `game-3`
  };

  const preprocessAnswer = (answer) => {
    return {
      img: answer.image.url,
      width: answer.image.width,
      height: answer.image.height,
      type: answer.type.slice(0, 5)
    };
  };

  for (const value of data) {
    value.type = Server2TypeMapper[value.type];
    value.answers = value.answers.map(preprocessAnswer);

    if (value.type === Server2TypeMapper[`tinder-like`]) {
      value.answer = value.answers.pop();
      delete value.answers;
    }
  }
  return data;
};


export default adaptServerData;
