import { App } from './components/app/index.js';
import './style.scss';
import './normalize.scss';
import { state } from './state.js';
import { readStateFromLS } from './ls.js';

const body = document.querySelector('body');

const stateFromLS = readStateFromLS();

if (stateFromLS) {
  state.setProperty('theme', stateFromLS.theme);
  state.setProperty('boardSize', stateFromLS.boardSize);
  state.setProperty('numOfMines', stateFromLS.numOfMines);

  state.setProperty('minesLeft', stateFromLS.minesLeft);
  state.setProperty('usedFlags', stateFromLS.usedFlags);
  state.setProperty('clicks', stateFromLS.clicks);

  state.setProperty('results', stateFromLS.results);
}

body.className = state.theme === 'dark' ? 'dark' : 'light';
state.subscribe('scoreIsActive', () => {
  if (state.scoreIsActive) {
    body.classList.add('active');
  } else {
    body.classList.remove('active');
  }
});
state.subscribe('theme', () => {
  if (state.theme === 'light') {
    body.classList.remove('dark');
    body.classList.add('light');
  } else {
    body.classList.remove('light');
    body.classList.add('dark');
  }
});

const app = new App('app');
body.append(app.render());
