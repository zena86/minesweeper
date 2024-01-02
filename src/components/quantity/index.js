import './style.scss';
import { state } from './../../state';

export class Quantity {
  constructor(className) {
    this.className = className;
    this.quantityInputEl = document.createElement('input');
  }

  render() {
    const quantityEl = document.createElement('div');
    quantityEl.className = this.className;

    const quantityLabelEl = document.createElement('div');
    quantityLabelEl.className = 'label';
    quantityLabelEl.innerText = 'Mines';
    quantityEl.appendChild(quantityLabelEl);

    const rangeEl = document.createElement('input');
    rangeEl.setAttribute('type', 'range');
    rangeEl.setAttribute('value', state.numOfMines);
    rangeEl.setAttribute('min', '0');
    rangeEl.setAttribute('max', '99');
    rangeEl.setAttribute('id', 'range');
    rangeEl.setAttribute('oninput', 'rangevalue.value=value');
    rangeEl.setAttribute('style', `background-size: ${state.numOfMines}% 100%`);

    rangeEl.addEventListener('change', () => {
      state.setProperty('numOfMines', rangeEl.value);
      state.setProperty('minesLeft', rangeEl.value);
      state.setProperty('sessionStatus', 'startNew');
      localStorage.setItem('state', JSON.stringify(state));
    });

    const numberEl = document.createElement('input');
    numberEl.setAttribute('type', 'number');
    numberEl.setAttribute('id', 'rangevalue');
    numberEl.setAttribute('value', state.numOfMines);
    numberEl.setAttribute('oninput', 'range.value=value');

    numberEl.addEventListener('change', () => {
      state.setProperty('numOfMines', numberEl.value);
    });

    quantityEl.appendChild(rangeEl);
    quantityEl.appendChild(numberEl);

    rangeEl.addEventListener('input', this.handleInputChange);
    numberEl.addEventListener('input', this.handleInputChange);

    return quantityEl;
  }

  handleInputChange(e) {
    let target = e.target;
    if (e.target.type !== 'range') {
      target = document.getElementById('range');
    }
    const min = target.min;
    const max = target.max;
    const val = target.value;

    target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';
  }
}
