import { Screen } from '../screen/index';
import { Board } from '../board/index';
import './style.scss';

export class Main {
  constructor(className) {
    this.className = className;

    this.screen = new Screen('screen');
  }

  render() {
    const mainEl = document.createElement('main');
    mainEl.className = this.className;

    const containerEl = document.createElement('div');
    containerEl.className = 'container';
    mainEl.appendChild(containerEl);

    containerEl.appendChild(
      this.screen.render()
    );
    containerEl.appendChild(
      new Board('board').render()
    );
    return mainEl;
  }
}
