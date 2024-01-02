import { Cell } from '../cell/index';
import { Timer } from '../timer/index';
import { state } from '../../state';
import { getEmptyCellArr } from './getEmptyCellArr';
import {
  generateBoardModel,
  generateStartBoardModel
} from '../../generateBoardModel';
import './style.scss';
import { readStateFromLS, saveStateToLS } from '../../ls';

export class Board {
  constructor(className) {
    this.className = className;
    this.cells = [];
    this.boardEl = document.createElement('div');
    this.timer = new Timer();
    this.audio = null;
    this.resultObj = {};

    this.render = this.render.bind(this);
    this.clearBoard = this.clearBoard.bind(this);

    state.subscribe('boardModel', () => this.render());
    state.subscribe('boardSize', () => this.startGame());
    state.subscribe('numOfMines', () => this.startGame());
    state.subscribe('gameStatus', () => {
      if (state.gameStatus === 'playng') {
        this.continueGame();
      } else if (state.gameStatus === 'startNew') {
        this.startGame();
      }
    });

    this.startGame();
  }

  render() {
    this.clearBoard();
    const boardModel = state.boardModel;
    this.boardEl.className = this.className;

    let cls = '';
    if (state.boardSize === 100) {
      cls = 'easy';
    } else if (state.boardSize === 225) {
      cls = 'medium';
    } else if (state.boardSize === 625) {
      cls = 'hard';
    }
    this.boardEl.classList.add(cls);

    if (boardModel) {
      this.cells.length = 0;
      for (let x = 0; x < boardModel.length; x += 1) {
        for (let y = 0; y < boardModel[x].length; y += 1) {
          const cellModel = boardModel[x][y];
          const cell = new Cell('cell', cellModel);

          let cellEl = null;
          if (cellModel.isFlag) {
            cellEl = cell.renderFlagCell();
          } else {
            cellEl = cell.renderCloseCell();
          }
          this.boardEl.appendChild(cellEl);

          const handlerLeftClick = () => this.handleCellLeftClick(cell.cellModel);
          cellEl.removeEventListener('click', handlerLeftClick);
          cellEl.addEventListener('click', handlerLeftClick);

          const handlerRightClick = (e) => this.handleCellRightClick(e, cell);
          cellEl.removeEventListener('contextmenu', handlerRightClick);
          cellEl.addEventListener('contextmenu', handlerRightClick);

          this.cells.push(cell);
        }
      }
    }

    return this.boardEl;
  }

  handleCellLeftClick(cellModel) {
    if (cellModel.isClose && !cellModel.isFlag) {
      state.setProperty('clicks', (state.clicks += 1));
    } else {
      return;
    }
    if (state.clicks === 1) {
      state.setProperty('gameStatus', 'playng');
      state.setProperty('sessionStatus', 'playng');
      this.updateBoardModelByFirstMove(cellModel);
      this.render();
      this.timer.stop();
      this.timer.start();
      saveStateToLS();
    }
    this.addSound('./../../assets/sounds/open.mp3');
    this.openCellsByLeftClick(cellModel.index);
    this.checkIsWin();
  }

  updateBoardModelByFirstMove(cellModel) {
    let flagIndxArr = this.cells
      .filter((item) => item.cellModel.isFlag)
      .map((el) => el.cellModel.index);

    generateBoardModel(cellModel.index);

    state.boardModel.forEach((row) => {
      row.forEach((cellObj) => {
        if (flagIndxArr.includes(cellObj.index)) {
          cellObj.setIsFlag(true);
        }
      });
    });
  }

  openCellsByLeftClick(cellIdx) {
    const cell = this.cells.find((x) => x.cellModel.index === cellIdx);
    if (cell.cellModel.isFlag) {
      return;
    }
    cell.cellModel.setIsClose(false);
    if (cell.cellModel.isMined) {
      state.setProperty('gameStatus', 'lose');
      state.setProperty('sessionStatus', 'lose');
      this.gameOverLose(cell);
    } else if (cell.cellModel.numberInCell === 0) {
      cell.renderEmptyCell();
      this.openNeighbourCells(cell);
    } else {
      cell.renderNumberedCell(cell.cellModel);
    }
  }

  openNeighbourCells(cell) {
    const emptyCellModels = getEmptyCellArr(cell.cellModel);
    const emptyCells = this.cells.filter((item) => emptyCellModels.includes(item.cellModel));
    emptyCells.forEach((item) => {
      item.cellModel.setIsClose(false);
      if (item.cellModel.isFlag) {
        item.renderFlagCell();
      } else if (item.cellModel.numberInCell === 0) {
        item.renderEmptyCell();
      } else {
        item.renderNumberedCell();
      }
    });
  }

