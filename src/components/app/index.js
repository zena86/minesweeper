import { Header } from './../header/index';
import { Main } from './../main/index';

export class App {
  constructor(className) {
    this.className = className;
  }

  render() {
    const appEl = document.createElement('div');
    appEl.className = this.className;
    appEl.appendChild(
      new Header('header').render()
    );
    appEl.appendChild(
      new Main('main').render()
    );
    return appEl;
  }
}
