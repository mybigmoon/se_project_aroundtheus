export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; //is an array of data that we want to render into html and place on the page
    this._renderer = renderer; //is a function that takes data and converts that data into html
    this._container = document.querySelector(containerSelector); //is the place that we want to append or prepend to
  }

  renderItems() {
    this._items.forEach((data) => {
      this.addItem(data);
    });
  }

  addItem(data) {
    const element = this._renderer(data);
    this._container.prepend(element);
  }
}
