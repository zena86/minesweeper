import { state } from '../../state';

export class Timer {
  constructor() {
    this.timerId = null;
  }

  start() {
    this.timerId = setInterval(() => {
      state.setProperty('time', (state.time += 1));
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
  }

  reset() {
    state.setProperty('time', 0);
  }

  restart(from = 0) {
    state.setProperty('time', from);
    this.start();
  }
}
