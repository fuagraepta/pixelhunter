
const resultTemplate = (data) => `<li class="stats__result stats__result--${data.type}"></li>`;

const statsTemplate = (data) => {
  return `<ul class="stats">
  ${[...data.answers.map(resultTemplate), ...new Array(10 - data.answers.length).fill(`<li class="stats__result stats__result--unknown"></li>`)].join(``)}
</ul>`;
};


const progressBar = (state) => {
  const bar = statsTemplate(state);
  return bar;
};

export default progressBar;
