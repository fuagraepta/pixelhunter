const getElementFromTemplate = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper.children.length > 1 ? wrapper : wrapper.children[0];
};

const mainScreen = document.querySelector(`#main`);

const changeScreen = (mainContent, headerContent) => {
  mainScreen.innerHTML = ``;
  if (headerContent) {
    mainScreen.appendChild(headerContent);
  }
  mainScreen.appendChild(mainContent);
};

const checkGameState = (score, maxAnswer = 10, wrongAnswers = 3) => {
  return (score.length === maxAnswer || score.answers.filter((value) => value.result === false).length === wrongAnswers) ? true : false;
};

export {getElementFromTemplate, changeScreen, checkGameState};
