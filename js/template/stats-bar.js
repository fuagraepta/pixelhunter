
const resultTemplate = (data) => `<li class="stats__result stats__result--${data.type}"></li>`;

const statsTemplate = (data) => {
  return `<ul class="stats">
  ${[...data.map(resultTemplate), ...new Array(10 - data.length).fill(`<li class="stats__result stats__result--unknown"></li>`)].join(``)}
</ul>`;
};

// Create progress bar
const getProgressBar = (state) => {
  const progressBar = statsTemplate(state);
  return progressBar;
};

export default getProgressBar;
