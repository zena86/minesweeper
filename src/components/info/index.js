import { state } from '../../state';
import './style.scss';

export class Info {
  constructor(className, title, value, argName) {
    this.className = className;
    this.title = title;

    this.infoEl = document.createElement('div');
    this.valueEl = document.createElement('span');

    this.updateValue(value);
    state.subscribe(argName, () => this.updateValue(state[argName]));
  }

  render() {
    this.infoEl.className = this.className;

    const titleEl = document.createElement('span');
    titleEl.innerHTML = this.title;
    titleEl.className = 'info-title';
    this.infoEl.appendChild(titleEl);

    this.valueEl.className = 'info-value';
    this.infoEl.appendChild(this.valueEl);
    return this.infoEl;
  }

  updateValue(newValue) {
    this.valueEl.innerHTML = newValue.toString().padStart(2, 0);
  }
}
