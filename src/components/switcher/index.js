import './style.scss';
import { state } from './../../state';

export class Switcher {
  constructor(className) {
    this.className = className;
  }

  render() {
    const switcherEl = document.createElement('div');
    switcherEl.className = this.className;

    const lightInputEl = document.createElement('input');
    lightInputEl.setAttribute('name', 'balance');
    lightInputEl.setAttribute('type', 'radio');
    lightInputEl.setAttribute('id', 'light');
    lightInputEl.setAttribute('value', 'light');

    lightInputEl.className = 'switcher-input light';
    switcherEl.appendChild(lightInputEl);

    const lightLabelEl = document.createElement('label');
    lightLabelEl.setAttribute('for', 'light');
    lightLabelEl.className = 'switcher-label light-btn';
    lightLabelEl.innerHTML = 'light';
    switcherEl.appendChild(lightLabelEl);

    lightLabelEl.addEventListener('click', () => {
      state.setProperty('theme', 'light');
      localStorage.setItem('state', JSON.stringify(state));
    });

    const darkInputEl = document.createElement('input');
    darkInputEl.setAttribute('name', 'balance');
    darkInputEl.setAttribute('type', 'radio');
    darkInputEl.setAttribute('id', 'dark');
    darkInputEl.setAttribute('value', 'dark');
    darkInputEl.className = 'switcher-input dark';
    switcherEl.appendChild(darkInputEl);

    const darkLabelEl = document.createElement('label');
    darkLabelEl.setAttribute('for', 'dark');
    darkLabelEl.className = 'switcher-label dark-btn';
    darkLabelEl.innerHTML = 'dark';
    switcherEl.appendChild(darkLabelEl);

    darkLabelEl.addEventListener('click', () => {
      state.setProperty('theme', 'dark');
      localStorage.setItem('state', JSON.stringify(state));
    });

    if (state.theme === 'dark') {
      darkInputEl.setAttribute('checked', true);
    } else if (state.theme === 'light') {
      lightInputEl.setAttribute('checked', true);
    }

    const toggleEl = document.createElement('span');
    toggleEl.className = 'switcher-toggle';
    switcherEl.appendChild(toggleEl);
    return switcherEl;
  }
}
