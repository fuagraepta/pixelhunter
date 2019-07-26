
const getElementFromTemplate = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper.children.length > 1 ? wrapper : wrapper.children[0];
};

const mainScreen = document.querySelector(`#main`);
// const mainHeader = document.querySelector(`header`);

const changeScreen = (mainContent, headerContent) => {
  mainScreen.innerHTML = ``;
  if (headerContent) {
    mainScreen.appendChild(headerContent);
  }
  mainScreen.appendChild(mainContent);
};

export {getElementFromTemplate, changeScreen};
