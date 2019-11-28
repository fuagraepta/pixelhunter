import adaptServerData from './tools/data-adapter.js';

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const DEFAULT_NAME = `bob`;
const APP_ID = 94750153;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => res.json();

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).
    then(checkStatus).
    then(toJSON).
    then(adaptServerData);
  }

  static saveResults(data, name = DEFAULT_NAME) {
    const answers = data.state.answers;
    const lives = data.state.lives;
    const result = data.finalScore;
    const serverData = Object.assign({name}, {answers}, {lives}, {result});
    const requestSettings = {
      body: JSON.stringify(serverData),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings).
    then(checkStatus);
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`).
    then(checkStatus).
    then(toJSON);
  }
}
