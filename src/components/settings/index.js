import { Button } from '../button/index';
import { Quantity } from '../quantity';
import './style.scss';
import { state } from './../../state';
import { saveStateToLS } from '../../ls';

export class Settings {
  constructor(className) {
    this.className = className;

    this.easyBtnEl = new Button('btn', 'Easy').render();
    this.mediumBtnEl = new Button('btn', 'Medium').render();
    this.hardBtnEl = new Button('btn', 'Hard').render();

    if (state.boardSize === 100) {
      this.hardBtnEl.classList.remove('active');
      this.mediumBtnEl.classList.remove('active');
      this.easyBtnEl.classList.add('active');
    } else if (state.boardSize === 225) {
      this.hardBtnEl.classList.remove('active');
      this.mediumBtnEl.classList.add('active');
      this.easyBtnEl.classList.remove('active');
    } else if (state.boardSize === 625) {
      this.hardBtnEl.classList.add('active');
      this.mediumBtnEl.classList.remove('active');
      this.easyBtnEl.classList.remove('active');
    }

    this.easyBtnEl.addEventListener('click', () => {
      state.setProperty('boardSize', 100);
      state.setProperty('sessionStatus', 'startNew');
      state.setProperty('gameStatus', 'startNew');
      saveStateToLS();
      console.log(state);

      this.easyBtnEl.classList.add('active');
      this.hardBtnEl.classList.remove('active');
      this.mediumBtnEl.classList.remove('active');
    });

    this.mediumBtnEl.addEventListener('click', () => {
      state.setProperty('boardSize', 225);
      state.setProperty('sessionStatus', 'startNew');
      state.setProperty('gameStatus', 'startNew');
      saveStateToLS();

      this.easyBtnEl.classList.remove('active');
      this.hardBtnEl.classList.remove('active');

      this.mediumBtnEl.classList.add('active');
    });

    this.hardBtnEl.addEventListener('click', () => {
      state.setProperty('boardSize', 625);
      state.setProperty('sessionStatus', 'startNew');
      state.setProperty('gameStatus', 'startNew');
      saveStateToLS();
      this.easyBtnEl.classList.remove('active');
      this.mediumBtnEl.classList.remove('active');
      this.hardBtnEl.classList.add('active');
    });

    this.quantityEl = new Quantity('quantity').render();
  }

  render() {
    const settingsEl = document.createElement('div');
    settingsEl.className = this.className;

    settingsEl.appendChild(this.easyBtnEl);
    settingsEl.appendChild(this.mediumBtnEl);
    settingsEl.appendChild(this.hardBtnEl);
    settingsEl.appendChild(this.quantityEl);

    return settingsEl;
  }
}
