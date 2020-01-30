const setTimer = (state, variables) => {
  const second = 1;

  return {...state, time: (state.time > variables.endTime)
    ? state.time - second : variables.endTime};
};

export default setTimer;
