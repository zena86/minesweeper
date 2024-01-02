import { state } from '../../state';

const getNeighboursIndexes = (cellIndex) => {
  let neighbours = [];
  const size = state.boardModel.length;
  const x = cellIndex % size;
  const y = Math.floor(cellIndex / size);
  const hasLeftColumn = x - 1 >= 0;
  const hasRightColumn = x + 1 < size;
  const hasTopRow = y - 1 >= 0;
  const hasBottomRow = y + 1 < size;

  if (hasLeftColumn && hasTopRow) {
    neighbours.push(cellIndex - size - 1);
  }
  if (hasTopRow) {
    neighbours.push(cellIndex - size);
  }
  if (hasRightColumn && hasTopRow) {
    neighbours.push(cellIndex - size + 1);
  }
  if (hasLeftColumn) {
    neighbours.push(cellIndex - 1);
  }
  if (hasRightColumn) {
    neighbours.push(cellIndex + 1);
  }
  if (hasLeftColumn && hasBottomRow) {
    neighbours.push(cellIndex + size - 1);
  }
  if (hasBottomRow) {
    neighbours.push(cellIndex + size);
  }
  if (hasRightColumn && hasBottomRow) {
    neighbours.push(cellIndex + size + 1);
  }

  return neighbours;
};

const getCellModelsByIndexes = (indexesArray) => {
  let cellModels = [];
  for (let x = 0; x < state.boardModel.length; x += 1) {
    for (let y = 0; y < state.boardModel[x].length; y += 1) {
      const cell = state.boardModel[x][y];
      if (indexesArray.includes(cell.index)) {
        cellModels.push(cell);
      }
    }
  }
  return cellModels;
};

export const getEmptyCellArr = (cellModel, emptyCellArr = []) => {
  const neighboursIndexes = getNeighboursIndexes(cellModel.index);
  const neighbours = getCellModelsByIndexes(neighboursIndexes);

  neighbours.forEach((item) => {
    if (!emptyCellArr.includes(item)) {
      if (cellModel.numberInCell === 0) { emptyCellArr.push(item); }

      if (item.numberInCell === 0 && !item.isMined) {
        getEmptyCellArr(item, emptyCellArr);
      }
    }
  });

  return emptyCellArr;
};
