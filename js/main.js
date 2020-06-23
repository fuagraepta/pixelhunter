(function () {
  'use strict';

  class AbstractView {
    constructor() {
      if (new.target === AbstractView) {
        throw new Error(`Can't instantiate AbstractView, only concrete one`);
      }
    }

    get template() {
      throw new Error(`Template is required`);
    }

    get element() {
      if (this._element) {
        return this._element;
      }
      this._element = AbstractView.render(this.template);
      this.bind();
      return this._element;
    }

    bind() {
      // bind handles if required
    }

    static render(template) {
      const wrapper = document.createElement(`div`);
      wrapper.innerHTML = template;
      return wrapper.children.length > 1 ? wrapper : wrapper.children[0];
    }
  }

  class IntroView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `<section id="intro" class="intro">
      <button class="intro__asterisk asterisk" type="button"><span
      class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом
      нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      <button class="intro__top top" type="button">
        <img src="img/icon-top.svg" width="71" height="79" alt="Топ игроков">
      </button>
    </section>`;
    }
  }

  const LOAD_DURATION = 50;
  const DEGREE_STEP = 10;

  class IntroScreen {
    constructor() {
      this.content = new IntroView();
      this.element = this.content.element;
      this.elementOpacity = 100;
      this.loadSymbols = [``, `.`, `..`, `...`];
      this.loadingIndicator = document.createElement(`span`);
      this.loadingIndicator.style.cssText = `
      position: absolute;
      top: 50%;
      left: 49%;
    `;
      this.asterisk = this.element.querySelector(`.asterisk`);
      this.asterisk.style.transformOrigin = `50% 30%`;
      this.asteriskDegree = 0;
    }

    startLoad() {
      this.element.appendChild(this.loadingIndicator);
      this.loadingIndicator.textContent = `Loading`;
      this.asteriskDegree += DEGREE_STEP;
      this.asterisk.style.transform = `rotate(${this.asteriskDegree}deg)`;
      this.timeOut = setTimeout(() => this.startLoad(), LOAD_DURATION);
    }

    stopLoad() {
      clearTimeout(this.timeOut);
    }
  }

  class GreetingView extends AbstractView {
    constructor() {
      super();
      this._onContinueButtonClickHandler = this._onContinueButtonClickHandler.bind(this);
    }

    get template() {
      return `<section class="greeting central--blur">
      <img class="greeting__logo" src="img/logo_ph-big.svg" width="201"
      height="89" alt="Pixel Hunter">
      <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я
      просто красивая звёздочка</span>*</div>
      <div class="greeting__challenge">
        <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты
        бросают тебе вызов!</h3>
        <p class="greeting__challenge-text">Правила игры просты:</p>
        <ul class="greeting__challenge-list">
          <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
          <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
          <li>Фотореализм обманчив и коварен.</li>
          <li>Помни, главное — смотреть очень внимательно.</li>
        </ul>
      </div>
      <button class="greeting__continue" type="button">
        <span class="visually-hidden">Продолжить</span>
        <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
          <use href="#arrow-right"></use>
        </svg>
      </button>
      <button class="greeting__top top" type="button">
        <img src="img/icon-top.svg" width="71" height="79" alt="Топ игроков">
      </button>
    </section>`;
    }

    _onContinueButtonClickHandler(evt) {
      evt.preventDefault();
      this.onContinueButtonClick();
    }

    removeContinueButtonListener() {
      this.continueButton.removeEventListener(`click`,
          this._onContinueButtonClickHandler);
    }

    onContinueButtonClick() {}

    bind() {
      this.continueButton = this.element.querySelector(`.greeting__continue`);

      this.continueButton.addEventListener(`click`, this._onContinueButtonClickHandler);
    }
  }

  class GreetingScreen {
    constructor() {
      this.content = new GreetingView();
      this.element = this.content.element;
      this.continueButton = this.element.querySelector(`.greeting__continue`);
    }

    changeScreen() {
      this.content.onContinueButtonClick = () => {
        Router.showRules();
        this.content.removeContinueButtonListener();
      };
    }
  }

  class RulesView extends AbstractView {
    constructor() {
      super();
      this._onGoButtonClickHandler = this._onGoButtonClickHandler.bind(this);
    }

    get template() {
      return `<section class="rules">
      <h2 class="rules__title">Правила</h2>
      <ul class="rules__description">
        <li>Угадай 10 раз для каждого изображения фото
          <img class="rules__icon" src="img/icon-photo.png" width="32" height="31"
          alt="Фото"> или рисунок
          <img class="rules__icon" src="img/icon-paint.png" width="32" height="31"
          alt="Рисунок"></li>
        <li>Фотографиями или рисунками могут быть оба изображения.</li>
        <li>На каждую попытку отводится 30 секунд.</li>
        <li>{Ошибиться можно не более 3 раз.}</li>
      </ul>
      <p class="rules__ready">Готовы?</p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </section>`;
    }

    _onGoButtonClickHandler(evt) {
      evt.preventDefault();
      this.onGoButtonClick();
    }

    removeRulesEventListener() {
      this.rulesInput.removeEventListener(`click`, this._onGoButtonClickHandler);
    }

    onGoButtonClick() {}

    bind() {
      this.rulesInput = this.element.querySelector(`.rules__input`);

      this.rulesInput.addEventListener(`input`, (evt) => {
        evt.preventDefault();
        goButton.disabled = (this.rulesInput.value.trim()) ? false : true;
      });

      const goButton = this.element.querySelector(`.rules__button`);

      goButton.addEventListener(`click`, this._onGoButtonClickHandler);
    }
  }

  const INITIAL_GAME = Object.freeze({
    level: 0,
    lives: 3,
    time: 30,
    answers: Object.freeze([])
  });

  const OPACITY_SETTING = {
    maxOpacity: 100,
    minOpacity: 0,
    blinkStep: 10,
    duration: 80
  };

  class HeaderView extends AbstractView {
    constructor(state) {
      super();
      this.state = state;
      this.timer = this.element.querySelector(`.game__timer`);
      this.timerOpacity = 100;
    }

    get template() {
      const stateTemplate = (state) => `
    <div class="game__timer">${(state)
    ? `<span class="timer__wrapper">${state.time}</span>` : ``}</div>
    <div class="game__lives">
      ${(state)
    ? (new Array(INITIAL_GAME.lives - state.lives).fill(`<img src="img/heart__empty.svg"
      class="game__heart" alt=" Missed Life" width="31" height="27">`).join(``)) : ``}
      ${(state) ? new Array(state.lives).fill(`<img src="img/heart__full.svg"
      class="game__heart" alt="Life" width="31" height="27">`).join(``) : ``}
    </div>`;

      return `<header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use href="#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use href="#logo-small"></use>
        </svg>
      </button>
      ${this.state ? stateTemplate(this.state) : ``}
    </header>`;
    }

    onBackButtonClick() {}

    bind() {
      const backButton = this.element.querySelector(`.back`);

      backButton.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this.onBackButtonClick();
      });
    }

    blink() {
      this.timerOpacity = this.timerOpacity - OPACITY_SETTING.blinkStep;
      this.timer.style.opacity = `${this.timerOpacity}%`;
      this.blinkTimeOut = setTimeout(() => this.blink(), OPACITY_SETTING.duration);
      if (this.timerOpacity === OPACITY_SETTING.minOpacity) {
        clearTimeout(this.blinkTimeOut);
        this.timerOpacity = OPACITY_SETTING.maxOpacity;
      }
    }
  }

  class RulesScreen {
    constructor() {
      this.header = new HeaderView();
      this.content = new RulesView();
      this.element = document.createElement(`div`);
      this.element.classList.add(`wrapper`);
      this.element.appendChild(this.header.element);
      this.element.appendChild(this.content.element);
    }

    get playerName() {
      return this.element.querySelector(`.rules__input`).value;
    }

    goToPreviosScreen() {
      this.header.onBackButtonClick = () => {
        Router.showGreeting();
        this.content.removeRulesEventListener();
      };
    }

    goToNextScreen() {
      this.content.onGoButtonClick = () => {
        Router.showGame(this.playerName);
        this.content.removeRulesEventListener();
      };
    }

    changeScreen() {
      this.goToPreviosScreen();
      this.goToNextScreen();
    }
  }

  const DEBUG = {
    state: false,
    firstStyleType: `style= "border: 5px solid rgba(0, 255, 0, 0.7)"`,
    secondStyleType: `style="border-color:rgba(0, 255, 0, 0.7)"`
  };

  const GAME_SETTING = {
    pointPerAnswer: 100,
    bonusPoint: 50,
    maxLevel: 10,
    criticalTime: 6,
    second: 1000,
    endTime: 0,
    minTime: 10,
    maxTime: 20,
    dead: -1,
    fail: -1,
    indexStep: 1,
  };

  class StatsBarView extends AbstractView {
    constructor(state) {
      super();
      this.state = state;
    }

    get template() {
      const resultTemplate = (answer) => `<li class="stats__result stats__result--${answer.type}">
    </li>`;

      return `<ul class="stats">
    ${[...this.state.answers.map(resultTemplate), ...new Array(GAME_SETTING.maxLevel -
      this.state.answers.length).fill(`<li class="stats__result stats__result--unknown">
      </li>`)].join(``)}
  </ul>`;
    }
  }

  class GameView extends AbstractView {
    constructor(data) {
      super();
      this.data = data;
      this._onAnswerClickHandler = this._onAnswerClickHandler.bind(this);
      this.questionClass = {
        'game-1': ``,
        'game-2': `game__content--wide`,
        'game-3': `game__content--triple`
      };
      this.gameAnswerElement = {
        'game-1': `input`,
        'game-2': `input`,
        'game-3': `.game__option`
      };
      this.answers = null;
    }

    get template() {
      const questionTemplate = {
        'game-1': (data, index) => {
          return `<div class="game__option">
          <img src=${data.img.src} alt="Option ${index + GAME_SETTING.indexStep}"
          width="${data.img.width}" height="${data.img.height}">
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name="question${index +
              GAME_SETTING.indexStep}"
            type="radio" value="photo">
            <span ${DEBUG.state && data.type === `photo` ? DEBUG.firstStyleType : ``}>
            Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name="question${index + GAME_SETTING.indexStep}"
            type="radio" value="paint">
            <span ${DEBUG.state && data.type === `paint` ? DEBUG.firstStyleType : ``}>
            Рисунок</span>
          </label>
        </div>`;
        },
        'game-2': (data) => {
          return `<div class="game__option">
            <img src=${data.img.src} alt="Option 1" width="${data.img.width}"
             height="${data.img.height}">
            <label class="game__answer  game__answer--photo">
              <input class="visually-hidden" name="question1" type="radio"
              value="photo">
              <span ${DEBUG.state && data.type === `photo` ? DEBUG.firstStyleType : ``}>
              Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input class="visually-hidden" name="question1"
              type="radio" value="paint">
              <span ${DEBUG.state && data.type === `paint` ? DEBUG.firstStyleType : ``}>
              Рисунок</span>
            </label>
          </div>`;
        },
        'game-3': (data) => {
          const uniqueElementLength = 1;
          return `<div class="game__option" ${DEBUG.state &&
          this.data.answers.filter((value) => value.type === data.type).length === uniqueElementLength ?
          DEBUG.secondStyleType : ``}>
          <img src=${data.img.src} alt="Option 1" width="${data.img.width}"
          height="${data.img.height}">
        </div>`;
        }
      };

      return `<section class="game">
      <p class="game__task">${this.data.question}</p>
      <form class="game__content  ${this.questionClass[this.data.type]}">
        ${this.data.answers.map(questionTemplate[this.data.type]).join(``)}
      </form>
    </section>`;
    }

    _onAnswerClickHandler(evt) {
      if (this.data.type === `game-1`) {
        const checkedInputs = this._element.querySelectorAll(`input:checked`);
        const answerNumber = 2;
        if (checkedInputs.length === answerNumber) {
          this.onAnswer();
        }
      } else {
        this.onAnswer(evt);
      }
    }

    removeAnswerEventListener() {
      for (const answer of this.answers) {
        answer.removeEventListener(`click`, this._onAnswerClickHandler);
      }
    }

    onAnswer() {}

    bind() {
      this.answers = this._element.querySelectorAll(this.gameAnswerElement[this.data.type]);
      for (const answer of this.answers) {
        answer.addEventListener(`click`, this._onAnswerClickHandler);
      }
    }
  }

  class ConfirmView extends AbstractView {
    constructor() {
      super();
      this._onOkButtonClickHandler = this._onOkButtonClickHandler.bind(this);
      this._onCancelButtonClickHandler = this._onCancelButtonClickHandler.bind(this);
    }

    get template() {
      return `<section class="modal">
      <form class="modal__inner">
        <button class="modal__close" type="button">
          <span class="visually-hidden">Закрыть</span>
        </button>
        <h2 class="modal__title">Подтверждение</h2>
        <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
        <div class="modal__button-wrapper">
          <button class="modal__btn">Ок</button>
          <button class="modal__btn">Отмена</button>
        </div>
      </form>
    </section>`;
    }

    _onOkButtonClickHandler(evt) {
      evt.preventDefault();
      this.onOkButtonClick();
      evt.target.removeEventListener(`click`, this._onOkButtonClickHandler);
      evt.target.closest(`.modal__inner`).removeEventListener(`click`,
          this._onCancelButtonClickHandler);
    }

    _onCancelButtonClickHandler(evt) {
      const modalClose = this.element.querySelector(`.modal__close`);
      const cancelButton = this.element.querySelectorAll(`.modal__btn`)[1];
      if (evt.target === modalClose || evt.target === cancelButton) {
        evt.preventDefault();
        this.onCancelButtonClick();
      }
    }

    onOkButtonClick() {}

    onCancelButtonClick() {}

    bind() {
      const okButton = this.element.querySelectorAll(`.modal__btn`)[0];
      const modalInner = this.element.querySelector(`.modal__inner`);

      okButton.addEventListener(`click`, this._onOkButtonClickHandler);
      modalInner.addEventListener(`click`, this._onCancelButtonClickHandler);
    }
  }

  class GameScreen {
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
      this._updateHeader();
      this.content.onAnswer = (evt) => {
        this._answer(this.model.getCurrentLevel(), evt);
        this._changeLevel();
      };
      this._tick();
    }

    _tick() {
      if (this.model.state.time < GAME_SETTING.criticalTime) {
        this.header.blink();
      }

      this.model.tick();
      this._updateTimer();
      this._timer = setTimeout(() => {
        this._tick();
        this._abortLevel();
      }, GAME_SETTING.second);
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

    _updateTimer() {
      const timerElement = this.header.element.querySelector(`.timer__wrapper`);
      timerElement.innerHTML = this.model.state.time;
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

  class StatsView extends AbstractView {
    constructor(data) {
      super();
      this.data = data;
    }

    get template() {
      const speedBonusTemplate = (data, filterSetting) => `<tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${data.filter(filterSetting).length}<span
      class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${data.filter(filterSetting).length *
        GAME_SETTING.bonusPoint}</td>
    </tr>`;

      const liveBonusTemplate = (data) => `<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${data.lives} <span class="stats__result
        stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${data.lives * GAME_SETTING.bonusPoint}</td>
      </tr>`;

      const slowFineTemplate = (data, filterSetting) => `<tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${data.filter(filterSetting).length}<span
      class="stats__result stats__result--slow"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${data.filter(filterSetting).length *
        -GAME_SETTING.bonusPoint}</td>
    </tr>`;

      const resultTemplate = (data) => {
        const speedBonusFilter = (value) => value.time > GAME_SETTING.maxTime && value.result;
        const slowFineFilter = (value) => value.time < GAME_SETTING.minTime && value.result;
        const correctAnswerFilter = (value) => value.result === true;

        return `<td class="result__points">× 100</td>
      <td class="result__total">${data.answers.filter(correctAnswerFilter).length *
        GAME_SETTING.pointPerAnswer}</td>
      </tr>
        ${data.answers.some(speedBonusFilter) ? speedBonusTemplate(data.answers,
      speedBonusFilter) : ``}
        ${liveBonusTemplate(data)}
        ${data.answers.some(slowFineFilter) ? slowFineTemplate(data.answers,
      slowFineFilter) : ``}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${data.result}
        </td>
      </tr>`;
      };

      const statsBarTemplate = (data) => `<li class="stats__result stats__result--${data.type}">
    </li>`;

      const resultTableTemplate = (data, index) => `
    <table class="result__table">
      <tr>
        <td class="result__number">${index + GAME_SETTING.indexStep}.</td>
        <td colspan="2">
          <ul class="stats">
          ${[...data.answers.map(statsBarTemplate), ...new Array(GAME_SETTING.maxLevel -
            data.answers.length).fill(`<li class="stats__result stats__result--unknown">
            </li>`)].join(``)}
          </ul>
        </td>
        ${(data.result === GAME_SETTING.fail) ? `<td class="result__total"></td>
        <td colspan="5" class="result__total  result__total--final">fail</td>`
    : resultTemplate(data)}
    </table>`;

      return `<section class="result">
      <h2 class="result__title">${(this.data[0].result === GAME_SETTING.fail)
    ? `Fail` : `Победа!`}</h2>
      ${this.data.map(resultTableTemplate).join(``)}
    </section>`;
    }
  }

  class StatsScreen {
    constructor(data) {
      this.data = data.reverse();
      this.data.length = 4;
      this.header = new HeaderView();
      this.content = new StatsView(data);
      this.element = document.createElement(`div`);
      this.element.classList.add(`wrapper`);
      this.element.appendChild(this.header.element);
      this.element.appendChild(this.content.element);
    }

    changeScreen() {
      this.header.onBackButtonClick = () => Router.showGreeting();
    }
  }

  class ErrorScreen extends AbstractView {
    constructor(error) {
      super();
      this.error = error;
    }

    get template() {
      return `<section class="modal">
        <div class="modal__inner">
          <h2 class="modal__title">Произошла ошибка!</h2>
          <p class="modal__text modal__text--error">Статус: ${this.error.message}
          Пожалуйста, перезагрузите страницу.
          </p>
        </div>
      </section>`;
    }
  }

  class Answer {
    constructor(result, time) {
      this.result = result;
      this.type = (this.result) ? `correct` : `wrong`;
      this.time = time;
    }

    countSpeedType() {
      if (this.result && this.time > GAME_SETTING.maxTime) {
        this.type = `fast`;
      }
      if (this.result && this.time < GAME_SETTING.minTime) {
        this.type = `slow`;
      }
    }
  }

  const changeLevel = (game, levelNumber, maxLevel) => {
    if (typeof levelNumber !== `number`) {
      throw new Error(`Level should be of type number`);
    }

    return {...game, level: (levelNumber >= maxLevel) ? maxLevel : ++levelNumber};
  };

  const countPoints = (answers, lives, variables) => {
    if (!Array.isArray(answers)) {
      throw new Error(`answers should be of type array`);
    }
    if (answers.length < variables.maxLevel) {
      return variables.fail;
    }
    const correctAnswers = answers.filter((answer) => answer.result === true);
    let score = 0;
    for (const answer of correctAnswers) {
      if (answer.time > variables.maxTime) {
        score += variables.bonusPoint;
      }
      score += (answer.time < variables.minTime) ? variables.bonusPoint :
        variables.pointPerAnswer;
    }
    return score + lives * variables.bonusPoint;
  };

  const die = (game, variables) => {
    if (typeof game.lives !== `number`) {
      throw new Error(`Lives should be of type number`);
    }
    if (game.lives === variables.dead) {
      return variables.fail;
    }

    return {...game, lives: game.lives - 1};
  };

  const setTimer = (state, variables) => {
    const second = 1;

    return {...state, time: (state.time > variables.endTime)
      ? state.time - second : variables.endTime};
  };

  class GameModel {
    constructor(playerName, levels) {
      this.playerName = playerName;
      this.levels = levels;
      this.restart();
    }

    get state() {
      return Object.freeze(this._state);
    }

    get finalScore() {
      return countPoints(this._state.answers, this._state.lives, GAME_SETTING);
    }

    hasNextLevel() {
      return changeLevel(this._state, this._state.level, GAME_SETTING.maxLevel).level === GAME_SETTING.maxLevel;
    }

    nextLevel() {
      this._state = changeLevel(this._state, this._state.level, GAME_SETTING.maxLevel);
    }

    restart() {
      const answers = [];
      this._state = {...INITIAL_GAME, answers};
    }

    looseLife() {
      this._state = die(this._state, GAME_SETTING);
    }

    isGameOver() {
      return this._state.lives === GAME_SETTING.dead;
    }

    tick() {
      this._state = setTimer(this._state, GAME_SETTING);
    }

    resetTimer() {
      const time = INITIAL_GAME.time;
      this._state = {...this._state, time};
    }

    updateScore(condition) {
      const answer = (condition)
        ? new Answer(true, this._state.time) : new Answer(false, this._state.time);
      answer.countSpeedType();
      this._state.answers.push(answer);
    }

    getCurrentLevel() {
      return this.levels[this._state.level];
    }
  }

  const resize = (frame, image) => {

    const coefficient = image.width / image.height;

    const actualWidth = ((frame.width / coefficient) < frame.height)
      ? frame.width : frame.height * coefficient;

    const actualHeight = ((frame.width / coefficient) < frame.height)
      ? frame.width / coefficient : frame.height;

    return {
      width: actualWidth,
      height: actualHeight
    };
  };

  const preloadImage = (answer) => {
    const image = new Image();

    image.addEventListener(`load`, () => {
      const imgSize = {
        width: image.width,
        height: image.height
      };
      image.width = resize(answer.image, imgSize).width;
      image.height = resize(answer.image, imgSize).height;
    });
    image.src = answer.image.url;
    return {
      img: image,
      type: answer.type.slice(0, 5)
    };
  };

  const adaptServerData = (data) => {
    const Server2TypeMapper = {
      'two-of-two': `game-1`,
      'tinder-like': `game-2`,
      'one-of-three': `game-3`
    };

    for (const value of data) {
      value.type = Server2TypeMapper[value.type];
      value.answers = value.answers.map(preloadImage);
    }
    return data;
  };

  const SERVER_URL = `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter`;
  const DEFAULT_NAME = `bob`;
  const APP_ID = 94750153;

  const checkStatus = (response) => {
    if (response.ok) {
      return response;
    } else {
      throw new Error(`${response.status} (${response.statusText})`);
    }
  };

  const toJSON = (res) => res.json();

  class Loader {
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

  // Show created screen on main screen
  const central = document.querySelector(`.central`);
  const mainScreen = central.querySelector(`#main`);
  const renderScreen = (element) => {
    mainScreen.innerHTML = ``;
    mainScreen.appendChild(element);
  };

  let questionData;

  class Router {
    static start() {
      Router.load().catch(Router.showError);
    }

    static async load() {
      const intro = new IntroScreen();
      renderScreen(intro.element);
      intro.startLoad();
      try {
        questionData = await Loader.loadData();
        Router.showGreeting();
      } finally {
        intro.stopLoad();
      }
    }

    // Rendering greeting screen using cross fade;
    static showGreeting() {
      const currentScreen = mainScreen.firstElementChild;
      const greeting = new GreetingScreen();
      const onElementAnimationEnd = () => {
        central.classList.remove(`central--animate-screens`);
        central.classList.remove(`central--stack-screens`);

        currentScreen.removeEventListener(`animationend`, onElementAnimationEnd);
        mainScreen.removeChild(currentScreen);
        greeting.changeScreen();
      };

      central.classList.add(`central--stack-screens`);
      currentScreen.addEventListener(`animationend`, onElementAnimationEnd);
      mainScreen.appendChild(greeting.element);
      central.classList.add(`central--animate-screens`);

    }

    static showRules() {
      const rules = new RulesScreen();
      rules.changeScreen();
      renderScreen(rules.element);
    }

    static showGame(playerName) {
      DEBUG.state = (playerName === `debug`) ? true : false;
      const gameScreen = new GameScreen(new GameModel(playerName, questionData));
      renderScreen(gameScreen.root);
      gameScreen.startGame();
    }

    static async showStats(model) {
      try {
        await Loader.saveResults(model, model.playerName);
        const statistics = new StatsScreen(await Loader.loadResults(model.playerName));
        statistics.changeScreen();
        renderScreen(statistics.element);
      } catch (e) {
        Router.showError(e);
      }
    }

    static showError(error) {
      const errorScreen = new ErrorScreen(error);
      mainScreen.appendChild(errorScreen.element);
    }
  }

  Router.start();

}());

//# sourceMappingURL=main.js.map
