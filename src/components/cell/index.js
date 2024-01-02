import './style.scss';
import { state } from './../../state';

export class Cell {
  constructor(className, cellModel) {
    this.className = className;
    this.cellEl = document.createElement('button');
    this.cellModel = cellModel;
  }

  renderCloseCell() {
    this.cellEl.className = this.className;
    this.cellEl.innerHTML = '';
    this.cellEl.classList.add('close-cell');
    return this.cellEl;
  }

  renderMinedCell() {
    this.cellEl.innerHTML = '';
    this.cellEl.className = this.className;
    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', './../../assets/img/mine.png');
    if (state.boardSize === 100) {
      imgEl.setAttribute('width', '25');
    } else if (state.boardSize === 225) {
      imgEl.setAttribute('width', '20');
    } else if (state.boardSize === 625) {
      imgEl.setAttribute('width', '15');
    }
    this.cellEl.appendChild(imgEl);
    this.cellEl.classList.add('mined');
    this.displayAsOpen();
    return this.cellEl;
  }

  renderNumberedCell() {
    this.cellEl.className = this.className;
    this.cellEl.innerHTML = this.cellModel.numberInCell;
    let cls = '';
    if (this.cellModel.numberInCell === 1) {
      cls = 'one';
    } else if (this.cellModel.numberInCell === 2) {
      cls = 'two';
    } else if (this.cellModel.numberInCell === 3) {
      cls = 'three';
    } else if (this.cellModel.numberInCell === 4) {
      cls = 'four';
    } else if (this.cellModel.numberInCell === 5) {
      cls = 'five';
    } else if (this.cellModel.numberInCell === 6) {
      cls = 'six';
    } else if (this.cellModel.numberInCell === 7) {
      cls = 'seven';
    } else if (this.cellModel.numberInCell === 8) {
      cls = 'eight';
    }
    this.cellEl.classList.add(cls);
    this.displayAsOpen();
    return this.cellEl;
  }

  renderEmptyCell() {
    this.cellEl.className = this.className;
    this.cellEl.innerHTML = '';
    this.displayAsOpen();
    return this.cellEl;
  }

  renderFlagCell() {
    this.cellEl.innerHTML = '';
    this.cellEl.className = this.className;
    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', './../../assets/img/flag.svg');
    if (state.boardSize === 100) {
      imgEl.setAttribute('width', '25');
    } else if (state.boardSize === 225) {
      imgEl.setAttribute('width', '20');
    } else if (state.boardSize === 625) {
      imgEl.setAttribute('width', '12');
    }
    this.cellEl.classList.add('flag');
    this.cellEl.appendChild(imgEl);
    return this.cellEl;
  }

  displayAsOpen() {
    this.cellEl.classList.add('open');
  }

  renderAsLoser() {
    this.renderMinedCell();
    this.cellEl.classList.add('loser');
  }

  renderAsError() {
    this.renderMinedCell();
    this.cellEl.classList.add('error');
  }
}
