import { CellModel } from './components/cell/cellModel.js';
import { state } from './state.js';

export const readStateFromLS = () => {
  const stateLS = JSON.parse(localStorage.getItem('state'));
  if (!stateLS) {
    return null;
  }

  for (let i = 0; i < stateLS.boardModel.length; i += 1) {
    for (let j = 0; j < stateLS.boardModel[i].length; j += 1) {
      let oldCell = stateLS.boardModel[i][j];
      let newCell = new CellModel(oldCell.index);
      newCell.isMined = oldCell.isMined;
      newCell.isClose = oldCell.isClose;
      newCell.numberInCell = oldCell.numberInCell;
      newCell.isFlag = oldCell.isFlag;

      stateLS.boardModel[i][j] = newCell;
    }
  }

  return stateLS;
};

export const saveStateToLS = () => {
  localStorage.setItem('state', JSON.stringify(state));
};
