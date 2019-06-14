
const getElementFromTemplate = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

const mainScreen = document.querySelector(`#main`);

const changeScreen = (element) => {
  mainScreen.innerHTML = ``;
  mainScreen.appendChild(element);
};

export {getElementFromTemplate, changeScreen};
