const BaseFactory = require("./BaseFactory");
const BzB2FileFactory = require("./BzB2FileFactory");
const FileModel = require("../models/FileModel");

class FileFactory extends BaseFactory {
  getModel() {
    this._data.bzB2File = this.makeBzB2FileFactory(this._data).getModel();
    return new FileModel(this._data);
  }

  makeBzB2FileFactory(data) {
    return new BzB2FileFactory(this._data.bzB2File);
  }
}

module.exports = FileFactory;
