const setTimer = (state) => {
  const time = (state.time > 0) ? state.time - 1 : 0;
  const game = Object.assign({}, state, {time});
  return game;
};

export default setTimer;
