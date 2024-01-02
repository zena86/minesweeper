export class CellModel {
  constructor(index) {
    this.index = index;
    this.isMined = false;
    this.isClose = true;
    this.numberInCell = 0;
    this.isFlag = false;
  }

  setIsClose(value) {
    this.isClose = value;
  }

  setIsFlag(value) {
    this.isFlag = value;
  }
}
