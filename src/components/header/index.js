import { Button } from '../button/index';
import { Switcher } from '../switcher';
import { Settings } from '../settings/index';
import { Score } from '../score/index';
import { state } from '../../state';
import { readStateFromLS, saveStateToLS } from '../../ls';
import './style.scss';

export class Header {
  constructor(className) {
    this.className = className;
    this.scoreEl = null;

    this.newGameBtnEl = new Button('btn', 'New game').render();
    this.newGameBtnEl.addEventListener('click', () => {
      state.setProperty('gameStatus', 'startNew');
      state.setProperty('sessionStatus', 'startNew');
      saveStateToLS();
    });

    const stateFromLS = readStateFromLS();
    if (stateFromLS) {
      state.gameStatus = stateFromLS.gameStatus;
    }

    this.continueBtnEl = new Button('btn continue-btn disabled', 'Continue').render();
    if (state.gameStatus === 'init' || state.gameStatus === 'playng') {
      this.continueBtnEl.classList.remove('disabled');
    } else {
      this.continueBtnEl.classList.add('disabled');
    }
    state.subscribe('sessionStatus', () => {
      if (state.statusGame === 'init') {
        this.continueBtnEl.classList.remove('disabled');
      } else {
        this.continueBtnEl.classList.add('disabled');
      }
    });
    this.continueBtnEl.addEventListener('click', () => {
      state.boardSize = stateFromLS.boardSize;
      state.numOfMines = stateFromLS.numOfMines;
      state.boardModel = stateFromLS.boardModel;
      state.minesLeft = stateFromLS.minesLeft;
      state.usedFlags = stateFromLS.usedFlags;
      state.clicks = stateFromLS.clicks;
      state.time = stateFromLS.time;

      state.gameStatus = stateFromLS.gameStatus;
      state.scoreIsActive = stateFromLS.scoreIsActive;

      state.setProperty('sessionStatus', 'playng');
      state.setProperty('gameStatus', 'playng');
      saveStateToLS();

      this.continueBtnEl.classList.add('disabled');
    });

    this.scoreBtnEl = new Button('btn statistic-btn', 'Statistic').render();
    this.scoreBtnEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('score-item')) {
        e.stopPropagation();
        return;
      }
      if (this.scoreEl && this.scoreEl.classList.contains('active')) {
        this.scoreEl.classList.remove('active');
        this.scoreBtnEl.removeChild(this.scoreEl);
        state.setProperty('scoreIsActive', false);
        return;
      }
      state.setProperty('scoreIsActive', true);
      this.scoreEl = new Score('score active').render();
      this.scoreBtnEl.appendChild(this.scoreEl);
    });
  }

  render() {
    const headerEl = document.createElement('header');
    headerEl.className = this.className;

    const containerEl = document.createElement('div');
    containerEl.className = 'container';
    headerEl.appendChild(containerEl);

    const headerBodyEl = document.createElement('div');
    headerBodyEl.className = 'header-body';
    containerEl.appendChild(headerBodyEl);

    const headerLeftEl = document.createElement('div');
    headerLeftEl.className = 'header-col';
    headerBodyEl.appendChild(headerLeftEl);
    headerLeftEl.appendChild(this.newGameBtnEl);
    headerLeftEl.appendChild(this.continueBtnEl);
    headerLeftEl.appendChild(this.scoreBtnEl);
    headerLeftEl.appendChild(new Switcher('switcher').render());

    const headerRightEl = document.createElement('div');
    headerRightEl.className = 'header-col right';
    headerBodyEl.appendChild(headerRightEl);
    headerRightEl.appendChild(new Settings('settings').render());
    return headerEl;
  }
}
