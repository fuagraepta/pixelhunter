import HeaderView from '../header/header.js';
import StatsBarView from '../stats/stats-bar.js';
import GameView from './game-view.js';
import ConfirmView from '../modal/confirm-view.js';
import Router from '../../router.js';
import {GAME_SETTING} from '../../tools/settings.js';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.header = new HeaderView(this.model.state);
    this.content = new GameView(this.model.getCurrentLevel());
    this.modal = new ConfirmView();
    this.root = document.createElement(`div`);
    this.root.classList.add(`wrapper`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.content.element.appendChild(new StatsBarView(this.model.state).element);
    this._timer = null;
  }

  startGame() {
    this.content.onAnswer = (evt) => {
      this._answer(this.model.getCurrentLevel(), evt);
      this._changeLevel();
    };
    this._tick();
  }

  _tick() {
    this.model.tick();
    this._updateHeader();
    this._timer = setTimeout(() => {
      this._tick();
      this._abortLevel();
    }, GAME_SETTING.second);

    if (this.model.state.time < GAME_SETTING.criticalTime) {
      this.header.blink();
    }
  }

  _abortLevel() {
    if (this.model.state.time === GAME_SETTING.endTime) {
      this.model.updateScore(false);
      this.model.looseLife();
      this._stopGame();
      this._continueGame();
    }
  }

  _stopGame() {
    clearInterval(this._timer);
    this.model.resetTimer();
  }

  _updateHeader() {
    const header = new HeaderView(this.model.state);

    this.root.replaceChild(header.element, this.header.element);
    header.onBackButtonClick = () => {
      this.root.appendChild(this.modal.element);
      this.modal.onOkButtonClick = () => {
        this._stopGame();
        Router.showGreeting();
        this.content.removeAnswerEventListener();
      };

      this.modal.onCancelButtonClick = () => {
        this.root.removeChild(this.modal.element);
      };
    };
    this.header = header;
  }

  _changeContentView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }

  _changeLevel() {
    this._updateHeader();
    this.model.nextLevel();
    this._tick();
    this.content.removeAnswerEventListener();

    const content = new GameView(this.model.getCurrentLevel());
    this._changeContentView(content);
    this.content.element.appendChild(new StatsBarView(this.model.state).element);
    this.content.onAnswer = (evt) => {
      this._answer(this.model.getCurrentLevel(), evt);
      this._continueGame();
    };
  }

  _continueGame() {
    return (this.model.hasNextLevel() || this.model.isGameOver())
      ? this._endGame() : this._changeLevel();
  }

  _answer(level, evt) {

    let answerType = null;

    switch (level.type) {
      case `game-1`:
        const [firstInput, secondInput] = this.content.element.querySelectorAll(`input:checked`);
        const [firstAnswer, secondAnswer] = this.model.getCurrentLevel().answers;

        answerType = firstInput.value === firstAnswer.type &&
        secondInput.value === secondAnswer.type;
        break;
      case `game-2`:
        answerType = evt.target.value === level.answers[0].type;
        break;
      case `game-3`:
        const gameOptions = this.content.element.querySelector(`.game__content`);
        const paintArray = level.answers.filter((value) => value.type === `paint`);
        const photoArray = level.answers.filter((value) => value.type === `photo`);
        const answerIndex = [...gameOptions.children].indexOf(evt.target.closest(`.game__option`));

        answerType = (paintArray.length < photoArray.length) ?
          level.answers[answerIndex].type === `paint` :
          level.answers[answerIndex].type === `photo`;
        break;
    }

    if (!answerType) {
      this.model.looseLife();
    }
    this.model.updateScore(answerType);
    this._stopGame();
  }

  _endGame() {
    this.content.removeAnswerEventListener();
    Router.showStats(this.model);
  }
}
