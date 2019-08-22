const setTimer = (duration) => {
  return {
    timeLeft: duration,
    breakPoint: true,
    tick() {
      this.timeLeft = (this.timeLeft > 0) ? --this.timeLeft : 0;
      this.breakPoint = (this.timeLeft === 0) ? false : true;
    }
  };
};

export default setTimer;
