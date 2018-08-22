const BaseFactory = require("./BaseFactory");
const FileCacheModel = require("../models/FileCacheModel");
const FileFactory = require("./FileFactory");

class FileCacheFactory extends BaseFactory {
  constructor(data) {
    super(data);
  }

  getModel() {
    this._data.file = this.makeFileFactory(this._data).getModel();
    return new FileCacheModel(this._data);
  }

  makeFileFactory(data) {
    return new FileFactory(data.file);
  }
}

module.exports = FileCacheFactory;