  checkIsWin() {
    let unGuessed = this.cells.find(
      (item) => item.cellModel.isClose && !item.cellModel.isMined
    );
    if (!unGuessed) {
      state.setProperty('gameStatus', 'win');
      state.setProperty('sessionStatus', 'win');
      saveStateToLS();
      this.gameOverWin();
    }
  }

  handleCellRightClick(e, cell) {
    e.preventDefault();

    if (state.clicks === 0) {
      this.timer.stop();
      this.timer.start();

      state.setProperty('gameStatus', 'startNew');
      state.setProperty('sessionStatus', 'startNew');
      saveStateToLS();
    }

    if (!cell.cellModel.isClose) {
      return;
    }

    if (cell.cellModel.isFlag) {
      cell.cellModel.setIsFlag(false);
      cell.renderCloseCell();
      state.setProperty('minesLeft', (state.minesLeft += 1));
      state.setProperty('usedFlags', (state.usedFlags -= 1));
    } else {
      cell.cellModel.setIsFlag(true);
      cell.renderFlagCell();
      state.setProperty('minesLeft', (state.minesLeft -= 1));
      state.setProperty('usedFlags', (state.usedFlags += 1));
    }

    this.addSound('./../../assets/sounds/flag.mp3');
    saveStateToLS();
  }

  startGame() {
    console.log('startGame');
    this.clearBoard();
    this.timer.stop();
    this.timer.reset();
    state.subscribe('time', () => {
      saveStateToLS();
    });
    generateStartBoardModel(Math.sqrt(state.boardSize));
    this.render();
    state.setProperty('minesLeft', state.numOfMines);
    state.setProperty('usedFlags', 0);
    state.setProperty('clicks', 0);
  }

  continueGame() {
    this.render();
    this.cells.forEach((item) => {
      if (item.cellModel.isFlag) {
        item.renderFlagCell();
      } else if (
        !item.cellModel.isFlag
        && item.cellModel.isClose === false
        && item.cellModel.numberInCell === 0
        && !item.cellModel.isMined
      ) {
        item.renderEmptyCell();
      } else if (!item.cellModel.isFlag
        && !item.cellModel.isClose
        && item.cellModel.numberInCell > 0) {
        item.renderNumberedCell();
      }
    });
    this.timer.restart(state.time);
    state.subscribe('time', () => {
      saveStateToLS();
    });
  }

  gameOverLose(loserCell) {
    state.duration = readStateFromLS().time;

    this.timer.stop();
    this.disabledBoard();
    this.showAllMined(loserCell);
    state.setProperty('statusGame', 'lose');
    saveStateToLS();
    this.addSound('./../../assets/sounds/lose.mp3');
  }

  gameOverWin() {
    state.duration = readStateFromLS().time;

    this.timer.stop();
    this.disabledBoard();
    state.setProperty('gameStatus', 'win');
    state.setProperty('sessionStatus', 'win');
    saveStateToLS();
    this.addSound('./../../assets/sounds/win.mp3');
    this.saveInLS();
  }

  disabledBoard() {
    this.boardEl.classList.add('disabled');
  }

  clearBoard() {
    this.boardEl.innerHTML = '';
  }

  showAllMined(loserCell) {
    this.cells.forEach((item) => {
      if (item.cellModel.isMined && !item.cellModel.isFlag) {
        item.renderMinedCell();
        loserCell.renderAsLoser();
      }
      if (!item.cellModel.isMined && item.cellModel.isFlag) {
        item.renderAsError();
      }
      if (item.cellModel.isMined && item.cellModel.isFlag) {
        item.renderFlagCell();
      }
    });
  }

  addSound(soundPath) {
    this.audio = new Audio(soundPath);
    this.audio.play('');
  }

  saveInLS() {
    let resultsArr = readStateFromLS().results;

    this.resultObj = {
      date: new Date().toLocaleString(),
      level: `${state.numOfMines}/${state.boardSize}`,
      time: state.duration,
      moves: state.clicks
    };

    if (resultsArr.length >= 10) {
      resultsArr.shift();
    }

    if (!resultsArr) {
      resultsArr = [];
    }
    resultsArr.push(this.resultObj);
    state.setProperty('results', resultsArr);
    saveStateToLS();
  }
}
