const BaseFactory = require("./BaseFactory");
const BzB2FilInfoModel = require("../models/BzB2FileInfoModel");
const BzB2FileModel = require("../models/BzB2FileModel");

class BzB2FileFactory extends BaseFactory {
  constructor(data) {
    super(data);
  }

  getModel() {
    this._data.fileInfo = this.makeBzB2FileInfoModel(this._data.fileInfo);
    return new BzB2FileModel(this._data);
  }

  makeBzB2FileInfoModel(data) {
    var modelData = {
      srcLastModifiedMilliseconds: data.srcLastModifiedMilliseconds
    };

    return new BzB2FilInfoModel(modelData);
  }
}

module.exports = BzB2FileFactory;
