class BaseFactory {
  constructor(data) {
    this._originalData = Object.assign({}, data);
    this._data = Object.assign({}, data);
  }

  getModel() {
    throw new Error("Not implemented!");
  }
}

module.exports = BaseFactory;
