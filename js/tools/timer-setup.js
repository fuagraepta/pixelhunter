const setTimer = (state, variables) => {
  const second = 1;
  const time = (state.time > variables.endTime) ? state.time - second : variables.endTime;
  const game = Object.assign({}, state, {time});
  return game;
};

export default setTimer;
