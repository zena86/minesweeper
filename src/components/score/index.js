import './style.scss';
import { readStateFromLS } from '../../ls';

export class Score {
  constructor(className) {
    this.className = className;
  }

  render() {
    const scoreEl = document.createElement('div');
    scoreEl.className = this.className;

    const scoreInnerEl = document.createElement('div');
    scoreInnerEl.className = 'score-inner';

    const scoreContentEl = document.createElement('div');
    scoreContentEl.className = 'score-content';

    const resultsFromLS = readStateFromLS();
    const scoreHeadEl = document.createElement('div');
    scoreHeadEl.className = 'score-head';

    const scoreHeadDateEl = document.createElement('div');
    scoreHeadDateEl.className = 'score-date';
    const scoreHeadLevelEl = document.createElement('div');
    scoreHeadLevelEl.className = 'score-level';
    const scoreHeadTimeEl = document.createElement('div');
    scoreHeadTimeEl.className = 'score-time';
    const scoreHeadMovesEl = document.createElement('div');
    scoreHeadMovesEl.className = 'score-moves';

    scoreHeadDateEl.innerText = 'Date';
    scoreHeadLevelEl.innerText = 'Level';
    scoreHeadTimeEl.innerText = 'Time, s';
    scoreHeadMovesEl.innerText = 'Moves';
    scoreHeadEl.appendChild(scoreHeadDateEl);
    scoreHeadEl.appendChild(scoreHeadLevelEl);
    scoreHeadEl.appendChild(scoreHeadTimeEl);
    scoreHeadEl.appendChild(scoreHeadMovesEl);
    scoreContentEl.appendChild(scoreHeadEl);

    if (!resultsFromLS || !resultsFromLS.results || resultsFromLS.results.length === 0) {
      const scoreItemEl = document.createElement('div');
      scoreItemEl.innerText = 'No results';
      scoreItemEl.className = 'score-item no-results';
      scoreContentEl.appendChild(scoreItemEl);
    } else {
      resultsFromLS.results.forEach(result => {
        const scoreItemEl = document.createElement('div');
        scoreItemEl.className = 'score-item';
        scoreContentEl.appendChild(scoreItemEl);

        const dateEl = document.createElement('div');
        dateEl.innerText = result.date;
        dateEl.className = 'date';
        scoreItemEl.appendChild(dateEl);

        const levelEl = document.createElement('div');
        levelEl.innerText = result.level;
        levelEl.className = 'level';
        scoreItemEl.appendChild(levelEl);

        const timeEl = document.createElement('div');
        timeEl.innerText = result.time;
        timeEl.className = 'time';
        scoreItemEl.appendChild(timeEl);

        const movesEl = document.createElement('div');
        movesEl.innerText = result.moves;
        movesEl.className = 'moves';
        scoreItemEl.appendChild(movesEl);
      });
    }

    scoreEl.appendChild(scoreInnerEl);
    scoreInnerEl.appendChild(scoreContentEl);
    return scoreEl;
  }
}
