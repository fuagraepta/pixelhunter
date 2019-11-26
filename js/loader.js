const SERVER_URL = `https://es.dump.academy/pixel-hunter`;

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
    then(toJSON);
  }
}
