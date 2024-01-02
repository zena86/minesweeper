import { state } from '../../state';
import { Info } from '../info/index';
import { Message } from '../message/index';
import './style.scss';

export class Screen {
  constructor(className) {
    this.className = className;

    this.moves = new Info('info', 'Moves:', state.clicks, 'clicks');
    this.minesLeft = new Info('info', 'Mines left:', state.numOfMines, 'minesLeft');
    this.flags = new Info('info', 'Flags used:', state.usedFlags, 'usedFlags');

    state.subscribe('gameStatus', () => {
      if (state.gameStatus === 'continue') {
        this.updateScreenByContinueGame();
      }
    });
  }

  render() {
    const screenEl = document.createElement('div');
    screenEl.className = this.className;

    const screenInnerEl = document.createElement('div');
    screenInnerEl.className = 'screen-inner';
    screenEl.appendChild(screenInnerEl);

    const screenTopEl = document.createElement('div');
    screenTopEl.className = 'screen-top';
    screenInnerEl.appendChild(screenTopEl);

    const colLeftEl = document.createElement('div');
    colLeftEl.className = 'screen-column';
    screenTopEl.appendChild(colLeftEl);

    const colRightEl = document.createElement('div');
    colRightEl.className = 'screen-column';
    screenTopEl.appendChild(colRightEl);

    const colImgEl = document.createElement('div');
    colImgEl.className = 'dog';
    screenTopEl.appendChild(colImgEl);

    colLeftEl.appendChild(this.moves.render());

    colLeftEl.appendChild(
      new Info('info', 'Time:', state.time, 'time').render()
    );

    colRightEl.appendChild(this.minesLeft.render());
    colRightEl.appendChild(this.flags.render());

    screenInnerEl.appendChild(new Message('message').render());
    return screenEl;
  }

  updateScreenByContinueGame() {
    this.moves.updateValue(state.clicks);
    this.minesLeft.updateValue(state.minesLeft);
    this.flags.updateValue(state.usedFlags);
  }
}
