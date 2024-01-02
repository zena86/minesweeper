export let state = {
  results: [],
  scoreIsActive: false,
  durationGame: 0,

  gameStatus: 'init',
  sessionStatus: 'init',

  theme: 'light',
  boardSize: 100,
  numOfMines: 10,

  boardModel: [],
  minesLeft: 10,
  usedFlags: 0,
  clicks: 0,
  time: 0,

  subscribe: (propertyName, callback) => {
    state.subscribeList.push({ propertyName: propertyName, callback: callback });
  },
  subscribeList: [],
  setProperty: (propertyName, value) => {
    state[propertyName] = value;
    state.subscribeList
      .filter((item) => item.propertyName === propertyName)
      .forEach((item) => { item.callback(); });
  }
};
