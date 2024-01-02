import { state } from '../../state';
import './style.scss';

export class Message {
  constructor(className) {
    this.className = className;
    this.statusMsgEl = document.createElement('p');

    state.subscribe('sessionStatus', () => {
      this.render();
    });
  }

  render() {
    this.statusMsgEl.className = this.className;
    this.statusMsgEl.innerText = this.chooseMsgText();
    return this.statusMsgEl;
  }

  chooseMsgText() {
    let text = '';
    if (state.sessionStatus === 'init' || state.sessionStatus === 'startNew') {
      text = 'Welcome! Let\'s play!';
    } else if (state.sessionStatus === 'win') {
      text = `Hooray! You found all mines in ${state.duration} seconds and ${state.clicks} moves!`;
      this.statusMsgEl.classList.remove('lose');
      this.statusMsgEl.classList.add('win');
    } else if (state.sessionStatus === 'lose') {
      text = 'Game over. Try again!';
      this.statusMsgEl.classList.remove('win');
      this.statusMsgEl.classList.add('lose');
    } else if (state.sessionStatus === 'playng') {
      text = 'Game in progress...';
    }
    return text;
  }
}
