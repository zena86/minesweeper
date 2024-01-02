import './style.scss';

export class Button {
  constructor(className, title) {
    this.className = className;
    this.title = title;

    this.buttonEl = document.createElement('button');
  }

  render() {
    this.buttonEl.className = this.className;
    this.buttonEl.innerHTML = this.title;
    return this.buttonEl;
  }

  disabledBtn() {
    this.buttonEl.classList.add('disabled');
  }

  aciveBtn() {
    this.buttonEl.classList.remove('disabled');
  }
}
