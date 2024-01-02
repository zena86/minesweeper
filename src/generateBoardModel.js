import { CellModel } from './components/cell/cellModel';
import { state } from './state';

function getRandomNum(min, max) {
  return (
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1))
    + Math.ceil(min)
  ); // Max and min include
}

const generateMinedArr = (excludeCell, minedArr = []) => {
  if (minedArr.length < state.numOfMines) {
    const mineIndex = getRandomNum(0, state.boardSize - 1);
    if (!minedArr.includes(mineIndex) && mineIndex !== excludeCell) {
      minedArr.push(mineIndex);
    }
    generateMinedArr(excludeCell, minedArr);
  }
  return minedArr;
};

const generateBooleanMatrix = (excludeCell) => {
  const mined = generateMinedArr(excludeCell);
  const matrixSize = state.boardSize;
  const size = Math.sqrt(matrixSize);
  const matrix = new Array(size);
  for (let x = 0; x < matrix.length; x += 1) {
    matrix[x] = new Array(size);
    for (let y = 0; y < matrix[x].length; y += 1) {
      let cell = new CellModel(size * x + y);
      matrix[x][y] = cell;
      if (mined.includes(matrix[x][y].index)) {
        cell.isMined = true;
      }
    }
  }
  return matrix;
};

const calcNumberInCell = (matrix) => {
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      let cell = matrix[i][j];
      cell.numberInCell = 0;

      if (!cell.isMined) {
        if (i > 0 && j > 0 && matrix[i - 1][j - 1].isMined) {
          cell.numberInCell += 1;
        }
        if (i + 1 < matrix.length && matrix[i + 1][j].isMined) {
          cell.numberInCell += 1;
        }
        if (i > 0 && matrix[i - 1][j].isMined) {
          cell.numberInCell += 1;
        }
        if (i > 0 && j + 1 < matrix[i].length && matrix[i - 1][j + 1].isMined) {
          cell.numberInCell += 1;
        }
        if (j > 0 && matrix[i][j - 1].isMined) {
          cell.numberInCell += 1;
        }
        if (j + 1 < matrix[i].length && matrix[i][j + 1].isMined) {
          cell.numberInCell += 1;
        }
        if (j > 0 && i + 1 < matrix.length && matrix[i + 1][j - 1].isMined) {
          cell.numberInCell += 1;
        }
        if (i + 1 < matrix.length && j + 1 < matrix[i].length && matrix[i + 1][j + 1].isMined) {
          cell.numberInCell += 1;
        }
      }
    }
  }
  return matrix;
};

export const generateBoardModel = (excludeCell) => {
  const boardModel = calcNumberInCell(generateBooleanMatrix(excludeCell));
  state.setProperty('boardModel', boardModel);
};

export const generateStartBoardModel = (size) => {
  const startBoardModel = new Array(size);
  for (let x = 0; x < startBoardModel.length; x += 1) {
    startBoardModel[x] = new Array(size);
    for (let y = 0; y < startBoardModel[x].length; y += 1) {
      let cell = new CellModel(size * x + y);
      startBoardModel[x][y] = cell;
    }
  }
  state.setProperty('boardModel', startBoardModel);
};
