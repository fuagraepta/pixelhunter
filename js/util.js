// Show created screen on main screen
const mainScreen = document.querySelector(`#main`);
const renderScreen = (mainContent, headerContent) => {
  mainScreen.innerHTML = ``;
  if (headerContent) {
    mainScreen.appendChild(headerContent);
  }
  mainScreen.appendChild(mainContent);
};

// Create DOM element from template
const getElementFromTemplate = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper.children.length > 1 ? wrapper : wrapper.children[0];
};


// Create and add answer in array data
class Answer {
  constructor(result, time) {
    this.result = result;
    this.type = (this.result) ? `correct` : `wrong`;
    this.time = time;
  }
}

const addAnswer = (answersData, condition) => {
  answersData.push((condition) ? new Answer(true, 15) : new Answer(false, 15));
};

export {renderScreen, getElementFromTemplate, Answer, addAnswer};
